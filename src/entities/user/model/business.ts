
export interface BusinessFormData {
  name: string;
  companyDescription: string;
  category: string;
  businessDescription: string;
  pageUrl: string;
  email: string;
  tel: string;
  address: string;
  employeeCount: number;
  logoImage: string;
}

export interface BusinessResponse {
  data: {
    id: number;
    companyName: string;
    companyDescription: string;
    companyCategory: "IT_SOFTWARE";
    businessDescription: string;
    founderId: number;
    founderName: string;
    companyUrl: string;
    contactEmail: string;
    contactNumber: string;
    address: string;
    employeeCount: number;
    logoImage: string;
    createdAt: string;
  };
  status: string;
  message: string;
  statusCode: number;
}

export interface BusinessListResponse {
  data: Array<{
    id: number;
    companyName: string;
    companyDescription: string;
    companyCategory: string;
    logoImage: string;
  }>;
  status: string;
  message: string;
  statusCode: number;
}

export interface BusinessCreateRequest {
  companyName: string;
  companyDescription: string;
  companyCategory: string;
  businessDescription: string;
  companyUrl: string;
  contactEmail: string;
  contactNumber: string;
  address: string;
  employeeCount: number;
  logoImage: string;
}
