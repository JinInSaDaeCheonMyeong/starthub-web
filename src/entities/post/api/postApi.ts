import StartHubAxios from "@/shared/api/customAxios/StartHubAxios";
import { postDataResponse,postData } from "../model/post.types";

export const postApi = {
    getPostApp: async (): Promise<postData[]> => { 
        const {data} = await StartHubAxios.get<postDataResponse>(`/company/all`);
        return data.data;
    },
};
