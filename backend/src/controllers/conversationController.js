import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import mongoose from "mongoose";

export const createConversation = async (req, res) => {
  try {
    const { type, name, memberIds } = req.body;
    const userId = req.user._id;

    if (
      !type ||
      !["direct", "group"].includes(type) ||
      (type === "group" && (!name || typeof name !== "string" || !name.trim())) ||
      !memberIds ||
      !Array.isArray(memberIds) ||
      memberIds.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Thông tin loại cuộc trò chuyện và danh sách thành viên không hợp lệ" });
    }

    let conversation;

    if (type === "direct") {
      const participantId = memberIds[0];

      if (!mongoose.Types.ObjectId.isValid(participantId)) {
        return res.status(400).json({ message: "ID thành viên không hợp lệ" });
      }

      const userObjId = new mongoose.Types.ObjectId(userId);
      const participantObjId = new mongoose.Types.ObjectId(participantId);

      if (userObjId.toString() === participantObjId.toString()) {
        return res.status(400).json({ message: "Không thể tạo cuộc trò chuyện với chính mình" });
      }

      // Sử dụng findOneAndUpdate với upsert để tránh trùng lặp
      conversation = await Conversation.findOneAndUpdate(
        {
          type: "direct",
          "participants.userId": { $all: [userObjId, participantObjId] },
        },
        {
          $setOnInsert: {
            type: "direct",
            participants: [{ userId: userObjId }, { userId: participantObjId }],
            lastMessageAt: new Date(),
            unreadCounts: new Map(),
          },
        },
        {
          upsert: true,
          new: true,
        }
      );
    }

    if (type === "group") {
      const cleanName = name.trim().slice(0, 80);
      const validMemberIds = memberIds
        .filter((id) => mongoose.Types.ObjectId.isValid(id) && id.toString() !== userId.toString())
        .map((id) => new mongoose.Types.ObjectId(id));

      conversation = new Conversation({
        type: "group",
        participants: [
          { userId },
          ...validMemberIds.map((id) => ({ userId: id })),
        ],
        group: {
          name: cleanName,
          createdBy: userId,
        },
        lastMessageAt: new Date(),
        unreadCounts: new Map(),
      });

      await conversation.save();
    }

    if (!conversation) {
      return res
        .status(400)
        .json({ message: "Không thể khởi tạo cuộc trò chuyện" });
    }

    await conversation.populate([
      { path: "participants.userId", select: "displayName avatarUrl username" },
      { path: "seenBy", select: "displayName avatarUrl username" },
      { path: "lastMessage.senderId", select: "displayName avatarUrl username" },
    ]);

    const participants = (conversation.participants || []).map((p) => ({
      _id: p.userId?._id,
      displayName: p.userId?.displayName,
      username: p.userId?.username,
      avatarUrl: p.userId?.avatarUrl ?? null,
      joinedAt: p.joinedAt,
    }));

    const formatted = { ...conversation.toObject(), participants };

    return res.status(201).json({ conversation: formatted });
  } catch (error) {
    console.error("Lỗi khi tạo conversation:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi tạo cuộc trò chuyện" });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Chỉ lấy những cuộc trò chuyện mà user hiện tại thực sự là thành viên
    const conversations = await Conversation.find({
      "participants.userId": userId,
    })
      .sort({ lastMessageAt: -1, updatedAt: -1 })
      .populate({
        path: "participants.userId",
        select: "displayName avatarUrl username",
      })
      .populate({
        path: "lastMessage.senderId",
        select: "displayName avatarUrl username",
      })
      .populate({
        path: "seenBy",
        select: "displayName avatarUrl username",
      });

    const formatted = conversations.map((convo) => {
      const participants = (convo.participants || []).map((p) => ({
        _id: p.userId?._id,
        displayName: p.userId?.displayName,
        username: p.userId?.username,
        avatarUrl: p.userId?.avatarUrl ?? null,
        joinedAt: p.joinedAt,
      }));

      return {
        ...convo.toObject(),
        unreadCounts: convo.unreadCounts || {},
        participants,
      };
    });

    return res.status(200).json({ conversations: formatted });
  } catch (error) {
    console.error("Lỗi xảy ra khi lấy conversations:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { limit = 50, cursor } = req.query;
    const userId = req.user._id;

    // 1. Kiểm tra tính hợp lệ của conversationId
    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: "Mã cuộc trò chuyện không hợp lệ" });
    }

    // 2. KIỂM SOÁT QUYỀN TRUY CẬP (BAC): Phải là thành viên mới được xem tin nhắn!
    const conversation = await Conversation.findOne({
      _id: conversationId,
      "participants.userId": userId,
    });

    if (!conversation) {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập hoặc xem tin nhắn của cuộc trò chuyện này",
      });
    }

    // 3. Giới hạn limit an toàn (chống DoS tải hàng triệu tin nhắn một lúc)
    const safeLimit = Math.min(Math.max(1, Number(limit) || 50), 100);

    const query = { conversationId };

    if (cursor) {
      const cursorDate = new Date(cursor);
      if (!isNaN(cursorDate.getTime())) {
        query.createdAt = { $lt: cursorDate };
      }
    }

    let messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(safeLimit + 1);

    let nextCursor = null;

    if (messages.length > safeLimit) {
      const nextMessage = messages[messages.length - 1];
      nextCursor = nextMessage.createdAt.toISOString();
      messages.pop();
    }

    messages = messages.reverse();

    return res.status(200).json({
      messages,
      nextCursor,
    });
  } catch (error) {
    console.error("Lỗi xảy ra khi lấy messages:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const markAsSeen = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id.toString();

    // 1. Kiểm tra tính hợp lệ của conversationId
    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: "Mã cuộc trò chuyện không hợp lệ" });
    }

    const conversation = await Conversation.findById(conversationId).lean();

    if (!conversation) {
      return res.status(404).json({ message: "Cuộc trò chuyện không tồn tại" });
    }

    // 2. KIỂM SOÁT QUYỀN TRUY CẬP: Phải là thành viên mới được mark as seen
    const isMember = conversation.participants?.some(
      (p) => p.userId?.toString() === userId
    );

    if (!isMember) {
      return res.status(403).json({ message: "Bạn không phải thành viên của cuộc trò chuyện này" });
    }

    const last = conversation.lastMessage;

    if (!last) {
      return res
        .status(200)
        .json({ message: "Không có tin nhắn để đánh dấu đã đọc" });
    }

    if (last.senderId && last.senderId.toString() === userId) {
      return res.status(200).json({ message: "Người gửi không cần đánh dấu đã đọc" });
    }

    const updated = await Conversation.findByIdAndUpdate(
      conversationId,
      {
        $addToSet: { seenBy: new mongoose.Types.ObjectId(userId) },
        $set: { [`unreadCounts.${userId}`]: 0 },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Đã đánh dấu đã đọc",
      seenBy: updated?.seenBy || [],
      myUnreadCount: updated?.unreadCounts?.[userId] || 0,
    });
  } catch (error) {
    console.error("Lỗi khi mark as seen:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
