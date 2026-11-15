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

const router = express.Router();

router.get("/stream", streamMessages);
router.post("/direct", CheckFriendship, sendDirectMessage);
router.post("/group", CheckGroupMembership, sendGroupMessage);
router.post("/typing", setTypingStatus);

export default router;
