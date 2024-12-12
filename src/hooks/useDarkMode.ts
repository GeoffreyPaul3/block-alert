import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const useDarkMode = () => {
  const { darkMode } = useStore();

  useEffect(() => {
    // Set dark mode class on initial load
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Set color scheme meta tag
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.setAttribute('content', darkMode ? 'dark' : 'light');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'color-scheme';
      newMeta.content = darkMode ? 'dark' : 'light';
      document.head.appendChild(newMeta);
    }
  }, [darkMode]);
};