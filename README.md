# 💕 Hôm Nay Em Muốn Ăn Gì? - Vòng Quay Hẹn Hò Phong Cách CS:GO

Dự án web dành riêng cho các cặp đôi để giải cứu câu hỏi bất hủ mỗi lần đi chơi: **"Hôm nay ăn gì cũng được..."** 🥹👉👈

---

## ✨ Điểm Nổi Bật & Tính Năng

1. **Hiệu ứng Mở Hòm CS:GO chân thực**:
   - Vòng quay nằm ngang mượt mà, kim chỉ tâm có biểu tượng trái tim dễ thương.
   - Hiệu ứng vật lý hãm phanh (deceleration curve) y hệt mở hòm Counter-Strike.
   - Âm thanh "tách... tách... tách" chân thực bằng **Web Audio API** tự sinh (không lo thiếu file âm thanh, tự động dãn nhịp khi quay chậm lại).
   - Nhạc chiến thắng và pháo hoa giấy (confetti) bung tỏa khi chốt món!

2. **Cơ Chế Quay 2 Vòng Khoa Học**:
   - **Vòng 1 (Chọn Thể Loại)**: Quay ngẫu nhiên giữa các thể loại lớn như *Món Nướng, Món Lẩu, Món Chiên & Rán, Món Hấp & Luộc, Món Nước & Sợi, Món Ăn Vặt, Đồ Tây / Fastfood, Tráng Miệng & Trà Sữa,...*
   - **Vòng 2 (Chọn Món Cụ Thể)**: Sau khi chốt thể loại, hòm của thể loại đó sẽ mở ra để quay tiếp món ăn chi tiết bên trong!

3. **Giao Diện Dễ Thương - Tuyệt Đối Không Rập Khuôn Kiểu AI Phổ Biến**:
   - Tông màu pastel ngọt ngào (Hồng dâu, Vàng bơ, Trà sữa, Mint).
   - Nút bấm 3D nảy phồng xúc giác, các sticker chibi đồ ăn bay lơ lửng.
   - Hỗ trợ đổi **Biệt danh cặp đôi** (Ví dụ: *Gấu Đực & Bé Mèo*) để trang web xưng hô ngọt ngào.

4. **Dữ Liệu Lưu File CSV Dễ Dàng Tùy Biến**:
   - Danh sách món ăn được lưu trong file `foods.csv`.
   - Đã biên soạn sẵn **10 thể loại lớn với gần 70 món ăn Việt & quốc tế hot nhất khi hẹn hò**.
   - Bạn có thể mở file `foods.csv` bằng **Excel** hoặc **Notepad** để thêm/bớt món tùy thích.
   - Có sẵn giao diện quản trị trực tiếp trên web: Xem danh sách, tìm kiếm, thêm món mới, xuất CSV và tải file CSV lên.

5. **Nút "Tìm Quán Quanh Đây" thông minh**:
   - Sau khi quay trúng món, chỉ cần bấm nút là tự động mở **Google Maps** tìm các quán bán món đó ở gần vị trí của hai bạn!

---

## 🚀 Hướng Dẫn Khởi Chạy

### Cách 1: Chạy bằng file `start.bat` (Khuyên dùng trên Windows)
- Nhấp đúp chuột vào file **`start.bat`**.
- Server nội bộ sẽ tự động bật và mở trình duyệt tại địa chỉ `http://localhost:5500`.

### Cách 2: Chạy bằng dòng lệnh Python
```bash
python server.py
```

### Cách 3: Mở trực tiếp file HTML
- Nhấp đúp vào file **`index.html`** để mở trên bất kỳ trình duyệt nào (Chrome, Edge, Cốc Cốc, Safari,...).
- Trang web đã tích hợp sẵn bộ dữ liệu dự phòng nên vẫn hoạt động hoàn hảo ngay cả khi không chạy server!

---

## 📁 Cấu Trúc Thư Mục

```text
├── foods.csv        # File dữ liệu các thể loại và món ăn (có thể chỉnh sửa bằng Excel)
├── index.html       # Giao diện chính của ứng dụng
├── style.css        # Thiết kế giao diện pastel dễ thương & hiệu ứng CS:GO roulette
├── app.js           # Bộ xử lý quay CS:GO, âm thanh Web Audio, logic 2 vòng, quản lý dữ liệu
├── server.py        # Server nội bộ nhẹ nhàng với Python
├── start.bat        # Phím tắt 1-click để khởi chạy nhanh trên Windows
└── README.md        # Tài liệu hướng dẫn sử dụng
```

---

*Chúc hai bạn có những buổi hẹn hò thật vui vẻ và những bữa ăn thật ngon miệng! 💕*
