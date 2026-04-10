import kyClient from "../config/ky";
import { env } from "../constants/env";

export const getAuthUser = async () => {
  const res = await kyClient.get(`${env.VITE_BACKEND_URL}/me`).json();
  return res;
};
