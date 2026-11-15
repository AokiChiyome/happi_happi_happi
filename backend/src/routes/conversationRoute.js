import express from "express";
import {
  createConversation,
  getConversations,
  getMessage,
  markAsSeen,
  pinMessage,
  unpinMessage,
} from "../controllers/conversationController.js";
import { CheckFriendship } from "../middlewares/friendmiddleware.js";

const router = express.Router();

router.post("/", CheckFriendship, createConversation);
router.get("/", getConversations);
router.get("/:conversationId/messages", getMessage);
router.patch("/:conversationId/seen", markAsSeen);
router.post("/:conversationId/pin", pinMessage);
router.delete("/:conversationId/pin", unpinMessage);

export default router;
