import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["love", "heart", "yummy", "sad", "like"],
      default: "love",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    // Cặp đôi sở hữu bài viết (ngăn cách ly tuyệt đối với người khác)
    coupleKey: {
      type: String,
      required: true,
      index: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // Nội dung bài viết (được mã hóa AES-256-GCM trong DB)
    content: {
      type: String,
      required: true,
    },
    // Danh sách ảnh hoặc ảnh chụp kỷ niệm
    images: {
      type: [String],
      default: [],
    },
    // Món ăn đính kèm từ hòm ẩm thực (nếu có)
    foodDish: {
      name: { type: String },
      category: { type: String },
      emoji: { type: String },
    },
    // Cảm xúc đi kèm (ví dụ: đang đói, đang hạnh phúc, nhớ người yêu...)
    feeling: {
      type: String,
      default: "",
    },
    // Thả tim, like, biểu cảm
    reactions: {
      type: [reactionSchema],
      default: [],
    },
    // Bộ đếm bình luận
    commentsCount: {
      type: Number,
      default: 0,
    },
    // Khoảnh khắc 24h (24h Couple Story / Moment - FB & Telegram style)
    isStory: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Index phục vụ tải dòng thời gian nhanh chóng theo thứ tự mới nhất
postSchema.index({ coupleKey: 1, createdAt: -1 });
postSchema.index({ coupleKey: 1, isStory: 1, expiresAt: 1 });

export default mongoose.model("Post", postSchema);
