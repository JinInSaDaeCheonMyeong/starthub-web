import { useState } from 'react';
import { useSignUp } from '@/features/auth/signUp/model/useSignUp';
import { SIGNUP_AGREE_ITEMS } from '@/features/auth/signUp/constants/signup.constants';
import { useEmailVerification } from '@/entities/user/model/validation';
import { validateSignUpForm, clearFieldError, resetFormData, resetFieldErrors } from '@/entities/user/model/validation';
import { SignUpFormData, SignUpFieldErrors } from '@/entities/user/model/types';

export const useSignUpForm = () => {
  const signUpMutation = useSignUp();

  const [formData, setFormData] = useState<SignUpFormData>(resetFormData);
  const [fieldErrors, setFieldErrors] = useState<SignUpFieldErrors>(resetFieldErrors);
  const [agreeCheckedItems, setAgreeCheckedItems] = useState<boolean[]>(
    new Array(SIGNUP_AGREE_ITEMS.length).fill(false)
  );
  const [isAllAgreed, setIsAllAgreed] = useState(false);

  const {
    loadingStates,
    codeSent,
    isEmailVerified,
    sendVerificationCode,
    verifyCode
  } = useEmailVerification(formData.email);

  const handleFormChange = (field: keyof SignUpFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFieldErrors(prev => clearFieldError(prev, field));
  };

  const handleAllCheck = (checked: boolean) => {
    setIsAllAgreed(checked);
    setAgreeCheckedItems(new Array(SIGNUP_AGREE_ITEMS.length).fill(checked));
    if (fieldErrors.agreement) {
      setFieldErrors(prev => clearFieldError(prev, 'agreement'));
    }
  };

  const handleSingleCheck = (index: number) => {
    setAgreeCheckedItems(prev => {
      const newItems = [...prev];
      newItems[index] = !newItems[index];
      setIsAllAgreed(newItems.every(Boolean));
      return newItems;
    });
    if (fieldErrors.agreement) {
      setFieldErrors(prev => clearFieldError(prev, 'agreement'));
    }
  };

  const handleSignUp = () => {
    const errors = validateSignUpForm(formData, isEmailVerified, agreeCheckedItems.every(Boolean));
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
    handleSignUp,
    sendVerificationCode: () => sendVerificationCode(msg => setFieldErrors(prev => ({ ...prev, email: msg }))),
    verifyCode: () => verifyCode(formData.verificationCode, msg => setFieldErrors(prev => ({ ...prev, verificationCode: msg })))
  };
};
