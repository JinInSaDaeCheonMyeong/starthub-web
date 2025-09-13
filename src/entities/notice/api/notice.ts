import StartHubAxios from "@/shared/api/customAxios/StartHubAxios";
import { NoticeResponse, NoticeParams, NoticePage } from "../model/notice.type";

export const NoticeApi = {
  getNoticeAll: async (params: NoticeParams): Promise<NoticePage> => {
    const res = await StartHubAxios.get<NoticeResponse>("/announcements", {
      params,
    });
    return res.data;
  },
};

