import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
// https://vitejs.dev/config/
// setup env for
dotenv.config();
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),

      routes: `${path.resolve(__dirname, './src/routes/')}`,

      // services: `${path.resolve(__dirname, "./src/services/")}`,
    },
  },
});
