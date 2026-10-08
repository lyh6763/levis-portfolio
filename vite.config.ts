import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { prerenderRoutes } from './scripts/prerenderRoutes';

// 자주 바뀌지 않는 라이브러리는 앱 코드와 분리해 배포가 바뀌어도 브라우저 캐시를 살린다.
const VENDOR = /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|cookie|set-cookie-parser|lenis)[\\/]/;
// GSAP는 스크롤 스크럽 시각화만 쓰므로 지연 청크로 따로 둔다.
const GSAP = /[\\/]node_modules[\\/]gsap[\\/]/;

export default defineConfig({
  // GitHub Pages 프로젝트 페이지 경로(https://lyh6763.github.io/levis-portfolio/). 바꾸면 .env의 VITE_SITE_URL도 함께 바꾼다.
  base: process.env.VITE_BASE_PATH ?? '/levis-portfolio/',
  build: {
    emptyOutDir: false,
    // prerenderRoutes가 라우트별 modulepreload를 계산하는 데 쓰고, 끝나면 지운다.
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (VENDOR.test(id)) {
            return 'vendor';
          }
          if (GSAP.test(id)) {
            return 'gsap';
          }
          return undefined;
        },
      },
    },
  },
  plugins: [react(), prerenderRoutes()],
});
