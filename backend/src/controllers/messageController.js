import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { updateconversationAfterCreateMessage } from "../utils/messageHelper.js";
import { chatEmitter } from "../libs/eventBus.js";
import mongoose from "mongoose";

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user._id;

    // 1. Kiểm tra tính hợp lệ của nội dung tin nhắn
    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ message: "Nội dung tin nhắn không được để trống" });
    }

    const cleanContent = content.trim();
    if (cleanContent.length > 3000) {
      return res.status(400).json({ message: "Nội dung tin nhắn tối đa 3000 ký tự" });
    }

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

    // 4. Tạo tin nhắn
    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content: cleanContent,
    });

    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();

    // 5. Lấy danh sách ID các thành viên để chỉ phát cho đúng người trong cuộc trò chuyện (CHỐNG LỘ DỮ LIỆU)
    const participantIds = conversation.participants.map((p) => p.userId.toString());

    chatEmitter.emit("new_message", {
      conversationId: conversation._id.toString(),
      message,
      sender: { _id: senderId, displayName: req.user.displayName },
      participantIds,
    });

    return res.status(201).json({ message });
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn trực tiếp:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi gửi tin nhắn" });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;
    const senderId = req.user._id;

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: "Mã nhóm không hợp lệ" });
    }

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ message: "Nội dung tin nhắn không được để trống" });
    }

    const cleanContent = content.trim();
    if (cleanContent.length > 3000) {
      return res.status(400).json({ message: "Nội dung tin nhắn tối đa 3000 ký tự" });
    }

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

    const message = await Message.create({
      conversationId,
      senderId,
      content: cleanContent,
    });

    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();

    // CHỈ PHÁT CHO THÀNH VIÊN NHÓM
    const participantIds = conversation.participants.map((p) => p.userId.toString());

    chatEmitter.emit("new_message", {
      conversationId: conversation._id.toString(),
      message,
      sender: { _id: senderId, displayName: req.user.displayName },
      participantIds,
    });

    return res.status(201).json({ message });
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn nhóm:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi gửi tin nhắn nhóm" });
  }
};
