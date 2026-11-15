const BASE_URL = "http://localhost:5001/api";

async function run() {
  console.log("=== KIỂM THỬ TASK 7: 24H COUPLE MOMENTS / STORIES ===");

  const timestamp = Date.now();
  const u1Name = `story_u1_${timestamp}`;
  const u2Name = `story_u2_${timestamp}`;
  const password = "Password123!";

  // 1. Tạo 2 tài khoản mới
  await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: u1Name,
      password,
      displayName: "Alice Story 🌸",
    }),
  });

  await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: u2Name,
      password,
      displayName: "Bob Story 🍀",
    }),
  });

  // Đăng nhập lấy access token
  const u1Login = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: u1Name, password }),
  });
  const u1Data = await u1Login.json();
  const token1 = u1Data.accessToken;

  const u2Login = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: u2Name, password }),
  });
  const u2Data = await u2Login.json();
  const token2 = u2Data.accessToken;

  console.log("1. Đã tạo và đăng nhập 2 tài khoản test:", u1Name, "và", u2Name);

  // 2. Kết nối cặp đôi
  const connectRes = await fetch(`${BASE_URL}/couple/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({ partnerUsername: u2Name }),
  });
  const connectData = await connectRes.json();
  if (!connectRes.ok) throw new Error(`Kết nối thất bại: ${JSON.stringify(connectData)}`);
  console.log("2. Đã kết nối cặp đôi thành công!");

  // 3. Đăng 1 Story 24h từ u1
  const storyContent = `Khoảnh khắc lãng mạn 24h test lúc ${new Date().toLocaleTimeString()} 💕`;
  const storyRes = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      content: storyContent,
      feeling: "🥰 Đang hạnh phúc",
      isStory: true,
    }),
  });
  const storyData = await storyRes.json();
  if (!storyRes.ok) throw new Error(`Đăng story thất bại: ${JSON.stringify(storyData)}`);

  console.log("3. Đã đăng 24h Story:", storyData.post?.content);
  if (!storyData.post?.isStory) {
    throw new Error("LỖI: isStory không phải true!");
  }
  if (!storyData.post?.expiresAt) {
    throw new Error("LỖI: Thiếu hạn expiresAt!");
  }
  console.log("   -> isStory:", storyData.post.isStory);
  console.log("   -> expiresAt:", storyData.post.expiresAt);

  // 4. Đăng 1 bài viết thường từ u1
  const regularPostContent = `Bài viết thường trên dòng thời gian 📝`;
  const postRes = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify({
      content: regularPostContent,
      isStory: false,
    }),
  });
  const postData = await postRes.json();
  if (!postRes.ok) throw new Error(`Đăng post thất bại: ${JSON.stringify(postData)}`);
  console.log("4. Đã đăng bài viết thường:", postData.post?.content);

  // 5. U2 kiểm tra Feed: phân loại đúng stories vs posts
  const feedRes = await fetch(`${BASE_URL}/posts/feed`, {
    headers: { Authorization: `Bearer ${token2}` },
  });
  const feedData = await feedRes.json();
  if (!feedRes.ok) throw new Error(`Tải feed thất bại: ${JSON.stringify(feedData)}`);

  const stories = feedData.stories || [];
  const posts = feedData.posts || [];

  console.log(`5. U2 nhận được: ${stories.length} stories, ${posts.length} bài viết thường.`);

  const storyFoundInStories = stories.some((s) => s._id === storyData.post._id);
  const storyFoundInPosts = posts.some((p) => p._id === storyData.post._id);

  const postFoundInStories = stories.some((s) => s._id === postData.post._id);
  const postFoundInPosts = posts.some((p) => p._id === postData.post._id);

  if (!storyFoundInStories) {
    throw new Error("LỖI: Story không xuất hiện trong danh sách stories của feed!");
  }
  if (storyFoundInPosts) {
    throw new Error("LỖI: Story bị lẫn vào danh sách bài viết thường!");
  }
  if (postFoundInStories) {
    throw new Error("LỖI: Bài viết thường bị nhầm thành Story!");
  }
  if (!postFoundInPosts) {
    throw new Error("LỖI: Bài viết thường không có trong danh sách posts!");
  }

  // 6. U2 thả tim vào Story của U1
  const reactRes = await fetch(`${BASE_URL}/posts/${storyData.post._id}/reactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token2}`,
    },
    body: JSON.stringify({ type: "heart" }),
  });
  const reactData = await reactRes.json();
  if (!reactRes.ok) throw new Error(`Thả tim thất bại: ${JSON.stringify(reactData)}`);
  console.log("6. U2 đã thả tim cho Story thành công, số reactions:", reactData.reactions?.length);

  console.log("🎉 TẤT CẢ TEST TASK 7 (24H STORY / MOMENTS) HOÀN TOÀN ĐẠT 100%!");
}

run().catch((err) => {
  console.error("❌ TEST THẤT BẠI:", err.message);
  process.exit(1);
});
