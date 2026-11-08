import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = (req, res, next) => {
  try {
    // lấy token từ header (Authorization: Bearer <token>) hoặc query param (?token=...)
    const authHeader = req.headers["authorization"];
    const token =
      (authHeader && authHeader.split(" ")[1]) ||
      req.query?.token ||
      req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "không tìm thấy token" });
    }

    // xác nhận token hợp lệ
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedUser) => {
        if (err) {
          console.error("JWT verify error:", err.message);
          return res
            .status(403)
            .json({ message: "access token hết hạn hoặc không đúng" });
        }
        // tìm user
        const user = await User.findById(decodedUser.userId).select(
          "-hashedPassword"
        );
        if (!user) {
          return res.status(404).json({ message: "người dùng không tồn tại" });
        }
        // trả user về trong req
        req.user = user;
        next();
      }
    );
  } catch (error) {
    console.error("lỗi khi xác minh JWT trong authmiddleware", error);
    return res.status(500).json({ message: "lỗi hệ thống" });
  }
};
