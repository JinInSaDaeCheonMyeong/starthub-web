import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoticeApi } from "@/entities/notice/api/notice";
import {
  NoticeLikeResponse,
  NoticeType,
} from "@/entities/notice/model/notice.type";
import { NOTICE_QUERY_KEYS } from "@/entities/notice/queryKey";

export const useNoticeUnlike = () => {
  const queryClient = useQueryClient();

  return useMutation<NoticeLikeResponse, Error, number>({
    mutationFn: (announcementId: number) =>
      NoticeApi.deleteNoticeLike(announcementId),
    onSuccess: (data, announcementId) => {
      queryClient.setQueryData<NoticeType>(
        NOTICE_QUERY_KEYS.notice.getNoticeDetail(announcementId),
        (oldData) => {
          if (oldData) {
            return {
              ...oldData,
              isLiked: false,
              likeCount: data.likeCount,
            };
          }
          return oldData;
        }
      );

      queryClient.invalidateQueries({
        queryKey: ["notice", "all"],
      });
      queryClient.invalidateQueries({
        queryKey: NOTICE_QUERY_KEYS.notice.likes({}),
      });
    },
  });
};