import { env } from "../config/env.js";
import type { IUser } from "../types/user.types.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "./sendEmail.js";
import { welcomeTemplate } from "../templates/welcome.template.js";

export const verifyEmail = async (user: IUser) => {
  try {
    const verifyEmail = jwt.sign(
      { sub: user._id },
      env.JWT_EMAIL_VERIFY_SECRET,
      {
        expiresIn: "10m",
      },
    );

    const verifyURL = `${env.APP_URL}/api/user/verify-email?token=${verifyEmail}`;
    await sendEmail(
      user.email,
      "Welcome to Anos Solutions",
      welcomeTemplate(user.username, verifyURL),
    );
  } catch (error) {
    console.error(error);
  }
};
