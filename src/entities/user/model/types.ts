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
}

export type AuthResponse = BaseResponse<AuthData>;

export interface OAuthData {
  access: string;
  refresh: string;
  isFirstLogin: boolean;
}


export interface SignUpResponse {
  data: any;
  status: string;
  message: string;
  statusCode: number;
}

export type OAuthResponse = BaseResponse<OAuthData>;

export type OAuthStateResponse = BaseResponse<string>;

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