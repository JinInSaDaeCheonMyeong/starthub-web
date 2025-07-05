import StartHubAxios from '../../../shared/api/customAxios/StartHubAxios'
import { AuthResponse, GoogleOAuthRequest, AuthRequest, OAuthResponse, OAuthStateResponse, StateRequest, NaverOAuthRequest, AppleOAuthRequest } from '../model/types'


export const userApi = {
  signIn: (data: AuthRequest): Promise<AuthResponse> =>
    StartHubAxios.post('/user/sign-in', data),

  oauthGoogle: (data: GoogleOAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.get('/oauth/google/web', { params: data }),

  oauthNaver: (data: NaverOAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.get('/oauth/naver', { params: data }),

  oauthApple: (data: AppleOAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.post('/oauth/apple', data),

  oauthState: (data: StateRequest): Promise<OAuthStateResponse> =>
    StartHubAxios.get('/oauth/state', { params: data }),

  userProfile: () =>
    StartHubAxios.get('/user/profile')
}