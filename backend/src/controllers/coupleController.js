import User from "../models/User.js";
import Friend from "../models/Friend.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { updateconversationAfterCreateMessage } from "../utils/messageHelper.js";
import { chatEmitter } from "../libs/eventBus.js";
import mongoose from "mongoose";

const pair = (a, b) => (a < b ? [a, b] : [b, a]);

export const getPartner = async (req, res) => {
  try {
    const userId = req.user._id;

    const friendship = await Friend.findOne({
      $or: [{ userA: userId }, { userB: userId }],
    })
      .populate("userA", "_id username displayName avatarUrl")
      .populate("userB", "_id username displayName avatarUrl");

    if (!friendship) {
      return res.status(200).json({ hasPartner: false });
    }

    const partner =
      friendship.userA._id.toString() === userId.toString()
        ? friendship.userB
        : friendship.userA;

    // Tìm cuộc trò chuyện
    const userObjId = new mongoose.Types.ObjectId(userId);
    const partnerObjId = new mongoose.Types.ObjectId(partner._id);

    let conversation = await Conversation.findOne({
      type: "direct",
      "participants.userId": { $all: [userObjId, partnerObjId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        type: "direct",
        participants: [
          { userId, joinedAt: new Date() },
          { userId: partner._id, joinedAt: new Date() },
        ],
        lastMessageAt: new Date(),
        unreadCounts: new Map(),
      });
    }

    return res.status(200).json({
      hasPartner: true,
      partner: {
        _id: partner._id,
        username: partner.username,
        displayName: partner.displayName,
        avatarUrl: partner.avatarUrl,
      },
      conversationId: conversation._id,
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người yêu:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi tìm người yêu" });
  }
};

export const connectPartner = async (req, res) => {
  try {
    const { partnerUsername } = req.body;
    const userId = req.user._id;

    if (!partnerUsername) {
      return res.status(400).json({ message: "Vui lòng nhập username của người yêu." });
    }

    const cleanUsername = partnerUsername.trim().toLowerCase();

    const partner = await User.findOne({ username: cleanUsername });
    if (!partner) {
      return res.status(404).json({
        message: `Không tìm thấy tài khoản "${cleanUsername}". Hãy bảo người yêu đăng ký trước nhé! 🐰`,
      });
    }

    if (partner._id.toString() === userId.toString()) {
      return res.status(400).json({ message: "Bạn không thể tự kết nối với chính mình nha!" });
    }

    // Kết nối bạn bè / cặp đôi
    const [userA, userB] = pair(userId.toString(), partner._id.toString());
    await Friend.findOneAndUpdate(
      { userA, userB },
      { userA, userB },
      { upsert: true, new: true }
    );

    // Tạo hoặc tìm cuộc trò chuyện direct
    const userObjId = new mongoose.Types.ObjectId(userId);
    const partnerObjId = new mongoose.Types.ObjectId(partner._id);

    let conversation = await Conversation.findOne({
      type: "direct",
      "participants.userId": { $all: [userObjId, partnerObjId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        type: "direct",
        participants: [
          { userId, joinedAt: new Date() },
          { userId: partner._id, joinedAt: new Date() },
        ],
        lastMessageAt: new Date(),
        unreadCounts: new Map(),
      });
    }

    // Gửi tin nhắn chào mừng tự động
    const welcomeMsg = await Message.create({
      conversationId: conversation._id,
      senderId: userId,
      content: `🎉 Chúng mình đã kết nối thành công trên "Hôm nay em muốn ăn gì?" rồi nè! 💖`,
    });

    updateconversationAfterCreateMessage(conversation, welcomeMsg, userId);
    await conversation.save();

    const participantIds = conversation.participants.map((p) => p.userId.toString());

    chatEmitter.emit("new_message", {
      conversationId: conversation._id.toString(),
      message: welcomeMsg,
      sender: { _id: req.user._id, displayName: req.user.displayName },
      participantIds,
    });

    return res.status(200).json({
      message: `Đã kết nối với ${partner.displayName} thành công! 💖`,
      partner: {
        _id: partner._id,
        username: partner.username,
        displayName: partner.displayName,
        avatarUrl: partner.avatarUrl,
      },
      conversationId: conversation._id,
    });
  } catch (error) {
    console.error("Lỗi khi kết nối người yêu:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi kết nối" });
  }
};

export const shareDish = async (req, res) => {
  try {
    const { dishName, categoryName, conversationId, note } = req.body;
    const senderId = req.user._id;

    if (!dishName || typeof dishName !== "string" || !conversationId) {
      return res.status(400).json({ message: "Thiếu tên món hoặc mã cuộc trò chuyện" });
    }

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: "Mã cuộc trò chuyện không hợp lệ" });
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Không tìm thấy cuộc trò chuyện" });
    }

    // KIỂM SOÁT QUYỀN TRUY CẬP: Phải là thành viên mới được chia sẻ món ăn vào chat
    const isParticipant = conversation.participants.some(
      (p) => p.userId.toString() === senderId.toString()
    );
    if (!isParticipant) {
      return res.status(403).json({
        message: "Bạn không phải thành viên của cuộc trò chuyện này",
      });
    }

    const cleanDish = dishName.trim().slice(0, 100);
    const cleanCategory = (categoryName || "Món ngon").trim().slice(0, 50);
    const cleanNote = note && typeof note === "string" ? note.trim().slice(0, 300) : "";

    const content = `🍽️ [Gợi ý món ăn]: **${cleanDish}** (${cleanCategory})${
      cleanNote ? `\n💌 Lời nhắn: ${cleanNote}` : ""
    }`;

    const message = await Message.create({
      conversationId,
      senderId,
      content,
    });

    updateconversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();

    const participantIds = conversation.participants.map((p) => p.userId.toString());

    chatEmitter.emit("new_message", {
      conversationId: conversation._id.toString(),
      message,
      sender: { _id: senderId, displayName: req.user.displayName },
      participantIds,
    });

    return res.status(201).json({ message });
  } catch (error) {
    console.error("Lỗi khi chia sẻ món ăn:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi chia sẻ món" });
  }
};

export const streamMessages = (req, res) => {
  const userId = req.user._id.toString();

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders?.();

  // Gửi sự kiện kết nối ban đầu
  res.write(`data: ${JSON.stringify({ type: "connected", userId })}\n\n`);

  const onMessage = (data) => {
    try {
      // BẢO VỆ DỮ LIỆU: Chỉ gửi tin nhắn nếu user hiện tại thực sự là người nhận hoặc người gửi trong hội thoại!
      if (!data.participantIds || data.participantIds.includes(userId)) {
        res.write(`data: ${JSON.stringify({ type: "message", ...data })}\n\n`);
      }
    } catch (e) {
      console.error("Lỗi gửi qua SSE stream:", e);
    }
  };

  const onFriendRequest = (data) => {
    try {
      if (data.toUserId === userId) {
        res.write(`data: ${JSON.stringify({ type: "friend_request", ...data })}\n\n`);
      }
    } catch (e) {}
  };

  const onFriendAccepted = (data) => {
    try {
      if (data.userA === userId || data.userB === userId) {
        res.write(`data: ${JSON.stringify({ type: "friend_accepted", ...data })}\n\n`);
      }
    } catch (e) {}
  };

  chatEmitter.on("new_message", onMessage);
  chatEmitter.on("new_friend_request", onFriendRequest);
  chatEmitter.on("friend_request_accepted", onFriendAccepted);

  // Heartbeat định kỳ 20s để không bị ngắt kết nối
  const interval = setInterval(() => {
    try {
      res.write(`: ping\n\n`);
    } catch (e) {}
  }, 20000);

  req.on("close", () => {
    clearInterval(interval);
    chatEmitter.off("new_message", onMessage);
    chatEmitter.off("new_friend_request", onFriendRequest);
    chatEmitter.off("friend_request_accepted", onFriendAccepted);
  });
};
