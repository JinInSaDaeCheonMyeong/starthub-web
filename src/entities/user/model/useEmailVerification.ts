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
    setLoadingStates(prev => ({ ...prev, sendCode: true }));
    try {
      await userApi.sendVerificationCode(email);
      setCodeSent(true);
      toast.success('인증번호가 발송되었습니다.');
    } catch (error) {
      console.error("이메일 전송 실패:", error);
      onError("이메일 전송에 실패했습니다");
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
      await userApi.verifyCode(email, verificationCode);
      setIsEmailVerified(true);
      toast.success('이메일 인증이 완료되었습니다.');
    } catch (error) {
      console.error("인증번호 검증 실패:", error);
      onError("인증번호가 유효하지 않습니다.");
      toast.error("인증번호가 유효하지 않습니다.");
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