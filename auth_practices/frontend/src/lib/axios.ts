import axios from "axios";
import { env } from "../constants/env";

export const api = axios.create({
  url: env.VITE_BACKEND_URL,
  withCredentials: true,
});
