import type { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isUserVerified: boolean;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string | undefined;
  tokenVersion: number;
  resetPasswordToken?: string | undefined;
  resetPasswordTokenExpiry?: Date | undefined;
}

//signup types
export interface SignupReq {
  username: string;
  email: string;
  password: string;
}
export interface SignupRes {
  success: boolean;
  message: string;
  user?: IUser;
}

//login types
export interface LoginReq {
  email: string;
  password: string;
}
export interface LoginRes {
  success: boolean;
  message: string;
  user?: IUser;
}
