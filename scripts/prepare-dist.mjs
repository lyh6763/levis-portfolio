import { rm } from 'node:fs/promises';

const targets = ['dist/assets', 'dist/images', 'dist/index.html', 'dist/404.html'];
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
