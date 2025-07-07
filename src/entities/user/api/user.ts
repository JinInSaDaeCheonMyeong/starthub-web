import StartHubAxios from '../../../shared/api/customAxios/StartHubAxios'
import { AuthResponse, OAuthRequest, AuthRequest, OAuthResponse } from '../model/types'


export const userApi = {
  signIn: (data: AuthRequest): Promise<AuthResponse> =>
    StartHubAxios.post('/user/sign-in', data),

  signUp: (data: AuthRequest): Promise<SignUpResponse> =>
    StartHubAxios.post('/user/sign-up', data).then(res => res.data),

  oauthGoogle: (data: OAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.get('/oauth/google/web', { params: data }),

  oauthNaver: (data: OAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.get('/oauth/naver', { params: data }),

  oauthApple: (data: OAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.post('/oauth/apple', data),

  oauthState: (data: StateRequest): Promise<OAuthStateResponse> =>
    StartHubAxios.get('/oauth/state', { params: data }),

  userProfile: () =>
    StartHubAxios.get('/user/profile').then(res => res.data)
}