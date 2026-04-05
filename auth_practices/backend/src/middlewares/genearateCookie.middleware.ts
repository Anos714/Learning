import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const createAccessToken = (
  userId: string,
  tokenVersion: number,
  role: "user" | "admin",
) => {
  const payload = { sub: userId, role, tokenVersion };

  const accessToken = jwt.sign({ payload }, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  return accessToken;
};

export const createRefreshToken = (userId: string, tokenVersion: number) => {
  const payload = { sub: userId, tokenVersion };

  const refreshToken = jwt.sign({ payload }, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return refreshToken;
};
