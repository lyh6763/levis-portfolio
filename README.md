# LEVI'S Heritage | Wear-in Archive

Levi's의 시작점과 데님 문화의 확산을 하나의 스크롤 경험으로 구성한 React 포트폴리오입니다. 1853년 브랜드의 출발, 1873년 블루진의 탄생, 공정과 문화적 장면, 아카이브 3D 피스를 한 흐름 안에서 보여주는 싱글 페이지 사이트입니다.

## Tech Stack

- React 19 + Vite + TypeScript
- GSAP ScrollTrigger + Lenis
- React Three Fiber + Three.js
- CSS Custom Properties 기반 스타일 토큰
- GitHub Pages 배포 기준 Vite `base` + `404.html` fallback

## Experience

1. Hero / Origin 1853: 고정형 스크롤 히어로와 인디고 톤 전환.
2. Patent 1873 / Cultural Icon / Craft: 섹션별 reveal과 공정 중심 스토리텔링.
3. Today / Worn-in: 데님 텍스처와 라이프스타일 이미지가 이어지는 현재성 섹션.
4. Archive: 501 피스를 분해해 보여주는 3D 아카이브와 reduced-motion/SVG fallback.

좌측 진행 레일은 데스크톱에서 현재 섹션을 표시하고, 모바일에서는 상단 진행 바로 축약됩니다.

## Architecture

- `src/experience/`: 주요 화면 컴포넌트
- `src/experience/archive3d/`: React Three Fiber 기반 3D 아카이브
- `src/data/`: 콘텐츠와 이미지 asset 매핑
- `src/hooks/`: smooth scroll, reveal, reduced motion 관련 훅
- `src/styles/`: 토큰, 레이아웃, 경험 화면 스타일
- `public/images/generated/`: 런타임 generated WebP 이미지
- `public/images/placeholders/`: placeholder SVG fallback
- `images-src/`: generated PNG 원본과 OG image 원본

## Accessibility

- `prefers-reduced-motion` 환경에서 Lenis/scroll animation을 줄이고 정적 화면으로 fallback합니다.
- skip link, `main` landmark, `focus-visible`, 고정 내비게이션용 `scroll-margin-top`을 적용했습니다.
- 장식용 SVG와 3D canvas는 보조기술에서 숨기고, 501 구성 요소는 별도 캡션 리스트로 제공합니다.

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

### Image Modes

기본 개발/빌드 모드는 generated WebP 이미지를 사용합니다.

```bash
npm run dev
npm run build
```

레이아웃, crop ratio, fallback만 점검할 때는 placeholder 모드를 사용합니다.

```bash
npm run dev:placeholder
npm run build:placeholder
```

generated 모드를 명시하고 싶을 때는 아래 alias를 사용할 수 있습니다.

```bash
npm run dev:generated
npm run build:generated
```

### Asset Maintenance

```bash
npm run assets:placeholders
npm run assets:generated
npm run assets:og
```

`scripts/create-og-image.py`는 generated 이미지를 조합해 `public/images/og-image.webp`와 `images-src/og-image.png`를 생성합니다.

## Deployment

GitHub Pages 배포를 기준으로 기본 `base`는 `/levis/`입니다. 빌드 후 `scripts/copy-404.mjs`가 `dist/index.html`을 `dist/404.html`로 복사해 SPA deep link fallback을 제공합니다.

커스텀 도메인의 root에 배포할 경우:

```bash
VITE_BASE_PATH=/ npm run build
```

## Docs Map

| 문서 | 내용 |
| --- | --- |
| [CASE_STUDY.md](CASE_STUDY.md) | 콘셉트, 디자인 시스템, IA, 기술 구현 정리 |
| [docs/IMAGE_ASSET_PLAN.md](docs/IMAGE_ASSET_PLAN.md) | generated/placeholder 이미지 운용 계획 |
| [docs/NON_FUNCTIONAL_REVIEW.md](docs/NON_FUNCTIONAL_REVIEW.md) | 접근성, SEO, 문서화 관점 리뷰 |
| `docs/legacy/` | 이전 정적 사이트 기획/리뷰 기록 |
