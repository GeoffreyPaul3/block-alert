import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist', // Make sure build output goes to 'dist'
    rollupOptions: {
      input: 'index.html', // Specify the entry point
    },
  },
});
