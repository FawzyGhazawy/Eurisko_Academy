// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  expiresAt: number | null;
  setAuth: (auth: { token: string; expiresAt: number }) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      expiresAt: null,
      setAuth: ({ token, expiresAt }) => set({ token, expiresAt }),
      clearAuth: () => set({ token: null, expiresAt: null }),
    }),
    {
      name: 'auth-storage', // Persist data in localStorage
    }
  )
);

export default useAuthStore;