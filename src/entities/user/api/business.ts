import StartHubAxios from '@/shared/api/customAxios/StartHubAxios';
import { BusinessResponse, BusinessFormData } from '../model/business';

export const businessApi = {
   // 나의 기업 조회 (GET /company/my)
  checkBusiness: (): Promise<BusinessResponse> =>
  StartHubAxios.get('/company/my'),

  // 기업 등록 (POST /company)
  createBusiness: (data: BusinessFormData): Promise<BusinessResponse> =>
    StartHubAxios.post('/company', data),

  // 기업 정보 상세 조회 (GET /company/{id})
  getBusinessDetail: (id: string): Promise<BusinessResponse> =>
    StartHubAxios.get(`/company/${id}`),

  // 기업 정보 수정 (PATCH /company/{id})
  updateBusiness: (id: string, data: BusinessFormData): Promise<BusinessResponse> =>
    StartHubAxios.patch(`/company/${id}`, data),
};

