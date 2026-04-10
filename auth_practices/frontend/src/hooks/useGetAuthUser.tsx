import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../api/auth.api";

const useGetAuthUser = () => {
  const {
    data: authUserData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getAuthUser,
  });
  return { authUserData, isLoading, error };
};
export default useGetAuthUser;
