import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
export default defineConfig({
  plugins: [react()],
  
  // Ensure the output directory is correctly set for Vercel's build process
  build: {
    outDir: 'dist', // Ensure the output directory is correctly set for deployment
    rollupOptions: {
      // Adjust for Vercel's build process (sometimes Vercel may need this)
      external: ['lucide-react'], // Mark lucide-react as external to avoid bundling it
    },
  },
  
  // Ensure Vercel handles the dependencies correctly during optimization
  optimizeDeps: {
    exclude: ['lucide-react'], // Exclude lucide-react from optimization to avoid issues
  },

  // Add any environment variable configurations needed for Vercel (e.g., public paths)
  server: {
    fs: {
      allow: ['.'], // This allows for file system access (helpful in server-side rendering)
    },
  },
});
