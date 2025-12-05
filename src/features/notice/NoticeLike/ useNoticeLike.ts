import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoticeApi } from "@/entities/notice/api/notice";
import { NoticeLikeResponse, NoticeType } from "@/entities/notice/model/notice.type";
import { NOTICE_QUERY_KEYS } from "@/entities/notice/queryKey";

export const useNoticeLike = () => {
  const queryClient = useQueryClient();

  return useMutation<
    NoticeLikeResponse,
    Error,
    number,
    { previousNotice: NoticeType | undefined }
  >({
    mutationFn: (announcementId: number) =>
      NoticeApi.postNoticeLike(announcementId),
    onMutate: async (announcementId) => {
      await queryClient.cancelQueries({
        queryKey: NOTICE_QUERY_KEYS.notice.getNoticeDetail(announcementId),
      });

      const previousNotice = queryClient.getQueryData<NoticeType>(
        NOTICE_QUERY_KEYS.notice.getNoticeDetail(announcementId)
      );

      queryClient.setQueryData<NoticeType>(
        NOTICE_QUERY_KEYS.notice.getNoticeDetail(announcementId),
        (oldData) => {
          if (oldData) {
            return {
              ...oldData,
              isLiked: true,
            };
          }
          return oldData;
        }
      );

      return { previousNotice };
    },
    onError: (_error, announcementId, context) => {
      if (context?.previousNotice) {
        queryClient.setQueryData(
          NOTICE_QUERY_KEYS.notice.getNoticeDetail(announcementId),
          context.previousNotice
        );
      }
    },
    onSuccess: (data, announcementId) => {
      queryClient.setQueryData<NoticeType>(
        NOTICE_QUERY_KEYS.notice.getNoticeDetail(announcementId),
        (oldData) => {
          if (oldData) {
            return {
              ...oldData,
              isLiked: true,
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