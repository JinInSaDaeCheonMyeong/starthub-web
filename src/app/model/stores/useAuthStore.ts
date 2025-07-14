import { create } from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),

  logout: () => {
    set({ isLoggedIn: false });
    window.location.href = '/sign-in';
  },
}));