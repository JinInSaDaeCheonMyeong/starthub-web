import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NoticeApi } from "@/entities/notice/api/notice";
import {
  NoticePage,
  NoticeSearchParams,
} from "@/entities/notice/model/notice.type";
import { NOTICE_QUERY_KEYS } from "@/entities/notice/queryKey";

export const useGetNoticeSearch = (
  params: NoticeSearchParams,
  options?: UseQueryOptions<NoticePage, AxiosError, NoticePage>
) => {
  return useQuery({
    queryKey: NOTICE_QUERY_KEYS.notice.search(params),
    queryFn: () => NoticeApi.getNoticeSearch(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: false,
    ...options,
  });
};
