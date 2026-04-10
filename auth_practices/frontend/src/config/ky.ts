import ky from "ky";
import { env } from "../constants/env";

const kyClient = ky.create({
  prefix: env.VITE_BACKEND_URL,
  credentials: "include",
  timeout: 10000, //10 seconds
  retry: 0,
});

export default kyClient;
