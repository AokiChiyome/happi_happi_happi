# 3. Danh sách Chức năng hiện hành (Features)

Dựa vào Codebase, Moji hiện đang sở hữu các tính năng sau:

## 1. Authentication (Xác thực và phân quyền)

- **Đăng ký (Sign Up)**: Điền form, kiểm tra lỗi bằng Zod, mã hóa mật khẩu và tạo mới User.
- **Đăng nhập (Sign In)**: Kiểm tra DB, trả về JWT Access Token cho Client và gắn JWT Refresh Token vào HTTPOnly Cookie, tạo Session tracking trong Database.
- **Đăng xuất (Sign Out)**: Xóa thông tin Session trong DB và dọn dẹp Cookie.
- **Cấp lại Token (Refresh Token)**: Tự động xin lại token mới khi Access Token cũ hết hạn (dùng cookie an toàn).

## 2. Quản lý Bạn Bè (Friendship Management)

- **Gửi yêu cầu kết bạn**: Tạo mới dữ liệu ở bảng `FriendRequest`. Check logic không tự gửi cho chính mình, không gửi nếu đã là bạn.
- **Quản lý yêu cầu**: Cho phép người nhận Chấp nhận (Accept) hoặc Từ chối (Decline). Nếu chấp nhận, bản ghi được tạo ở bảng `Friend`.
- **Lấy danh sách**: Liệt kê bạn bè (`getAllFriend`) và các yêu cầu kết bạn đến/đi (`getFriendRequests`).

## 3. Hội thoại (Conversations)

- **Phân loại**: Hỗ trợ 2 chuẩn hội thoại là Nhắn Riêng (`direct`) và Nhắn Nhóm (`group`).
- **Ràng buộc**: Phải là bạn bè thì mới nhắn tin hoặc thêm người đó vào nhóm được (Được bảo vệ nghiêm ngặt qua file `friendmiddleware.js`).
- **Quản lý danh sách hộp thư**: Tự động update thời gian tin nhắn mới nhất, tính số lượng tin nhắn chưa đọc (`unreadCounts`).
- **Trạng thái Đã xem**: API `markAsSeen` giúp báo cho biết ai đã đọc tin nhắn tới đâu.

## 4. Nhắn tin (Messaging) & Real-time

- **Gửi tin nhắn**: Lưu text vào collection `Message`, và kích hoạt cập nhật thông tin hội thoại tương ứng (cập nhật Last Message).
- **Auto-create Conversation**: Nếu 2 người nhắn tin trực tiếp lần đầu (`direct`), backend sẽ tự động tạo cuộc hội thoại mới.
- **Pagination (Phân trang tin nhắn)**: Lấy lịch sử tin nhắn dạng cuộn (infinite scroll) thông qua tham số `cursor` (dựa vào `createdAt`).
- **Socket.io Events**:
  - `new-group`: Phát thông báo lúc tạo nhóm hoặc có hội thoại mới.
  - `read-message`: Báo realtime trạng thái "đã xem" cho người bên kia.
