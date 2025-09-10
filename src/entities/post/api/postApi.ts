import StartHubAxios from "@/shared/api/customAxios/StartHubAxios";
import {postData } from "../model/post.types";
import { BaseResponse } from "@/shared/types/BaseResponse";

export const postApi = {
    getPostApp: async (): Promise<postData[]> => {
      const res: BaseResponse<postData[]> = await StartHubAxios.get(`/company/all`);
      return res.data;
    },
};