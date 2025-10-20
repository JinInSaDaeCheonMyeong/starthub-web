import { BaseResponse } from "@/shared/types/BaseResponse"

export type BmcTemplateType = 'STARTHUB' | 'STARTHUB_DARK' | 'SIMPLE' | 'COLOR';

export interface Question {
  questionNumber: number;
  answer: string | null;
}

// BMC 세션 응답 데이터 (메인 브랜치 버전)
export interface BmcResponseData {
  title: string;
  id: string
  sessionId: string
  businessIdea: string
  isCompleted: boolean
  createdAt: string
  questions: Question[];
}

export type BmcSessionResponse = BaseResponse<BmcResponseData[]>;

export interface CreateSessionRequest {
  title: string;
  templateType: BmcTemplateType;
}

export type CreateSessionResponse = BmcSessionResponse;

export interface CreateAnswerRequest {
  sessionId: number
  questionNumber: number
  answer: string
}

export type CreateAnswerResponse = BaseResponse<BmcResponseData>;

export interface ModifyBmcRequest {
  bmcId: number;
  title: string;
  customerSegments: string;
  valueProposition: string;
  channels: string;
  customerRelationships: string;
  revenueStreams: string;
  keyResources: string;
  keyActivities: string;
  keyPartners: string;
  costStructure: string;
  templateType: BmcTemplateType;
  imageUrl?: string;
}

export interface ModifyBmcData {
  id: number
  bmcId: number
  modificationRequest: string
  requestType: string
  isProcessed: boolean
  aiResponse: string
  createdAt: Date
  updatedBmc: BmcData
}

export type ModifyBmcResponse = BaseResponse<ModifyBmcData>;

export interface CreateBmcRequest {
  sessionId: number;
}

// BMC 캔버스 데이터 (메인 브랜치 버전)
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
  imageUrl?: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

export type CreateBmcResponse = BaseResponse<BmcData>;

export type UploadImageResponse = BaseResponse<BmcData>;

export type SessionDetailResponse = BaseResponse<BmcResponseData>;

export type QuestionListData = {
  questionNumber: number
  question: string
};

export type QuestionListResponse = BaseResponse<QuestionListData[]>;

export type CanvasesResponse = BaseResponse<BmcData[]>;

export type CanvasesDetailResponse = BaseResponse<BmcData>;

export type DeleteCanvasesResponse = BaseResponse<null>;

export type ModifyHistoryResponse = BaseResponse<BmcData>;