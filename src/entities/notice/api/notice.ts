import StartHubAxios from "@/shared/api/customAxios/StartHubAxios";
import {
  NoticeParams,
  NoticePage,
  NoticeSearchParams,
  NoticeDetailParams,
  NoticeType,
  NoticeLikeResponse,
} from "../model/notice.type";

export const NoticeApi = {
  getNoticeAll: async (params: NoticeParams): Promise<NoticePage> => {
    const res = await StartHubAxios.get("/announcements", {
      params,
    });
    return res.data;
  },
  getNoticeSearch: async (params: NoticeSearchParams): Promise<NoticePage> => {
    const res = await StartHubAxios.get("/announcements/search", {
      params,
    });
    return res.data;
  },
  getNoticeDetail: async (params: NoticeDetailParams): Promise<NoticeType> => {
    const res = await StartHubAxios.get(`/announcements/${params.id}`, {
      params,
    });
    return res.data;
  },
  getNoticeRecommend: async (): Promise<NoticeType[]> => {
    const res = await StartHubAxios.get(`/announcements/recommendations`);
    return res.data;
  },
  postNoticeLike: async (announcementId: number): Promise<NoticeLikeResponse> => {
    const res = await StartHubAxios.post(`/announcements/${announcementId}/likes`);
    return res.data;
  },
  deleteNoticeLike: async (announcementId: number): Promise<NoticeLikeResponse> => {
    const res = await StartHubAxios.delete(`/announcements/${announcementId}/likes`);
    return res.data;
  },
  getLikedAnnouncements: async (params: NoticeParams): Promise<NoticePage> => {
    const res = await StartHubAxios.get("/announcements/likes", {
      params,
    });
    return res.data;
  },
  getLikedAnnouncements: async (params: NoticeParams): Promise<NoticePage> => {
    const res = await StartHubAxios.get("/announcements/likes", {
      params,
    });
    return res.data;
  },
};
