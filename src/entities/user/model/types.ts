import { BaseResponse } from "@/shared/types/BaseResponse"

export interface AuthRequest {
  email: string
  password: string
}

export interface OAuthRequest {
  provider: 'google' | 'apple' | 'naver'
  code: string
  redirectUri?: string
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

export type OAuthResponse = BaseResponse<OAuthData>;