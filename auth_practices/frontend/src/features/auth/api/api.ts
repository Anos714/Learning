import { api } from "../../../lib/axios";

export const signupUser = async (formData) => {
  const res = await api.post("/signup", formData);
  return res.data;
};
