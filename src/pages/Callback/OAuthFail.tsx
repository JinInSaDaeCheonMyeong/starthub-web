"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const OAuthFail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      console.error("OAuth login failed:", error);
    }

    const errorMessageMap: Record<string, string> = {
      access_denied: "소셜 로그인 권한이 거부되었습니다.",
      invalid_request: "잘못된 로그인 요청입니다.",
      server_error: "소셜 로그인 서버에서 오류가 발생했습니다.",
    };

    const message =
      (error && errorMessageMap[error]) || "소셜 로그인에 실패하였습니다.";
    toast.error(message);
    router.replace("/sign-in");
  }, [router, searchParams]);

  return null;
};

export default OAuthFail;
