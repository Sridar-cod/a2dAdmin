import mongoose from "mongoose";

export const connectMongoDB = async () =>
  await mongoose.connect(process.env.MONGO_URI);
