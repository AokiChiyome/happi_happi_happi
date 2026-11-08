import express from "express";
import {
  refreshToken,
  signIn,
  signOut,
  signUp,
} from "../controllers/authController.js";
import { rateLimit } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Giới hạn tần suất để chống brute-force và spam tài khoản
const signinLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 phút
  max: 25,
  message: "Bạn đã thử đăng nhập quá nhiều lần. Vui lòng chờ 5 phút trước khi thử lại nhé!",
});

const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 10,
  message: "Quá nhiều tài khoản được đăng ký từ thiết bị này. Vui lòng chờ 15 phút nhé!",
});

const refreshLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message: "Yêu cầu làm mới token quá thường xuyên.",
});

router.post("/signup", signupLimiter, signUp);
router.post("/signin", signinLimiter, signIn);
router.post("/signout", signOut);
router.post("/refresh", refreshLimiter, refreshToken);

export default router;
