import { useMutation } from "@tanstack/react-query";
import { addNewPost } from "../lib/api";

const useAddPost = () => {
  const { data, isPending, error } = useMutation({
    mutationFn: addNewPost,
  });
  return { data, isPending, error };
};
export default useAddPost;
