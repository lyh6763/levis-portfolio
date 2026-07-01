import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const script = process.argv[2];
const args = process.argv.slice(3);

if (!script) {
  console.error('Usage: node scripts/run-python.mjs <script.py> [...args]');
  process.exit(1);
}

const bundledPython = join(
  homedir(),
  '.cache',
  'codex-runtimes',
  'codex-primary-runtime',
  'dependencies',
  'python',
  process.platform === 'win32' ? 'python.exe' : 'bin/python',
);

const candidates = [
  process.env.PYTHON,
  'python3',
  'python',
  bundledPython,
].filter(Boolean);

function canRunPython(command) {
  if (command === bundledPython && !existsSync(command)) {
    return false;
  }

  const result = spawnSync(command, ['-c', 'import sys; print(sys.version_info.major)'], {
    encoding: 'utf8',
    shell: false,
  });

  return result.status === 0 && result.stdout.trim() === '3';
}

const python = candidates.find(canRunPython);

if (!python) {
  console.error('Python 3 was not found. Install Python 3 with Pillow, or set PYTHON to a Python executable.');
  process.exit(1);
}

const result = spawnSync(python, [script, ...args], {
  stdio: 'inherit',
  shell: false,
});

process.exit(result.status ?? 1);
