import { useMutation } from '@tanstack/react-query';
import { userApi } from '@/entities/user/api/user';
import { cookieUtils } from '@/shared/lib/utils/cookieUtils';
import { useNavigate } from 'react-router-dom';

export const useSignIn = () => {
  const navigate = useNavigate();

  const {
    mutate: signIn,
    isPending: isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: userApi.signIn,
    onSuccess: (response) => {
      cookieUtils.setAccessToken(response.data.access);
      navigate('/main');
    },
    onError: () => {
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    },
  });

  return { signIn, isLoading, isError, error };
};
