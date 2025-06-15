import StartHubAxios from '../../../shared/api/customAxios/StartHubAxios'
import { AuthResponse, OAuthRequest, AuthRequest, OAuthResponse, SignUpResponse} from '../model/types'


export const userApi = {
  signIn: (data: AuthRequest): Promise<AuthResponse> =>
    StartHubAxios.post('/user/sign-in', data).then(res => res.data),

  signUp: (data: AuthRequest): Promise<SignUpResponse> =>
    StartHubAxios.post('/user/sign-up', data).then(res => res.data),

  oauthGoogle: (data: OAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.get('/oauth/google', { params: data }).then(res => res.data),

  oauthNaver: (data: OAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.get('/oauth/naver', { params: data }).then(res => res.data),

  oauthApple: (data: OAuthRequest): Promise<OAuthResponse> =>
    StartHubAxios.post('/oauth/apple', data).then(res => res.data),

  userProfile: () =>
    StartHubAxios.get('/user/profile').then(res => res.data),

  sendVerificationCode: (email: string) => 
    StartHubAxios.post('/email/send-code', { email }).then(res => res.data),

  verifyCode: (email: string, code: string) => 
      StartHubAxios.post('/email/verify', { email, code }).then(res => res.data),
}