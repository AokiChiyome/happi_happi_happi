import Bookmark from "../models/Bookmark.js";

// Lấy danh sách sổ tay đã lưu của người dùng
export const getBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ bookmarks });
  } catch (error) {
    console.error("Lỗi khi lấy sổ tay yêu thích:", error);
    return res.status(500).json({ message: "Lỗi máy chủ khi lấy sổ tay" });
  }
};

// Lưu một mục mới vào sổ tay (món ăn, tin nhắn, bài viết)
export const createBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type = "message", targetId, title, content, emoji, metadata } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ message: "Vui lòng cung cấp tiêu đề cho mục lưu" });
    }

    // Nếu đã lưu mục này trước đó (theo targetId), trả về thông báo đã tồn tại
    if (targetId) {
      const existing = await Bookmark.findOne({ userId, targetId });
      if (existing) {
        return res.status(200).json({
          message: "Mục này đã có trong sổ tay yêu thích của bạn rồi nè! ⭐",
          bookmark: existing,
          alreadySaved: true,
        });
      }
    }

    const bookmark = await Bookmark.create({
      userId,
      type,
      targetId: targetId || undefined,
      title: title.trim(),
      content: typeof content === "string" ? content.trim() : "",
      emoji: typeof emoji === "string" && emoji.trim() ? emoji.trim() : "⭐",
      metadata: metadata || {},
    });

    return res.status(201).json({
      message: "Đã lưu vào sổ tay yêu thích thành công! 💖",
      bookmark,
    });
  } catch (error) {
    console.error("Lỗi khi lưu sổ tay:", error);
    return res.status(500).json({ message: "Lỗi máy chủ khi lưu mục yêu thích" });
  }
};

// Xóa một mục khỏi sổ tay
export const deleteBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookmarkId } = req.params;

    const deleted = await Bookmark.findOneAndDelete({ _id: bookmarkId, userId });
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy mục cần xóa" });
    }

    return res.status(200).json({ message: "Đã xóa khỏi sổ tay yêu thích!" });
  } catch (error) {
    console.error("Lỗi khi xóa sổ tay:", error);
    return res.status(500).json({ message: "Lỗi máy chủ khi xóa mục yêu thích" });
  }
};
