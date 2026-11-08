import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { updateconversationAfterCreateMessage } from "../utils/messageHelper.js";
import { chatEmitter } from "../libs/eventBus.js";
import mongoose from "mongoose";

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user._id;
    let conversation;

    if (!content) {
      return res.status(400).json({ error: "thiếu nội dung" });
    }

    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    }

    if (!conversation) {
      const senderObjId = new mongoose.Types.ObjectId(senderId);
      const recipientObjId = new mongoose.Types.ObjectId(recipientId);

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

    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content,
    });

    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();

    // Phát sự kiện real-time
    chatEmitter.emit("new_message", {
      conversationId: conversation._id.toString(),
      message,
      sender: { _id: senderId, displayName: req.user.displayName },
    });

    return res.status(201).json({ message });
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn trực tiếp", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;
    const senderId = req.user._id;
    const conversation = await Conversation.findById(conversationId);
    if (!content) {
      return res.status(400).json({ error: "thiếu nội dung" });
    }
    const message = await Message.create({
      conversationId,
      senderId,
      content,
    });
    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();

    chatEmitter.emit("new_message", {
      conversationId: conversation._id.toString(),
      message,
      sender: { _id: senderId, displayName: req.user.displayName },
    });

    return res.status(201).json({ message });
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn nhóm", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
