import { create } from 'zustand';
import { Coin, NotificationItem } from '../types/crypto';
import { APP_CONFIG } from '../config/constants';

interface Store {
  coins: Coin[];
  favorites: string[];
  notifications: NotificationItem[];
  darkMode: boolean;
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: (search: string) => void;
  setCoins: (coins: Coin[]) => void;
  toggleFavorite: (coinId: string) => void;
  addNotification: (message: string) => void;
  markNotificationAsRead: (id: string) => void;
  toggleDarkMode: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<Store>((set) => ({
  coins: [],
  // Only access localStorage on the client side
  favorites: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('favorites') || '[]')
    : [],
  notifications: [],
  darkMode: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('darkMode') || 'false')
    : false,
  isLoading: false,
  error: null,
  search: '',

  setSearch: (search) => set({ search }),
  setCoins: (coins) => set({ coins }),

  toggleFavorite: (coinId) =>
    set((state) => {
      const newFavorites = state.favorites.includes(coinId)
        ? state.favorites.filter((id) => id !== coinId)
        : [...state.favorites, coinId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    }),

  addNotification: (message) =>
    set((state) => ({
      notifications: [
        {
          id: crypto.randomUUID(),
          message,
          timestamp: Date.now(),
          read: false,
        },
        ...state.notifications,
      ].slice(0, APP_CONFIG.MAX_NOTIFICATIONS),
    })),

  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      return { darkMode: newDarkMode };
    }),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
