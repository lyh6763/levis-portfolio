# LEVI'S Heritage 리디자인 프로젝트 - 통합 기획서

---

## 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [디자인 방향](#2-디자인-방향)
3. [페이지 구조](#3-페이지-구조)
4. [와이어프레임](#4-와이어프레임)
5. [인터랙션 가이드](#5-인터랙션-가이드)
6. [레퍼런스](#6-레퍼런스)
7. [이미지 프롬프트](#7-이미지-프롬프트)
8. [체크리스트](#8-체크리스트)

---

## 1. 프로젝트 개요

### 1.1 프로젝트명
**LEVI'S Archive Denim** (포트폴리오 3)

### 1.2 프로젝트 목적
- 커머셜 UI보다 **브랜드 헤리티지와 서사**를 강조한 Levi's 브랜드 페이지 제작
- 데님/워크웨어의 물성과 시간성을 **아티스틱한 비주얼 언어**로 표현
- 메인 페이지는 요약, 서브 페이지에서 **깊이 있는 lore** 제공
- 데님의 촉감/시간/수공의 느낌을 웹에서 시각화

### 1.3 벤치마킹 대상
- **브랜드**: Levi's
- **핵심 상징**: 레드 탭, 아치 스티치, 리벳, 패치, 인디고 데님 텍스처
- **해석 방향**: 제품 판매보다 **브랜드 아카이브/문화/제작 철학** 중심

### 1.4 타겟 설정 (가상)
- 데님 문화/워크웨어에 관심 있는 20~40대
- 브랜드의 역사성과 상징을 중요하게 보는 사용자
- 쇼핑보다 **브랜드 가치**를 이해하고 싶은 사용자

### 1.5 프로젝트 키워드
- Heritage / Archive / Craft
- Indigo / Denim / Stitch
- Raw texture / Faded / Time-worn
- Editorial layout / Story-driven

### 1.6 기존 작업 방식 분석

#### DUOBACK (포트폴리오 2)
- **강점**: 문서 구조 체계화(overview/pageflow/planning/reference/wireframe)
- **톤**: 웜 뉴트럴, 클린 레이아웃
- **구조**: 홈 → 제품 리스트 → 상세

#### MARSHALL (포트폴리오 1)
- **강점**: 강렬한 히어로, 섹션별 스토리텔링
- **톤**: 다크, 강한 타이포, 서사 중심
- **구조**: 원페이지 스토리 중심 구성

#### 이번 Levi's 적용 전략
- DUOBACK의 **정돈된 문서화** + MARSHALL의 **서사형 흐름** 결합
- 메인 페이지에서 핵심 섹션을 압축 소개 → **Read More로 서브 페이지 연결**
- **상업적 요소 최소화**, 브랜드 스토리와 텍스처 중심

### 1.7 제작 범위
- **메인 페이지 + 서브 페이지** 구성
- 메인: 요약 스토리 / 서브: 깊이 있는 서사

### 1.8 산출물
1. 브랜드 스토리 멀티페이지 (반응형)
2. 프로젝트 통합 기획서

---

## 2. 디자인 방향

### 2.1 톤 & 무드
```
키워드: Denim / Indigo / Heritage / Raw / Archive / Crafted
```
- 커머셜보다 **예술적이고 인상적인** 페이지
- **실험적이되 절제된 구조**, 감성적이지만 정돈된 스타일

### 2.2 컬러 시스템

| 용도 | 컬러 | Hex |
|------|------|-----|
| 배경 (메인) | Deep Indigo | #1F2937 |
| 배경 (서브) | Lighter Indigo | #2E3B4E |
| 텍스트 (메인) | Warm Cream | #F5EFE6 |
| 텍스트 (서브) | Faded Beige | #B8AFA3 |
| 포인트 (레드 탭) | Levi's Red | #A8112E |
| 디테일 (스티치) | Sand/Tan | #D4B896 |
| 라인/보더 | Medium Indigo | #3D4B5F |

### 2.3 타이포그래피
- **Display**: 'Oswald' (헤드라인)
- **Body**: 'IBM Plex Sans' (가독성)

| 요소 | 크기 (Desktop) | 굵기 |
|------|---------------|------|
| H1 | 64px | Bold |
| H2 | 40px | SemiBold |
| H3 | 28px | SemiBold |
| Body | 16px | Regular |

### 2.4 레이아웃 원칙
- 그리드 기반, **큰 이미지 + 짧은 카피** 리듬
- 데님 텍스처 배경 활용(그레인/페이드)
- 섹션마다 **스티치 라인** 또는 디바이더 사용
- 반응형: 데스크탑(12컬럼) → 태블릿(2열) → 모바일(1열 스택)

---

## 3. 페이지 구조

### 3.1 사이트맵

```
LEVI'S Heritage (Multi Page)
│
├── Home (index.html)
│   ├── Hero: Indigo Archive
│   ├── DNA: Red Tab / Stitch / Rivet
│   ├── Timeline Teaser
│   ├── Craft Teaser
│   ├── Iconic Fits
│   ├── Archive Gallery Teaser
│   ├── Culture Teaser
│   └── Footer
│
├── Heritage (heritage.html)
│   └── 1873 → 현재 상세 타임라인
│
├── Craft (craft.html)
│   └── 데님 제작 공정 상세
│
└── Archive (archive.html)
    └── 룩북/텍스처/문화 아카이브
```

### 3.2 페이지별 구성

| 페이지 | 목적 | 주요 콘텐츠 |
|------|------|------------|
| Home (메인) | 스토리 요약 | 각 섹션 Read More |
| Heritage | 타임라인 서사 | 1873~현재 상세 |
| Craft | 제작 공정 | 원단/염색/봉제 |
| Archive | 텍스처/룩북 | 이미지 중심 |

### 3.3 섹션별 목적

#### Hero
- 첫인상: 데님의 물성 + 레드 탭 포인트
- 헤리티지 톤 선언

#### DNA (브랜드 상징)
- 레드 탭, 아치 스티치, 리벳 등 시그니처 요소 소개

#### Timeline
- 메인에서는 요약, **Read More로 Heritage 페이지 이동**

#### Craft
- 메인 요약 → Craft 페이지에서 상세 공정

#### Iconic Fits
- 모델별 특징과 시대적 맥락 (501/505/517)

#### Archive Gallery
- 메인 미리보기 → Archive 페이지에서 확장

#### Culture
- 워크웨어 → 뮤지션/스트리트로 확장된 문화적 영향

---

## 4. 와이어프레임

### 4.1 메인 페이지 (index.html) - 요약 중심

```
┌──────────────────────────────────────────────────────────────┐
│  [LEVI'S]    Heritage   Archive   Craft   Culture        ☰   │
│  (Red Tab)                                                   │
├──────────────────────────────────────────────────────────────┤
│                         HERO                                │
│   [Indigo Texture + Denim Macro Image]                      │
│   "DENIM. SINCE 1873"                                       │
│   짧은 카피 2~3줄                                            │
│   [RED TAB LABEL]                                            │
├──────────────────────────────────────────────────────────────┤
│                          DNA                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                         │
│  │ RED TAB │ │ STITCH  │ │ RIVET   │   (모듈 카드)           │
│  └─────────┘ └─────────┘ └─────────┘                         │
│  [Read More → Heritage]                                      │
├──────────────────────────────────────────────────────────────┤
│                        TIMELINE                              │
│  1873 ──●──────────●──────────●──────────●── 2026            │
│  (연도 카드 + 짧은 설명)                                     │
│  [Read More → Heritage]                                      │
├──────────────────────────────────────────────────────────────┤
│                         CRAFT                                │
│  [Image]   01 Raw Fabric  → 02 Indigo Dye → 03 Stitch        │
│  [Image]   짧은 설명                                         │
│  [Read More → Craft]                                         │
├──────────────────────────────────────────────────────────────┤
│                      ICONIC FITS                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │ 501         │  │ 505         │  │ 517         │           │
│  │ 짧은 스토리 │  │ 짧은 스토리 │  │ 짧은 스토리 │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│  [Read More → Archive]                                       │
├──────────────────────────────────────────────────────────────┤
│                    ARCHIVE GALLERY                           │
│  [3:4] [3:4] [3:4] [3:4]  (룩북/텍스처)                       │
│  [Read More → Archive]                                       │
├──────────────────────────────────────────────────────────────┤
│                         CULTURE                              │
│  Workwear → Music → Street                                   │
│  큰 이미지 + 서브 카피                                       │
│  [Read More → Archive]                                       │
├──────────────────────────────────────────────────────────────┤
│                          FOOTER                              │
│  Levi's Archive / © 2026                                     │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 서브 페이지 구조 개요

#### Heritage (heritage.html)
```
Hero (연도/키비주얼) → 상세 타임라인 → 상징 요소 확장 → Footer
```

#### Craft (craft.html)
```
Hero → 원단/염색/봉제 3단 상세 → 디테일 매크로 → Footer
```

#### Archive (archive.html)
```
Gallery (룩북/텍스처) → Culture 스토리 → Footer
```

---

## 5. 인터랙션 가이드

### 5.1 방향성
- **강렬하지만 과장되지 않게**: 데님 질감/헤리티지 분위기를 유지
- **물성 표현**: 스티치 라인, 거친 텍스처, 페이드 느낌을 움직임으로 표현
- **리듬감**: 큰 이미지 → 타이포 → 디테일로 이어지는 스크롤 연출

### 5.2 주요 인터랙션 아이디어

#### Hero: Indigo Reveal
- 배경 이미지 위에 **인디고 그라디언트 마스크**가 천천히 열리며 등장
- 타이포는 아래에서 올라오되, **약간의 흔들림**(미세)로 워크웨어 감성

#### Stitch Line Draw
- 섹션 전환마다 **스티치 라인 SVG**가 그려지는 효과
- 타임라인 섹션에서는 라인이 좌우로 확장

#### Texture Parallax
- 데님 텍스처 레이어를 **느린 패럴랙스**로 움직임
- 텍스트 레이어는 고정되어 깊이감 생성

#### Archive Gallery Hover
- 이미지 hover 시 **그레인/노이즈 레이어**가 미세하게 올라오며 질감 강조
- 동시에 살짝 확대(1.02~1.05)

#### Timeline Scroll Snapping (선택)
- 연도 카드가 스크롤에 맞춰 **하나씩 정렬**
- 과하지 않게 `scroll-snap` 활용 가능

#### Read More Accent
- Read More 링크에 **레드 탭 라인**이 왼→오로 확장되는 호버 애니메이션

### 5.3 강도 레벨 옵션

#### Level 1 (안정형) ✓ 현재 구현됨
- 기본 fade-in + slide-up
- hover scale + shadow

#### Level 2 (중간)
- Stitch line draw 추가
- 텍스처 패럴랙스 적용

#### Level 3 (강렬)
- Hero reveal + 텍스처 패럴랙스 + 스크롤 스냅
- 섹션별 진입 시 타이포 분해 애니메이션

### 5.4 구현 우선순위
1. ✓ Hero Reveal + 타이포 등장
2. ✓ Stitch Line Draw (섹션 디바이더)
3. ✓ Archive Hover Texture
4. ✓ Read More Accent
5. Parallax/Scroll Snap (선택)

### 5.5 주의점
- 과한 애니메이션은 **가독성 저하** 위험
- 모바일에서는 패럴랙스/스크롤 스냅 비활성 권장
- `prefers-reduced-motion` 대응 필요 ✓ 구현됨

---

## 6. 레퍼런스

### 6.1 키워드
- indigo denim texture
- raw denim close up
- vintage denim stitching
- rivet macro photography
- workwear heritage brand site
- editorial fashion layout

### 6.2 비주얼 레퍼런스 방향

#### 텍스처
- 데님 결(트윌), 워싱, 페이드
- 스티치 라인/리벳 디테일
- 오래된 라벨/가죽 패치

#### 컬러
- 인디고 블랙 베이스
- 레드 탭 포인트
- 스티치 컬러(샌드/베이지)

#### 레이아웃
- 에디토리얼 그리드
- 큰 타이포 + 짧은 카피
- 이미지와 텍스트 교차 배치

### 6.3 섹션별 참고 요소

#### Hero
- 인디고 그라디언트 + 데님 텍스처 오버레이
- 굵은 헤드라인, 레드 탭 라벨 스타일

#### DNA
- 레드 탭 / 아치 스티치 / 리벳을 작은 모듈 카드로 소개

#### Timeline
- 좌우로 이어지는 스티치 라인 + 연도 카드

#### Craft
- 공정별 이미지(원단/염색/봉제)
- 단계형 흐름 (01-02-03)

#### Archive Gallery
- 3:4 이미지 그리드 + 페이드 텍스처

#### Culture
- 워크웨어, 뮤지션, 스트리트 룩

### 6.4 아이콘/그래픽
- 스티치 라인 SVG ✓ 구현됨
- 리벳 원형 패턴
- 레드 탭 모듈 (둥근 사각형)

---

## 7. 이미지 프롬프트

### 7.1 기본 스타일 키워드
```
공통으로 추가할 키워드:
--ar 16:9 (가로형) / --ar 3:4 (세로형)
--style raw (사진적 표현)
--v 6 (버전 6)
```

### 7.2 섹션별 프롬프트 예시

#### Hero Section - 메인 배경 이미지
```
Extreme close-up of vintage Levi's 501 raw denim fabric,
deep indigo blue with natural fade patterns, visible warp
and weft texture, selvedge edge detail, grain and fibers
in focus, archival photography, 1950s workwear aesthetic,
moody lighting, shallow depth of field, museum quality
--ar 16:9 --style raw --v 6
```

#### DNA Section - Red Tab 클로즈업
```
Macro photograph of iconic Levi's red tab on back pocket,
sewn onto faded indigo denim, golden thread stitching,
extreme detail, vintage 1970s jeans, worn texture,
editorial product photography, soft studio lighting,
neutral background, shallow focus
--ar 1:1 --style raw --v 6
```

#### Timeline Section - 1873 The Beginning
```
Sepia-toned archival photograph of 1870s American gold
miner wearing early Levi's work pants, dusty denim,
suspenders, rugged outdoor setting, California gold rush
era, authentic historical reenactment, documentary style,
natural lighting, grainy film texture
--ar 3:4 --style raw --v 6
```

#### Craft Section - Indigo Dye
```
Artisan hands dipping raw cotton fabric into large indigo
dye vat, deep blue liquid, traditional rope dyeing method,
workshop setting, natural light streaming through windows,
authentic craft photography, rich indigo tones, wet texture
--ar 16:9 --style raw --v 6
```

#### Archive Section - Texture Gallery
```
Abstract texture composition of heavily worn vintage Levi's
denim, extreme fading patterns, whiskers and honeycombs,
raw edges, indigo gradient from dark to light, macro detail,
museum archival photography, neutral lighting
--ar 1:1 --style raw --v 6
```

### 7.3 프롬프트 사용 팁
1. **버전 조정**: `--v 6.1` 사용 시 더 사진적인 결과
2. **스타일 강도**: `--style raw` 제거 시 더 일러스트적
3. **추가 키워드**:
   - 더 빈티지: `+ Kodak Portra 400, analog film`
   - 더 클린: `+ minimalist, clean background`
   - 더 무디: `+ moody, dramatic lighting`

### 7.4 생성 후 편집 가이드
- **Crop**: 실제 레이아웃에 맞게 여백 조정
- **Color Grading**: Indigo 톤 통일 (#1F2937 ~ #2E3B4E 범위)
- **Contrast**: 약간 높여서 텍스처 강조
- **Grain**: 필요시 필름 그레인 추가로 일관성 확보
- **Size**: Web 최적화 (1920px width, 85% JPG)

---

## 8. 체크리스트

### 8.1 착수 전
- [x] 기존 포폴 분석
- [x] 레퍼런스 수집
- [x] 와이어프레임 확정

### 8.2 개발 중
- [x] 시맨틱 마크업
- [x] 텍스처 패턴 구현
- [x] 모바일 최적화
- [x] 리서치/소스 (데님 텍스처 이미지 수집)
- [x] 리벳/스티치/레드탭 참고 이미지 수집
- [x] 타임라인 연도 정보 정리
- [x] 메인/서브 페이지 정보 구조 확정
- [x] 섹션별 카피 작성
- [x] Iconic Fits 텍스트 정리 (501/505/517)
- [x] 컬러 변수 정의
- [x] 타이포 스케일 확정
- [x] 스티치 라인 SVG 제작
- [x] index.html 구조 작성
- [x] heritage.html 구성
- [x] craft.html 구성
- [x] archive.html 구성
- [x] reset.css / common.css 구성
- [x] 섹션별 스타일링 (home + sub pages)
- [x] 기본 인터랙션 (scroll fade, hover scale)

### 8.3 완료 후
- [x] 모바일/태블릿 레이아웃 점검
- [ ] 이미지 최적화 및 lazy-load
- [ ] 접근성 점검 (alt, aria-label)
- [ ] 반응형 QA
- [ ] 코드 정리

### 8.4 제약 사항
- 상업적 구매 기능 제외
- 정적 페이지
- 이미지: Unsplash/Pexels 등 데님 관련 소스 또는 AI 생성

---

## 9. 변경 이력

### 2026-01-29
- **이미지 크롭 처리**: CSS `aspect-ratio`로 비율 조정
- 이미지 파일명 정규화: 공백/한글 제거, 언더스코어 규칙 통일
- **폰트 변경**: 모노스페이스 → 산세리프
  - Display: Courier Prime → Oswald
  - Body: IBM Plex Mono → IBM Plex Sans
- **스티치 라인 SVG 구현**: 브랜드 정체성 강화, 실제 데님 스티치 재현

### 2026-01-30
- **네비게이션 접근성 개선**: `aria-controls` 추가 및 토글 상태 동기화
- **이미지 접근성 개선**: 배경 이미지 → `<img>` 전환, 대체 텍스트 추가
- **이미지 최적화**: `loading`/`decoding`/`fetchpriority` 및 `width`/`height` 지정
- 이미지 처리 롤백: 배경 이미지 방식 복구
- 텍스쳐 섹션 큰 이미지 비율 조정: 2:1 → 16:9

### 2026-01-28
- HTML 이미지 연결 및 기본 스타일 적용

---

**문서 버전**: 1.0
**최종 업데이트**: 2026-02-02
**작성자**: Portfolio Project
