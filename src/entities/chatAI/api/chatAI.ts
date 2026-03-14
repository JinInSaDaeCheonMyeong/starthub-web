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
  /** GET /chatbot/sessions — 세션 목록 조회 */
  getSessions: async (): Promise<ChatSession[]> => {
    const res =
      await StartHubAxios.get<GetSessionsResponse>("/chatbot/sessions");
    return res.data.data;
  },

  /** POST /chatbot/sessions — 세션 생성 */
  createSession: async (
    body: CreateSessionRequest,
  ): Promise<CreateSessionResponse> => {
    const res = await StartHubAxios.post<CreateSessionResponse>(
      "/chatbot/sessions",
      body,
    );
    return res.data;
  },

  /** GET /chatbot/sessions/{sessionId} — 세션 상세 조회 */
  getSessionDetail: async (sessionId: number): Promise<ChatSessionDetail> => {
    const res = await StartHubAxios.get<ChatSessionDetail>(
      `/chatbot/sessions/${sessionId}`,
    );
    return res.data;
  },

  /** DELETE /chatbot/sessions/{sessionId} — 세션 삭제 */
  deleteSession: async (sessionId: number): Promise<DeleteSessionResponse> => {
    const res = await StartHubAxios.delete<DeleteSessionResponse>(
      `/chatbot/sessions/${sessionId}`,
    );
    return res.data;
  },

  /** PATCH /chatbot/sessions/{sessionId} — 세션 제목 수정 */
  updateSessionTitle: async (
    sessionId: number,
    body: UpdateSessionTitleRequest,
  ): Promise<UpdateSessionTitleResponse> => {
    const res = await StartHubAxios.patch<UpdateSessionTitleResponse>(
      `/chatbot/sessions/${sessionId}`,
      body,
    );
    return res.data;
  },

  streamMessage: async (
    sessionId: number,
    { message, files }: StreamMessageRequest,
  ): Promise<ReadableStream<Uint8Array>> => {
    const formData = new FormData();
    formData.append("message", message);
    if (files) files.forEach((f) => formData.append("files", f));

    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, ""); 

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
