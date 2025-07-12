import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { userApi } from "@/entities/user/api/user";
import { AxiosError } from "axios";
import { UserData } from "@/entities/user/model/types";
import { USER_QUERY_KEYS } from "@/entities/user/queryKey";
import Cookies from "js-cookie";

export const useGetMyProfile = (
  options?: UseQueryOptions<UserData, AxiosError, UserData>
) => {
  const token = Cookies.get("access_token");
  
  return useQuery({
    queryKey: USER_QUERY_KEYS.user.getUserProfile,
    queryFn: () => userApi.userProfile(),
    staleTime: 1000 * 60 * 60, 
    gcTime: 1000 * 60 * 60,
    enabled: !!token,
    retry: false, 
    ...options,
  });
};