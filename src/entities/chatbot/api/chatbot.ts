import StartHubAxios from "@/shared/api/customAxios/StartHubAxios";
import { BaseResponse } from "@/shared/types/BaseResponse";
import { ChatSession } from "../model/types";

export const chatbotApi = {
  getSessions: (): Promise<BaseResponse<ChatSession[]>> =>
    StartHubAxios.get("/chatbot/sessions"),
};
