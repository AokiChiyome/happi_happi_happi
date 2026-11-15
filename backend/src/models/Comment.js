import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
    coupleKey: {
      type: String,
      required: true,
      index: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Nội dung bình luận (được mã hóa AES-256-GCM trong DB)
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

commentSchema.index({ postId: 1, createdAt: 1 });

export default mongoose.model("Comment", commentSchema);
