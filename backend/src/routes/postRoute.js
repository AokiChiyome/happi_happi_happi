import express from "express";
import {
  getCoupleFeed,
  createPost,
  toggleReaction,
  getComments,
  createComment,
  deletePost,
} from "../controllers/postController.js";
import { rateLimit } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Giới hạn tần suất đăng bài và bình luận chống spam
const postLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: "Bạn đang đăng bài quá nhanh. Hãy chờ một chút nhé! 💕",
});

const commentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: "Bạn đang bình luận quá nhanh. Hãy chờ giây lát nhé! 💬",
});

router.get("/feed", getCoupleFeed);
router.post("/", postLimiter, createPost);
router.delete("/:postId", deletePost);

router.post("/:postId/reactions", toggleReaction);

router.get("/:postId/comments", getComments);
router.post("/:postId/comments", commentLimiter, createComment);

export default router;
