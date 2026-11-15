const BASE_URL = "http://localhost:5001/api";

let testsPassed = 0;
let testsTotal = 0;

function assert(condition, message) {
  testsTotal++;
  if (!condition) {
    throw new Error(`[FAIL] ${message}`);
  }
  testsPassed++;
  console.log(`  ✅ [PASS ${testsPassed}] ${message}`);
}

async function runRegressionSuite() {
  console.log("======================================================================");
  console.log("🚀 BẮT ĐẦU KIỂM THỬ HỒI QUY TOÀN DIỆN HỆ THỐNG HAPPI (TASK 1 - TASK 11)");
  console.log("======================================================================\n");

  const startTotalTime = Date.now();
  const timestamp = Date.now();
  const u1Name = `sprint_alice_${timestamp}`;
  const u2Name = `sprint_bob_${timestamp}`;
  const password = "Password123!";

  // 1. Health check & Server Status
  console.log("📌 1. Kiểm tra API Health & Trạng thái máy chủ");
  const healthRes = await fetch(`${BASE_URL}/health`);
  assert(healthRes.status === 200, "Health check API phản hồi 200 OK");
  const healthData = await healthRes.json();
  assert(healthData.status === "ok", "Hệ thống báo cáo trạng thái 'ok'");

  // 2. Bảo mật Headers (OWASP)
  console.log("\n📌 2. Kiểm tra Headers bảo mật OWASP");
  assert(healthRes.headers.get("x-content-type-options") === "nosniff", "Header X-Content-Type-Options: nosniff");
  assert(healthRes.headers.get("x-frame-options") === "SAMEORIGIN", "Header X-Frame-Options: SAMEORIGIN (Chống Clickjacking)");
  assert(!healthRes.headers.get("x-powered-by"), "Đã ẩn header X-Powered-By của Express");

  // 3. Đăng ký & Đăng nhập 2 tài khoản cặp đôi
  console.log("\n📌 3. Xác thực & Đăng nhập (Auth & JWT)");
  const u1Reg = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: u1Name, password, displayName: "Alice Sprint 🌸" }),
  });
  assert(u1Reg.status === 201, "Đăng ký Alice thành công (201)");

  const u2Reg = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: u2Name, password, displayName: "Bob Sprint 🍀" }),
  });
  assert(u2Reg.status === 201, "Đăng ký Bob thành công (201)");

  const u1Login = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: u1Name, password }),
  });
  const u1Data = await u1Login.json();
  const token1 = u1Data.accessToken;
  assert(typeof token1 === "string" && token1.length > 20, "Alice nhận JWT Access Token hợp lệ");

  const u2Login = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: u2Name, password }),
  });
  const u2Data = await u2Login.json();
  const token2 = u2Data.accessToken;
  assert(typeof token2 === "string" && token2.length > 20, "Bob nhận JWT Access Token hợp lệ");

  // 4. Kết nối cặp đôi
  console.log("\n📌 4. Kết nối cặp đôi (Couple Pairing)");
  const pairRes = await fetch(`${BASE_URL}/couple/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({ partnerUsername: u2Name }),
  });
  assert(pairRes.status === 200, "Alice kết nối với Bob thành công");

  // Lấy thông tin partner & conversation
  const partnerRes = await fetch(`${BASE_URL}/couple/partner`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const partnerData = await partnerRes.json();
  assert(partnerData.hasPartner === true, "Alice đã ghép đôi thành công với người yêu");
  assert(Boolean(partnerData.conversationId), "Hệ thống đã tự khởi tạo cuộc trò chuyện cặp đôi");
  const conversationId = partnerData.conversationId;

  // 5. Gửi tin nhắn văn bản thông thường
  console.log("\n📌 5. Nhắn tin bảo mật (Direct Message & Encryption)");
  const sendTimeStart = Date.now();
  const sendRes = await fetch(`${BASE_URL}/messages/direct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      recipientId: u2Data.user._id,
      content: "Chào em yêu! Hôm nay mình đi ăn tối nhé 💕",
    }),
  });
  const sendLatency = Date.now() - sendTimeStart;
  assert(sendRes.status === 201, "Gửi tin nhắn thành công (201)");
  assert(sendLatency < 1000, `Độ trễ gửi tin nhắn < 1s (${sendLatency}ms)`);
  const msg1 = (await sendRes.json()).message;
  assert(Boolean(msg1._id), "Tin nhắn có mã định danh hợp lệ");

  // 6. Gửi tin nhắn thoại (Voice Note)
  console.log("\n📌 6. Tin nhắn thoại (Voice Audio Note)");
  const voiceRes = await fetch(`${BASE_URL}/messages/direct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      recipientId: u2Data.user._id,
      content: "[Tin nhắn thoại]",
      audioURL: "data:audio/webm;base64,GkXfo59ChoEBQveBAULygQ8USAExMz4=",
      audioDuration: 8,
    }),
  });
  assert(voiceRes.status === 201, "Gửi tin nhắn thoại thành công");
  const voiceMsg = (await voiceRes.json()).message;
  assert(voiceMsg.audioDuration === 8, "Tin nhắn thoại lưu đúng thời lượng 8s");
  assert(Boolean(voiceMsg.audioURL), "Tin nhắn thoại lưu đúng audioURL");

  // 7. Thả reaction cảm xúc lên tin nhắn
  console.log("\n📌 7. Thả cảm xúc tin nhắn (Reactions)");
  const reactRes = await fetch(`${BASE_URL}/messages/${msg1._id}/reaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token2}`,
    },
    body: JSON.stringify({ emoji: "❤️" }),
  });
  assert(reactRes.status === 200, "Bob thả reaction ❤️ lên tin nhắn thành công");
  const reactData = await reactRes.json();
  assert(reactData.reactions?.some((r) => r.emoji === "❤️"), "Danh sách reaction chứa biểu tượng ❤️");

  // 8. Trả lời tin nhắn (Reply)
  console.log("\n📌 8. Trả lời tin nhắn (Reply To Message)");
  const replyRes = await fetch(`${BASE_URL}/messages/direct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token2}`,
    },
    body: JSON.stringify({
      recipientId: u1Data.user._id,
      content: "Dạ vâng anh, em thích ăn lẩu nướng ạ! 🍲",
      replyTo: {
        messageId: msg1._id,
        content: msg1.content,
        senderName: "Alice Sprint 🌸",
      },
    }),
  });
  assert(replyRes.status === 201, "Bob trả lời tin nhắn thành công");
  const replyMsg = (await replyRes.json()).message;
  assert(replyMsg.replyTo?.messageId === msg1._id, "Tin nhắn trỏ đúng tới messageId được trả lời");

  // 9. Ghim tin nhắn trong hội thoại (Pin message)
  console.log("\n📌 9. Ghim tin nhắn (Pinned Message)");
  const pinRes = await fetch(`${BASE_URL}/conversations/${conversationId}/pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({ messageId: msg1._id }),
  });
  assert(pinRes.status === 200, "Ghim tin nhắn lên đầu hội thoại thành công");
  const pinData = await pinRes.json();
  assert(pinData.pinnedMessage?.messageId === msg1._id, "Hội thoại lưu đúng pinnedMessage");

  // 10. Thu hồi tin nhắn (Recall)
  console.log("\n📌 10. Thu hồi tin nhắn (Recall Message)");
  const recallRes = await fetch(`${BASE_URL}/messages/${msg1._id}/recall`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token1}` },
  });
  assert(recallRes.status === 200, "Thu hồi tin nhắn thành công");
  const recallData = await recallRes.json();
  assert(recallData.isRecalled === true, "Cờ isRecalled được cập nhật thành true");

  // 11. Sổ tay ẩm thực & Yêu thích (Bookmarks)
  console.log("\n📌 11. Sổ tay ẩm thực & Yêu thích (Bookmarks)");
  const bmDishRes = await fetch(`${BASE_URL}/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      type: "dish",
      targetId: "dish-lau-thai-tom-yum",
      title: "Lẩu Thái Tom Yum",
      content: "Món lẩu cay chua ăn với người yêu",
      emoji: "🍲",
    }),
  });
  assert(bmDishRes.status === 201, "Lưu món ăn vào sổ tay thành công (201)");

  const bmMsgRes = await fetch(`${BASE_URL}/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      type: "message",
      targetId: replyMsg._id,
      title: "Lời hứa đi ăn của em người yêu",
      content: replyMsg.content,
      emoji: "⭐",
    }),
  });
  assert(bmMsgRes.status === 201, "Lưu tin nhắn vào sổ tay thành công (201)");

  const bmListRes = await fetch(`${BASE_URL}/bookmarks`, {
    headers: { Authorization: `Bearer ${token1}` },
  });
  const bmListData = await bmListRes.json();
  assert(bmListData.bookmarks?.length === 2, "Alice có đúng 2 mục trong sổ tay ẩm thực");

  // 12. Khoảnh khắc 24h & Bảng tin cặp đôi (24h Stories & Moments)
  console.log("\n📌 12. Khoảnh khắc 24h & Bảng tin cặp đôi (Stories & Feed)");
  const storyRes = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      content: "Khoảnh khắc hoàng hôn cùng em hôm nay 🌅💕",
      feeling: "🥰 Đang hạnh phúc",
      isStory: true,
    }),
  });
  assert(storyRes.status === 201, "Đăng 24h Story thành công (201)");
  const storyData = await storyRes.json();
  assert(storyData.post?.isStory === true, "Post được đánh dấu isStory: true");
  assert(Boolean(storyData.post?.expiresAt), "Post có hạn expiresAt 24h");

  const normalPostRes = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token2}`,
    },
    body: JSON.stringify({
      content: "Bài viết kỷ niệm 100 ngày yêu nhau của chúng mình! 💖🎉",
      isStory: false,
    }),
  });
  assert(normalPostRes.status === 201, "Đăng bài viết thường thành công (201)");

  // Bob lấy feed
  const feedRes = await fetch(`${BASE_URL}/posts/feed`, {
    headers: { Authorization: `Bearer ${token2}` },
  });
  assert(feedRes.status === 200, "Lấy bảng tin cặp đôi thành công (200)");
  const feedData = await feedRes.json();
  assert(feedData.stories?.length >= 1, "Bảng tin chứa mục trong stories");
  assert(feedData.posts?.length >= 1, "Bảng tin chứa mục trong posts");
  assert(
    !feedData.posts.some((p) => p.isStory === true),
    "Story 24h không bị lẫn lộn vào danh sách bài viết thường"
  );

  const totalDuration = Date.now() - startTotalTime;
  console.log("\n======================================================================");
  console.log(`🎉 TỔNG KẾT: ${testsPassed}/${testsTotal} BÀI KIỂM THỬ ĐẠT CHUẨN HOÀN HẢO 100%!`);
  console.log(`⏱️ Thời gian thực thi toàn bộ test: ${totalDuration}ms`);
  console.log("======================================================================\n");
}

runRegressionSuite().catch((err) => {
  console.error("❌ TEST REGRESSION THẤT BẠI:", err.message);
  process.exit(1);
});
