# 케이스 스터디 골격 — Levi's Heritage 재설계 (wear-in)

> 포트폴리오용 케이스 스터디의 **뼈대**. 각 섹션에 채울 내용 가이드 + 이미 확정된 시드 + 채워야 할 `[플레이스홀더]`.
> 관련 산출물: [design-tokens.md](design-tokens.md) · [components.md](components.md) · [archive-wireframe.md](archive-wireframe.md) · [wearin-spike.html](wearin-spike.html) · [archive-transition-spike.html](archive-transition-spike.html)

---

## 0. 메타 / TL;DR
- **한 줄**: "입을수록 길드는 청바지처럼, 스크롤할수록 길드는 헤리티지 사이트."
- **역할**: 크리에이티브/인터랙션 개발 (컨셉·디자인 시스템·구현)
- **스택**: React + Vite · GSAP ScrollTrigger · Lenis · React Three Fiber(Archive) · CSS 토큰
- **기간 / 링크**: `[기간]` · `[라이브 링크]` · `[GitHub]`
- **핵심 이미지**: `[히어로 raw indigo 스크린샷 / 30초 스크롤 캡처 GIF]`

## 1. 컨텍스트 & 문제
- 기존: 정적 HTML→React로 옮긴 "깔끔하지만 평범한 헤리티지 마이크로사이트"(카드 그리드 + 페이드인 + 타임라인).
- 문제 정의: 데님이라는 **물성·서사가 풍부한 소재**에 비해 표현이 관습적 → 기억에 남지 않음. 포트폴리오로서 차별점 부재.
- 목표: "예쁜 사이트"가 아니라 **하나의 강한 인터랙션 컨셉을 끝까지 밀어붙인 작업물**.
- `[기존 화면 캡처 — before]`

## 2. 컨셉 / 노스스타
- **브랜드 진실 하나**: 데님 = 입을수록 길든다(wear-in). 세상에서 유일하게 시간을 기록하는 옷감.
- **결정**: 스크롤(=시간) → 인디고가 페이딩 → 사용자가 서사를 읽는 동안 *청바지를 길들인다*.
- 대안 검토 & 탈락 사유: 셀비지 실(②)·501 분해(③)를 경쟁이 아닌 **역할 분담**으로 흡수 (왜 단일 컨셉이 아니라 하이브리드인지 1문단).
- `[3컨셉 비교 표 / 목업 캡처]`

## 3. 디자인 시스템
- **fade-scale이 단일 진실 소스**: `color/fade/00..100`(raw indigo → washed → ecru)이 곧 스크롤 진행이자 챕터 위치.
- **한 토큰, 세 무대**: Figma Mode(Narrative/Editorial/Blueprint)로 같은 컴포넌트가 섹션마다 옷을 갈아입음.
- 절제: 셀비지 레드 단일 액센트 + 골드 탑스티치 + 샤프 코너.
- 산출물 인용: [design-tokens.md](design-tokens.md), [components.md](components.md). `[토큰 팔레트 이미지]`

## 4. 정보구조(IA)
- 단일 몰입형 스크롤(①) + Archive 탐색 방(③), **셀비지 실(②)이 전 구간 진행/내비 척추**.
- 흐름: Hero → Origin 1853 → Patent 1873 → Culture → Craft → **Archive(모드 전환)** → Today.
- 산출물 인용: IA 플로우 다이어그램 `[캡처]`.

## 5. 시그니처 인터랙션 · 기술 분해 ★ (가장 중요한 섹션)
> 크리에이티브 개발 케이스 스터디의 점수는 여기서 갈린다. "어떻게 만들었나"를 코드와 함께.

### 5-1. Hero → Origin: wear-in 스크럽
- 메커니즘: `ScrollTrigger { pin, scrub }` + Lenis. 스크롤 진행 하나가 배경 페이드·실 draw·헤드라인 교차·매듭을 동시 구동.
- 타이밍 설계: Hero out(30–50%) ↔ Origin in(46–72%) 겹침으로 빈 화면 제거.
- 토큰 연동: GSAP가 `--color-indigo-900/500`을 런타임에 읽어 페이드 → 색은 토큰이 제어.
- 코드 스니펫: [wearin-spike.html](wearin-spike.html) 발췌. `[코드 블록]`

### 5-2. Archive: ②→③ 모드 전환 + 501 분해
- ecru → blueprint 크로스페이드 + 501 조립→폭발(scrub) + **PIN으로 "읽기→만지기" 모드 전환**.
- WebGL 격리 전략: R3F는 Archive에서만 dynamic import(island) → 초기 로드·성능 보호.
- 코드/구조: [archive-transition-spike.html](archive-transition-spike.html), [archive-wireframe.md](archive-wireframe.md). `[캡처]`

### 5-3. 성능 & 접근성 (판단 근거를 보여줄 것)
- `prefers-reduced-motion`: scrub off → 정적 대표 프레임(내러티브는 raw indigo 시작, Archive는 정보 우선 폭발도). 폴백 설계 의도 1문단.
- WebGL 미지원/저사양: 정적 SVG 폭발도로 폴백.
- 모바일: 스크럽 강도 완화, R3F 조건부 로드.
- 목표 예산: `[Lighthouse perf 점수 / LCP / JS 번들 크기]`

## 6. 프로세스 (어떻게 도달했나)
- 포지셔닝 결정(크리에이티브/그린필드) → 3컨셉 무드/레퍼런스/목업 → 인터랙티브 비교 → IA 하이브리드 설계 → **모션 스파이크로 검증** → 토큰 확정 → 컴포넌트/와이어프레임.
- "스파이크 먼저" 원칙: 손에 잡히는지 가장 빨리 검증하려 한 구간을 실제 코드로. `[스파이크 진행 캡처]`

## 7. 결과 / 무엇을 증명하나
- 셰이더/스크럽 머티리얼 스토리텔링, 디자인-코드 토큰 연결, 모드 전환 설계, 접근성·성능 의식.
- `[최종 화면 캡처 3–4컷 / 30–60초 워크스루 영상]`
- (가능하면) 정량: `[perf 수치 / 체류시간 등]`

## 8. 회고 / 다음
- 잘된 점 / 트레이드오프(WebGL 범위 vs 완주) / 다음에 할 것.
- 미해결로 남긴 결정: 챕터 수(8 전부 vs 4–5 압축), 모바일 스크럽 강도, 사운드 유무.

---

## 캡처 체크리스트 (작성 시 확보할 에셋)
- [ ] before(기존 사이트) 1컷
- [ ] Hero raw indigo / worn-in ecru 비교 2컷
- [ ] wear-in 스크롤 30초 GIF
- [ ] Archive ②→③ 모드 전환 + 501 폭발 GIF
- [ ] 토큰 팔레트 / fade-scale 이미지
- [ ] IA 플로우 다이어그램
- [ ] reduced-motion 정적 폴백 1컷
- [ ] 코드 스니펫 2–3개(스크럽 타임라인 / R3F island / 토큰 연동)

## 인터뷰용 사운드바이트
- "효과 10개를 흩뿌리는 대신, 브랜드 진실 하나(wear-in)를 인터랙션으로 번역했습니다."
- "fade-scale 토큰이 곧 스크롤 진행도라, 색·모션·위치가 단일 소스에서 나옵니다."
- "WebGL을 Archive 한 섹션에 격리해, 화려함과 초기 성능을 동시에 잡았습니다."
- "reduced-motion에서도 서사가 무너지지 않게 정적 대표 프레임을 따로 설계했습니다."
