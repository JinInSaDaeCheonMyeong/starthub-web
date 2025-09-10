import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NoticeApi } from "@/entities/notice/api/notice";
import { NoticePage, NoticeParams } from "@/entities/notice/model/notice.type";
import { NOTICE_QUERY_KEYS } from "@/entities/notice/queryKey";

export const useGetNotice = (
  params: NoticeParams,
  options?: UseQueryOptions<NoticePage, AxiosError, NoticePage>
) => {
  return useQuery({
    queryKey: NOTICE_QUERY_KEYS.notice.all(params),
    queryFn: () => NoticeApi.getNoticeAll(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: false,
    ...options,
  });
};