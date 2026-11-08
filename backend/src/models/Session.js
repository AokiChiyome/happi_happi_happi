import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//tự động xóa thời gian hết hạn
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // nó sẽ tự động xóa token trong bao nhiêu ngày
export default mongoose.model("Session", sessionSchema);
