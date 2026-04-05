import { access } from "node:fs";
import type {
  LoginReq,
  LoginRes,
  SignupReq,
  SignupRes,
} from "../types/user.types.js";
import { loginSchema, signupSchema } from "../schemas/user.schema.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { env } from "../config/env.js";
import {
  createAccessToken,
  createRefreshToken,
} from "../middlewares/genearateCookie.middleware.js";
import { verifyEmail } from "../lib/emailVerification.js";
import jwt from "jsonwebtoken";

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
    res.clearCookie("accessToken", {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });
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

//1:00:03
