import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    mongoose.connect(env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed");
    process.exit(1);
  }
};
