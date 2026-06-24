# 디자인 토큰 — Levi's Heritage (wear-in)

크리에이티브/인터랙션 개발 방향의 그린필드 재설계용 토큰 세트.
이 문서가 **소스 오브 트루스**이고, 구현은 [`tokens.css`](tokens.css)(CSS custom properties)가 1:1로 따른다.
Figma Variables 네이밍과 동일(slash 계층 → CSS에선 dash).

## 컨셉 매핑
- **① wear-in 페이딩** — 메인 내러티브 척추. `fade-scale`이 스크롤 진행을 구동.
- **② 셀비지 실** — 진행/내비. 액센트 `selvedge` 단일 컬러.
- **③ 501 분해** — Archive 탐색 섹션. `blueprint` + `copper` + `topstitch`.

세 무대는 Figma의 **Mode**(Narrative / Editorial / Blueprint)로 분기 → 한 토큰이 섹션마다 다른 원시값을 가리킨다.

---

## 1) Color

### Primitive
| 토큰 | 값 | 비고 |
|---|---|---|
| `color/indigo/950` | `#0D1830` | deepest raw |
| `color/indigo/900` | `#12213D` | **raw — Hero 시작** |
| `color/indigo/800` | `#1C2E4F` | |
| `color/indigo/700` | `#283F6A` | Patent · washing 시작 |
| `color/indigo/600` | `#3A527F` | |
| `color/indigo/500` | `#4E648C` | **washed — 중간점** |
| `color/indigo/400` | `#6C80A4` | |
| `color/indigo/300` | `#8FA0BD` | |
| `color/indigo/200` | `#B4C0D3` | |
| `color/indigo/100` | `#D8DFE9` | |
| `color/ecru/50` | `#F3EAD7` | **cream — on-dark 텍스트** |
| `color/ecru/100` | `#E7DCC4` | |
| `color/ecru/200` | `#D8CDB8` | **ecru base — worn-in 도착** |
| `color/ecru/300` | `#C5B89C` | |
| `color/ecru/400` | `#A89A7C` | |
| `color/selvedge/400` | `#C43048` | focus/light |
| `color/selvedge/500` | `#A8112E` | **셀비지 레드 — 단일 액센트** |
| `color/selvedge/600` | `#8A0E26` | hover/press |
| `color/copper/400` | `#C98A4F` | |
| `color/copper/500` | `#B06A2C` | ③ 리벳·기술 액센트 |
| `color/topstitch/500` | `#D6A23E` | 골드 탑스티치 |
| `color/ink/900` | `#14213D` | on-light 본문 |
| `color/blueprint/bg` | `#ECEEF1` | ③ 스튜디오 배경 |
| `color/blueprint/line` | `#DCE0E6` | ③ 그리드선 |

### fade-scale (스크롤 진행 → 척추)
| 토큰 | 참조 | 진행 |
|---|---|---|
| `color/fade/00` | `{indigo/900}` | 0% · Hero — raw |
| `color/fade/25` | `{indigo/700}` | 25% · Patent — washing |
| `color/fade/50` | `{indigo/500}` | 50% · Craft — washed |
| `color/fade/75` | `{ecru/300}` | 75% · 전환 |
| `color/fade/100` | `{ecru/200}` | 100% · Today — worn-in |

> 배경은 `fade/00 ↔ fade/100`을 progress로 보간(GSAP scrub). reduced-motion이면 섹션별 고정 스텝으로 스냅.

### Semantic
| 토큰 | 참조 | 무대 |
|---|---|---|
| `color/text/on-dark` | `{ecru/50}` | ① |
| `color/text/on-dark-muted` | `{ecru/200}` | ① |
| `color/bg/canvas` | `{ecru/200}` | ② |
| `color/text/on-light` | `{ink/900}` | ② |
| `color/text/on-light-muted` | `#5A6270` | ② |
| `color/bg/blueprint` | `{blueprint/bg}` | ③ |
| `color/border/blueprint` | `{blueprint/line}` | ③ |
| `color/accent/selvedge` | `{selvedge/500}` | 공통 |
| `color/accent/copper` | `{copper/500}` | ③ |
| `color/stitch/topstitch` | `{topstitch/500}` | 공통 |
| `color/interactive/default` | `{selvedge/500}` | 공통 |
| `color/interactive/hover` | `{selvedge/600}` | 공통 |
| `color/focus/ring` | `{selvedge/400}` | 공통 |

---

## 2) Typography
- **Display**: Oswald (condensed grotesque) — `500/600/700`
- **Body**: IBM Plex Sans — `400/500`
- **Mono**: IBM Plex Mono — HUD/기술 readout

| 토큰 | size | family | weight | line-height | tracking |
|---|---|---|---|---|---|
| `type/display/hero` | `clamp(48,8vw,88)` | display | 700 | 0.92 | -1px |
| `type/display/xl` | 64 | display | 700 | 0.95 | -0.5px |
| `type/display/l` | 48 | display | 700 | 0.98 | -0.5px |
| `type/heading/m` | 32 | display | 600 | 1.05 | 0 |
| `type/heading/s` | 24 | display | 500 | 1.10 | 0 |
| `type/title/nav` | 20 | display | 700 | 1.20 | 1px |
| `type/body/l` | 18 | body | 400 | 1.70 | 0 |
| `type/body/m` | 16 | body | 400 | 1.70 | 0 |
| `type/body/s` | 14 | body | 400 | 1.60 | 0 |
| `type/caption` | 12 | body | 500 | 1.40 | 0.5px |
| `type/eyebrow` | 11 | body | 600 | 1.40 | 1.6px (UPPERCASE) |
| `type/mono/hud` | 12 | mono | 400 | 1.40 | 0 |

---

## 3) Spacing & Grid
- **Spacing(4px base)**: `space/1`=4 … `2`=8, `3`=12, `4`=16, `5`=24, `6`=32, `7`=48, `8`=64, `9`=96, `10`=128, `11`=160
- **Section rhythm**: desktop `120px`(large 160) / mobile `72px`(large 96)
- **Grid · Desktop(lg≥1024)**: 12컬럼 / gutter 24 / margin 7vw (max 1440; Hero·Archive full-bleed)
- **Grid · Mobile(<768)**: 4컬럼 / gutter 16 / margin 20
- **Breakpoints**: sm 480 · md 768 · lg 1024 · xl 1440
- **Radius**: `tab` 2 · `sm` 4 · `md` 8(Archive 카드) · `full` 9999

---

## 4) Motion
| 토큰 | 값 | 용도 |
|---|---|---|
| `motion/scrub` | 1 | GSAP ScrollTrigger 관성 |
| `motion/pin/end` | +=1400px | Hero 핀 구간 |
| `motion/dur/micro` | 0.2s | rivet-snap |
| `motion/dur/base` | 0.6s | UI 진입 |
| `motion/ease/scrub` | none(linear) | 스크럽 구간 |
| `motion/ease/ui` | cubic-bezier(0.22,1,0.36,1) | UI |
| `motion/reduced` | — | prefers-reduced-motion → scrub off, fade 고정 스냅 |

---

## 네이밍 규칙 (Figma Variables)
- 컬렉션: `color` / `type` / `space` / `grid` / `motion`
- 계층: 슬래시(`/`) — CSS에선 dash(`--color-indigo-900`)
- Semantic은 Primitive를 `{참조}`로 alias
- **Mode**: `color` 컬렉션에 `Narrative` / `Editorial` / `Blueprint` 3모드 → `bg`·`text`가 모드별로 다른 primitive를 가리킴 (한 토큰, 세 무대)
