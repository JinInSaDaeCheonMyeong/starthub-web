import StartHubAxios from "@/shared/api/customAxios/StartHubAxios";
import { BaseResponse } from "@/shared/types/BaseResponse";
import { postData, PagedResponse } from "../model/post.types";

export const postApi = {
  getPostApp: async (page = 0, size = 10): Promise<PagedResponse<postData>> => {
    const res = await StartHubAxios.get<BaseResponse<PagedResponse<postData>>>(`recruits`, {
      params: { page, size },
    });
    return res.data.data;
  },
};