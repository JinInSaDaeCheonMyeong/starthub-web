import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/entities/user/api/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

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
      const isFirstLogin = (response.data)?.isFirstLogin;

      setIsLoggedIn(true);

      if (isFirstLogin === true) {
        navigate('/onboarding');
      } else {
        toast.success('로그인에 성공했습니다.');
        navigate('/');
      }
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요.");
    },
  });

  return { signIn, isLoading, isError, error };
};
