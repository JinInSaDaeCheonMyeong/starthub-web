import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NoticeApi } from "@/entities/notice/api/notice";
import {
  NoticePage,
  NoticeParams,
} from "@/entities/notice/model/notice.type";
import { NOTICE_QUERY_KEYS } from "@/entities/notice/queryKey";

export const useGetLikedAnnouncements = (
  params: NoticeParams,
  options?: UseQueryOptions<NoticePage, AxiosError, NoticePage>
) => {
  return useQuery({
    queryKey: NOTICE_QUERY_KEYS.notice.likes(params),
    queryFn: () => NoticeApi.getLikedAnnouncements(params),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
};