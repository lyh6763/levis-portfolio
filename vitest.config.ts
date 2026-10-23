import { defineConfig } from 'vitest/config';

// 테스트는 vite.config.ts(빌드 플러그인)를 거치지 않고 이 설정만 쓴다.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
    // 테스트 파일을 하나씩 차례로 돌려 작업 프로세스를 하나만 띄운다.
    fileParallelism: false,
  },
});
