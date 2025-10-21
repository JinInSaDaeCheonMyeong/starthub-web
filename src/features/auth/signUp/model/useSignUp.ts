import { useMutation } from '@tanstack/react-query';
import { userApi } from '@/entities/user/api/user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useSignUp = () => {
  const navigate = useNavigate();

  const {
    mutate: signUp,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: userApi.signUp,
    onSuccess: (response) => {
      if(response && response.data){
        toast.success("회원가입에 성공했습니다.");
        navigate('/sign-in')
      } else{
        console.error('응답 데이터가 없습니다:', response)
        toast.error('회원가입 응답에 문제가 있습니다.')
      }
    },
    onError: () => {
      toast.error("회원가입에 실패했습니다.")
    }
  })

  return {signUp, isLoading, isError}
};
