import Conversation from "../models/Conversation.js";
import Friend from "../models/Friend.js";

const pair = (a, b) => (a < b ? [a, b] : [b, a]);
export const CheckFriendship = async (req, res, next) => {
  try {
    const me = req.user._id.toString();
    const recipientId = req.body?.recipientId ?? null;
    const memberIds = req.body?.memberIds ?? [];
    if (!recipientId && memberIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Thiếu recipientId hoặc memberIds" });
    }
    if (recipientId) {
      const [userA, userB] = pair(me, recipientId);
      const isFriend = await Friend.findOne({ userA, userB });
      if (!isFriend) {
        return res
          .status(403)
          .json({ message: "Bạn chưa kết bạn với người này" });
      }
      return next();
    }
    //todo: chat nhóm

    const friendChecks = memberIds.map(async (memberId) => {
      const [userA, userB] = pair(me, memberId);
      const friend = await Friend.findOne({ userA, userB });
      return friend ? null : memberId;
    });
    const results = await Promise.all(friendChecks);
    const notFriends = results.filter(Boolean);
    if (notFriends.length > 0) {
      return res.status(403).json({
        message: "bạn chỉ có thể thêm bạn bè vào nhóm",
        notFriends,
      });
    }
    next();
  } catch (error) {
    console.error("Lỗi khi kiểm tra trạng thái bạn bè", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
export const CheckGroupMembership = async (req, res, next) => {
  try {
    const { conversationId } = req.body;
    const userId = req.user._id;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Cuộc trò chuyện không tồn tại" });
    }
    const isMember = conversation.participants.some(
      (p) => p.userId.toString() === userId.toString(),
    );
    if (!isMember) {
      return res
        .status(403)
        .json({ message: "Bạn không phải là thành viên của nhóm này" });
    }
    req.conversation = conversation; // Lưu thông tin cuộc trò chuyện vào req để sử dụng trong controller
    next();
  } catch (error) {
    console.error("Lỗi khi kiểm tra thành viên nhóm", error);
    return res.status(500).json({ message: "Lỗi hệ thống1" });
  }
};
