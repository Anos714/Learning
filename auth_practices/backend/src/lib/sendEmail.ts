import { env } from "../config/env.js";
import { transporter } from "./emailTransporter.js";

export const sendEmail = async (to: string, subject: string, html: string) => {
  console.log(`
        port:${env.SMTP_PORT},
        host:${env.SMTP_HOST},
        user:${env.SMTP_USER},
        pass:${env.SMTP_PASS}
        `);

  try {
    const info = await transporter.sendMail({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error(error);
  }
};
