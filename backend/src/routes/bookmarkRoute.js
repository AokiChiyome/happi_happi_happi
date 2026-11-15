import express from "express";
import {
  getBookmarks,
  createBookmark,
  deleteBookmark,
} from "../controllers/bookmarkController.js";

const router = express.Router();

router.get("/", getBookmarks);
router.post("/", createBookmark);
router.delete("/:bookmarkId", deleteBookmark);

export default router;
