import { BaseResponse } from "@/shared/types/BaseResponse";

export interface NoticeParams {
  page: number;
  size: number;
  sort: string[];
}

export interface NoticeType {
  title: string;
  url: string;
  organization: string;
  receptionPeriod: string;
  likeCount: number;
  supportField: string;
  targetAge: string;
  contactNumber: string;
  region: string;
  organizationType: string;
  startupHistory: string;
  departmentInCharge: string;
  content: string;
}

export interface NoticePage {
  content: NoticeType[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
}

export interface NoticeResponse extends BaseResponse<NoticePage> {}
