# WARP & WEFT | Levi's와 블루진의 150년

Levi's와 블루진의 역사를 아홉 개의 장으로 읽는 롱폼 에디토리얼 포트폴리오입니다. 사진 대신 타이포그래피와 직접 그린 SVG 도식으로 이야기를 전하고, 모든 사실 서술에 각주로 출처를 답니다. Levi Strauss & Co.와 관계없는 비공식 콘셉트 작업입니다.

> 기획 배경과 구현 과정은 [CASE_STUDY.md](CASE_STUDY.md), 우선순위와 진행 상태는 [docs/REDESIGN_PLAN.md](docs/REDESIGN_PLAN.md)에 있습니다.

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
| `/inside-out` | 숨은 층: 빈티지 501 연대 감정 도구 (풀린 실밥 5개, 09장 끝, 푸터 버튼으로 진입) |
| `/shop`, `/shop/:slug` | Heritage Line: 시대별 복각 모델 콘셉트 커머스 (사이즈 추천기, 장바구니 데모, 결제 없음) |

## Architecture

- `src/data/chapterMeta.ts`: 챕터 메타데이터(제목, 소개, 읽는 시간)와 본문 블록 타입
- `src/content/chapters/<slug>.ts`: 챕터별 본문 블록(문단, 소제목, 인용, 수치, 박스, 시각화). 본문의 `[^sourceId]`가 각주가 된다
- `src/data/chapters.ts`: 메타데이터 재수출과 챕터 본문 지연 로더(`loadChapterBlocks`)
- `src/data/sources.ts`: 출처 목록
- `src/editorial/`: 레이아웃, 마스트헤드, 목차 다이얼로그, 읽기 진행 바, 각주, 링크 미리 불러오기, 청크 로딩 오류 경계
- `src/pages/`: 라우트별 페이지. 표지 외에는 `loaders.ts`를 거쳐 지연 로딩
- `src/viz/`: 챕터별 SVG 시각화와 지연 로딩 레지스트리. `JeanBack`은 연도별 501 뒷면 도식으로 03장과 상점이 함께 쓴다
- `src/insideOut/`, `src/data/insideOut.ts`: 숨은 층(실밥 수집, 뒤집기 전환, 감정 단서와 추정 로직)
- `src/shop/`, `src/data/shop.ts`: Heritage Line(상품 카드, 사이즈 추천기, 장바구니)
- `src/hooks/`, `src/lib/scrollTrigger.ts`: Lenis 스무스 스크롤, GSAP 스크롤 스크럽(지연 로딩), reveal, 문서 제목
- `src/styles/`: 토큰, 에디토리얼 레이아웃, 시각화 스타일

## Code Splitting

| 청크 | gzip | 언제 받나 |
| --- | --- | --- |
| `vendor` (React, React Router, Lenis) | 약 79 KB | 처음. 앱 코드가 바뀌어도 해시가 유지돼 캐시가 산다 |
| `index` (레이아웃, 표지, 메타데이터) | 약 12 KB | 처음 |
| 페이지 (`ChapterPage`, `InsideOutPage` 등) | 1–5 KB | 해당 라우트에 들어갈 때 |
| 챕터 본문 (`content/chapters/*`) | 0.4–1.5 KB | 그 챕터에 들어갈 때 |
| 시각화 (`viz/*`) | 0.8–1.7 KB | 그 시각화가 있는 챕터에서 |
| `gsap` | 약 45 KB | 스크롤 스크럽 시각화가 처음 필요할 때 |

- 링크에 포인터를 올리거나 포커스하면 그 챕터의 페이지·본문·시각화를 미리 받고, 챕터를 다 그린 뒤 한가할 때 다음 챕터를 미리 받는다(데이터 절약 모드에서는 받지 않음).
- 빌드 때 라우트별 HTML에 그 라우트가 쓸 청크를 `modulepreload`로 적어, 딥 링크로 바로 들어와도 차례로 기다리지 않는다.

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

공유 미리보기 이미지(`public/images/og-image.png`)는 표지 디자인을 옮겨 생성합니다. Python 3와 Pillow가 필요하고, Windows 기본 폰트(Georgia, Malgun Gothic, Consolas)를 씁니다.

```bash
npm run assets:og
```

## Deployment

배포 주소: https://lyh6763.github.io/levis-portfolio/

`main`에 푸시하면 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)이 빌드해 GitHub Pages에 배포합니다(Actions 탭에서 수동 실행도 가능).

빌드 마지막에 [scripts/prerenderRoutes.ts](scripts/prerenderRoutes.ts)(Vite 플러그인)가 라우트마다 `<path>/index.html`을 씁니다. 그래서 `/chapters/lot-501/` 같은 딥 링크도 200으로 응답하고, 각 파일의 `<head>`에는 그 페이지의 제목·설명·canonical·OG와 미리 받을 청크(`modulepreload`)가 들어갑니다. 본문은 클라이언트에서 렌더링합니다. 함께 `404.html`(noindex)과 `sitemap.xml`을 만들며, 라우트 목록은 `src/data/chapterMeta.ts`, `src/content/chapters/buildIndex.ts`, `src/data/shop.ts`에서 읽습니다. GitHub Pages는 이 파일들을 끝에 `/`가 붙은 주소로 서빙하고, 앱은 들어오면서 `/` 없는 주소로 정리합니다.

경로 설정은 두 곳입니다.

- `vite.config.ts`의 `base`: 기본값 `/levis-portfolio/`
- `.env`의 `VITE_SITE_URL`: canonical과 공유 미리보기(OG) 태그가 쓰는 절대 주소

저장소 이름을 바꾸거나 커스텀 도메인 root에 배포한다면 둘을 함께 바꿉니다. 예:

```bash
VITE_BASE_PATH=/ VITE_SITE_URL=https://example.com/ npm run build
```

## Docs Map

| 문서 | 내용 |
| --- | --- |
| [CASE_STUDY.md](CASE_STUDY.md) | 케이스 스터디: 문제 정의, 콘셉트, 주요 기능, 사실 검증, 문제 해결 |
| [docs/REDESIGN_PLAN.md](docs/REDESIGN_PLAN.md) | v3 리디자인 기획, 우선순위, 진행 상태 |
| `docs/legacy/` | v1 정적 사이트와 v2 wear-in 시기의 기획·리뷰·이미지 운용 기록 |
