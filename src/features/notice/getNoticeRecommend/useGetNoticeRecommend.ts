import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NoticeApi } from "@/entities/notice/api/notice";
import { NoticeType } from "@/entities/notice/model/notice.type";
import { NOTICE_QUERY_KEYS } from "@/entities/notice/queryKey";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

export const useGetNoticeRecommend = (
  options?: UseQueryOptions<NoticeType[], AxiosError, NoticeType[]>
) => {
  const { isLoggedIn } = useAuthStore();

  return useQuery({
    queryKey: NOTICE_QUERY_KEYS.notice.recommend(),
    queryFn: () => NoticeApi.getNoticeRecommend(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10, 
    retry: false,
    enabled: isLoggedIn,
    ...options,
  });
};
