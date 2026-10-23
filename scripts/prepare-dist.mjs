import { readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

// vite.config의 emptyOutDir: false 대신 dist 안을 비운다. 잠긴 항목은 다시 시도한다.
// dist에는 빌드 산출물만 있으므로 라우트 목록(prerenderRoutes)과 따로 맞출 필요가 없다.
const outDir = 'dist';
// 처음 빌드(CI 포함)에는 dist가 없다.
const entries = await readdir(outDir).catch((error) => {
  if (error?.code === 'ENOENT') {
    return [];
  }
  throw error;
});
const targets = entries.map((name) => join(outDir, name));
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
        console.warn(`[prepare-dist] Skipped locked path after retries (may be stale in this build): ${target}`);
        return;
      }
      await wait(150 * attempt);
    }
  }
}

for (const target of targets) {
  await removeWithRetry(target);
}
