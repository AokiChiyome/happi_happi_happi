import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./libs/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import cookiePaser from "cookie-parser";
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

// Middlewares
app.use(express.json());
app.use(cookiePaser());

// Cấu hình CORS mở cho GitHub Pages và Local
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);

// Public routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Happi Food & Chat Server đang hoạt động tốt! 💖",
    timestamp: new Date(),
  });
});

app.use("/api/auth", authRoute);

// Private routes (yêu cầu đăng nhập)
app.use(protectedRoute);
app.use("/api/users", userRoute);
app.use("/api/couple", coupleRoute);
app.use("/api/friends", friendRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);

app.listen(PORT, async () => {
  console.log(`🚀 Happi Chat Server đang chạy trên cổng ${PORT}`);
  console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
  console.log(`Đang kết nối cơ sở dữ liệu MongoDB Atlas...`);
  await connectDB();
  console.log(`✅ Đã kết nối MongoDB Atlas thành công!`);
});
