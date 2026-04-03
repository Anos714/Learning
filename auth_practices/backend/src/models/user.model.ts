import { Schema, model } from "mongoose";
import type { IUser } from "../types/user.types.js";

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isUserVerified: {
      type: Boolean,
      default: false,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: {
      type: String,
      default: undefined,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
    resetPasswordToken: {
      type: String,
      default: undefined,
    },
    resetPasswordTokenExpiry: {
      type: Date,
      default: undefined,
    },
  },
  { timestamps: true },
);

export const User = model("User", UserSchema);
