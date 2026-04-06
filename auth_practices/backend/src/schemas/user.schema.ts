import z from "zod";

export const signupSchema = z.object({
  username: z.string().min(1).min(3).max(30),
  email: z.string().min(1).email(),
  password: z.string().min(1).min(8).max(100),
});

export const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1).min(8).max(100),
});

export const resetPasswordSchema = z.object({
  email: z.string().min(1).email().lowercase().trim(),
});

export const newPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(1).min(8).max(100),
});
