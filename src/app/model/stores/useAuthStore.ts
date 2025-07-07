import { create } from 'zustand';
import { cookieUtils } from '@/shared/lib/utils/cookieUtils';

interface AuthStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: !!cookieUtils.getAccessToken(),
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),

  logout: () => {
    cookieUtils.removeAccessToken();
    cookieUtils.removeRefreshToken();
    set({ isLoggedIn: false });
    window.location.href = '/sign-in';
  },
}));