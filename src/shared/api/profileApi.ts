import { ProfileData } from '@/shared/types/ProfileTypes';
import { BaseResponse } from '@/shared/types/BaseResponse';
import StartHubAxios from '@/shared/api/customAxios/StartHubAxios';

export const profileApi = {
  async getUserProfile(): Promise<ProfileData> {
    const userData = await StartHubAxios.get('/user/me');
    const userId = userData.data.id;
    
    const data: BaseResponse<ProfileData> = await StartHubAxios.get(`/user/${userId}/profile`);
    return data.data;
  },

  async updateProfile(profileData: Partial<ProfileData>): Promise<void> {
    await StartHubAxios.patch('/user/profile', profileData);
  }
};