import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = async (req, res, next) => {
  try {
    // Lấy token từ Authorization Header, Query params (?token=...) cho SSE, hoặc Cookie
    const authHeader = req.headers["authorization"];
    const token =
      (authHeader && typeof authHeader === "string" && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null) ||
      req.query?.token ||
      req.cookies?.accessToken;

    if (!token || typeof token !== "string") {
      return res.status(401).json({ message: "Vui lòng đăng nhập để tiếp tục" });
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      console.error("LỖI BẢO MẬT: ACCESS_TOKEN_SECRET chưa được cấu hình!");
      return res.status(500).json({ message: "Lỗi cấu hình bảo mật máy chủ" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn" });
    }

    if (!decoded?.userId) {
      return res.status(403).json({ message: "Token không chứa thông tin định danh" });
    }

    const user = await User.findById(decoded.userId).select("-hashedPassword");
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Lỗi xác thực người dùng trong protectedRoute:", error);
    return res.status(500).json({ message: "Lỗi hệ thống xác thực" });
  }
};
