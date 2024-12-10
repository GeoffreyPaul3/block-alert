import { create } from 'zustand';
import { Coin, NotificationItem } from '../types/crypto';

interface Store {
  coins: Coin[];
  favorites: string[];
  notifications: NotificationItem[];
  darkMode: boolean;
  setCoins: (coins: Coin[]) => void;
  toggleFavorite: (coinId: string) => void;
  addNotification: (message: string) => void;
  markNotificationAsRead: (id: string) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<Store>((set) => ({
  coins: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  notifications: [],
  darkMode: JSON.parse(localStorage.getItem('darkMode') || 'false'),
  
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
          id: Date.now().toString(),
          message,
          timestamp: Date.now(),
          read: false,
        },
        ...state.notifications,
      ].slice(0, 50),
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
}));