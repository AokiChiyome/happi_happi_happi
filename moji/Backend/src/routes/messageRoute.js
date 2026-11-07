import express from "express";

import {
  sendDirectMessage,
  sendGroupMessage,
} from "../controllers/messageController.js";
import {
  CheckFriendship,
  CheckGroupMembership,
} from "../middlewares/friendmiddleware.js";

const router = express.Router();

router.post("/direct", CheckFriendship, sendDirectMessage);
router.post("/group", CheckGroupMembership, sendGroupMessage);
export default router;
