# 💖 Happi Chat & Food Backend

Hệ thống máy chủ Node.js + Express + MongoDB Atlas phục vụ tính năng **Đăng Ký, Đăng Nhập & Chat Cặp Đôi Thời Gian Thực** cho web "Hôm nay em muốn ăn gì?".

---

## 🚀 Cách chạy máy chủ trên máy tính (Local)

1. Mở cửa sổ dòng lệnh (Terminal / PowerShell / CMD) tại thư mục `moji/Backend`:
   ```bash
   cd "moji/Backend"
   ```
2. Cài đặt các gói thư viện (nếu chưa có):
   ```bash
   npm install
   ```
3. Khởi động server:
   ```bash
   npm start
   ```
   Server sẽ chạy tại: `http://localhost:5001`
   Kiểm tra trạng thái: `http://localhost:5001/api/health`

---

## ☁️ Hướng dẫn đưa Backend lên mạng miễn phí (Render.com)

Để bạn và người yêu có thể chat với nhau ở 2 nơi khác nhau (hoặc trên điện thoại qua 4G/Wifi):

1. Tạo tài khoản miễn phí tại **[https://render.com](https://render.com)**.
2. Chọn **New +** -> **Web Service**.
3. Kết nối với kho mã nguồn GitHub của bạn: `AokiChiyome/happi_happi_happi`.
4. Điền các thông số:
   - **Root Directory**: `moji/Backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
5. Ở phần **Environment Variables**, thêm các biến sau:
   - `PORT`: `5001`
   - `MONGODB_CONNECTIONSTRING`: (dán chuỗi kết nối MongoDB Atlas của bạn vào đây)
   - `ACCESS_TOKEN_SECRET`: (chuỗi ký tự bảo mật bất kỳ)
   - `CLIENT_URL`: `https://aokichiyome.github.io`
6. Bấm **Deploy Web Service**! Sau 2 phút, Render sẽ cấp cho bạn một đường dẫn dạng:
   `https://happi-chat-backend.onrender.com`
7. Mở trang web "Hôm nay em muốn ăn gì?", bấm vào nút **Đăng Nhập** -> bấm **Cài đặt Server Backend (Nâng cao)** -> dán đường dẫn Render vào là xong! 💕

---

## 🛡️ Cam Kết Bảo Mật

- File `.env` chứa mật khẩu MongoDB đã được đưa vào `.gitignore` nghiêm ngặt và không bao giờ bị đẩy lên GitHub công khai.
