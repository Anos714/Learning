import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../lib/token.js";
import { User } from "../models/user.model.js";
import type { AuthRequest } from "../types/express.js";

export const isUserAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, Please sign in",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Please provide token",
    });
  }

  try {
    const payload = verifyAccessToken(token);

    if (!payload) {
      return res.status(400).json({
        success: false,
        message: "Inavlid or expired token",
      });
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.status(401).json({
        success: false,
        message: "Token invalidated",
      });
    }

    const authReq = req as AuthRequest;

    authReq.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.username,
      role: user.role,
      tokenVersion: user.tokenVersion,
      isUserVerified: user.isUserVerified,
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      success: false,
      message: "Authentication error",
    });
  }
};
