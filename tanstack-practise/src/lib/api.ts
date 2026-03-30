import axios from "axios";
import type { AddPostReq, PostRes } from "../types/query";

export const addNewPost = async (data: AddPostReq): Promise<PostRes> => {
  const API_URL = "https://dummyjson.com/posts/add";
  const res = await axios.post(API_URL, data);
  return res.data;
};
