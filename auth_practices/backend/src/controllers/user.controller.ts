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
import { sendEmail } from "../lib/sendEmail.js";
import { welcomeTemplate } from "../templates/welcome.template.js";
import { env } from "../config/env.js";
import { generateCookieToken } from "../middlewares/genearateCookie.middleware.js";

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

    await sendEmail(
      email,
      "Welcome to Anos Solutions",
      welcomeTemplate(username),
    );

    await generateCookieToken(
      res,
      201,
      "User registered successfully",
      newUser,
    );
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

    await generateCookieToken(res, 200, "Signin successful", user);
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
