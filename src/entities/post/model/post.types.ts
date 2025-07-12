import { BaseResponse } from "@/shared/types/BaseResponse";

export interface postData {
  id: 0;
  companyName: string;
  companyDescription: string;
  companyCategory:
    | "CONTENT_MEDIA"
    | "FINTECH"
    | "HEALTHCARE_BIO"
    | "EDUCATION_EDUTECH"
    | "IT_SOFTWARE"
    | "ECOMMERCE"
    | "ETC";
  logoImage: string;
}

export type postDataResponse= BaseResponse<postData[]>;
