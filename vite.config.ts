import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',  // Ensure Vite outputs the build to the 'dist' folder
    rollupOptions: {
      input: 'index.html',  // Ensure Vite uses the correct entry point for the build
    },
  },
});
