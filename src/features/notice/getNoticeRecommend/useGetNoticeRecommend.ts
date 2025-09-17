import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NoticeApi } from "@/entities/notice/api/notice";
import { NoticeType } from "@/entities/notice/model/notice.type";
import { NOTICE_QUERY_KEYS } from "@/entities/notice/queryKey";

const getToken = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find(
    (cookie) => cookie.startsWith("access_token") || cookie.startsWith("token=")
  );
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const useGetNoticeRecommend = (
  options?: UseQueryOptions<NoticeType[], AxiosError, NoticeType[]>
) => {
  return useQuery({
    queryKey: NOTICE_QUERY_KEYS.notice.recommend(),
    queryFn: () => NoticeApi.getNoticeRecommend(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: false,
    enabled: !!getToken(), 
    ...options,
  });
};
