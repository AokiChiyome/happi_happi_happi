import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("ket noi thanh cong voi csdl");
  } catch (error) {
    console.log("khong ket noi duoc voi csdl", error);
    process.exit(1);
  }
};
