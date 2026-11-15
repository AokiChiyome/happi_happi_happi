import express from "express";
import {
  sendDirectMessage,
  sendGroupMessage,
  setTypingStatus,
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

router.get("/stream", streamMessages);
router.post("/direct", messageSendLimiter, CheckFriendship, sendDirectMessage);
router.post("/group", messageSendLimiter, CheckGroupMembership, sendGroupMessage);
router.post("/typing", setTypingStatus);

export default router;
