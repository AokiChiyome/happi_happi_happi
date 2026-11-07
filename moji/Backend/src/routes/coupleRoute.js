import express from "express";
import {
  getPartner,
  connectPartner,
  shareDish,
  streamMessages,
} from "../controllers/coupleController.js";

const router = express.Router();

router.get("/partner", getPartner);
router.post("/connect", connectPartner);
router.post("/share-dish", shareDish);
router.get("/stream", streamMessages);

export default router;
