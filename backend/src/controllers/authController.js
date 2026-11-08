// @ts-nocheck
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = "7d";
const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000; // 30 ngày
const USERNAME_REGEX = /^[a-zA-Z0-9_.-]{3,30}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName, displayName } = req.body;

    // 1. Kiểm tra kiểu dữ liệu nghiêm ngặt (Chống NoSQL Injection)
    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({
        message: "Tên đăng nhập và mật khẩu phải là chuỗi văn bản hợp lệ",
      });
    }

    const cleanUsername = username.trim().toLowerCase();

    // 2. Kiểm tra định dạng username
    if (!USERNAME_REGEX.test(cleanUsername)) {
      return res.status(400).json({
        message: "Tên đăng nhập từ 3 đến 30 ký tự, chỉ gồm chữ cái, số, dấu gạch dưới (_) hoặc gạch ngang (-)",
      });
    }

    // 3. Kiểm tra độ dài mật khẩu (Chống Brute-force & Hash DoS)
    if (password.length < 6) {
      return res.status(400).json({
        message: "Mật khẩu phải có ít nhất 6 ký tự để đảm bảo an toàn",
      });
    }
    if (password.length > 128) {
      return res.status(400).json({
        message: "Mật khẩu không được dài quá 128 ký tự",
      });
    }

    // 4. Kiểm tra username đã tồn tại chưa
    const duplicate = await User.findOne({ username: cleanUsername });
    if (duplicate) {
      return res.status(409).json({
        message: "Tên đăng nhập đã tồn tại, vui lòng chọn tên khác nhé!",
      });
    }

    // 5. Kiểm tra email nếu người dùng cung cấp
    let finalEmail = `${cleanUsername}@happi.couple`;
    if (typeof email === "string" && email.trim()) {
      const cleanEmail = email.trim().toLowerCase();
      if (!EMAIL_REGEX.test(cleanEmail)) {
        return res.status(400).json({ message: "Địa chỉ email không đúng định dạng" });
      }
      finalEmail = cleanEmail;
    }

    // 6. Xử lý Display Name an toàn
    let rawDisplayName = cleanUsername;
    if (typeof displayName === "string" && displayName.trim()) {
      rawDisplayName = displayName.trim().slice(0, 50);
    } else if (typeof lastName === "string" && typeof firstName === "string") {
      rawDisplayName = `${lastName.trim()} ${firstName.trim()}`.slice(0, 50);
    }

    // 7. Băm mật khẩu bằng Bcrypt
    const hashedPassword = await bcrypt.hash(password, 12); // Nâng salt rounds lên 12

    // 8. Tạo người dùng mới
    const newUser = await User.create({
      username: cleanUsername,
      hashedPassword,
      email: finalEmail,
      displayName: rawDisplayName,
    });

    return res.status(201).json({
      message: "Đăng ký thành công!",
      user: {
        _id: newUser._id,
        username: newUser.username,
        displayName: newUser.displayName,
      },
    });
  } catch (error) {
    console.error("Lỗi khi gọi signUp:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi đăng ký" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Kiểm tra kiểu dữ liệu nghiêm ngặt (Chống NoSQL Injection)
    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Tên đăng nhập và mật khẩu không hợp lệ" });
    }

    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername || !password) {
      return res.status(400).json({ message: "Thiếu tên đăng nhập hoặc mật khẩu" });
    }

    // 2. Tìm người dùng
    const user = await User.findOne({ username: cleanUsername });
    if (!user) {
      return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không chính xác" });
    }

    // 3. So khớp mật khẩu
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không chính xác" });
    }

    // 4. Kiểm tra cấu hình SECRET
    if (!process.env.ACCESS_TOKEN_SECRET) {
      console.error("CRITICAL: ACCESS_TOKEN_SECRET chưa được thiết lập!");
      return res.status(500).json({ message: "Lỗi cấu hình bảo mật máy chủ" });
    }

    // 5. Tạo accessToken với JWT
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    // 6. Tạo refreshToken ngẫu nhiên an toàn
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // 7. Lưu session
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // 8. Đặt refresh token vào HttpOnly Cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: REFRESH_TOKEN_TTL,
    });

    return res.status(200).json({
      message: `Chào mừng ${user.displayName}!`,
      accessToken,
      user: {
        _id: user._id,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    console.error("Lỗi khi gọi signIn:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi đăng nhập" });
  }
};

export const signOut = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (token && typeof token === "string") {
      await Session.deleteOne({ refreshToken: token });
      res.clearCookie("refreshToken");
    }

    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    console.error("Lỗi khi gọi signOut:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi đăng xuất" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token || typeof token !== "string") {
      return res.status(401).json({ message: "Token không tồn tại hoặc không hợp lệ" });
    }

    const session = await Session.findOne({ refreshToken: token });
    if (!session) {
      return res.status(403).json({ message: "Phiên đăng nhập không tồn tại hoặc đã hết hạn" });
    }

    if (session.expiresAt < new Date()) {
      await Session.deleteOne({ _id: session._id });
      return res.status(403).json({ message: "Phiên đăng nhập đã hết hạn" });
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      return res.status(500).json({ message: "Lỗi cấu hình bảo mật máy chủ" });
    }

    const accessToken = jwt.sign(
      { userId: session.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Lỗi khi gọi refreshToken:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
