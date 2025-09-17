import { NoticeParams, NoticeSearchParams } from "./model/notice.type";

export const NOTICE_QUERY_KEYS = {
  notice: {
    all: (params: NoticeParams) => ["notice", "all", params] as const,
    search: (params: NoticeSearchParams) => ["notice", "search", params] as const,
    likes: (params: NoticeParams) => ["notice", "likes", params] as const,
    getNoticeDetail: (id: number) => ["notice", "detail", id] as const,
    recommend: () => ["notice", "recommend"] as const,
  },
};