import express from "express";
import {
  sendDirectMessage,
  sendGroupMessage,
  setTypingStatus,
  toggleMessageReaction,
  recallMessage,
} from "../controllers/messageController.js";
import {
  CheckFriendship,
  CheckGroupMembership,
} from "../middlewares/friendmiddleware.js";
import { streamMessages } from "../controllers/coupleController.js";
import { rateLimit } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Giới hạn tốc độ gửi tin nhắn chống Flood DoS / Spambot (tối đa 60 tin/phút)
const messageSendLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: "Bạn đang gửi tin nhắn quá nhanh. Hãy chờ giây lát nhé! 💕",
});

const reactionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  message: "Thao tác cảm xúc quá nhanh. Hãy chờ giây lát nhé! ✨",
});

router.get("/stream", streamMessages);
router.post("/direct", messageSendLimiter, CheckFriendship, sendDirectMessage);
router.post("/group", messageSendLimiter, CheckGroupMembership, sendGroupMessage);
router.post("/typing", setTypingStatus);

// Tương tác Reaction & Thu hồi tin nhắn
router.post("/:messageId/reaction", reactionLimiter, toggleMessageReaction);
router.patch("/:messageId/recall", recallMessage);

export default router;
