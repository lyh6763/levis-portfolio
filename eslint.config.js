import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const a11yInteractions = jsxA11y.flatConfigs.recommended.rules['jsx-a11y/no-noninteractive-element-interactions'];

export default tseslint.config(
  {
    // 빌드 산출물과 설계 단계의 정적 시안(prototypes)은 검사하지 않는다.
    ignores: ['dist', 'dist-*', '.vite', 'node_modules', 'prototypes'],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      // 타입을 맞추려고 받기만 하는 인자는 이름 앞에 _를 붙여 표시한다.
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    // 브라우저에서 도는 앱 코드
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: globals.browser,
    },
    plugins: {
      'jsx-a11y': jsxA11y,
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      // 네이티브 <dialog>는 백드롭(dialog 자신)을 누르면 닫는다. 키보드로는 Escape가 같은 일을 하므로
      // recommended가 dialog에 허용하는 키보드 핸들러에 onClick만 더한다.
      'jsx-a11y/no-noninteractive-element-interactions': [
        a11yInteractions[0],
        { ...a11yInteractions[1], dialog: [...a11yInteractions[1].dialog, 'onClick'] },
      ],
    },
  },
  {
    // 빌드 스크립트·설정 파일은 Node에서 돈다.
    files: ['scripts/**/*.{ts,mjs}', '*.config.{ts,js}'],
    languageOptions: {
      globals: globals.node,
    },
  },
);
