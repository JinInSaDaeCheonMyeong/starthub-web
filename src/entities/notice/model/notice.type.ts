export interface NoticeParams {
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface NoticeDetailParams {
  id: number;
  includeLikeStatus: boolean;
}

export interface NoticeSearchParams {
  title?: string;
  supportField?: string;
  targetRegion?: string;
  targetGroup?: string;
  targetAge?: string;
  businessExperience?: string;
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface NoticeType {
  id: number;
  title: string;
  url: string;
  organization: string;
  receptionPeriod: string;
  status: "ACTIVE" | "INACTIVE";
  likeCount: number;
  supportField: string;
  targetAge: string;
  contactNumber: string;
  region: string;
  organizationType: string;
  startupHistory: string;
  departmentInCharge: string;
  content: string;
  isLiked: boolean;
}

export interface NoticePage {
  content: NoticeType[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
}


export interface NoticeLikeResponse {
  status: "LIKE" | "UNLIKE";
  message: string;
  likeCount: number;
}
