import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface User {
  username: string;
  avatar: string;
}
interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'laravel',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
