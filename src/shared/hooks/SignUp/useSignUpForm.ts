import { useState } from 'react';
import { useSignUp } from '@/features/auth/signUp/model/useSignUp';
import { userApi } from '@/entities/user/api/user';
import { toast } from 'react-toastify';
import { SIGNUP_AGREE_ITEMS } from '@/features/auth/signUp/constants/signup.constants';

const initialFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  verificationCode: ''
};

const initialFieldErrors = {
  email: '',
  password: '',
  confirmPassword: '',
  verificationCode: '',
  agreement: ''
};

export const useSignUpForm = () => {
  const signUpMutation = useSignUp();
  
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors);
  const [agreeCheckedItems, setAgreeCheckedItems] = useState<boolean[]>(
    new Array(SIGNUP_AGREE_ITEMS.length).fill(false)
  );
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    sendCode: false,
    verifyCode: false
  });
  const [codeSent, setCodeSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAllCheck = (checked: boolean) => {
    setIsAllAgreed(checked);
    setAgreeCheckedItems(new Array(SIGNUP_AGREE_ITEMS.length).fill(checked));
    if (fieldErrors.agreement) {
      setFieldErrors(prev => ({ ...prev, agreement: '' }));
    }
  };

  const handleSingleCheck = (index: number) => {
    setAgreeCheckedItems(prev => {
      const newItems = [...prev];
      newItems[index] = !newItems[index];
      
      const allChecked = newItems.every(item => item);
      setIsAllAgreed(allChecked);
      
      return newItems;
    });
    
    if (fieldErrors.agreement) {
      setFieldErrors(prev => ({ ...prev, agreement: '' }));
    }
  };

  const handleSendVerificationCode = async () => {
    const { email } = formData;
    if (!email) {
      setFieldErrors(prev => ({ ...prev, email: "이메일을 입력해주세요" }));
      return;
    }

    setLoadingStates(prev => ({ ...prev, sendCode: true }));
    try {
      await userApi.sendVerificationCode(email);
      setCodeSent(true);
      toast.success('인증번호가 발송되었습니다.');
    } catch (error) {
      console.error("이메일 전송 실패:", error);
      setFieldErrors(prev => ({ ...prev, email: "이메일 전송에 실패했습니다" }));
    } finally {
      setLoadingStates(prev => ({ ...prev, sendCode: false }));
    }
  };

  const handleVerifyCode = async () => {
    const { verificationCode, email } = formData;
  
    if (!verificationCode) {
      setFieldErrors(prev => ({ ...prev, verificationCode: "인증번호를 입력해주세요" }));
      return;
    }
  
    setLoadingStates(prev => ({ ...prev, verifyCode: true }));
    try {
      await userApi.verifyCode(email, verificationCode);
  
      setIsEmailVerified(true);
      toast.success('이메일 인증이 완료되었습니다.');
    } catch (error) {
      console.error("인증번호 검증 실패:", error);
      setFieldErrors(prev => ({ ...prev, verificationCode: "인증번호 검증에 실패했습니다" }));
      toast.error("인증번호가 유효하지 않습니다.");
    } finally {
      setLoadingStates(prev => ({ ...prev, verifyCode: false }));
    }
  };
  
  

  const handleSignUp = () => {
    const errors: any = {};
    
    if (!formData.email.trim()) {
      errors.email = "이메일을 입력해주세요";
    }
    
    if (!formData.password.trim()) {
      errors.password = "비밀번호를 입력해주세요";
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    
    if (!isEmailVerified) {
      errors.verificationCode = "이메일 인증을 완료해주세요";
    }
    
    if (!agreeCheckedItems.every(checked => checked)) {
      errors.agreement = "모든 약관에 동의해주세요";
    }
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(prev => ({ ...prev, ...errors }));
      return false;
    }

    signUpMutation.signUp({
      email: formData.email,
      password: formData.password
    });
    
    return true;
  };

  return {
    formData,
    fieldErrors,
    agreeCheckedItems,
    isAllAgreed,
    loadingStates,
    codeSent,
    isEmailVerified,
    isLoading: signUpMutation.isLoading,
    
    handleFormChange,
    handleAllCheck,
    handleSingleCheck,
    handleSendVerificationCode,
    handleVerifyCode,
    handleSignUp
  };
};