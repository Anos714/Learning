import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(1).min(3).max(100).trim(),
  email: z.email().min(1).lowercase().trim(),
  password: z.string().min(1).min(8),
});

export type SignupReq = z.infer<typeof signupSchema>;
