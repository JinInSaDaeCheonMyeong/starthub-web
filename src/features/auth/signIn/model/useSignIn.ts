import { useMutation } from '@tanstack/react-query';
import { userApi } from '@/entities/user/api/user';
import { cookieUtils } from '@/shared/lib/utils/cookieUtils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/app/model/stores/useAuthStore';

export const useSignIn = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn); 

  const {
    mutate: signIn,
    isPending: isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: userApi.signIn,
    onSuccess: (response) => {
      if (response && response.data) {
        const { access, refresh} = response.data; 
        const isFirstLogin = (response.data as any).isFirstLogin;
        
        cookieUtils.setAccessToken(access);
        cookieUtils.setRefreshToken(refresh);
        setIsLoggedIn(true);
        
        if (isFirstLogin === true) {
          navigate('/onboarding');
        } else {
          toast.success('로그인에 성공했습니다.');
          navigate('/');
        }
      } else {
        console.error('응답 데이터가 없습니다:', response);
        toast.error('로그인 응답에 문제가 있습니다.');
      }
    },
    onError: (error) => {
      console.log(error.message)
      toast.error('로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요.');
    },
  });

  return { signIn, isLoading, isError, error };
};
