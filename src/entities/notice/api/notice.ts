import StartHubAxios from "@/shared/api/customAxios/StartHubAxios";
import { NoticeResponse, NoticeParams, NoticePage, NoticeSearchParams } from "../model/notice.type";

export const NoticeApi = {
  getNoticeAll: async (params: NoticeParams): Promise<NoticePage> => {
    const res = await StartHubAxios.get<NoticeResponse>("/announcements", {
      params,
    });
    return res.data; 
  },
  getNoticeSearch: async(params : NoticeSearchParams): Promise<NoticePage> => {
    const res = await StartHubAxios.get<NoticeResponse>("/announcements/search", {
      params,
    });
    return res.data; 
  },
};

