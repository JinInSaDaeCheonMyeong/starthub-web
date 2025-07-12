import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { postApi } from "@/entities/post/api/postApi";
import { POST_QUERY_KEYS } from "@/entities/post/queryKey";
import { postData } from "@/entities/post/model/post.types";
import { AxiosError } from "axios";

export const useGetCompanyPost = (
  options?: UseQueryOptions<postData[], AxiosError,postData[]>
) => {
  return useQuery({
    queryKey: POST_QUERY_KEYS.post.getCompanyPost,
    queryFn: () => postApi.getPostApp(),
    staleTime: 1000 * 60 * 60, 
    gcTime: 1000 * 60 * 60, 
    ...options,
  });
};