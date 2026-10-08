import { rm } from 'node:fs/promises';

// vite.config의 emptyOutDir: false 대신 빌드 산출물만 골라 지운다 (prerenderRoutes가 쓰는 라우트 폴더 포함).
const targets = [
  'dist/assets',
  'dist/images',
  'dist/index.html',
  'dist/404.html',
  'dist/sitemap.xml',
  'dist/chapters',
  'dist/shop',
  'dist/sources',
  'dist/colophon',
  'dist/inside-out',
];
const transientErrors = new Set(['EBUSY', 'ENOTEMPTY', 'EPERM']);
const maxAttempts = 8;

const wait = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

async function removeWithRetry(target) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await rm(target, {
        force: true,
        recursive: true,
        maxRetries: 2,
        retryDelay: 100,
      });
      return;
    } catch (error) {
      if (!transientErrors.has(error?.code)) {
        throw error;
      }
      if (attempt === maxAttempts) {
        console.warn(`[prepare-dist] Skipped locked path after retries: ${target}`);
        return;
      }
      await wait(150 * attempt);
    }
  }
}

for (const target of targets) {
  await removeWithRetry(target);
}
