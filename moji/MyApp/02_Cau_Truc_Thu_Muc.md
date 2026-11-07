# 2. Cấu trúc thư mục dự án (Project Structure)

Dự án chia làm 2 thư mục gốc là Frontend và Backend.

## 🖥 Frontend (`d:\Study\moji\frontend\`)

```text
src/
├── components/
│   ├── auth/            # Chứa giao diện đăng ký, đăng nhập và bảo vệ Route (SignupForm, SigninForm, ProtectedRoute).
│   ├── ui/              # Chứa các component giao diện cơ bản dùng chung (Button, Input, Card, Label) từ thư viện shadcn/ui.
├── stores/
│   └── useAuthStore.ts  # Zustand store - Nơi lưu trữ trạng thái người dùng (accessToken, user) cục bộ trên trình duyệt.
├── lib/
│   └── utils.ts         # Các hàm tiện ích (hàm `cn` dùng để gộp class Tailwind).
```

_Nhiệm vụ: Render giao diện, quản lý form state (Zod), gửi request đến backend và điều hướng người dùng (React Router)._

## ⚙️ Backend (`d:\Study\moji\Backend\`)

```text
src/
├── controllers/         # Nơi chứa logic xử lý chính của các tính năng
│   ├── authController.js       # Đăng ký, đăng nhập, refresh token...
│   ├── conversationController.js # Tạo nhóm chat, xem tin nhắn, seen tin nhắn.
│   ├── friendController.js     # Thêm bạn, đồng ý/từ chối, lấy danh sách bạn...
│   ├── messageController.js    # Logic gửi tin nhắn nhóm / riêng.
│   └── userController.js       # Logic lấy dữ liệu người dùng (ví dụ: authMe).
├── middlewares/         # Trạm kiểm soát trước khi request được tới Controllers
│   ├── authmiddleware.js       # Hàm check quyền: `protectedRoute` (kiểm tra JWT hợp lệ).
│   └── friendmiddleware.js     # Hàm check logic: Kiểm tra xem đã kết bạn chưa? Có ở trong nhóm chat chưa?
├── models/              # Định nghĩa Schema (cấu trúc bảng Database) cho MongoDB
│   ├── User.js, Friend.js, FriendRequest.js,
│   ├── Conversation.js, Message.js, Session.js
├── routes/              # Nơi nối Endpoint API với Middleware và Controller
│   ├── authRoute.js, conversationRoute.js, friendRoute.js, messageRoute.js, userRoute.js
├── utils/               # Thư mục chứa các hàm tính toán hỗ trợ độc lập
│   └── messageHelper.js        # Vd: Cập nhật Conversation khi có tin nhắn mới.
```

_Nhiệm vụ: Cung cấp API, kiểm tra quyền hạn, thao tác đọc/ghi vào Database và phát Socket._
