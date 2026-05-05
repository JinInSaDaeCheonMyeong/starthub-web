import { useState } from 'react';
import { userApi } from '@/entities/user/api/user';
import { toast } from 'react-toastify';

export const useEmailVerification = (email: string) => {
  const [loadingStates, setLoadingStates] = useState({
    sendCode: false,
    verifyCode: false,
  });
  const [codeSent, setCodeSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const sendVerificationCode = async (onError: (message: string) => void) => {
    if (!email) {
      onError("이메일을 입력해주세요");
      return;
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      onError("올바른 이메일 형식이 아닙니다");
      return;
    }

    setLoadingStates(prev => ({ ...prev, sendCode: true }));
    try {
      const response = await userApi.sendVerificationCode(email);
      console.log("이메일 전송 성공:", response);
      setCodeSent(true);
      toast.success('인증번호가 발송되었습니다.');
    } catch (error: any) {
      console.error("이메일 전송 실패 상세:", {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        config: error?.config
      });

      // 더 구체적인 에러 메시지
      if (error?.response?.status === 404) {
        onError("이메일 서비스를 찾을 수 없습니다");
      } else if (error?.response?.status === 400) {
        onError(error?.response?.data?.message || "잘못된 이메일 형식입니다");
      } else if (error?.response?.status === 500) {
        onError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요");
      } else if (error?.code === 'ECONNABORTED') {
        onError("요청 시간이 초과되었습니다");
      } else if (error?.code === 'ERR_NETWORK') {
        onError("네트워크 연결을 확인해주세요");
      } else {
        onError(error?.response?.data?.message || "이메일 전송에 실패했습니다");
      }
    } finally {
      setLoadingStates(prev => ({ ...prev, sendCode: false }));
    }
  };

  const verifyCode = async (
    verificationCode: string,
    onError: (message: string) => void
  ) => {
    if (!verificationCode) {
      onError("인증번호를 입력해주세요");
      return;
    }
    setLoadingStates(prev => ({ ...prev, verifyCode: true }));
    try {
      const response = await userApi.verifyCode(email, verificationCode);
      console.log("인증번호 검증 성공:", response);
      setIsEmailVerified(true);
      toast.success('이메일 인증이 완료되었습니다.');
    } catch (error: any) {
      console.error("인증번호 검증 실패 상세:", {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
      });

      // 더 구체적인 에러 메시지
      if (error?.response?.status === 400) {
        onError(error?.response?.data?.message || "잘못된 인증번호입니다");
      } else if (error?.response?.status === 404) {
        onError("인증 요청을 찾을 수 없습니다. 다시 전송해주세요");
      } else if (error?.response?.status === 410) {
        onError("인증번호가 만료되었습니다. 다시 전송해주세요");
      } else {
        onError(error?.response?.data?.message || "인증번호가 유효하지 않습니다");
      }

      toast.error(error?.response?.data?.message || "인증번호가 유효하지 않습니다");
    } finally {
      setLoadingStates(prev => ({ ...prev, verifyCode: false }));
    }
  };

  return {
    loadingStates,
    codeSent,
    isEmailVerified,
    sendVerificationCode,
    verifyCode,
  };
};