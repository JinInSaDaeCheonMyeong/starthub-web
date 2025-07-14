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