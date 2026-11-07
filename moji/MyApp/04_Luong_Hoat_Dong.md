# 4. Luồng Hoạt Động & Sự Liên Kết (Architecture Flow)

Bản chất dự án Moji được thiết kế theo luồng tương tác: **Client (React) -> Route (Express) -> Middleware -> Controller -> Model (Mongoose).**

## 🔄 A. Luồng Đăng nhập & Bảo vệ trang (Auth Flow)

1. Người dùng nhập thông tin -> Form Frontend báo lỗi nếu điền sai. Hợp lệ sẽ Submit lên BE `POST /auth/signin`.
2. BE trả lại `accessToken`. FE lưu nó vào Zustand Store (Memory).
3. Thành phần `<ProtectedRoute />` phía FE đứng ra chắn các trang (ví dụ Chat). Khi mở trang:
   - Nếu mất `accessToken` (do F5 lại web), Frontend tự động gọi hàm `refresh()` để thử xin lại token từ Backend thông qua Cookie tự động gửi kèm.
   - Khi đã có Access Token, Frontend dùng nó gắn vào HTTP Header (`Authorization: Bearer <Token>`) để gọi API lấy thông tin người dùng (`fetchMe`). Nếu hỏng, đẩy về trang đăng nhập.

## 🔗 B. Luồng Nhắn tin & Middleware kiểm tra (Messaging Logic)

Moji không cho phép spam người lạ. Điểm liên kết này được bảo vệ bởi Middlewares:

1. **Tạo Group / Nhắn riêng (Create Conversation)**:
   - API `POST /conversations/` chạy ngang qua trạm kiểm tra `checkFriendship` (middleware).
   - BE chẻ mảng `memberIds` gửi lên, mang đi tìm kiếm trong bảng `Friend` với ID của người gọi lệnh. Chỉ khi tất cả đều là bạn, Controller mới được phép chạy lệnh tạo.
2. **Nhắn tin trong nhóm**:
   - API `POST /messages/group` chạy ngang qua trạm `CheckGroupMembership`.
   - BE lấy ID Group để tra cứu, kiểm tra xem ID người nhắn có nằm trong mảng `participants` hay không. Xác minh có mặt mới cho lưu tin nhắn.

## 🗄 C. Cơ sở dữ liệu và Cách tổ chức

MongoDB là NoSQL nhưng Moji thiết kế cơ sở dữ liệu có tính kết nối cao (Relational-like):

- **Tách bảng Session**: Giúp hệ thống có thể đá văng (Force Logout) tài khoản khỏi bất kì thiết bị nào bị lộ bảo mật bằng cách xóa document `Session`.
- **Linh hoạt giữa Chat và Group**: Bảng `Conversation` thay vì tách đôi 2 bảng khác nhau, Moji gộp chung lại dùng field `type` ("direct" hoặc "group").
- **Toán tử Mongoose mạnh mẽ**:
  - Việc lấy tin nhắn dùng phân trang với `$lt: new Date(cursor)` giúp load dữ liệu rất nhẹ và chuẩn xác theo thời gian.
  - Cập nhật số đếm tin nhắn dùng kiểu map `[`unreadCounts.${userId}`]: 0` rất thông minh.

## ⚡ D. Khả năng mở rộng

Dựa vào kiến trúc này:

- Việc gắn Socket.IO vào hoàn toàn trơn tru do Controller đã có biến `io`.
- Có thể mở rộng chức năng upload ảnh bằng cách update model `Message` cho phép nhận `type: 'image'` và `imageUrl`.
