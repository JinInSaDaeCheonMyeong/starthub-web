import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { cookieUtils } from "@/shared/lib/utils/cookieUtils";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

export const useOAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);
  const [error, setError] = useState(false);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const isFirstLogin = searchParams.get("isFirstLogin");

    if (accessToken && refreshToken) {
      cookieUtils.setAccessToken(accessToken);
      cookieUtils.setRefreshToken(refreshToken);
      setIsLoggedIn(true);
      toast.success("로그인에 성공했습니다.");

      if (isFirstLogin === "true") {
        navigate("/onboarding", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      setError(true);
      toast.error("로그인에 실패하였습니다.");
      navigate("/sign-in", { replace: true });
    }
  }, [navigate, searchParams, setIsLoggedIn]);

  return { error };
};
