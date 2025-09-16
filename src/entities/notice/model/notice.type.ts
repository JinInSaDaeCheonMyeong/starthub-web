export interface NoticeParams {
  page?: number;
  size?: number;
  sort?: string | string[];
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

