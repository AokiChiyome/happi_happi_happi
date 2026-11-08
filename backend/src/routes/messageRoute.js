import express from "express";
import {
  sendDirectMessage,
  sendGroupMessage,
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

export default router;
