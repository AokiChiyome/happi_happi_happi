# 💕 Happi (`happi_happi_happi`) - Nền Tảng Chat Cặp Đôi & Ẩm Thực Thông Minh

Chào mừng bạn đến với **Happi** — Hệ thống Fullstack hoàn chỉnh kết hợp giữa **Nền tảng Nhắn tin Real-time cho Cặp đôi** và **Tiện ích Mở hòm CS:GO Ẩm thực ("Hôm nay em muốn ăn gì?")** với hơn 1,000 món ngon phong phú!

---

## 🌟 Điểm Nổi Bật Của Hệ Thống

1. **Kiến Trúc Chuẩn Fullstack Hiện Đại**:
   - Tách bạch hoàn toàn giữa **`backend/`** (Node.js/Express REST API + SSE) và **`frontend/`** (React 19 + TypeScript + Vite + Tailwind CSS).
   - Tên thương hiệu đồng bộ: Toàn bộ codebase đã được đổi từ `moji` sang **`happi`**.
   - Cung cấp runner đa nền tảng `dev.js` cho phép khởi động cả hệ thống chỉ với **1 câu lệnh duy nhất**.

2. **Hệ Thống Trò Chuyện & Tương Tác Thời Gian Thực**:
   - Đăng ký / Đăng nhập với bảo mật mã hóa mật khẩu bcrypt và JWT HttpOnly Cookie.
   - Quản lý danh sách bạn bè, gửi lời mời kết bạn và ghép đôi.
   - Nhắn tin trực tiếp 1-1 và tạo nhóm chat nhiều thành viên.
   - Cơ chế cập nhật thời gian thực bằng **Server-Sent Events (SSE)** nhẹ nhàng, ổn định.

3. **Tiện Ích Ẩm Thực "Hôm Nay Em Muốn Ăn Gì?" (CS:GO Food Roulette)**:
   - Tích hợp trực tiếp vào trong giao diện nhắn tin dưới dạng mini-app / modal tương tác.
   - Hơn **1,000 món ăn** chia đều trong **20 danh mục ẩm thực phong phú** (Món Nướng BBQ, Lẩu, Phở & Bún, Cơm Niêu, Hải Sản, Đồ Ăn Vặt, K-Food, Nhật Bản, Dimsum,...).
   - Hiệu ứng âm thanh mở hòm giòn giã mô phỏng CS:GO chân thực bằng **Web Audio API**.
   - Nút bấm **"Gửi món này vào chat"**: Tự động sinh Food Card tuyệt đẹp gửi thẳng vào cuộc trò chuyện của hai bạn!

4. **Trang Bảng Điều Khiển Server Tại `http://localhost:5001`**:
   - Giải quyết triệt để lỗi `Cannot GET /` gây hoang mang trước đây.
   - Giờ đây, khi mở trình duyệt tại `http://localhost:5001`, bạn sẽ thấy ngay **Dashboard hiển thị trạng thái kết nối MongoDB Atlas, RAM/Uptime của server, và nút chuyển sang Frontend**.

---

## 📁 Cấu Trúc Dự Án

```text
happi_happi_happi/
├── backend/                       # API Server (Node.js + Express + MongoDB Atlas)
│   ├── src/
│   │   ├── controllers/          # auth, conversation, couple, friend, message, user
│   │   ├── libs/                 # db.js (kết nối MongoDB Atlas), eventBus.js
│   │   ├── middlewares/          # authMiddleware, friendMiddleware
│   │   ├── models/               # User, Conversation, Message, Friend, Couple, Session
│   │   ├── routes/               # REST API Routes
│   │   └── server.js             # Express server chính (cổng 5001)
│   ├── .env                      # [BẢO MẬT] Biến môi trường & Mongo URI (đã chặn bởi .gitignore)
│   ├── .env.example              # File mẫu cấu hình an toàn
│   └── package.json
│
├── frontend/                      # Ứng Dụng Client (React 19 + TypeScript + Vite)
│   ├── src/
│   │   ├── components/           # UI Components, Chat Windows, Modals, Sidebar
│   │   │   ├── auth/             # Signin, Signup forms
│   │   │   ├── chat/             # DirectMessage, GroupChat, ChatWindow
│   │   │   ├── food/             # FoodRouletteModal.tsx (Mở hòm ẩm thực CS:GO)
│   │   │   └── ui/               # Radix UI + Tailwind design system
│   │   ├── data/                 # foodsData.ts (1,000 món ăn & 20 danh mục ẩm thực)
│   │   ├── stores/               # Zustand state stores (useAuthStore, useChatStore, useThemeStore)
│   │   └── main.tsx              # Điểm khởi chạy React
│   ├── package.json
│   └── vite.config.ts
│
├── docs/                          # Toàn bộ tài liệu phân tích hệ thống & hướng dẫn
├── legacy-roulette/               # Phiên bản HTML/JS vòng quay đơn lẻ nguyên bản
├── dev.js                         # Runner khởi chạy song song Backend + Frontend
├── package.json                   # Root package runner
├── vercel.json                    # Cấu hình triển khai tự động lên Vercel
└── .gitignore                     # Bảo vệ nghiêm ngặt các file nhạy cảm (.env, node_modules)
```

---

## 🚀 Hướng Dẫn Khởi Chạy Nhanh

### 1. Yêu Cầu Hệ Thống
- Đã cài đặt **Node.js** (v18 trở lên).
- Trình duyệt hiện đại (Chrome, Edge, Safari, Firefox).

### 2. Khởi Chạy Cả Backend & Frontend Bằng 1 Câu Lệnh Duy Nhất

Tại thư mục gốc của dự án, mở Terminal / PowerShell và chạy:

```bash
npm run dev
```

Hệ thống sẽ đồng thời:
- 🟢 Bật **Backend** tại: `http://localhost:5001`
- 🟢 Bật **Frontend** tại: `http://localhost:5173`

Sau đó, bạn chỉ cần mở trình duyệt và truy cập:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🛡️ Cam Kết Bảo Mật (Security First)

1. **Chuỗi kết nối cơ sở dữ liệu MongoDB Atlas** cùng **JWT Secret Key** được lưu trữ hoàn toàn trong file `backend/.env`.
2. File `backend/.env` được cấu hình **chặn tuyệt đối trong file `.gitignore`** (quy tắc `**/.env`), đảm bảo không bao giờ bị lộ hay push lên GitHub.
3. Khi triển khai lên Vercel hoặc Render, các biến môi trường sẽ được điền trực tiếp trong bảng cấu hình `Environment Variables` của nhà cung cấp hosting.

---

## ☁️ Hướng Dẫn Triển Khai (Deploy) Lên Vercel

Dự án đã tích hợp sẵn file `vercel.json` ở thư mục gốc:

1. Đẩy mã nguồn lên repository GitHub của bạn (`happi_happi_happi`).
2. Truy cập [Vercel](https://vercel.com/) và import dự án `happi_happi_happi`.
3. Trong phần **Environment Variables** trên Vercel:
   - Thêm `VITE_API_URL`: Điền URL backend của bạn (ví dụ backend deploy trên Render / Railway).
4. Nhấn **Deploy**! Vercel sẽ tự động build thư mục `frontend` và cung cấp link web trực tuyến.

---

Chúc bạn và người thương có những giây phút trò chuyện ngọt ngào cùng những bữa ăn ngon miệng cùng **Happi**! 💕
