import { userApi } from '@/entities/user/api/user';
import { toast } from 'react-toastify';

export const useGoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      const stateResponse = await userApi.oauthState();
      const stateCode = stateResponse.data;
      const baseUrl = import.meta.env.VITE_GOOGLE_BASE_URL;
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

      const googleAuthUrl = `${baseUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20profile%20email&prompt=select_account&state=${stateCode}`;
      window.location.href = googleAuthUrl;
    } catch (error) {
      console.error('Google 로그인 준비 중 오류:', error);
      toast.error('Google 로그인 준비 중 오류가 발생했습니다.');
    }
  };

  return { handleGoogleSignIn };
};