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
