import Friend from "../models/Friend.js";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
import Conversation from "../models/Conversation.js";
import { chatEmitter } from "../libs/eventBus.js";
import mongoose from "mongoose";

const pair = (a, b) => (a < b ? [a, b] : [b, a]);

export const sendFriendrequest = async (req, res) => {
  try {
    const { to, message } = req.body;
    const fromId = req.user._id;

    if (!to || typeof to !== "string" || !to.trim()) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập tên đăng nhập của bạn bè" });
    }

    const cleanInput = to.trim();

    // Tìm kiếm người dùng: có thể là ObjectId hoặc username
    let targetUser = null;
    if (mongoose.Types.ObjectId.isValid(cleanInput) && cleanInput.length === 24) {
      targetUser = await User.findById(cleanInput);
    }
    if (!targetUser) {
      targetUser = await User.findOne({ username: cleanInput.toLowerCase() });
    }

    if (!targetUser) {
      return res.status(404).json({
        message: `Không tìm thấy tài khoản "${cleanInput}". Bạn hãy kiểm tra lại tên đăng nhập nhé! 🐰`,
      });
    }

    const toId = targetUser._id;

    if (fromId.toString() === toId.toString()) {
      return res
        .status(400)
        .json({ message: "Bạn không thể gửi lời mời kết bạn cho chính mình nha!" });
    }

    const [userA, userB] = pair(fromId.toString(), toId.toString());

    const [alreadyFriends, existingRequest] = await Promise.all([
      Friend.findOne({ userA, userB }),
      FriendRequest.findOne({
        $or: [
          { from: fromId, to: toId },
          { from: toId, to: fromId },
        ],
      }),
    ]);

    if (alreadyFriends) {
      return res
        .status(400)
        .json({ message: "Hai bạn đã là bạn bè của nhau rồi nè! 💕" });
    }

    if (existingRequest) {
      if (existingRequest.from.toString() === fromId.toString()) {
        return res.status(400).json({
          message:
            "Bạn đã gửi lời mời kết bạn trước đó rồi, hãy chờ người ấy đồng ý nhé!",
        });
      } else {
        return res.status(400).json({
          message:
            "Người ấy đã gửi lời mời kết bạn cho bạn rồi! Hãy vào tab 'Lời Mời Đã Nhận' để đồng ý nhé 💕",
        });
      }
    }

    const request = await FriendRequest.create({
      from: fromId,
      to: toId,
      Message: message || "",
    });

    const populatedRequest = await FriendRequest.findById(request._id)
      .populate("from", "_id username displayName avatarUrl")
      .populate("to", "_id username displayName avatarUrl");

    // Phát sự kiện real-time thông báo cho người nhận nếu họ đang online
    chatEmitter.emit("new_friend_request", {
      request: populatedRequest,
      toUserId: toId.toString(),
    });

    return res.status(200).json({
      message: `Đã gửi lời mời kết bạn đến "${targetUser.displayName || targetUser.username}" thành công! ✨`,
      request: populatedRequest,
    });
  } catch (error) {
    console.error("Lỗi khi thêm bạn bè:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi gửi lời mời kết bạn" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res
        .status(404)
        .json({ message: "Yêu cầu kết bạn không tồn tại hoặc đã được xử lý" });
    }

    if (request.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Không có quyền chấp nhận yêu cầu này" });
    }

    const [userA, userB] = pair(request.from.toString(), request.to.toString());

    await Friend.findOneAndUpdate(
      { userA, userB },
      { userA, userB },
      { upsert: true, new: true }
    );
    await FriendRequest.findByIdAndDelete(requestId);

    // Tự động tìm hoặc tạo cuộc trò chuyện 1-1 để 2 người có thể chat ngay lập tức!
    const userAObj = new mongoose.Types.ObjectId(userA);
    const userBObj = new mongoose.Types.ObjectId(userB);

    let conversation = await Conversation.findOne({
      type: "direct",
      "participants.userId": { $all: [userAObj, userBObj] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        type: "direct",
        participants: [
          { userId: userAObj, joinedAt: new Date() },
          { userId: userBObj, joinedAt: new Date() },
        ],
        lastMessageAt: new Date(),
        unreadCounts: new Map(),
      });
    }

    const fromUser = await User.findById(request.from)
      .select("_id username displayName avatarUrl")
      .lean();

    // Phát sự kiện real-time để cả 2 bên cập nhật bạn bè & phòng chat ngay
    chatEmitter.emit("friend_request_accepted", {
      userA,
      userB,
      conversationId: conversation._id,
    });

    return res.status(200).json({
      message: "Đã chấp nhận yêu cầu kết bạn! Giờ hai bạn đã có thể trò chuyện cùng nhau 💕",
      newFriend: {
        _id: fromUser?._id,
        displayName: fromUser?.displayName,
        avatarUrl: fromUser?.avatarUrl,
      },
      conversationId: conversation._id,
    });
  } catch (error) {
    console.error("Lỗi khi chấp nhận yêu cầu kết bạn:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi chấp nhận kết bạn" });
  }
};

export const declineFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res
        .status(404)
        .json({ message: "Yêu cầu kết bạn không tồn tại hoặc đã được xử lý" });
    }
    if (request.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Không có quyền từ chối yêu cầu này" });
    }

    await FriendRequest.findByIdAndDelete(requestId);

    return res.status(200).json({ message: "Đã từ chối yêu cầu kết bạn" });
  } catch (error) {
    console.error("Lỗi khi từ chối yêu cầu kết bạn:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getAllFriend = async (req, res) => {
  try {
    const userId = req.user._id;

    const friendships = await Friend.find({
      $or: [{ userA: userId }, { userB: userId }],
    })
      .populate("userA", "_id username displayName avatarUrl")
      .populate("userB", "_id username displayName avatarUrl")
      .lean();

    if (!friendships) {
      return res.status(200).json({ friends: [] });
    }
    const friends = friendships.map((f) =>
      f.userA._id.toString() === userId.toString() ? f.userB : f.userA
    );
    return res.status(200).json({ friends });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bạn bè:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const populateFields = "_id username displayName avatarUrl";
    const [sent, received] = await Promise.all([
      FriendRequest.find({ from: userId }).populate("to", populateFields),
      FriendRequest.find({ to: userId }).populate("from", populateFields),
    ]);
    return res.status(200).json({ sent, received });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách yêu cầu kết bạn:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
