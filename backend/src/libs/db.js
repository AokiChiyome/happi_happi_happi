import mongoose from "mongoose";

// Caching connection để tái sử dụng trên môi trường Serverless (Vercel) và Local
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_CONNECTIONSTRING, opts)
      .then((mongooseInstance) => {
        console.log("ket noi thanh cong voi csdl");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("khong ket noi duoc voi csdl", error);
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
