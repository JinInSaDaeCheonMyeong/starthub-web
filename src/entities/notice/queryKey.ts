import { NoticeParams } from "./model/notice.type";

export const NOTICE_QUERY_KEYS = {
  notice: {
    all: (params: NoticeParams) => ["notice", "all", params] as const,
  },
};
