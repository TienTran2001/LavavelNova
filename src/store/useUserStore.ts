import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface User {
  id: string;
  email: string;
  avatar: string;
}
interface UserStore {
  user: User | null;
  token: string | null;
  refresh: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (refresh: string | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refresh: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setRefreshToken: (refresh) => set({ refresh }),
    }),
    {
      name: 'laravel',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
