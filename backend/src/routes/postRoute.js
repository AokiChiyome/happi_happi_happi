import express from "express";
import {
  getCoupleFeed,
  createPost,
  toggleReaction,
  getComments,
  createComment,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/feed", getCoupleFeed);
router.post("/", createPost);
router.delete("/:postId", deletePost);

router.post("/:postId/reactions", toggleReaction);

router.get("/:postId/comments", getComments);
router.post("/:postId/comments", createComment);

export default router;
