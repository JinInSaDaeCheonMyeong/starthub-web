import { useMutation } from '@tanstack/react-query';
import { userApi } from '@/entities/user/api/user';
import { OnboardingRequest } from '@/entities/user/model/types';
import { toast } from 'react-toastify';

export const useEarlyOnboarding = () => {
  return useMutation({
    mutationFn: (data: OnboardingRequest) => userApi.onboarding(data),
    onSuccess: () => {
      toast.success("초기창업 온보딩 성공")
    },
    onError: () => {
      toast.error("다시 시도해 주세요")
    },
  });
};