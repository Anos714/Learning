import type {
  LoginReq,
  LoginRes,
  SignupReq,
  SignupRes,
} from "../types/user.types.js";
import {
  loginSchema,
  newPasswordSchema,
  resetPasswordSchema,
  signupSchema,
} from "../schemas/user.schema.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { env } from "../config/env.js";
import {
  createAccessToken,
  createRefreshToken,
} from "../lib/genearateCookie.js";
import { verifyEmail } from "../lib/emailVerification.js";
import jwt from "jsonwebtoken";
import { verifyRefreshToken } from "../lib/token.js";
import { sendEmail } from "../lib/sendEmail.js";
import crypto from "crypto";
import { resetPasswordTemplate } from "../templates/resetPassword.template.js";

export const signupUser = async (
  req: Request<{}, {}, SignupReq>,
  res: Response<SignupRes>,
) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid input data" });
  }
  const { username, email, password } = result.data;
  try {
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const checkExistingUsername = await User.findOne({ username });
    if (checkExistingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await verifyEmail(newUser);

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        isUserVerified: newUser.isUserVerified,
        twoFactorEnabled: newUser.twoFactorEnabled,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const signinUser = async (
  req: Request<{}, {}, LoginReq>,
  res: Response<LoginRes>,
) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }
  const { email, password } = result.data;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isUserVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before signing in",
      });
    }

    const accessToken = createAccessToken(
      user._id.toString(),
      user.tokenVersion,
      user.role,
    );
    const refreshToken = createRefreshToken(
      user._id.toString(),
      user.tokenVersion,
    );

    const cookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "lax" : "none",
    } as const;

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Signin successful",
      accessToken,
      user: {
        username: user?.username,
        email: user?.email,
        role: user?.role,
        isUserVerified: user?.isUserVerified,
        twoFactorEnabled: user?.twoFactorEnabled,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const signoutUser = (req: Request, res: Response) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "lax" : "none",
    } as const;

    res.clearCookie("refreshToken", {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ success: true, message: "Signout successful" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const verifyEmailToken = async (req: Request, res: Response) => {
  const { token } = req.query;
  console.log(token);

  if (!token || typeof token !== "string") {
    return res.status(400).json({ success: false, message: "Invalid token" });
  }
  try {
    const payload = jwt.verify(token, env.JWT_EMAIL_VERIFY_SECRET);

    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }
    if (user.isUserVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Email already verified" });
    }
    user.isUserVerified = true;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const refreshHandler = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No refresh token provided" });
  }

  const payload = verifyRefreshToken(token);
  console.log("payload", payload);

  if (!payload) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid refresh token" });
  }
  const user = await User.findById(payload.sub);
  if (!user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }
  if (user.tokenVersion !== payload.tokenVersion) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid refresh token" });
  }

  const newAccessToken = createAccessToken(
    user._id.toString(),
    user.tokenVersion,
    user.role,
  );
  const newRefreshToken = createRefreshToken(
    user._id.toString(),
    user.tokenVersion,
  );

  const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "lax" : "none",
  } as const;

  res.cookie("refreshToken", newRefreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    accessToken: newAccessToken,
    user: {
      username: user?.username,
      email: user?.email,
      role: user?.role,
      isUserVerified: user?.isUserVerified,
      twoFactorEnabled: user?.twoFactorEnabled,
    },
  });
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  const result = resetPasswordSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }
  const { email } = result.data;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const resetToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  const generateResetLink = `${env.APP_URL}/api/user/reset-password?token=${rawToken}`;
  await sendEmail(
    user.email,
    "Password Reset",
    resetPasswordTemplate(user.username, generateResetLink),
  );

  return res.status(200).json({
    success: true,
    message: "Password reset link sent to your email",
  });
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  const result = newPasswordSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid password format" });
  }
  const { token, newPassword } = result.data;
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;
    user.tokenVersion += 1;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
