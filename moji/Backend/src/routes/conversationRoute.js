import express from "express";
import {
  createConversation,
  getConversations,
  getMessage,
  markAsSeen,
} from "../controllers/conversationController.js";
import { CheckFriendship } from "../middlewares/friendMiddleware.js";

const router = express.Router();

router.post("/", CheckFriendship, createConversation);
router.get("/", getConversations);
router.get("/:conversationId/messages", getMessage);
router.patch("/:conversationId/seen", markAsSeen);

export default router;
