# Levi's Heritage Archive

Levi's 브랜드의 역사, 제작 공정, 문화 아카이브를 다루는 React 기반 포트폴리오 프로젝트입니다.

## Tech Stack

- Vite
- React
- TypeScript
- React Router
- CSS3

## Pages

- `/`: 브랜드 스토리 요약과 주요 섹션 진입
- `/heritage`: 1853년부터 이어지는 브랜드 타임라인과 시그니처 요소
- `/craft`: 원단, 염색, 재단, 봉제 공정
- `/archive`: 501/505/517 모델, 텍스처 갤러리, 문화 아카이브

## Implementation Notes

- 반복 콘텐츠는 `src/data/content.ts`에 타입 기반 데이터로 분리했습니다.
- 공통 레이아웃은 `Layout`, `Header`, `Footer`, `SkipLink` 컴포넌트로 구성했습니다.
- PNG 원본은 배포에서 제외된 `images-src/`에 보존하고, 앱은 `public/images/optimized`의 WebP 최적화본만 사용합니다.
- 기존 Vanilla JS 기능은 React 훅으로 이전했습니다.
  - `useLazyBackground`: 배경 이미지 지연 로딩
  - `useRevealOnScroll`: 섹션 페이드인 및 reduced motion fallback
  - `useActiveTimeline`: 스크롤 위치 기반 타임라인 활성 상태
- GitHub Pages 배포를 위해 Vite `base`는 기본 `/levis/`이며, 빌드 후 `dist/404.html`을 생성합니다.

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

커스텀 도메인이나 루트 배포가 필요하면 빌드 시 `VITE_BASE_PATH=/`를 지정하세요.

## Image Refinement

이미지 최적화본은 `scripts/optimize-images.py`로 생성했습니다. 이 스크립트는 Pillow가 설치된 Python 환경에서 `images-src/`의 원본 PNG를 읽어 `public/images/optimized/`의 WebP 파일만 갱신하며, 원본은 그대로 둡니다.
