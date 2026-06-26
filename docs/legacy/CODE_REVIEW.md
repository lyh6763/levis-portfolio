# Levi's React Conversion Review

이 문서는 정적 HTML/CSS/Vanilla JS 포트폴리오를 Vite + React + TypeScript SPA로 전환한 구현 근거를 정리합니다.

## 1. React Route Architecture

기존 `index.html`, `heritage.html`, `craft.html`, `archive.html` 페이지 구조를 React Router 기반 라우트로 이전했습니다.

- `/`
- `/heritage`
- `/craft`
- `/archive`

공통 Header/Footer/SkipLink는 `Layout`에서 관리하고, 페이지별 콘텐츠는 `src/routes`에 분리했습니다.

## 2. Typed Content Data

타임라인, 카드, 갤러리, 공정 단계, 모델 목록처럼 반복되는 콘텐츠는 `src/data/content.ts`로 이동했습니다.

이 방식은 마크업 중복을 줄이고, TypeScript 타입으로 누락 필드나 구조 오류를 빠르게 잡을 수 있게 합니다.

## 3. Interaction Hooks

기존 `js/main.js`의 동작은 React 훅으로 전환했습니다.

- 모바일 메뉴: React state, ESC 닫기, 외부 클릭 닫기, 포커스 순환
- 배경 이미지: `IntersectionObserver` 기반 lazy loading
- 섹션 reveal: reduced motion과 Observer 미지원 브라우저 fallback
- 타임라인: 스크롤 위치 기반 active item과 progress line 계산

## 4. CSS Migration

시각 회귀를 줄이기 위해 기존 클래스명을 최대한 유지하고, CSS는 `src/styles`로 이식했습니다.

1차 전환에서는 안정성을 우선했고, 후속 리파인에서 Header/Footer 중복 스타일과 카드/갤러리 패턴을 더 정리할 수 있습니다.

## 5. Deployment

GitHub Pages를 기본 대상으로 `vite.config.ts`의 `base`를 `/levis/`로 설정했습니다.

빌드 후 `scripts/copy-404.mjs`가 `dist/index.html`을 `dist/404.html`로 복사해 SPA deep link fallback을 제공합니다.
