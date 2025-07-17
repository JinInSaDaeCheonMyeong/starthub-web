import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { postApi } from "@/entities/post/api/postApi";
import { POST_QUERY_KEYS } from "@/entities/post/queryKey";
import { postData, PagedResponse } from "@/entities/post/model/post.types";
import { AxiosError } from "axios";

export const useGetCompanyPost = (
  page = 1,
  size = 4,
  options?: UseQueryOptions<PagedResponse<postData>, AxiosError, PagedResponse<postData>>
) => {
  return useQuery({
    queryKey: [...POST_QUERY_KEYS.post.getCompanyPost, page, size],
    queryFn: () => postApi.getPostApp(page, size),
    staleTime: 1000 * 60 * 60, 
    gcTime: 1000 * 60 * 60, 
    ...options,
  });
};