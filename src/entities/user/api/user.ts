import StartHubAxios from '../../../shared/api/customAxios/StartHubAxios'
import { AuthResponse, OAuthRequest, AuthRequest, OAuthResponse, OAuthStateResponse, StateRequest } from '../model/types'


export const userApi = {
  signIn: (data: AuthRequest): Promise<AuthResponse> =>
    StartHubAxios.post('/user/sign-in', data),

  oauthGoogle: (data: OAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.get('/oauth/google/web', { params: data }),

  oauthNaver: (data: OAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.get('/oauth/naver', { params: data }),

  oauthApple: (data: OAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.post('/oauth/apple', data),

  oauthState: (data: StateRequest): Promise<OAuthStateResponse> =>
    StartHubAxios.get('/oauth/state', { params: data }),

  userProfile: () =>
    StartHubAxios.get('/user/profile'),

  signUp: (data: AuthRequest) => StartHubAxios.post('/user/sign-up', data),

  sendVerificationCode: (email: string) => 
    StartHubAxios.post('/email/send-code', { email }),

  verifyCode: (email: string, code: string) => 
    StartHubAxios.post('/email/verify', { email, code }),
}