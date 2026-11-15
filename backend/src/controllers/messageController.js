import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { updateconversationAfterCreateMessage } from "../utils/messageHelper.js";
import { chatEmitter } from "../libs/eventBus.js";
import { encryptText } from "../utils/cryptoHelper.js";
import mongoose from "mongoose";

// Helper: Chuẩn hóa thông tin trích dẫn Reply
const sanitizeReplyTo = (replyTo) => {
  if (!replyTo || typeof replyTo !== "object") return undefined;
  if (!replyTo.messageId || !mongoose.Types.ObjectId.isValid(replyTo.messageId)) return undefined;

  return {
    messageId: new mongoose.Types.ObjectId(replyTo.messageId),
    senderName: typeof replyTo.senderName === "string" ? replyTo.senderName.trim().slice(0, 60) : "Người dùng",
    content: typeof replyTo.content === "string" ? replyTo.content.trim().slice(0, 300) : "",
    imgURL: typeof replyTo.imgURL === "string" ? replyTo.imgURL.trim() : undefined,
  };
};

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId, imgURL, replyTo, audioURL, audioDuration } = req.body;
    const senderId = req.user._id;

    const cleanContent = typeof content === "string" ? content.trim() : "";
    const cleanImgURL = typeof imgURL === "string" ? imgURL.trim() : "";
    const cleanAudioURL = typeof audioURL === "string" ? audioURL.trim() : "";
    const safeAudioDuration = typeof audioDuration === "number" ? Math.round(audioDuration) : 0;
    const cleanReplyTo = sanitizeReplyTo(replyTo);

    // 1. Kiểm tra tính hợp lệ của nội dung tin nhắn hoặc hình ảnh/nhãn dán/ghi âm
    if (!cleanContent && !cleanImgURL && !cleanAudioURL) {
      return res.status(400).json({ message: "Vui lòng nhập nội dung, chọn nhãn dán hoặc gửi ghi âm" });
    }

    if (cleanContent.length > 3000) {
      return res.status(400).json({ message: "Nội dung tin nhắn tối đa 3000 ký tự" });
    }

    const finalContent = cleanContent || (cleanAudioURL ? "[Tin nhắn thoại]" : "[Nhãn dán]");

    let conversation = null;

    // 2. Nếu có conversationId, kiểm tra quyền truy cập nghiêm ngặt
    if (conversationId) {
      if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        return res.status(400).json({ message: "Mã cuộc trò chuyện không hợp lệ" });
      }

      conversation = await Conversation.findById(conversationId);
      if (conversation) {
        const isParticipant = conversation.participants.some(
          (p) => p.userId.toString() === senderId.toString()
        );
        if (!isParticipant) {
          return res.status(403).json({
            message: "Bạn không có quyền gửi tin nhắn vào cuộc trò chuyện này",
          });
        }
      }
    }

    // 3. Nếu chưa có conversation, tìm theo 2 người tham gia
    if (!conversation) {
      if (!recipientId || !mongoose.Types.ObjectId.isValid(recipientId)) {
        return res.status(400).json({ message: "Mã người nhận không hợp lệ" });
      }

      const senderObjId = new mongoose.Types.ObjectId(senderId);
      const recipientObjId = new mongoose.Types.ObjectId(recipientId);

      if (senderObjId.toString() === recipientObjId.toString()) {
        return res.status(400).json({ message: "Không thể tự gửi tin nhắn cho chính mình" });
      }

      conversation = await Conversation.findOne({
        type: "direct",
        "participants.userId": { $all: [senderObjId, recipientObjId] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          type: "direct",
          participants: [
            { userId: senderId, joinedAt: new Date() },
            { userId: recipientId, joinedAt: new Date() },
          ],
          lastMessageAt: new Date(),
          unreadCounts: new Map(),
        });
      }
    }

    // 4. Tạo tin nhắn mã hóa AES-256-GCM bảo vệ quyền riêng tư tuyệt đối tại chỗ (Data at rest)
    const encryptedContent = encryptText(finalContent);
    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content: encryptedContent,
      imgURL: cleanImgURL || undefined,
      audioURL: cleanAudioURL || undefined,
      audioDuration: safeAudioDuration || undefined,
      replyTo: cleanReplyTo || undefined,
    });

    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();

    // 5. Lấy danh sách ID các thành viên để chỉ phát cho đúng người trong cuộc trò chuyện
    const participantIds = conversation.participants.map((p) => p.userId.toString());

    const deliveredMessage = {
      ...message.toObject(),
      content: finalContent, // Gửi nội dung đã giải mã cho người tham gia
      replyTo: cleanReplyTo || undefined,
      audioURL: cleanAudioURL || undefined,
      audioDuration: safeAudioDuration || undefined,
    };

    chatEmitter.emit("new_message", {
      conversationId: conversation._id.toString(),
      message: deliveredMessage,
      sender: {
        _id: senderId,
        displayName: req.user.displayName,
        avatarUrl: req.user.avatarUrl,
      },
      participantIds,
    });

    return res.status(201).json({ message: deliveredMessage });
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn trực tiếp:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi gửi tin nhắn" });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { conversationId, content, imgURL, replyTo, audioURL, audioDuration } = req.body;
    const senderId = req.user._id;

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: "Mã nhóm không hợp lệ" });
    }

    const cleanContent = typeof content === "string" ? content.trim() : "";
    const cleanImgURL = typeof imgURL === "string" ? imgURL.trim() : "";
    const cleanAudioURL = typeof audioURL === "string" ? audioURL.trim() : "";
    const safeAudioDuration = typeof audioDuration === "number" ? Math.round(audioDuration) : 0;
    const cleanReplyTo = sanitizeReplyTo(replyTo);

    if (!cleanContent && !cleanImgURL && !cleanAudioURL) {
      return res.status(400).json({ message: "Vui lòng nhập nội dung, chọn nhãn dán hoặc gửi ghi âm" });
    }

    if (cleanContent.length > 3000) {
      return res.status(400).json({ message: "Nội dung tin nhắn tối đa 3000 ký tự" });
    }

    const finalContent = cleanContent || (cleanAudioURL ? "[Tin nhắn thoại]" : "[Nhãn dán]");

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Nhóm trò chuyện không tồn tại" });
    }

    // KIỂM SOÁT QUYỀN TRUY CẬP: Phải là thành viên nhóm
    const isMember = conversation.participants.some(
      (p) => p.userId.toString() === senderId.toString()
    );
    if (!isMember) {
      return res.status(403).json({ message: "Bạn không phải thành viên của nhóm này" });
    }

    const encryptedContent = encryptText(finalContent);
    const message = await Message.create({
      conversationId,
      senderId,
      content: encryptedContent,
      imgURL: cleanImgURL || undefined,
      audioURL: cleanAudioURL || undefined,
      audioDuration: safeAudioDuration || undefined,
      replyTo: cleanReplyTo || undefined,
    });

    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();

    // CHỈ PHÁT CHO THÀNH VIÊN NHÓM
    const participantIds = conversation.participants.map((p) => p.userId.toString());

    const deliveredMessage = {
      ...message.toObject(),
      content: finalContent,
      replyTo: cleanReplyTo || undefined,
      audioURL: cleanAudioURL || undefined,
      audioDuration: safeAudioDuration || undefined,
    };

    chatEmitter.emit("new_message", {
      conversationId: conversation._id.toString(),
      message: deliveredMessage,
      sender: {
        _id: senderId,
        displayName: req.user.displayName,
        avatarUrl: req.user.avatarUrl,
      },
      participantIds,
    });

    return res.status(201).json({ message: deliveredMessage });
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn nhóm:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi gửi tin nhắn nhóm" });
  }
};

// 3. THẢ REACT ICON / CẢM XÚC TRÊN TIN NHẮN (❤️, 👍, 😂, 😮, 😢, 🔥)
export const toggleMessageReaction = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { emoji } = req.body;
    const userId = req.user._id.toString();

    if (!messageId || !mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ message: "Mã tin nhắn không hợp lệ" });
    }

    if (!emoji || typeof emoji !== "string" || !emoji.trim()) {
      return res.status(400).json({ message: "Vui lòng chọn biểu tượng cảm xúc hợp lệ" });
    }

    const cleanEmoji = emoji.trim().slice(0, 10);

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Không tìm thấy tin nhắn" });
    }

    // Kiểm tra quyền thành viên trong cuộc trò chuyện
    const conversation = await Conversation.findById(message.conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Cuộc trò chuyện không tồn tại" });
    }

    const isMember = conversation.participants.some(
      (p) => p.userId.toString() === userId
    );
    if (!isMember) {
      return res.status(403).json({ message: "Bạn không có quyền tương tác với tin nhắn này" });
    }

    if (!Array.isArray(message.reactions)) {
      message.reactions = [];
    }

    const existingIndex = message.reactions.findIndex(
      (r) => r.userId.toString() === userId
    );

    if (existingIndex > -1) {
      if (message.reactions[existingIndex].emoji === cleanEmoji) {
        // Hủy cảm xúc nếu bấm lại cùng 1 emoji (Toggle Off)
        message.reactions.splice(existingIndex, 1);
      } else {
        // Đổi biểu tượng cảm xúc khác
        message.reactions[existingIndex].emoji = cleanEmoji;
        message.reactions[existingIndex].createdAt = new Date();
      }
    } else {
      // Thêm cảm xúc mới
      message.reactions.push({
        userId,
        emoji: cleanEmoji,
        createdAt: new Date(),
      });
    }

    await message.save();
    await message.populate("reactions.userId", "_id displayName avatarUrl username");

    const participantIds = conversation.participants.map((p) => p.userId.toString());

    // Phát sự kiện real-time cập nhật reaction tin nhắn cho mọi thành viên
    chatEmitter.emit("message_reaction", {
      conversationId: message.conversationId.toString(),
      messageId: message._id.toString(),
      reactions: message.reactions,
      participantIds,
    });

    return res.status(200).json({
      message: "Đã cập nhật cảm xúc tin nhắn",
      messageId: message._id,
      reactions: message.reactions,
    });
  } catch (error) {
    console.error("Lỗi khi thả react tin nhắn:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi tương tác tin nhắn" });
  }
};

// 4. THU HỒI / UN-SEND TIN NHẮN (Chỉ người gửi mới có quyền thu hồi)
export const recallMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id.toString();

    if (!messageId || !mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ message: "Mã tin nhắn không hợp lệ" });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Không tìm thấy tin nhắn" });
    }

    // BẢO MẬT: Chỉ chính người gửi tin nhắn mới được phép thu hồi (Chống IDOR)
    if (message.senderId.toString() !== userId) {
      return res.status(403).json({ message: "Bạn chỉ có thể thu hồi tin nhắn do chính mình gửi" });
    }

    if (message.isRecalled) {
      return res.status(400).json({ message: "Tin nhắn này đã được thu hồi trước đó" });
    }

    message.isRecalled = true;
    message.recalledAt = new Date();
    message.imgURL = undefined;
    message.reactions = []; // Xóa reaction khi thu hồi
    await message.save();

    const conversation = await Conversation.findById(message.conversationId);
    if (conversation && conversation.lastMessage?._id?.toString() === message._id.toString()) {
      conversation.lastMessage.content = "Tin nhắn đã được thu hồi";
      await conversation.save();
    }

    const participantIds = conversation
      ? conversation.participants.map((p) => p.userId.toString())
      : [];

    // Phát sự kiện real-time thu hồi tin nhắn
    chatEmitter.emit("message_recalled", {
      conversationId: message.conversationId.toString(),
      messageId: message._id.toString(),
      recalledAt: message.recalledAt,
      participantIds,
    });

    return res.status(200).json({
      message: "Đã thu hồi tin nhắn thành công",
      messageId: message._id,
      isRecalled: true,
      recalledAt: message.recalledAt,
    });
  } catch (error) {
    console.error("Lỗi khi thu hồi tin nhắn:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi thu hồi tin nhắn" });
  }
};

export const setTypingStatus = async (req, res) => {
  try {
    const { conversationId, isTyping } = req.body;
    const userId = req.user._id.toString();

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: "Mã cuộc trò chuyện không hợp lệ" });
    }

    const conversation = await Conversation.findById(conversationId).select("participants");
    if (!conversation) {
      return res.status(404).json({ message: "Cuộc trò chuyện không tồn tại" });
    }

    const participantIds = conversation.participants.map((p) => p.userId.toString());
    if (!participantIds.includes(userId)) {
      return res.status(403).json({ message: "Không có quyền" });
    }

    chatEmitter.emit("typing", {
      conversationId,
      userId,
      displayName: req.user.displayName,
      isTyping: Boolean(isTyping),
      participantIds,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái typing:", error);
    return res.status(500).json({ message: "Lỗi hệ thống typing" });
  }
};
