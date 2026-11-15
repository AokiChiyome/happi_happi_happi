import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Friend from "../models/Friend.js";
import User from "../models/User.js";
import { encryptText, decryptText } from "../utils/cryptoHelper.js";
import { chatEmitter } from "../libs/eventBus.js";
import mongoose from "mongoose";

const pair = (a, b) => (a < b ? [a, b] : [b, a]).join("_");

// Helper: Tìm người yêu / bạn đời của user hiện tại
const findPartner = async (userId) => {
  const friendship = await Friend.findOne({
    $or: [{ userA: userId }, { userB: userId }],
  })
    .populate("userA", "_id username displayName avatarUrl")
    .populate("userB", "_id username displayName avatarUrl");

  if (!friendship) return null;

  return friendship.userA._id.toString() === userId.toString()
    ? friendship.userB
    : friendship.userA;
};

// 1. LẤY BẢNG TIN NHẬT KÝ CẶP ĐÔI (FEED)
export const getCoupleFeed = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const partner = await findPartner(userId);

    if (!partner) {
      return res.status(200).json({
        posts: [],
        hasPartner: false,
        message: "Bạn chưa kết nối với người yêu. Hãy kết bạn hoặc ghép đôi để bắt đầu dòng thời gian nhé!",
      });
    }

    const coupleKey = pair(userId, partner._id.toString());

    const rawPosts = await Post.find({ coupleKey })
      .sort({ createdAt: -1 })
      .populate("authorId", "_id username displayName avatarUrl")
      .populate("partnerId", "_id username displayName avatarUrl")
      .populate("reactions.userId", "_id username displayName avatarUrl")
      .lean();

    // Giải mã nội dung AES-256-GCM bảo đảm hiển thị văn bản ban đầu
    const posts = rawPosts.map((post) => ({
      ...post,
      content: decryptText(post.content),
    }));

    return res.status(200).json({
      hasPartner: true,
      partner: {
        _id: partner._id,
        username: partner.username,
        displayName: partner.displayName,
        avatarUrl: partner.avatarUrl,
      },
      posts,
    });
  } catch (error) {
    console.error("Lỗi khi tải bảng tin cặp đôi:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi tải dòng thời gian" });
  }
};

// 2. ĐĂNG BÀI VIẾT MỚI
export const createPost = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { content, images, foodDish, feeling } = req.body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ message: "Vui lòng nhập nội dung bài viết" });
    }

    const partner = await findPartner(userId);
    if (!partner) {
      return res.status(400).json({
        message: "Bạn cần kết bạn hoặc kết nối với người ấy trước khi đăng bài chung!",
      });
    }

    const partnerId = partner._id.toString();
    const coupleKey = pair(userId, partnerId);

    // MÃ HÓA NỘI DUNG BẰNG AES-256-GCM TRƯỚC KHI LƯU VÀO DB
    const cleanContent = content.trim();
    const encryptedContent = encryptText(cleanContent);

    const safeImages = Array.isArray(images)
      ? images.filter((img) => typeof img === "string" && img.trim().length > 0)
      : [];

    const newPost = await Post.create({
      coupleKey,
      authorId: userId,
      partnerId,
      content: encryptedContent,
      images: safeImages,
      foodDish: foodDish || undefined,
      feeling: typeof feeling === "string" ? feeling.trim() : "",
      reactions: [],
      commentsCount: 0,
    });

    const populated = await Post.findById(newPost._id)
      .populate("authorId", "_id username displayName avatarUrl")
      .populate("partnerId", "_id username displayName avatarUrl")
      .lean();

    const formattedPost = {
      ...populated,
      content: cleanContent, // Trả lại nội dung giải mã
    };

    // Phát sự kiện real-time qua SSE đến cả hai người
    chatEmitter.emit("new_post", {
      post: formattedPost,
      coupleKey,
      participantIds: [userId, partnerId],
    });

    return res.status(201).json({
      message: "Đã đăng bài viết lên dòng thời gian của hai bạn! 💕",
      post: formattedPost,
    });
  } catch (error) {
    console.error("Lỗi khi tạo bài viết:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi đăng bài" });
  }
};

// 3. THẢ TIM / LIKE / CẢM XÚC (REACTION)
export const toggleReaction = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { postId } = req.params;
    const { type = "love" } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Mã bài viết không hợp lệ" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    // BẢO MẬT: Kiểm tra user có thuộc cặp đôi này không
    const partner = await findPartner(userId);
    if (!partner) {
      return res.status(403).json({ message: "Bạn không có quyền tương tác với bài viết này" });
    }

    const coupleKey = pair(userId, partner._id.toString());
    if (post.coupleKey !== coupleKey) {
      return res.status(403).json({ message: "Bạn không có quyền tương tác với bài viết này" });
    }

    const existingIndex = post.reactions.findIndex(
      (r) => r.userId.toString() === userId
    );

    if (existingIndex > -1) {
      if (post.reactions[existingIndex].type === type) {
        // Hủy cảm xúc nếu bấm lại cùng 1 loại
        post.reactions.splice(existingIndex, 1);
      } else {
        // Đổi loại cảm xúc khác
        post.reactions[existingIndex].type = type;
        post.reactions[existingIndex].createdAt = new Date();
      }
    } else {
      // Thêm cảm xúc mới
      post.reactions.push({
        userId,
        type,
        createdAt: new Date(),
      });
    }

    await post.save();

    await post.populate("reactions.userId", "_id username displayName avatarUrl");

    // Phát sự kiện cập nhật cảm xúc real-time
    chatEmitter.emit("post_reaction", {
      postId: post._id.toString(),
      reactions: post.reactions,
      coupleKey,
      participantIds: [post.authorId.toString(), post.partnerId.toString()],
    });

    return res.status(200).json({
      message: "Đã cập nhật cảm xúc",
      reactions: post.reactions,
    });
  } catch (error) {
    console.error("Lỗi khi thả cảm xúc:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi thả cảm xúc" });
  }
};

// 4. LẤY BÌNH LUẬN CỦA BÀI VIẾT
export const getComments = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Mã bài viết không hợp lệ" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    const partner = await findPartner(userId);
    if (!partner || post.coupleKey !== pair(userId, partner._id.toString())) {
      return res.status(403).json({ message: "Bạn không có quyền xem bình luận bài viết này" });
    }

    const rawComments = await Comment.find({ postId })
      .sort({ createdAt: 1 })
      .populate("authorId", "_id username displayName avatarUrl")
      .lean();

    const comments = rawComments.map((c) => ({
      ...c,
      content: decryptText(c.content),
    }));

    return res.status(200).json({ comments });
  } catch (error) {
    console.error("Lỗi khi lấy bình luận:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// 5. THÊM BÌNH LUẬN MỚI
export const createComment = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { postId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Mã bài viết không hợp lệ" });
    }

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ message: "Vui lòng nhập nội dung bình luận" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    const partner = await findPartner(userId);
    if (!partner || post.coupleKey !== pair(userId, partner._id.toString())) {
      return res.status(403).json({ message: "Bạn không có quyền bình luận bài viết này" });
    }

    const cleanContent = content.trim();
    const encryptedContent = encryptText(cleanContent);

    const comment = await Comment.create({
      postId,
      coupleKey: post.coupleKey,
      authorId: userId,
      content: encryptedContent,
    });

    post.commentsCount = (post.commentsCount || 0) + 1;
    await post.save();

    const populated = await Comment.findById(comment._id)
      .populate("authorId", "_id username displayName avatarUrl")
      .lean();

    const formattedComment = {
      ...populated,
      content: cleanContent,
    };

    chatEmitter.emit("new_comment", {
      postId,
      comment: formattedComment,
      commentsCount: post.commentsCount,
      coupleKey: post.coupleKey,
      participantIds: [post.authorId.toString(), post.partnerId.toString()],
    });

    return res.status(201).json({
      message: "Đã gửi bình luận!",
      comment: formattedComment,
    });
  } catch (error) {
    console.error("Lỗi khi bình luận:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi bình luận" });
  }
};

// 6. XÓA BÀI VIẾT
export const deletePost = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Mã bài viết không hợp lệ" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    if (post.authorId.toString() !== userId) {
      return res.status(403).json({ message: "Bạn chỉ có thể xóa bài viết do chính mình đăng" });
    }

    await Post.findByIdAndDelete(postId);
    await Comment.deleteMany({ postId });

    chatEmitter.emit("delete_post", {
      postId,
      coupleKey: post.coupleKey,
      participantIds: [post.authorId.toString(), post.partnerId.toString()],
    });

    return res.status(200).json({ message: "Đã xóa bài viết thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi xóa bài viết" });
  }
};
