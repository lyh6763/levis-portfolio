import { rm } from 'node:fs/promises';

const targets = ['dist/assets', 'dist/index.html', 'dist/404.html'];

await Promise.all(
  targets.map((target) =>
    rm(target, {
      force: true,
      recursive: true,
    }),
  ),
);
