const BASE_URL = "http://localhost:5001/api";

async function run() {
  console.log("=== KIỂM THỬ TASK 8: SỔ TAY ẨM THỰC & YÊU THÍCH (BOOKMARKS) ===");

  const timestamp = Date.now();
  const username = `bookmark_u_${timestamp}`;
  const password = "Password123!";

  // 1. Tạo và đăng nhập tài khoản
  await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      displayName: "Tester Bookmark ⭐",
    }),
  });

  const loginRes = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const loginData = await loginRes.json();
  const token = loginData.accessToken;
  console.log("1. Đăng ký & Đăng nhập thành công:", username);

  // 2. Lưu một món ăn vào sổ tay
  const dishRes = await fetch(`${BASE_URL}/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      type: "dish",
      targetId: "dish-pho-bo-tai",
      title: "Phở Bò Tái Nạm",
      content: "Món ăn ấm bụng cho ngày mưa",
      emoji: "🍜",
      metadata: { category: "Món Nước", priceEstimate: 55000 },
    }),
  });
  const dishData = await dishRes.json();
  if (!dishRes.ok) throw new Error(`Lưu món thất bại: ${JSON.stringify(dishData)}`);
  console.log("2. Đã lưu món ăn vào sổ tay:", dishData.bookmark?.title);

  // 3. Lưu một tin nhắn kỷ niệm vào sổ tay
  const msgRes = await fetch(`${BASE_URL}/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      type: "message",
      targetId: "msg-123456789",
      title: "Tin nhắn từ Người Yêu 💕",
      content: "Hôm nay em muốn đi dạo phố với anh nhé!",
      emoji: "⭐",
    }),
  });
  const msgData = await msgRes.json();
  if (!msgRes.ok) throw new Error(`Lưu tin nhắn thất bại: ${JSON.stringify(msgData)}`);
  console.log("3. Đã lưu tin nhắn vào sổ tay:", msgData.bookmark?.title);

  // 4. Lấy danh sách sổ tay
  const listRes = await fetch(`${BASE_URL}/bookmarks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const listData = await listRes.json();
  if (!listRes.ok) throw new Error(`Lấy sổ tay thất bại: ${JSON.stringify(listData)}`);

  console.log(`4. Tổng số mục đã lưu trong sổ tay: ${listData.bookmarks?.length}`);
  if (listData.bookmarks?.length !== 2) {
    throw new Error(`LỖI: Kỳ vọng 2 mục, nhận được ${listData.bookmarks?.length}`);
  }

  // 5. Thử lưu lại món ăn đã có (Duplicate check)
  const dupRes = await fetch(`${BASE_URL}/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      type: "dish",
      targetId: "dish-pho-bo-tai",
      title: "Phở Bò Tái Nạm",
    }),
  });
  const dupData = await dupRes.json();
  console.log("5. Kiểm tra chống trùng lặp:", dupData.alreadySaved ? "Thành công (Đã nhận diện trùng)" : "Mới");
  if (!dupData.alreadySaved) {
    throw new Error("LỖI: Không phát hiện mục trùng lặp targetId!");
  }

  // 6. Xóa 1 mục khỏi sổ tay
  const deleteId = dishData.bookmark._id;
  const delRes = await fetch(`${BASE_URL}/bookmarks/${deleteId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const delData = await delRes.json();
  if (!delRes.ok) throw new Error(`Xóa thất bại: ${JSON.stringify(delData)}`);
  console.log("6. Đã xóa mục khỏi sổ tay:", delData.message);

  // 7. Kiểm tra lại danh sách
  const finalListRes = await fetch(`${BASE_URL}/bookmarks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const finalListData = await finalListRes.json();
  console.log(`7. Số mục còn lại: ${finalListData.bookmarks?.length}`);
  if (finalListData.bookmarks?.length !== 1) {
    throw new Error(`LỖI: Kỳ vọng còn 1 mục, nhưng còn ${finalListData.bookmarks?.length}`);
  }

  console.log("🎉 TẤT CẢ TEST TASK 8 (SỔ TAY ẨM THỰC & YÊU THÍCH) HOÀN TOÀN ĐẠT 100%!");
}

run().catch((err) => {
  console.error("❌ TEST THẤT BẠI:", err.message);
  process.exit(1);
});
