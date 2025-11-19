import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the base path for GitHub Pages deployment
  // Replace 'slo-lunch-picker' with your actual repository name if different
  // or use './' for relative path linking which works in most static hosting cases
  base: './', 
  build: {
    outDir: 'dist',
  }
});