import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/entities/user/api/user";
import { cookieUtils } from "@/shared/lib/utils/cookieUtils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

export const useSignIn = () => {
  const router = useRouter();
  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);

  const {
    mutate: signIn,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: userApi.signIn,
    onSuccess: (response) => {
      const isFirstLogin = response.data?.isFirstLogin;
      if (response && response.data) {
        const { access, refresh } = response.data;
        cookieUtils.setAccessToken(access);
        cookieUtils.setRefreshToken(refresh);
        setIsLoggedIn(true);

        toast.success("로그인에 성공했습니다.", { toastId: "login-success" });

        if (isFirstLogin === true) {
          router.replace("/onboarding");
        } else {
          router.replace("/");
        }
      } else {
        console.error("응답 데이터가 없습니다:", response);
        toast.error("로그인 응답에 문제가 있습니다.", { toastId: "login-error" });
      }
    },
    onError: () => {
      toast.error("로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요.", { toastId: "login-failed" });
    },
  });

  return { signIn, isLoading, isError };
};
