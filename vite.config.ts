import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? 'https://github.com/Dinuka7L/Flurry-RSVP-Reader/' : '/',
});
