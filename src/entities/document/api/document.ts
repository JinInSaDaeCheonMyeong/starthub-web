import StartHubAxios from "@/shared/api/customAxios/StartHubAxios";
import type {
  AiEditDocumentRequest,
  CreateDocumentRequest,
  DocumentDeleteResponse,
  DocumentDetailResponse,
  DocumentHistoryResponse,
  DocumentListResponse,
  DocumentQuestionListResponse,
  GenerateDocumentRequest,
  UpdateDocumentRequest,
  UploadTemplatePayload,
} from "../model/document.type";

export const documentApi = {
  getDocuments: (): Promise<DocumentListResponse> =>
    StartHubAxios.get("/documents"),

  getDocumentDetail: (documentId: number): Promise<DocumentDetailResponse> =>
    StartHubAxios.get(`/documents/${documentId}`),

  updateDocument: (
    documentId: number,
    data: UpdateDocumentRequest,
  ): Promise<DocumentDetailResponse> =>
    StartHubAxios.put(`/documents/${documentId}`, data),

  deleteDocument: (documentId: number): Promise<DocumentDeleteResponse> =>
    StartHubAxios.delete(`/documents/${documentId}`),

  createDocument: (
    data: CreateDocumentRequest,
  ): Promise<DocumentDetailResponse> => StartHubAxios.post("/documents", data),

  uploadTemplate: (
    documentId: number,
    data: UploadTemplatePayload,
  ): Promise<DocumentQuestionListResponse> => {
    if (data instanceof FormData) {
      return StartHubAxios.post(
        `/documents/${documentId}/upload-template`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
    }
    return StartHubAxios.post(`/documents/${documentId}/upload-template`, data);
  },

  generateDocument: (
    documentId: number,
    data: GenerateDocumentRequest,
  ): Promise<DocumentDetailResponse> =>
    StartHubAxios.post(`/documents/${documentId}/generate`, data),

  aiEditDocument: (
    documentId: number,
    data: AiEditDocumentRequest,
  ): Promise<DocumentDetailResponse> =>
    StartHubAxios.post(`/documents/${documentId}/ai-edit`, data),

  getDocumentQuestions: (
    documentId: number,
  ): Promise<DocumentQuestionListResponse> =>
    StartHubAxios.get(`/documents/${documentId}/questions`),

  getDocumentHistory: (documentId: number): Promise<DocumentHistoryResponse> =>
    StartHubAxios.get(`/documents/${documentId}/history`),
};
