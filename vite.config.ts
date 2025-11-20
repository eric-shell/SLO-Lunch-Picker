import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the base path for GitHub Pages deployment
  base: '/SLO-Lunch-Picker/', 
  build: {
    outDir: 'docs',
  }
});