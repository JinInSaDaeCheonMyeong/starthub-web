import StartHubAxios from '../../../shared/api/customAxios/StartHubAxios'
import { AuthResponse, GoogleOAuthRequest, AuthRequest, OAuthResponse, OAuthStateResponse, StateRequest, NaverOAuthRequest, AppleOAuthRequest } from '../model/types'


export const userApi = {
  signIn: (data: AuthRequest): Promise<AuthResponse> =>
    StartHubAxios.post('/user/sign-in', data).then(res => res.data),

  oauthGoogle: (data: GoogleOAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.get('/oauth/google', { params: data }).then(res => res.data),

  oauthNaver: (data: NaverOAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.get('/oauth/naver', { params: data }).then(res => res.data),

  oauthApple: (data: AppleOAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.post('/oauth/apple', data).then(res => res.data),

  oauthState: (data: StateRequest): Promise<OAuthStateResponse> =>
    StartHubAxios.get('/oauth/state', { params: data }).then(res => res.data),

  userProfile: () =>
    StartHubAxios.get('/user/profile').then(res => res.data)
}