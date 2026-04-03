import type { SignupReq, SignupRes } from "../types/user.types.js";
import { userSchema } from "../schemas/user.schema.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateCookieToken } from "../middlewares/genearateCookie.middleware.js";
import type { Request, Response } from "express";

export const SignupUser = async (
  req: Request<{}, {}, SignupReq>,
  res: Response<SignupRes>,
) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ success: false, message: "Invalid input" });
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
