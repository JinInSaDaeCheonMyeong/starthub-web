import Cookies from 'js-cookie';

export const cookieUtils = {
  setAccessToken: (token: string) => {
    Cookies.set('access_token', token, {
      expires: 1/24,
      secure: true,
      sameSite: 'strict',
    });
  },

    setRefreshToken: (token: string) => {
    Cookies.set('refresh_token', token, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    });
  },
  
  getAccessToken: () => {
    return Cookies.get('access_token');
  },
  
  getRefreshToken: () => {
    return Cookies.get('refresh_token');
  },
  
  removeAccessToken: () => {
    Cookies.remove('access_token');
  },
  
  removeRefreshToken: () => {
    Cookies.remove('refresh_token');
  },
};