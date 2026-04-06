import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as jwt.JwtPayload;
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    return null;
  }
};
