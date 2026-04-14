import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be atleast 3 characters long")
    .max(30, "Username cannot be more than 30 characters")
    .trim(),
  email: z.string().min(1, "Email is required").lowercase().trim().email(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be atleast 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      "Password must include uppercase, lowercase, number, and special character",
    ),
});

export type SignupInput = z.infer<typeof signupSchema>;
