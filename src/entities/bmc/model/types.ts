import { BaseResponse } from "@/shared/types/BaseResponse"

export interface Question {
  questionNumber: number;
  answer: string | null;
}

export interface BmcResponseData {
  id: string
  sessionId: string
  title: string
  isCompleted: boolean
  createdAt: string
  questions: Question[];
}

export type BmcSessionResponse = BaseResponse<BmcResponseData[]>;

export interface CreateSessionRequest {
  title: string
}

export type CreateSessionResponse = BmcSessionResponse;

export interface CreateAnswerRequest {
  sessionId: string
  questionNumber: number
  answer: string
}

export type CreateAnswerResponse = BaseResponse<BmcResponseData>;

export interface ModifyBmcRequest {
  bmcId: string
  modificationRequest: string
  requestType: string
}

export interface ModifyBmcData {
  id: string
  bmcId: string
  modificationRequest: string
  requestType: string
  isProcessed: boolean
  aiResponse: string
  createdAt: string
  updatedBmc: BmcData
}

export type ModifyBmcResponse = BaseResponse<ModifyBmcData>;

export interface CreateBmcRequest {
  sessionId: string
}

export interface BmcData {
  id: string
  title: string
  keyPartners: string
  keyActivities: string
  keyResources: string
  valueProposition: string
  customerRelationships: string
  channels: string
  customerSegments: string
  costStructure: string
  revenueStreams: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

export type CreateBmcResponse = BaseResponse<BmcData>;

export type SessionDetailResponse = BaseResponse<BmcResponseData>;

export type QuestionListData = [
  string, string, string, string, string,
  string, string, string, string, string
];

export type QuestionListResponse = BaseResponse<QuestionListData>;

export type CanvasesResponse = BaseResponse<BmcData[]>;

export type CanvasesDetailResponse = BaseResponse<BmcData>;

export type DeleteCanvasesResponse = BaseResponse<null>;

export type ModifyHistoryResponse = BaseResponse<BmcData>;