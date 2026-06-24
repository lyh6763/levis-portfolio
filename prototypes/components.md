# 컴포넌트 정의 — Levi's Heritage (wear-in)

[`design-tokens.md`](design-tokens.md) / [`tokens.css`](tokens.css) 참조. 토큰은 `--color-*`, `--type-*`, `--space-*` 표기.
세 무대 모드: **Narrative(①)** / **Editorial(②)** / **Blueprint(③)**.

---

## 1. Nav / GNB
- **용도**: 전 화면 상단 고정. 브랜드 마크 + 챕터 링크. 셀비지 실(②) 진행바와 시각적으로 연결.
- **Variants**: `on-dark`(Narrative) / `on-light`(Editorial·Blueprint)
- **States**: Default / Scrolled(축소·배경 살짝) / Menu-open(mobile)
- **Props**: `mode`, `currentChapter`, `scrolled:boolean`
- **크기**: full-width × 72px (mobile 56px), padding `--space-5` `--space-6`
- **토큰 참조**:
  - text(on-dark): `--color-text-on-dark` / text(on-light): `--color-text-on-light`
  - logo: `--type-title-nav` (Oswald 700, tracking `--tracking-nav`)
  - active link underline: `--color-accent-selvedge`

## 2. RedTab (브랜드 탭 / 에브로우)
- **용도**: `EST. 1853` 배지, 섹션 도입 라벨.
- **Variants**: `tab`(빨강 채움) / `chapter`(텍스트만, 빨강 글자) / `outline`
- **States**: Default (정적)
- **Props**: `label`, `variant`
- **크기**: 높이 20px, padding `--space-1` `--space-3`, radius `--radius-tab`
- **토큰 참조**:
  - tab bg: `--color-accent-selvedge`, text: `#fff`
  - chapter text: `--color-accent-selvedge`
  - type: `--type-eyebrow` (11px, weight 600, tracking `--tracking-eyebrow`, UPPERCASE)

## 3. SelvedgeThread (진행/내비 — 시그니처 ②)
- **용도**: 좌측 고정 셀비지 실. 스크롤 진행바 + 챕터 점프 내비. 사이트의 핵심 모티프.
- **Variants**: `rail`(전 구간) / `inline`(섹션 내 라인 드로잉)
- **States**: Idle / Drawing(scrub) / Knot-active(연도 매듭) / Knot-hover(점프 가능)
- **Props**: `progress:0..1`, `chapters:[{at,label}]`, `activeIndex`
- **크기**: 실 두께 3–5px, 좌측 마진 `--space-7`(28px), 매듭 ⌀13–15px
- **토큰 참조**:
  - track: `--color-text-on-dark` @16% alpha
  - fill/knot stroke: `--color-accent-selvedge`
  - knot fill: 현재 배경(`fade-scale`)과 동일 → 떠 있는 느낌
- **모션**: fill height = `progress`; knot opacity는 해당 `at±0.03` 좁은 구간에서 스냅. reduced-motion → fill 100% 고정.

## 4. SceneBlock (내러티브 텍스트 블록)
- **용도**: Hero 및 각 챕터의 eyebrow + 디스플레이 타이틀 + 본문.
- **Variants**: `hero`(최대 타이틀) / `chapter`
- **States**: Enter(y+10, α0) / Active(y0, α1) / Exit(y-18, α0) — scrub 구동, 인접 블록과 크로스페이드
- **Props**: `eyebrow`, `title`, `body`, `variant`
- **크기**: max-width 420px(hero) / 460px(chapter), 좌측 `--grid-desktop-margin`
- **토큰 참조**:
  - hero title: `--type-display-hero` (Oswald 700, leading `--leading-tight`, tracking `--tracking-display`)
  - chapter title: `--type-display-l`
  - body: `--type-body-m`, color `--color-text-on-dark-muted`
  - stitch 밑줄: `--color-accent-selvedge` (3px dashed)

## 5. ReadMoreLink / CTA
- **용도**: 챕터 이동·"Explore" 액션.
- **Variants**: `inline-arrow`(텍스트+→) / `tab`(red-tab 스타일 버튼)
- **States**: Default / Hover(화살표 translateX, 밑줄 draw) / Focus(`--color-focus-ring` 2px) / Disabled
- **Props**: `label`, `to`, `variant`
- **크기**: 타이포 `--type-caption`(Oswald, tracking 1.5px), 터치 타깃 ≥44px
- **토큰 참조**: text `--color-text-on-dark`, hover accent `--color-accent-selvedge`, transition `--motion-dur-base` `--motion-ease-ui`

## 6. ProcessStep (Craft 공정 카드)
- **용도**: 원단·염색·재단·봉제 4단계.
- **Variants**: `image-left` / `image-right`(교차)
- **States**: Reveal(IntersectionObserver fade-up) / reduced → 정적
- **Props**: `number`, `title`, `subtitle`, `image`, `paragraphs[]`, `facts[]`
- **크기**: 12컬럼 중 이미지 6 / 텍스트 5(+1 거터)
- **토큰 참조**: number `--type-display-l` @ `--color-stitch-topstitch`; facts `--type-body-s`; gutter `--grid-desktop-gutter`

## 7. ModelCard / ModelList (501·505·517)
- **용도**: Archive 상단 모델 목록. ③ 폭발도와 연결되는 진입점.
- **Variants**: `list-row`(가로 큰 카드) / `compact`
- **States**: Default / Hover(이미지 줌·spec 노출) / Selected(폭발도로 전환)
- **Props**: `year`, `title`, `description`, `image`, `specs[]`
- **크기**: row 높이 ~320px, 이미지 좌 5컬럼
- **토큰 참조**: bg `--color-bg-canvas`(②) 또는 `--color-bg-blueprint`(③); spec `--type-mono-hud`; 구분선 `--color-border-blueprint`

## 8. Exploded501Panel (③ 시그니처 — R3F)
- **용도**: Archive 탐색 핵심. 분해된 501을 드래그 회전 + 부품 클릭 확대.
- **Variants**: `full`(전체 화면 캔버스) / `inset`(섹션 내)
- **States**: Assembled(0%) / Exploding(scrub·drag) / Part-selected(콜아웃 확대) / Loading(island 코드분할) / Fallback(정적 폭발도 SVG)
- **Props**: `explode:0..1`, `selectedPart`, `parts:[{id,label,year}]`
- **크기**: 캔버스 16:10 또는 full-bleed; 콜아웃 칩 자동 배치
- **토큰 참조**:
  - bg: `--color-bg-blueprint`, grid `--color-border-blueprint`
  - 콜아웃 칩: text `--color-text-on-light`, 액센트 `--color-accent-copper`(리벳)·`--color-accent-selvedge`(레드탭)
  - topstitch: `--color-stitch-topstitch`
- **성능/접근성**: R3F는 이 컴포넌트에서만 dynamic import(island). reduced-motion·WebGL 미지원 → 정적 SVG 폭발도로 폴백.

## 9. TextureGalleryItem
- **용도**: 텍스처/문화 갤러리 타일.
- **Variants**: `large`(2×) / `default`
- **States**: Default / Hover(label reveal, 미세 scale) / Lazy(IntersectionObserver)
- **Props**: `image`, `alt`, `label`, `large:boolean`
- **크기**: masonry/grid, gutter `--grid-desktop-gutter`, radius `--radius-md`
- **토큰 참조**: label `--type-caption` on `--color-text-on-light`; overlay 딤 rgba(20,33,61,.0→.4)

## 10. HUDReadout
- **용도**: 진행·상태 인디케이터(`53% worn`, 챕터명).
- **Variants**: `progress` / `chapter` / `fade-state`
- **States**: 스크롤 동기 업데이트
- **Props**: `value`, `kind`
- **크기**: 코너 고정, `--type-mono-hud`
- **토큰 참조**: text `--color-text-on-dark-muted`(① 위) / `--color-text-on-light-muted`(②③ 위); family `--font-family-mono`

---

## Figma 네이밍 (컴포넌트)
```
Component/Nav/[on-dark|on-light]--[Default|Scrolled]
Component/RedTab/[Tab|Chapter|Outline]--Default
Component/SelvedgeThread/[Rail|Inline]--[Idle|Drawing|KnotActive]
Component/SceneBlock/[Hero|Chapter]--[Enter|Active|Exit]
Component/ReadMoreLink/[InlineArrow|Tab]--[Default|Hover|Focus|Disabled]
Component/ProcessStep/[ImageLeft|ImageRight]--Default
Component/ModelCard/[ListRow|Compact]--[Default|Hover|Selected]
Component/Exploded501Panel/[Full|Inset]--[Assembled|Exploding|PartSelected|Fallback]
Component/TextureGalleryItem/[Large|Default]--[Default|Hover]
Component/HUDReadout/[Progress|Chapter|FadeState]--Default
```
