import { BaseResponse } from "@/shared/types/BaseResponse";

export type DocumentType = string;
export type ToneType = string;
export type DocumentStatus = string;

export interface DocumentSummary {
  id: number;
  title: string;
  documentType: DocumentType;
  status: DocumentStatus;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentDetail {
  id: number;
  title: string;
  documentType: DocumentType;
  toneType: ToneType;
  content: string;
  wordCount: number;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentQuestionAnswer {
  questionId: number;
  answer: string;
}

export interface DocumentQuestion {
  id: number;
  questionText: string;
  answerText: string;
  orderIndex: number;
  required: boolean;
}

export interface DocumentHistoryItem {
  id: number;
  description: string;
  createdAt: string;
}

export interface CreateDocumentRequest {
  title: string;
  documentType: DocumentType;
}

export interface UpdateDocumentRequest {
  title: string;
  content: string;
}

export interface GenerateDocumentRequest {
  answers: DocumentQuestionAnswer[];
  toneType: ToneType;
}

export interface AiEditDocumentRequest {
  prompt: string;
}

export interface UploadTemplateRequest {
  file: string;
}

export type UploadTemplatePayload = UploadTemplateRequest | FormData;

export type DocumentDetailResponse = BaseResponse<DocumentDetail>;
export type DocumentListResponse = BaseResponse<DocumentSummary[]>;
export type DocumentDeleteResponse = BaseResponse<null>;
export type DocumentQuestionListResponse = BaseResponse<DocumentQuestion[]>;
export type DocumentHistoryResponse = BaseResponse<DocumentHistoryItem[]>;
