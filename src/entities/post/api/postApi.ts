import StartHubAxios from "@/shared/api/customAxios/StartHubAxios";
import { BaseResponse } from "@/shared/types/BaseResponse";
import { postData, PagedResponse } from "../model/post.types";

export const postApi = {
  getPostApp: async (page = 0, size = 10): Promise<PagedResponse<postData>> => {
    const res = await StartHubAxios.get<BaseResponse<PagedResponse<postData>>>(`/recruits`, {
      params: { page, size },
    });
    
    return res.data.data || {
      content: [],
      totalElements: 0,
      totalPages: 0,
      number: 0,
      size: 0,
      first: true,
      last: true,
      empty: true,
      numberOfElements: 0,
      pageable: {
        pageNumber: 0,
        pageSize: size,
        offset: 0,
        paged: true,
        unpaged: false,
        sort: { sorted: false, empty: true, unsorted: true }
      },
      sort: { sorted: false, empty: true, unsorted: true }
    };
  },
};