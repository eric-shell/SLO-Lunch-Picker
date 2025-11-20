import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Set the base path for GitHub Pages deployment
  base: '/SLO-Lunch-Picker/', 
  build: {
    outDir: 'docs',
  }
});