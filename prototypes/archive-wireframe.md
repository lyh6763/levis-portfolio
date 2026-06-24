# 와이어프레임 — Archive 방 (S-ARCHIVE)

선형 몰입 내러티브(①) 종료 후 진입하는 **탐색형 방**. ② 에디토리얼에서 ③ 블루프린트로 모드가 전환되며, 501 폭발도(R3F)가 중심.
참조: [components.md](components.md) · [design-tokens.md](design-tokens.md).

## 프레임 정보
- 디바이스: Desktop 1440 / Mobile 390
- 그리드: 12컬럼 / gutter 24 / margin 7vw (폭발도는 full-bleed) · Mobile 4컬럼 / gutter 16 / margin 20
- 프레임명(Figma): `Screen/S-ARCHIVE_Collection`
- 모드: 진입부 **Editorial(②)** → 폭발도 구간 **Blueprint(③)** → 아웃트로 ② 복귀
- 스크롤 모델: 진입까지 선형 → 폭발도 패널에서 **핀 + 자유 인터랙션(드래그/클릭)** → 해제 후 다시 선형

---

## 섹션 구조 (Desktop)

```
┌───────────────────────────────────────────────┐
│ Nav (on-light, 72px 고정)            ← ② 모드  │
├───────────────────────────────────────────────┤
│ A0 · Threshold (모드 전환)  높이 70vh           │
│   RedTab "COLLECTION"                           │
│   Display "The Archive."                        │
│   배경: ecru → blueprint 로 scrub 전환          │
│   SelvedgeThread 매듭 → 여기서 '탐색 모드' 표식  │
├───────────────────────────────────────────────┤
│ A1 · Model List           높이 auto             │
│   ModelCard(list-row) × 3  (501 / 505 / 517)    │
│   Hover→spec, Click→A2 폭발도로 deep-link        │
├───────────────────────────────────────────────┤
│ A2 · Exploded 501 (R3F)   높이 100vh · PIN      │  ← ③ Blueprint
│   ┌─────────────── full-bleed canvas ────────┐ │
│   │   [그리드 배경]                            │ │
│   │        분해된 501 (drag-rotate)            │ │
│   │   ◦ 콜아웃 칩: 원단/스티치/리벳/레드탭/패치 │ │
│   └────────────────────────────────────────┘ │
│   하단 HUD: explode 슬라이더 + part 인덱스       │
├───────────────────────────────────────────────┤
│ A3 · Texture Gallery      높이 auto             │  ← ② 복귀
│   Masonry: large 1 + default 4 (lazy)           │
├───────────────────────────────────────────────┤
│ A4 · Culture Archive      높이 auto             │
│   CultureItem × 4 (Workwear/Campaign/Music/St.) │
├───────────────────────────────────────────────┤
│ A5 · Outro → Today        높이 60vh             │
│   SelvedgeThread 재개 → 다음(Today) 챕터로        │
└───────────────────────────────────────────────┘
```

---

## 컴포넌트 배치

| 컴포넌트 | 섹션 | 위치/크기 | 상태 | 모드 |
|---|---|---|---|---|
| Nav | 전역 | 상단 고정 72px | on-light → Scrolled | ②/③ |
| SelvedgeThread(rail) | 전역 | 좌측 28px | Knot-active(A0,A5) | ②→③→② |
| RedTab(chapter) | A0 | 좌상 | Default | ② |
| SceneBlock(chapter) | A0 | 컬럼 1–6 | Active | ② |
| ModelCard(list-row) ×3 | A1 | full-width 행 | Default/Hover/Selected | ② |
| Exploded501Panel(full) | A2 | full-bleed, PIN | Assembled→Exploding→PartSelected / Fallback | ③ |
| HUDReadout(progress) | A2 | 우하단 | 스크롤·드래그 동기 | ③ |
| TextureGalleryItem | A3 | masonry, large 2× | Hover/Lazy | ② |
| CultureItem(card) | A4 | 컬럼 3×4 | Reveal | ② |
| ReadMoreLink | A5 | 중앙 | Hover | ② |

---

## ②→③ 모드 전환 인터랙션 (핵심 순간)

A1(모델 리스트, 에디토리얼) → A2(폭발도, 블루프린트)로 넘어갈 때:

1. **배경 모드 크로스페이드** — ecru(`--color-bg-canvas`) → blueprint(`--color-bg-blueprint`)를 짧은 스크롤 구간에서 scrub. 그리드 라인이 페이드인.
2. **501이 조립→공중 부양** — A2 진입 시 501 실루엣이 중앙으로 모이며 살짝 떠오름(assemble), 이어 스크롤/드래그로 explode.
3. **스크롤 → 인터랙션 전환** — A2에서 패널이 PIN되며 스크롤이 멈추고, 사용자 입력이 **드래그 회전 + explode 슬라이더 + 부품 클릭**으로 넘어감. "읽기"에서 "만지기"로 모드가 바뀌는 비트.
4. **이탈** — 마지막 부품까지 본 뒤(또는 스킵) 핀 해제, 배경이 ecru로 복귀하며 A3로 선형 스크롤 재개.
5. **폴백** — WebGL 미지원·reduced-motion: 폭발도는 정적 SVG(앞서 만든 목업 형태)로, 부품 콜아웃은 클릭 토글 리스트로 제공. 스크롤은 계속 선형.

> 설계 의도: 전체 사이트에서 **유일하게 리듬이 바뀌는 지점**. 선형 몰입에 익숙해진 사용자에게 능동적 탐색을 던져 경험에 기복을 만든다.

---

## Mobile (390) 변형
```
A0 Threshold: 타이틀 축소(display/l), thread는 상단 진행바로 대체
A1 Model: ModelCard(compact) 세로 스택, spec은 탭으로 펼침
A2 Exploded: 핀 대신 1화면 고정 캔버스 + explode 슬라이더(드래그 회전 1축만),
             저사양 감지 시 정적 SVG 폴백 우선
A3 Gallery: 1–2컬럼
A4 Culture: 1컬럼 스택
```
- 모바일은 폭발도 R3F를 **조건부 로드**(뷰포트·deviceMemory·WebGL 체크) → 미달이면 정적 폴백. 스크롤-스크럽 강도 완화.

## Figma 프레임 네이밍
```
Screen/S-ARCHIVE_Collection           (Desktop 1440)
Screen/S-ARCHIVE_Collection--mobile   (Mobile 390)
Section/Archive_Threshold | _ModelList | _Exploded501 | _TextureGallery | _Culture | _Outro
```
