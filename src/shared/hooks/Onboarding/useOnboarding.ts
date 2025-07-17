import { useMutation } from '@tanstack/react-query';
import { OnboardingRequest } from '@/entities/user/model/types';

const submitOnboarding = async (data: OnboardingRequest): Promise<any> => {
  const response = await fetch('/api/onboarding', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('온보딩 등록에 실패했습니다.');
  }

  return response.json();
};

export const useOnboarding = () => {
  return useMutation({
    mutationFn: submitOnboarding,
    onSuccess: (data) => {
      console.log('온보딩 성공:', data);
    },
    onError: (error) => {
      console.error('온보딩 실패:', error);
    },
  });
};