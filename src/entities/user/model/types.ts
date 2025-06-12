export interface AuthRequest {
  email: string
  password: string
}

export interface OAuthRequest {
  provider: 'google' | 'apple' | 'naver'
  code: string
  redirectUri?: string
}

export interface AuthResponse {
  data: {
    access: string,
    refresh: string
  },
  status: string,
  message: string,
  statusCode: number
}

export interface OAuthResponse {
  data: {
    access: string,
    refresh: string,
    isFirstLogin: boolean
  },
  status: string,
  message: string,
  statusCode: number
}