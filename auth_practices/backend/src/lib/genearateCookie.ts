import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import crypto from "crypto";

export const createAccessToken = (
  userId: string,
  tokenVersion: number,
  role: "user" | "admin",
) => {
  const payload = { sub: userId, role, tokenVersion };

  const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  return accessToken;
};

export const createRefreshToken = (userId: string, tokenVersion: number) => {
  const payload = { sub: userId, tokenVersion, jti: crypto.randomUUID() };

  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return refreshToken;
};
