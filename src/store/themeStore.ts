// src/stores/themeStore.ts
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

interface ThemeStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

// Custom localStorage wrapper
const customLocalStorage: PersistStorage<ThemeStore> = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    console.log(`[getItem] Key: ${name}, Value: ${value}`); // Debugging
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: any) => {
    console.log(`[setItem] Key: ${name}, Value: ${JSON.stringify(value)}`); // Debugging
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    console.log(`[removeItem] Key: ${name}`); // Debugging
    localStorage.removeItem(name);
  },
};

const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => ({
      isDarkMode: false, // Default state
      toggleDarkMode: () => {
        const currentState = get().isDarkMode;
        console.log('[toggleDarkMode] Current State:', currentState);
        set({ isDarkMode: !currentState });
      },
      setDarkMode: (value: boolean) => {
        console.log('[setDarkMode] New State:', value);
        set({ isDarkMode: value });
      },
    }),
    {
      name: 'theme-store', // Name of the storage key
      storage: customLocalStorage, // Use the custom localStorage wrapper
    }
  )
);

export default useThemeStore;