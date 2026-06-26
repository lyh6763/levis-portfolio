# LEVI'S Heritage — Wear-in

입을수록 길드는 청바지처럼, **스크롤할수록 길드는** 데님 헤리티지 아카이브.
하나의 인터랙션 컨셉(wear-in)으로 그린필드 재설계한 단일 몰입형 스크롤 사이트입니다.

> 자세한 설계 배경·기술 분해는 [CASE_STUDY.md](CASE_STUDY.md) 참조.

## Tech Stack
- React 19 + Vite + TypeScript
- GSAP ScrollTrigger (핀 + 스크럽) · Lenis (관성 스크롤)
- React Three Fiber + drei (Archive 3D, 코드분할 island)
- CSS Custom Properties 기반 디자인 토큰

## Experience
단일 페이지 몰입형 스크롤 — 라우트 없이 한 흐름으로 이어집니다.

1. **Hero → Origin 1853** — 핀 고정 + 연속 스크럽. 스크롤 진행이 배경 페이딩(raw indigo→washed)·헤드라인 크로스페이드·연도 매듭을 동시 구동.
2. **Patent 1873 · Cultural Icon · The Craft** — fade-scale을 단계적으로 잇는 reveal 챕터.
3. **Today · Worn-in** — ecru 도착(잉크 텍스트).
4. **Archive** — ②→③ 모드 전환(ecru→blueprint) + 501 분해. 데스크탑은 R3F 3D(드래그 회전), 그 외(모바일·미지원·reduced-motion)는 SVG 폭발도 폴백.

전 구간 좌측(데스크탑)/상단(모바일) **셀비지 실 진행 레일**이 스크롤 위치를 표시합니다.

## Architecture
- `src/experience/` — 화면 컴포넌트 (HeroOrigin, StoryChapter, Archive, ArchiveExploded, ProgressRail, SceneBlock)
- `src/experience/archive3d/` — R3F 캔버스(JeanCanvas) + WebGL 감지. lazy import로 three.js를 별도 청크로 분리(초기 번들 미포함).
- `src/styles/tokens.css` — 디자인 토큰(빌드 정본). `indigo fade-scale` → 셀비지 레드 단일 액센트 → 세 무대 모드.
- `src/hooks/` — `useSmoothScroll`(Lenis↔ScrollTrigger 동기화), `useRevealOnScroll`, `usePrefersReducedMotion`
- 모든 GSAP는 `gsap.context`로 React 생명주기에 안전하게 묶음.
- 데이터 레이어(`src/data/content.ts`)는 후속 콘텐츠/갤러리 와이어링용으로 보존(현재 미사용).

## Accessibility
- `prefers-reduced-motion`: 컴포넌트마다 Lenis/핀/스크럽을 끄고 정적 대표 프레임으로 폴백.
- skip-link · `<main>` 랜드마크 · 셀비지 레드 `:focus-visible` 링.
- 장식 SVG/3D 캔버스는 `aria-hidden`, 501 부품은 읽히는 캡션 리스트로 대체.

## Scripts
```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

## Deployment
GitHub Pages 기준 Vite `base`는 기본 `/levis/`이며, 빌드 후 `scripts/copy-404.mjs`가 `dist/404.html`을 생성해 딥링크 fallback을 제공합니다. 커스텀 도메인/루트 배포는 `VITE_BASE_PATH=/`로 빌드하세요.

## Docs Map
| 문서 | 내용 |
|---|---|
| [CASE_STUDY.md](CASE_STUDY.md) | 컨셉·디자인시스템·IA·시그니처 인터랙션 기술 분해·캡처 가이드 |
| `prototypes/` | 디자인 토큰·컴포넌트 정의·Archive 와이어프레임·모션 스파이크(탐색 산출물) |
| `docs/legacy/` | v1(멀티페이지 static→React) 기획·리뷰·체인지로그 (역사 기록) |

## Image Assets
원본 PNG는 배포에서 제외된 `images-src/`에 보존하고, 최적화본은 `scripts/optimize-images.py`로 `public/images/optimized/`(WebP)에 생성합니다. 현재 디자인은 대부분 색상·SVG·3D 기반이라 이미지 사용은 최소입니다.
