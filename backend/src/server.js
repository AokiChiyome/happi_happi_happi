import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { connectDB } from "./libs/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import { protectedRoute } from "./middlewares/authmiddleware.js";
import friendRoute from "./routes/friendRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors";
import conversationRoute from "./routes/conversationRoute.js";
import coupleRoute from "./routes/coupleRoute.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5001;

// 1. TẮT HEADER X-POWERED-BY ĐỂ ẨN DẤU VẾT CÔNG NGHỆ SERVER
app.disable("x-powered-by");

// 2. OWASP SECURITY HEADERS MIDDLEWARE
app.use((req, res, next) => {
  // Chống MIME-sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Chống Clickjacking
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  // Bộ lọc XSS trình duyệt
  res.setHeader("X-XSS-Protection", "1; mode=block");
  // Bảo vệ thông tin Referer khi chuyển hướng
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// 3. GIỚI HẠN DUNG LƯỢNG BODY CHỐNG TẤN CÔNG MEMORY EXHAUSTION DOS
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

// 4. DANH SÁCH ORIGIN ĐƯỢC PHÉP TRUY CẬP (CHỐNG CROSS-SITE CSRF / DATA LEAK)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5500",
  "http://localhost:3000",
  "http://localhost:5001",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5500",
];

if (process.env.CLIENT_URL) {
  process.env.CLIENT_URL.split(",").forEach((url) => {
    const trimmed = url.trim();
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Cho phép request không có origin (như curl, mobile apps, SSR)
      if (!origin) return callback(null, true);

      // Cho phép localhost, domain đã cấu hình, hoặc preview từ Vercel
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(origin);

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy does not allow access from this origin."));
      }
    },
    credentials: true,
  })
);

// Public API Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Happi Food & Chat Fullstack Platform",
    message: "Server đang hoạt động hoàn hảo và sẵn sàng phục vụ! 💖",
    timestamp: new Date(),
    endpoints: {
      auth: "/api/auth (signup, signin, signout, refresh)",
      users: "/api/users/me",
      couple: "/api/couple (partner, connect, share-dish, stream)",
      friends: "/api/friends (requests, list)",
      conversations: "/api/conversations (list, messages, seen)",
      messages: "/api/messages (direct, group, stream)",
    },
  });
});

app.use("/api/auth", authRoute);

// Private routes (yêu cầu đăng nhập)
app.use("/api/users", protectedRoute, userRoute);
app.use("/api/couple", protectedRoute, coupleRoute);
app.use("/api/friends", protectedRoute, friendRoute);
app.use("/api/messages", protectedRoute, messageRoute);
app.use("/api/conversations", protectedRoute, conversationRoute);

// Phục vụ Frontend Static nếu đã build (Production) hoặc trang thông báo thân thiện (Development)
const distPath = path.join(__dirname, "../../frontend/dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  // Trang chủ mặc định khi mở http://localhost:5001 trên trình duyệt
  app.get("/", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Happi Backend Server 🚀</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #FFF8F6;
            color: #4A3337;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .card {
            background: white;
            border: 2px solid #FFCCD8;
            border-radius: 28px;
            padding: 36px 32px;
            max-width: 500px;
            width: 100%;
            text-align: center;
            box-shadow: 0 16px 35px rgba(255, 94, 142, 0.12);
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #E8F8F5;
            color: #0E6251;
            padding: 6px 14px;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 700;
            margin-bottom: 16px;
          }
          .dot { width: 8px; height: 8px; background: #2ECC71; border-radius: 50%; }
          h1 { font-size: 1.6rem; color: #FF5E8E; margin-bottom: 10px; font-weight: 800; }
          p { font-size: 0.95rem; color: #8E7377; line-height: 1.5; margin-bottom: 24px; }
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: linear-gradient(135deg, #FF6B97, #FF5E8E);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 16px;
            font-weight: 700;
            font-size: 0.95rem;
            box-shadow: 0 6px 18px rgba(255, 94, 142, 0.3);
            transition: transform 0.2s;
          }
          .btn:hover { transform: translateY(-2px); }
          .links { margin-top: 24px; padding-top: 18px; border-top: 1px dashed #FFCCD8; font-size: 0.82rem; color: #8E7377; }
          .links a { color: #FF5E8E; text-decoration: none; font-weight: 600; margin: 0 6px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge"><span class="dot"></span> MongoDB Atlas Connected</div>
          <h1>Happi Fullstack Backend 💖</h1>
          <p>Máy chủ Node.js + Express đã khởi động thành công và sẵn sàng phục vụ toàn bộ API chat thời gian thực & gợi ý ẩm thực!</p>
          <a href="http://localhost:5173" class="btn">🚀 Mở Giao Diện Web (Frontend: 5173)</a>
          <div class="links">
            Kiểm tra API:
            <a href="/api/health" target="_blank">Health Check (/api/health)</a>
          </div>
        </div>
      </body>
      </html>
    `);
  });
}

// Global error handler (Không làm lộ stack trace ra ngoài cho kẻ tấn công)
app.use((err, req, res, next) => {
  console.error("Server Error Handled:", err.message);
  if (err.message && err.message.includes("CORS")) {
    return res.status(403).json({ message: "Bị chặn bởi chính sách CORS" });
  }
  return res.status(500).json({
    message: "Lỗi hệ thống nội bộ máy chủ",
  });
});

app.listen(PORT, async () => {
  console.log(`🚀 Happi Backend Server đang chạy trên cổng ${PORT}`);
  console.log(`👉 Bảng điều khiển: http://localhost:${PORT}`);
  console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
  console.log(`Đang kết nối cơ sở dữ liệu MongoDB Atlas...`);
  await connectDB();
  console.log(`✅ Đã kết nối MongoDB Atlas thành công!`);
});
