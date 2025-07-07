import { SignUpFormData, SignUpFieldErrors } from './types';
import { ERROR_MESSAGES } from '../../../features/auth/signUp/constants/signup.constants';
import { isValidEmail } from '@/shared/lib/validation/email';

export const validateSignUpForm = (
  formData: SignUpFormData,
  isEmailVerified: boolean,
  allAgreed: boolean
): Partial<SignUpFieldErrors> => {
  const errors: Partial<SignUpFieldErrors> = {};

  if (!formData.email.trim()) {
    errors.email = ERROR_MESSAGES.REQUIRED_EMAIL;
  } else if (!isValidEmail(formData.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다';
  }


  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = ERROR_MESSAGES.PASSWORD_MISMATCH;
  }

  if (!isEmailVerified) {
    errors.verificationCode = ERROR_MESSAGES.EMAIL_VERIFICATION_REQUIRED;
  }

  if (!allAgreed) {
    errors.agreement = ERROR_MESSAGES.AGREEMENT_REQUIRED;
  }

  return errors;
};

export const resetFormData = (): SignUpFormData => ({
  email: '',
  password: '',
  confirmPassword: '',
  verificationCode: ''
});

export const resetFieldErrors = (): SignUpFieldErrors => ({
  email: '',
  password: '',
  confirmPassword: '',
  verificationCode: '',
  agreement: ''
});

export const clearFieldError = (
  errors: SignUpFieldErrors,
  field: keyof SignUpFieldErrors
): SignUpFieldErrors => ({
  ...errors,
  [field]: ''
});

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