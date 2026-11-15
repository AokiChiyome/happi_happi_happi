import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { updateconversationAfterCreateMessage } from "../utils/messageHelper.js";
import { chatEmitter } from "../libs/eventBus.js";
import { encryptText } from "../utils/cryptoHelper.js";
import mongoose from "mongoose";

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId, imgURL } = req.body;
    const senderId = req.user._id;

    const cleanContent = typeof content === "string" ? content.trim() : "";
    const cleanImgURL = typeof imgURL === "string" ? imgURL.trim() : "";

    // 1. Kiểm tra tính hợp lệ của nội dung tin nhắn hoặc hình ảnh/nhãn dán
    if (!cleanContent && !cleanImgURL) {
      return res.status(400).json({ message: "Vui lòng nhập nội dung hoặc chọn nhãn dán" });
    }

    if (cleanContent.length > 3000) {
      return res.status(400).json({ message: "Nội dung tin nhắn tối đa 3000 ký tự" });
    }

    const finalContent = cleanContent || "[Nhãn dán]";

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
    });

    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();

    // 5. Lấy danh sách ID các thành viên để chỉ phát cho đúng người trong cuộc trò chuyện (CHỐNG LỘ DỮ LIỆU)
    const participantIds = conversation.participants.map((p) => p.userId.toString());

    const deliveredMessage = {
      ...message.toObject(),
      content: finalContent, // Gửi nội dung đã giải mã cho người tham gia
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
    const { conversationId, content, imgURL } = req.body;
    const senderId = req.user._id;

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: "Mã nhóm không hợp lệ" });
    }

    const cleanContent = typeof content === "string" ? content.trim() : "";
    const cleanImgURL = typeof imgURL === "string" ? imgURL.trim() : "";

    if (!cleanContent && !cleanImgURL) {
      return res.status(400).json({ message: "Vui lòng nhập nội dung hoặc chọn nhãn dán" });
    }

    if (cleanContent.length > 3000) {
      return res.status(400).json({ message: "Nội dung tin nhắn tối đa 3000 ký tự" });
    }

    const finalContent = cleanContent || "[Nhãn dán]";

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
    });

    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();

    // CHỈ PHÁT CHO THÀNH VIÊN NHÓM
    const participantIds = conversation.participants.map((p) => p.userId.toString());

    const deliveredMessage = {
      ...message.toObject(),
      content: finalContent,
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
