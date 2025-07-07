import { SignUpFormData, SignUpFieldErrors } from '../../../../../entities/user/model/types';
import { ERROR_MESSAGES } from '../../../signUp/constants/signup.constants';

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

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
  
  if (!formData.password.trim()) {
    errors.password = ERROR_MESSAGES.REQUIRED_PASSWORD;
  } else if (!isValidPassword(formData.password)) {
    errors.password = '비밀번호는 8자 이상이며, 대소문자, 숫자, 특수문자를 포함해야 합니다';
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
