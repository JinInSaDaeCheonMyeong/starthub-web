import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NoticeApi } from "@/entities/notice/api/notice";
import { NoticeType } from "@/entities/notice/model/notice.type";
import { NOTICE_QUERY_KEYS } from "@/entities/notice/queryKey";

export const useGetNoticeDetail = (
  id: number,
  includeLikeStatus: boolean,
  options?: UseQueryOptions<NoticeType, AxiosError, NoticeType>
) => {
  return useQuery({
    queryKey: NOTICE_QUERY_KEYS.notice.getNoticeDetail(id),
    queryFn: () => {
      return NoticeApi.getNoticeDetail({ id, includeLikeStatus });
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 20,
    enabled: !!id,
    ...options,
  });
};
