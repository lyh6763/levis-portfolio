import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { prerenderRoutes } from './scripts/prerenderRoutes';

export default defineConfig({
  // GitHub Pages 프로젝트 페이지 경로(https://lyh6763.github.io/levis-portfolio/). 바꾸면 .env의 VITE_SITE_URL도 함께 바꾼다.
  base: process.env.VITE_BASE_PATH ?? '/levis-portfolio/',
  build: {
    emptyOutDir: false,
  },
  plugins: [react(), prerenderRoutes()],
});
