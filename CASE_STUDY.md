# Case Study — Levi's Heritage, "Wear-in"

> 입을수록 길드는 청바지처럼, 스크롤할수록 길드는 헤리티지 사이트.
> 정적 HTML→React 포트폴리오를 **하나의 인터랙션 컨셉**으로 그린필드 재설계한 기록.

`[라이브 링크]` · `[GitHub]` · 브랜치 `redesign/wear-in`

---

## 0. TL;DR
- **역할**: 크리에이티브/인터랙션 개발 — 컨셉·디자인 시스템·구현 전 과정
- **스택**: React 19 · Vite · GSAP ScrollTrigger · Lenis · CSS Custom Properties(디자인 토큰)
- **구조**: 단일 몰입형 롱스크롤 내러티브 + Archive 탐색 방
- **한 줄 가치**: 효과를 흩뿌리는 대신, 데님의 브랜드 진실(wear-in)을 스크롤 인터랙션으로 번역

## 1. 컨텍스트 & 문제
기존 사이트는 정적 HTML/CSS/JS를 React+TS로 옮긴, 기술적으로는 깔끔하지만 표현은 관습적인 헤리티지 마이크로사이트였다(카드 그리드 + 페이드인 + 타임라인). 데님이라는 물성·서사가 풍부한 소재에 비해 **기억에 남지 않는다**는 것이 문제였다.

→ 목표 재정의: "예쁜 사이트"가 아니라 **하나의 강한 컨셉을 끝까지 밀어붙인 작업물**.

## 2. 컨셉 — 노스스타
데님의 브랜드 진실은 하나다: **입을수록 길든다(wear-in)**. 세상에서 유일하게 시간을 기록하는 옷감.

> 스크롤(=시간) → 인디고가 페이딩 → 사용자가 서사를 읽는 동안 *청바지를 길들인다.*

이 메타포가 정해지자 컬러·모션·구조가 전부 한 방향을 가리켰다. 검토했던 세 컨셉(① wear-in 페이딩 / ② 셀비지 실 / ③ 501 분해)을 경쟁이 아니라 **역할 분담**으로 통합했다 — ① 메인 내러티브, ② 진행/내비 척추, ③ Archive 탐색.

## 3. 디자인 시스템
- **fade-scale이 단일 진실 소스**: `--color-fade-00..100`(raw indigo → washed → ecru)이 곧 스크롤 진행이자 챕터 위치. 색 토큰 하나가 모션을 구동한다.
- **한 토큰, 세 무대**: Narrative(인디고 몰입) / Editorial(에크루) / Blueprint(아카이브 기술). 같은 컴포넌트가 섹션마다 옷을 갈아입는다.
- **절제**: 셀비지 레드 단일 액센트 + 골드 탑스티치 + 샤프 코너.
- 산출물: [prototypes/design-tokens.md](prototypes/design-tokens.md) → [src/styles/tokens.css](src/styles/tokens.css)(빌드 정본).

## 4. 정보구조(IA)
단일 몰입형 스크롤 + Archive 방, **셀비지 실(②)이 전 구간 진행/내비 척추**.

```
Hero ─ Origin 1853 ─ Patent 1873 ─ Cultural Icon ─ The Craft ─ Today(ecru 도착) ─ Archive(②→③ 모드 전환)
```

## 5. 시그니처 인터랙션 · 기술 분해 ★

### 5-1. Hero → Origin: wear-in 스크럽 ([HeroOrigin.tsx](src/experience/HeroOrigin.tsx))
스크롤 진행 하나가 배경 페이드·마모·헤드라인 크로스페이드를 동시 구동. 색은 토큰을 런타임에 읽어 적용 → 토큰이 모션을 제어함을 증명.

```ts
const ctx = gsap.context(() => {
  gsap.set(el, { backgroundColor: indigoRaw }); // --color-indigo-900
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: el, start: 'top top', end: '+=1400', pin: true, scrub: 1 },
  });
  tl.to(el, { backgroundColor: indigoWash }, 0)             // 인디고 워싱 (토큰값)
    .to('.scene--hero', { yPercent: -18, autoAlpha: 0, duration: 0.22 }, 0.30)
    .fromTo('.scene--origin',
      { yPercent: 10, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.28 }, 0.46);  // 0.30↔0.46 겹침 = 빈 화면 제거
}, root);
return () => ctx.revert(); // React 생명주기 안전 (StrictMode 이중 마운트 OK)
```

### 5-2. 내러티브 챕터 ([StoryChapter.tsx](src/experience/StoryChapter.tsx))
연속 스크럽(시그니처) 뒤는 **에디토리얼 reveal**로 역할 분담. 기존 `useRevealOnScroll`(IntersectionObserver) 재사용 + fade-scale을 단계적으로 잇는 tone. 가독성을 위해 챕터는 인디고 밴드 유지 → Today에서만 ecru 도착.

### 5-3. 셀비지 실 = 전 구간 진행 레일 ([ProgressRail.tsx](src/experience/ProgressRail.tsx))
진행값을 CSS 변수로 노출하고 **방향은 CSS가 결정** → 데스크탑 세로 / 모바일 상단 가로, 같은 로직으로.

```ts
onUpdate: (self) => rail.style.setProperty('--rail-progress', self.progress.toFixed(4));
```
```css
.rail__fill { transform: scaleY(var(--rail-progress)); }            /* desktop: 세로 */
@media (max-width: 768px) { .rail__fill { transform: scaleX(var(--rail-progress)); } } /* mobile: 가로 */
```

### 5-4. Archive: ②→③ 모드 전환 + 501 분해 ([ArchiveExploded.tsx](src/experience/ArchiveExploded.tsx))
핀 구간에서 ecru→blueprint 크로스페이드 + 501 조립→폭발. "읽기 → 만지기"로 리듬이 바뀌는 유일한 지점. 501 SVG는 전부 토큰 구동이며, 추후 **R3F island의 WebGL 폴백**으로 그대로 재사용.

### 5-5. 성능 & 접근성 (판단 근거)
- **WebGL 격리 전략**: 3D(R3F)는 Archive 한 섹션에 island로 한정 → 초기 로드·성능 보호 (현재는 SVG 폴백으로 선구현).
- **reduced-motion**: 컴포넌트마다 Lenis/핀/스크럽을 끄고 **정적 대표 프레임**으로 — 내러티브는 raw indigo 시작, Archive는 정보 우선 폭발도. 서사가 무너지지 않게 폴백을 *따로 설계*.
- **a11y**: skip-link, `<main>` 랜드마크, 셀비지 레드 `:focus-visible` 링. Archive 모바일 캡션 리스트가 장식 SVG의 읽히는 대체 텍스트 역할.
- **nav 모드**: 단일 ScrollTrigger 밴드로 밝은 섹션에서 nav를 잉크색으로 전환(가독성).
- **모바일 재구성**: 스케일 투 핏을 넘어 — 레일→상단바, 히어로 세로 구도(연도 풀블리드 배경), Archive 캡션 리스트.

## 6. 프로세스
포지셔닝 결정(크리에이티브/그린필드) → 3컨셉 무드·레퍼런스·인터랙티브 목업 비교 → IA 하이브리드 → **모션 스파이크로 검증**(실제 GSAP+Lenis 코드) → 토큰·컴포넌트·와이어프레임 확정 → 단계 빌드(A 기반 → B Hero 수직 슬라이스 → C 내러티브 → D Archive → E 마감). "스파이크 먼저"로 손에 잡히는지를 가장 빨리 검증했다. 탐색 산출물: [prototypes/](prototypes/).

## 7. 결과 / 무엇을 증명하나
- 스크럽 머티리얼 스토리텔링, **디자인-코드 토큰 연결**(색이 모션을 구동), 모드 전환 설계, 접근성·성능 의식, 모바일 재구성.
- 번들: JS ~115KB gzip(React+GSAP+Lenis), CSS ~3.3KB gzip. `[Lighthouse 점수]`

## 8. 회고 / 다음
- 잘된 점: 단일 컨셉의 일관성, 토큰 단일 소스, 스파이크 우선 검증.
- 트레이드오프: WebGL 범위 vs 완주 → 3D를 폴백 가능한 한 겹으로 격리해 해소.
- 다음: Archive 501을 R3F island 3D로 교체, 챕터 콘텐츠 데이터 와이어링([data/content.ts](src/data/content.ts)), 사운드(선택).

---

## 캡처 가이드 (작성 시 확보할 에셋)
> 모두 `npm run dev` → http://localhost:5173/levis/ 기준. 화면 녹화 후 GIF 변환(예: ScreenToGif / ezgif). reduced-motion은 Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce".

| # | 컷 | 방법 |
|---|---|---|
| 1 | before(기존) | `git switch main` → dev → 홈 1컷 (1440) |
| 2 | Hero raw indigo | redesign 브랜치, **스크롤 0**, 데스크탑 |
| 3 | worn-in ecru | Today 챕터까지 스크롤(ecru, "150 Years, Worn-in.") |
| 4 | **wear-in 스크롤 GIF** | Hero→Origin 구간 천천히 스크롤 녹화 6–8s (배경 워싱 + 헤드라인 크로스페이드 + 레일) |
| 5 | **Archive 모드전환+폭발 GIF** | Archive 진입~폭발 녹화 6–8s (ecru→blueprint + 501 분해) |
| 6 | 셀비지 레일 | 중간 스크롤 데스크탑, 좌측 레일 절반 찬 컷 |
| 7 | 모바일 히어로 | DevTools 390px, 상단 가로바 + 하단 텍스트 + 연도 배경 |
| 8 | 모바일 Archive | 390px, 가운데 501 + 하단 캡션 리스트 |
| 9 | reduced-motion | prefers-reduced-motion emulate → Hero(정적 raw) / Archive(정적 폭발도) 2컷 |
| 10 | 토큰 팔레트 | fade-scale 스와치 이미지 |

## 인터뷰용 사운드바이트
- "효과 10개를 흩뿌리는 대신, 브랜드 진실 하나(wear-in)를 인터랙션으로 번역했습니다."
- "fade-scale 토큰이 곧 스크롤 진행도라, 색·모션·위치가 단일 소스에서 나옵니다 — GSAP이 토큰값을 런타임에 읽습니다."
- "WebGL을 Archive 한 섹션에 격리해, 화려함과 초기 성능을 동시에 잡았습니다."
- "reduced-motion에서도 서사가 무너지지 않게 정적 대표 프레임을 따로 설계했습니다."
- "모바일은 PC를 줄인 게 아니라, 레일·히어로·아카이브를 세로 화면용으로 다시 짰습니다."
