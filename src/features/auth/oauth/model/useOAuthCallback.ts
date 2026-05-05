"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { cookieUtils } from "@/shared/lib/utils/cookieUtils";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

export const useOAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);
  const [error, setError] = useState(false);
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const accessToken = searchParams?.get("accessToken");
    const refreshToken = searchParams?.get("refreshToken");
    const isFirstLogin = searchParams?.get("isFirstLogin");

    // URL에서 토큰 정보 즉시 제거
    window.history.replaceState(null, "", window.location.pathname);

    if (accessToken && refreshToken) {
      cookieUtils.setAccessToken(accessToken);
      cookieUtils.setRefreshToken(refreshToken);
      setIsLoggedIn(true);

      // OAuth 로그인 성공 - 토스트 제거하여 중복 방지
      if (isFirstLogin === "true") {
        router.replace("/onboarding");
      } else {
        router.replace("/");
      }
    } else {
      setError(true);
      toast.error("로그인에 실패하였습니다.", { toastId: "oauth-login-failed" });
      router.replace("/sign-in");
    }
  }, [router, searchParams, setIsLoggedIn]);

  return { error };
};
