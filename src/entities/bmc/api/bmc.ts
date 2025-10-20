import StartHubAxios from "../../../shared/api/customAxios/StartHubAxios";
import {
  BmcSessionResponse,
  CreateSessionRequest,
  CreateAnswerResponse,
  CreateAnswerRequest,
  ModifyBmcRequest,
  ModifyBmcResponse,
  CreateBmcRequest,
  CreateBmcResponse,
  SessionDetailResponse,
  QuestionListResponse,
  CanvasesResponse,
  CanvasesDetailResponse,
  DeleteCanvasesResponse,
  ModifyHistoryResponse,
  UploadImageResponse,
} from "../model/types";

export const bmcApi = {
  getSessions: (): Promise<BmcSessionResponse> =>
    StartHubAxios.get("/bmc/sessions"),

  createSessions: (data: CreateSessionRequest): Promise<CreateAnswerResponse> =>
    StartHubAxios.post("/bmc/sessions", data),

  createAnswer: (data: CreateAnswerRequest): Promise<CreateAnswerResponse> =>
    StartHubAxios.post("/bmc/sessions/answer", data),

  modifyBmc: (data: ModifyBmcRequest): Promise<ModifyBmcResponse> =>
    StartHubAxios.put("/bmc/canvases", data),

  uploadImage: (bmcId: number, formData: FormData): Promise<UploadImageResponse> =>
    StartHubAxios.post(`/bmc/canvases/${bmcId}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  generateBmc: (data: CreateBmcRequest): Promise<CreateBmcResponse> =>
    StartHubAxios.post("/bmc/generate", data, { timeout: 60000 }),

  getSessionDetail: (sessionId: string): Promise<SessionDetailResponse> =>
    StartHubAxios.get(`/bmc/sessions/${sessionId}`),

  getQuestions: (): Promise<QuestionListResponse> =>
    StartHubAxios.get("/bmc/questions"),

  getCanvases: (): Promise<CanvasesResponse> =>
    StartHubAxios.get("bmc/canvases"),

  getCanvasesDetail: (id: string): Promise<CanvasesDetailResponse> =>
    StartHubAxios.get(`/bmc/canvases/${id}`),

  deleteCanvases: (id: string): Promise<DeleteCanvasesResponse> =>
    StartHubAxios.delete(`/bmc/canvases/${id}`),

  getBmcModifyHistory: (id: string): Promise<ModifyHistoryResponse> =>
    StartHubAxios.get(`/bmc/canvases/${id}/history`),
};
