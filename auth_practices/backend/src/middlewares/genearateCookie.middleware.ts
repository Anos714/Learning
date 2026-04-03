import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { SignupRes } from "../types/user.types.js";
import type { Response } from "express";
export const generateCookieToken = async (
  res: Response,
  statusCode: number,
  message: string,
  user: SignupRes["user"] | null = null,
) => {
  const accessToken = jwt.sign({ userId: user?._id }, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId: user?._id }, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "lax" : "none",
  } as const;

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(statusCode).json({
    success: true,
    message,
    user: {
      username: user?.username,
      email: user?.email,
      role: user?.role,
      isUserVerified: user?.isUserVerified,
      twoFactorEnabled: user?.twoFactorEnabled,
    },
  });
};
