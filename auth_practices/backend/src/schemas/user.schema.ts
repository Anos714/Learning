import { PassThrough } from "node:stream";
import z from "zod";

export const userSchema = z.object({
  username: z.string().min(1).min(3).max(30),
  email: z.string().min(1).email(),
  password: z.string().min(1).min(8).max(100),
});
