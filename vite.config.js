import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/site alice/' // Remplace "mon-projet" par le nom de ton dépôt GitHub
});
