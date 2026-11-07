# 1. Tổng quan dự án Moji

**Moji** là một nền tảng ứng dụng nhắn tin trực tuyến (chat app) cho phép người dùng đăng ký, kết bạn, tạo nhóm và nhắn tin theo thời gian thực.

## 🛠 Tech Stack (Công nghệ sử dụng)

- **Frontend**: React (có vẻ sử dụng Vite), React Router để điều hướng, Zustand để quản lý State (như Auth), Tailwind CSS & shadcn/ui cho UI Component, React Hook Form + Zod để xử lý và kiểm tra tính hợp lệ của Form.
- **Backend**: Node.js với framework Express.js.
- **Database**: MongoDB (sử dụng ORM Mongoose).
- **Authentication**: Sử dụng JWT (JSON Web Tokens). Áp dụng mô hình bảo mật mạnh mẽ với `AccessToken` (sống ngắn, trả qua API) và `RefreshToken` (sống dài, lưu vào HttpOnly Cookie và có Database Session tracking).
- **Real-time**: Socket.IO (đã được tích hợp trong controller để emit các sự kiện theo thời gian thực).
- **Bảo mật**: Bcrypt để mã hóa (hash) mật khẩu trong Database.

## 🎯 Mục tiêu của tài liệu

Bộ tài liệu này (`myApp_docs`) đóng vai trò như một bản thiết kế (blueprint) giúp bất kì Developer mới nào (hoặc AI context) có thể:

1. Biết file nào nằm ở đâu.
2. Biết ứng dụng hiện đang làm được gì.
3. Biết các Component/Models nói chuyện với nhau như thế nào.

Vui lòng đọc tiếp các file `02_Cau_Truc.md`, `03_Chuc_Nang.md`, và `04_Luong_Hoat_Dong.md`.
