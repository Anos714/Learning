import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../types/express.js";

export const isUserAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  if (user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access, Admin rights required",
    });
  }
  next();
  try {
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      success: false,
      message: "Authorization error",
    });
  }
};
