import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    coupleKey: {
      type: String,
      index: true,
    },
    type: {
      type: String,
      enum: ["message", "dish", "post"],
      default: "message",
    },
    targetId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    emoji: {
      type: String,
      default: "⭐",
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Bookmark", bookmarkSchema);
