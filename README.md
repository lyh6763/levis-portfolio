# WARP & WEFT | Levi's와 블루진의 150년

Levi's와 블루진의 역사를 아홉 개의 장으로 읽는 롱폼 에디토리얼 포트폴리오입니다. 사진 대신 타이포그래피와 직접 그린 SVG 도식으로 이야기를 전하고, 모든 사실 서술에 각주로 출처를 답니다. Levi Strauss & Co.와 관계없는 비공식 콘셉트 작업입니다.

> 이전 버전(wear-in 스크롤 경험)에서 전면 개편 중입니다. 기획과 진행 상태는 [docs/REDESIGN_PLAN.md](docs/REDESIGN_PLAN.md)에 있습니다.

## Tech Stack

- React 19 + Vite + TypeScript
- React Router (챕터별 라우트)
- GSAP ScrollTrigger + Lenis
- CSS Custom Properties 기반 디자인 토큰
- GitHub Pages 배포 기준 Vite `base` + `404.html` fallback

## Structure

| 경로 | 내용 |
| --- | --- |
| `/` | 표지 + 목차 |
| `/chapters/:slug` | 01 Gold & Canvas … 09 Worn |
| `/sources` | 각주가 가리키는 출처 |
| `/colophon` | 작업 소개, 비공식 고지 |

## Architecture

- `src/data/chapters.ts`: 챕터 메타데이터와 본문 블록(문단, 소제목, 인용, 수치, 박스, 시각화). 본문의 `[^sourceId]`가 각주가 된다
- `src/data/sources.ts`: 출처 목록
- `src/editorial/`: 레이아웃, 마스트헤드, 목차 다이얼로그, 읽기 진행 바, 각주
- `src/pages/`: 라우트별 페이지
- `src/viz/`: 챕터별 SVG 시각화와 레지스트리
- `src/hooks/`: Lenis 스무스 스크롤, 스크롤 스크럽, reveal, 문서 제목
- `src/styles/`: 토큰, 에디토리얼 레이아웃, 시각화 스타일

## Accessibility

- `prefers-reduced-motion`이면 Lenis와 스크롤 스크럽을 끄고 시각화를 최종 상태로 렌더링합니다.
- skip link, `main` landmark, 라우트 전환 시 본문 포커스 이동, `focus-visible`.
- 목차는 네이티브 `<dialog>`(포커스 트랩, Escape), 각주는 `aria-expanded` 버튼 + 팝오버, 챕터 끝 Notes 목록 제공.
- 슬라이더 시각화는 네이티브 range input과 `aria-live` 요약을 함께 제공합니다.

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

## Deployment

GitHub Pages 배포를 기준으로 기본 `base`는 `/levis/`입니다. 빌드 후 `scripts/copy-404.mjs`가 `dist/index.html`을 `dist/404.html`로 복사해 `/chapters/...` 같은 딥 링크를 지원합니다.

커스텀 도메인의 root에 배포할 경우:

```bash
VITE_BASE_PATH=/ npm run build
```

## Docs Map

| 문서 | 내용 |
| --- | --- |
| [docs/REDESIGN_PLAN.md](docs/REDESIGN_PLAN.md) | v3 리디자인 기획, 우선순위, 진행 상태 |
| [CASE_STUDY.md](CASE_STUDY.md) | v2(wear-in) 케이스 스터디 — v3 기준 재작성 예정 |
| [docs/IMAGE_ASSET_PLAN.md](docs/IMAGE_ASSET_PLAN.md) | generated/placeholder 이미지 운용 (P2 커머스에서 재사용 예정) |
| `docs/legacy/` | 초기 정적 사이트 기획/리뷰 기록 |
