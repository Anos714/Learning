import { useMutation } from "@tanstack/react-query";
import { addNewPost } from "../lib/api";

const useAddPost = () => {
  const {} = useMutation({
    mutationFn: addNewPost,
  });
  return {};
};
export default useAddPost;
