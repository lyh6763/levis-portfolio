# Case Study | LEVI'S Heritage Wear-in Archive

## 0. TL;DR

이 프로젝트는 기존 정적 HTML/CSS/JS 기반 포트폴리오를 React + TypeScript 기반의 스크롤 경험으로 재구성한 작업입니다. 핵심 목표는 Levi's의 긴 역사를 단순 정보 나열이 아니라, 시간이 지날수록 길드는 데님처럼 스크롤할수록 깊어지는 경험으로 번역하는 것이었습니다.

- 역할: 인터랙션 기획, React 전환, 3D 아카이브 구현, 이미지 asset 운용, 접근성/SEO 개선
- 스택: React 19, Vite, TypeScript, GSAP ScrollTrigger, Lenis, React Three Fiber, Three.js
- 결과: generated 이미지 기본 모드, GitHub Pages fallback, reduced-motion fallback, 공유 메타데이터, 문서화까지 포함한 SPA 포트폴리오

## 1. Problem

초기 사이트는 정보 구조와 시각 자료가 분리되어 있어 브랜드의 시간성, 소재감, 공정감이 하나의 경험으로 이어지지 않았습니다. 또한 정적 페이지 구조에서는 재사용 가능한 콘텐츠 데이터, 이미지 fallback, 라우팅/배포 전략, 접근성 보완을 확장하기 어려웠습니다.

이번 전환의 문제 정의는 다음과 같았습니다.

- 브랜드 역사와 공정 정보를 한 흐름으로 묶기
- 1853년 창업과 1873년 블루진 탄생을 명확히 구분하기
- 이미지가 없어도 깨지지 않는 placeholder 체계 마련하기
- 실제 화면에서는 generated 이미지를 기본으로 보여주기
- 3D 아카이브가 실패하거나 reduced-motion 환경이어도 콘텐츠를 잃지 않기
- GitHub Pages에서 deep link가 깨지지 않도록 배포 구조 정리하기

## 2. Concept

콘셉트는 `wear-in`입니다. 청바지가 입는 사람의 시간에 따라 길드는 것처럼, 사이트도 사용자의 스크롤에 따라 색, 이미지, 텍스트, 3D 아카이브가 점진적으로 드러납니다.

이 콘셉트를 위해 화면은 크게 네 흐름으로 설계했습니다.

1. Origin: 브랜드 출발점과 인디고 무드
2. Patent: 1873년 블루진의 구조적 전환점
3. Craft and Culture: 소재, 공정, 문화적 확산
4. Archive: 501을 분해하고 다시 읽는 3D 아카이브

## 3. Interaction Design

### Scroll Narrative

스크롤은 단순 이동이 아니라 상태 변화를 만드는 입력값으로 사용했습니다. Hero 구간에서는 배경 톤, 오버레이, 텍스트 밀도, visual layer가 함께 변화합니다. 이후 섹션들은 reveal animation으로 리듬을 만들되, 과한 모션보다 콘텐츠의 읽힘을 우선했습니다.

### Progress Rail

데스크톱에서는 좌측 progress rail로 현재 위치를 알려주고, 모바일에서는 공간을 아끼기 위해 상단 progress indicator로 축약했습니다. 사용자가 긴 스크롤 경험 안에서 현재 문맥을 잃지 않게 하는 장치입니다.

### 3D Archive

Archive 섹션은 React Three Fiber로 501 구성 요소를 분해해 보여주는 피스로 구성했습니다. 3D chunk는 의도적으로 lazy 영역으로 분리했고, reduced-motion 또는 WebGL 제약이 있는 환경에서는 SVG/텍스트 fallback으로 의미를 유지합니다.

## 4. Technical Architecture

- `src/experience/`: 화면 단위 경험 컴포넌트
- `src/experience/archive3d/`: 3D archive canvas와 WebGL 감지
- `src/data/content.ts`: 섹션/카드/텍스트 콘텐츠
- `src/data/assets.ts`: legacy filename에서 generated/placeholder asset으로 변환
- `src/hooks/`: scroll, reveal, reduced-motion 관련 훅
- `src/styles/`: token, layout, experience style

React 전환 과정에서는 기존 시각 방향을 최대한 유지하되, 반복 콘텐츠와 asset 경로를 데이터화했습니다. 그 결과 이미지 교체, placeholder fallback, generated mode 전환이 코드 전반에 흩어지지 않고 `src/data/assets.ts` 중심으로 관리됩니다.

## 5. Image Strategy

현재 기본 모드는 generated WebP asset입니다.

- Runtime: `public/images/generated/*.webp`
- Source: `images-src/generated/*.png`
- Placeholder: `public/images/placeholders/*.svg`
- OG image: `public/images/og-image.webp`

`VITE_IMAGE_MODE=placeholder`를 사용하면 동일 레이아웃에서 SVG placeholder만 확인할 수 있습니다. 이미지가 없는 legacy asset은 placeholder로 안전하게 fallback합니다.

## 6. Accessibility

접근성은 기능 추가가 아니라 경험의 기본 조건으로 다뤘습니다.

- skip link와 `main` landmark 제공
- `focus-visible` 상태와 anchor 이동용 `scroll-margin-top` 적용
- 장식용 SVG/3D canvas는 `aria-hidden` 처리
- 3D archive의 의미는 스크린 리더용 캡션 리스트로 제공
- `prefers-reduced-motion` 환경에서 scroll animation과 smooth scroll을 줄임

## 7. SEO and Deployment

`index.html`에는 title, description, canonical, Open Graph, Twitter Card, theme-color를 정리했습니다. 공유 미리보기에는 generated 이미지를 조합한 전용 `og-image.webp`를 사용합니다.

GitHub Pages 배포를 기준으로 Vite `base`는 `/levis/`이며, 빌드 후 `dist/index.html`을 `dist/404.html`로 복사해 SPA deep link fallback을 제공합니다.

## 8. Verification

확인한 항목은 다음과 같습니다.

- `npm run typecheck` 통과
- `npm run build` 통과
- `dist/index.html`과 `dist/404.html` 생성 확인
- generated image 기본 모드 확인
- OG image 생성 스크립트 확인
- desktop/tablet/mobile 기준 이미지 crop과 overflow 확인

`@react-three/drei` 의존성을 제거하고 `OrbitControls` 대신 자체 pointer-drag 회전 로직을 구현했지만, `JeanCanvas` chunk는 여전히 raw 892 kB(gzip 241 kB) 수준입니다(three.js 코어 자체의 크기). 빌드 경고를 없애기 위해 `vite.config.ts`의 `chunkSizeWarningLimit`을 900으로 올렸는데, 이는 청크를 줄인 게 아니라 경고 임계값을 조정한 것입니다. 초기 번들(약 119 kB gzip)에는 영향이 없도록 lazy code-splitting은 유지되므로 실사용 성능엔 문제가 없지만, "해결"이 아니라 "격리 상태 유지"로 정확히 관리합니다.

## 9. Outcome

이번 전환으로 사이트는 단순 React 이식 단계를 넘어, 실제 포트폴리오로 열었을 때 필요한 기본 품질을 갖추게 되었습니다.

- 첫 화면부터 generated 이미지가 표시됩니다.
- placeholder mode는 QA용으로 유지됩니다.
- 공유 메타데이터와 OG image가 준비되어 있습니다.
- 접근성 fallback과 reduced-motion 대응이 포함되어 있습니다.
- 이미지 asset 운용과 비기능 리뷰가 문서화되어 있습니다.

## 10. Next Refinement

- 3D archive chunk 자체의 실질적인 용량 축소(현재는 경고 임계값 조정으로 관리 중)
- 실제 배포 URL 확정 후 canonical/OG absolute URL 검토
- hero/LCP 후보 이미지 preload 전략 정리
- 실제 브랜드 사용 권한이 확보된 이미지로 generated asset 교체 가능성 검토
