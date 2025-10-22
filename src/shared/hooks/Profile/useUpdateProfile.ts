import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '@/shared/api/profileApi';
import { ProfileData } from '@/shared/types/ProfileTypes';
import { PROFILE_QUERY_KEY } from './useProfile';
import { toast } from 'react-toastify';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData: Partial<ProfileData>) =>
      profileApi.updateProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      toast.success('프로필이 성공적으로 업데이트되었습니다');
    },
    onError: () => {
      toast.error('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
