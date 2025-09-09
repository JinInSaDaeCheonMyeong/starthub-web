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
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: string;
  name: string;
  status: "예비" | "초기" | null;
}

export interface EarlyOnboardingRequest {
  category: string[];
}

export interface CategoryItem {
  id: string;
  label: string;
  icon: React.ComponentType<string>;
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
  icon: React.ComponentType<string>;
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

export interface UserData {
  id: string;
  email: string;
  username: string | null;
  birth: string | null;
  gender: string | null;
  profileImage: string | null;
}

export interface UserResponse {
  data: UserData;
  status: string;
  message: string;
  statusCode: number;
}

export interface ProfileFormData {
  name: string;
  email: string;
  gender: "" | "남자" | "여자";
  birthDate: string;
  category: string;
  profileImage: string;
  description: string;
  interests: string[];
  introduction: string;
}

export interface ProfileUpdateRequest {
  username: string;
  introduction: string;
  birth: string;
  gender: "MALE" | "FEMALE" | "";
  profileImage: string;
}

export interface ProfileUpdateData {
  id: string;
  username: string;
  introduction: string;
  birth: string;
  gender: string;
  profileImage: string;
}

export type ProfileUpdateResponse = BaseResponse<ProfileUpdateData>;
