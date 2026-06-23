import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const source = resolve('dist/index.html');
const target = resolve('dist/404.html');

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);
