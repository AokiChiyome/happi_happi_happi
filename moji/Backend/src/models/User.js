import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // phải có giá trị
      unique: true, // độc nhất
      trim: true, // loại bỏ khoảng cách 2 đầu
      lowercase: true, // đưa về chữ thường
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    avatarUrl: {
      type: String, // link để hiện thị hình
    },
    avatarId: {
      type: String, // cloudinary public_id dùng để xóa hình
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    phone: {
      type: String,
      sparse: true, // cho phép null, nhưng phép trùng
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
