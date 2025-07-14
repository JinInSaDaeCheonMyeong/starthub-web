import { BaseResponse } from "@/shared/types/BaseResponse"

export interface AuthRequest {
  email: string
  password: string
}

export interface OAuthRequest {
  state: string;
}

export interface StateRequest {
  params: null;
}

export interface AuthData {
  access: string;
  refresh: string;
  isFirstLogin: boolean;
}

export type AuthResponse = BaseResponse<AuthData>;

export interface OAuthData {
  access: string;
  refresh: string;
  isFirstLogin: boolean;
}

export type OAuthStateResponse = BaseResponse<string>;

export type OAuthResponse = BaseResponse<OAuthData>;

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
}

export interface SignUpFieldErrors {
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  agreement: string;
}

export interface SignUpLoadingStates {
  sendCode: boolean;
  verifyCode: boolean;
}

export interface FieldStatus {
  email: 'default' | 'error' | 'success';
  verificationCode: 'default' | 'error' | 'success';
  password: 'default' | 'error' | 'success';
  confirmPassword: 'default' | 'error' | 'success';
}

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  data: {
    message: string;
  };
}

export interface SignUpFormHandlers {
  handleFormChange: (field: keyof SignUpFormData, value: string) => void;
  handleAllCheck: (checked: boolean) => void;
  handleSingleCheck: (index: number) => void;
  handleSendVerificationCode: () => Promise<void>;
  handleVerifyCode: () => Promise<void>;
  handleSignUp: () => boolean;
}

export interface SignUpFormState {
  formData: SignUpFormData;
  fieldErrors: SignUpFieldErrors;
  agreeCheckedItems: boolean[];
  isAllAgreed: boolean;
  loadingStates: SignUpLoadingStates;
  codeSent: boolean;
  isEmailVerified: boolean;
  isLoading: boolean;
}

export interface OnboardingFormData {
  category: any;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: string;
  name: string;
  interests: string[];
}

export interface CategoryItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

export interface ButtonProps {
  $active: boolean;
}

export interface CategoryButtonProps {
  $customColor?: string; 
  $active?: boolean;
}

export interface CategoryItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
}

export interface OnboardingRequest {
  username: string;
  introduction: string;
  birth: string;
  gender: string;
  interests: string[];
  profileImage: string;
}

export interface OnboardingData {
  userId: string;
  username: string;
  birth: string;
  gender: string;
  interests: string[];
}

export type OnboardingResponse = BaseResponse<OnboardingData>;