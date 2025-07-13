import { useMutation } from '@tanstack/react-query';
import { userApi } from '@/entities/user/api/user';
import { OnboardingRequest, OnboardingResponse } from '@/entities/user/model/types'

export const useOnboarding = () => {
  return useMutation<OnboardingResponse, Error, OnboardingRequest>({
    mutationFn: userApi.onboarding,
    onSuccess: (data) => {
      console.log('온보딩 성공:', data);
    },
    onError: (error) => {
      console.error('온보딩 실패:', error);
    }
  });
};