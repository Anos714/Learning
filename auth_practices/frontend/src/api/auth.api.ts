import kyClient from "../config/ky";
import type { SignupReq } from "../schema/signup";

export const getAuthUser = async () => {
  const res = await kyClient.get("/me").json();
  return res;
};

export const signupUser = async (formData: SignupReq) => {
  const res = await kyClient.post("/signup", { json: formData }).json();
  return res;
};
