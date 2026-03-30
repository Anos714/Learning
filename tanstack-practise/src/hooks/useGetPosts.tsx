import { useQuery } from "@tanstack/react-query";
import type { PostRes } from "../types/query";
import axios from "axios";

const useGetPosts = () => {
  const API_URL = "https://dummyjson.com/posts";

  const {
    data: postData,
    isLoading,
    refetch,
    error,
  } = useQuery<PostRes[]>({
    queryKey: ["posts"],
    queryFn: async (): Promise<PostRes[]> => {
      const res = await axios.get(API_URL);
      return res.data.posts;
    },
    retry: false, // disable retrying failed requests
  });
  return { postData, isLoading, error, refetch };
};
export default useGetPosts;
