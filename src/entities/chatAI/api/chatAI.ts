import StartHubAxios from "@/shared/api/customAxios/StartHubAxios";
import { cookieUtils } from "@/shared/lib/utils/cookieUtils";
import {
  ChatSession,
  ChatSessionDetail,
  CreateSessionRequest,
  CreateSessionResponse,
  DeleteSessionResponse,
  GetSessionsResponse,
  StreamMessageRequest,
  UpdateSessionTitleRequest,
  UpdateSessionTitleResponse,
} from "../model/types";

export const ChatAIApi = {
  getSessions: async (): Promise<ChatSession[]> => {
    const res =
      await StartHubAxios.get<GetSessionsResponse>("/chatbot/sessions");
    const body: any = res;
    if (body && body.data !== undefined) return body.data as ChatSession[];
    return body as ChatSession[];
  },

  createSession: async (
    body: CreateSessionRequest,
  ): Promise<CreateSessionResponse> => {
    const res = await StartHubAxios.post<CreateSessionResponse>(
      "/chatbot/sessions",
      body,
    );
    const respBody: any = res;
    return respBody && respBody.data !== undefined ? respBody.data : respBody;
  },

  getSessionDetail: async (sessionId: number): Promise<ChatSessionDetail> => {
    const res = await StartHubAxios.get<ChatSessionDetail>(
      `/chatbot/sessions/${sessionId}`,
    );
    const respBody: any = res;
    return respBody && respBody.data !== undefined ? respBody.data : respBody;
  },

  deleteSession: async (sessionId: number): Promise<DeleteSessionResponse> => {
    const res = await StartHubAxios.delete<DeleteSessionResponse>(
      `/chatbot/sessions/${sessionId}`,
    );
    const respBody: any = res;
    return respBody && respBody.data !== undefined ? respBody.data : respBody;
  },

  updateSessionTitle: async (
    sessionId: number,
    body: UpdateSessionTitleRequest,
  ): Promise<UpdateSessionTitleResponse> => {
    const res = await StartHubAxios.patch<UpdateSessionTitleResponse>(
      `/chatbot/sessions/${sessionId}`,
      body,
    );
    const respBody: any = res;
    return respBody && respBody.data !== undefined ? respBody.data : respBody;
  },

  streamMessage: async (
    sessionId: number,
    { message, files }: StreamMessageRequest,
  ): Promise<ReadableStream<Uint8Array>> => {
    const formData = new FormData();
    formData.append("message", message);
    if (files) files.forEach((f) => formData.append("files", f));

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

    const token = cookieUtils.getAccessToken();

    const res = await fetch(
      `${baseUrl}/chatbot/sessions/${sessionId}/messages/stream`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "text/event-stream",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      },
    );

    if (!res.ok || !res.body) {
      throw new Error(`Stream request failed: ${res.status}`);
    }

    return res.body;
  },
};
