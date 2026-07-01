# Non-Functional Review

## Scope

기능 동작 자체보다 접근성, SEO/공유 미리보기, 문서 품질, 유지보수성, 포트폴리오 완성도를 기준으로 검토했습니다. 3D archive chunk는 계속 리파인 중인 영역으로 보고, 현재 평가는 치명적 결함 여부 중심으로 제한했습니다.

## Status

| 항목 | 상태 |
| --- | --- |
| Archive SVG/3D 접근성 | 해결 |
| SEO/공유 메타데이터 | 해결 |
| OG image | 전용 이미지 추가 |
| skip link/focus 표시 | 해결 |
| 1853/1873 메시지 구분 | 보완 |
| generated image 기본 모드 | 적용 |
| 이미지 운용 문서 | 정리 |

## Findings

### P2. Archive SVG/3D 접근성 - 해결

- 파일: `src/experience/ArchiveExploded.tsx`, `src/styles/experience.css`
- 조치: 장식용 SVG와 R3F canvas는 `aria-hidden` 처리하고, 501 구성 요소는 보조기술이 읽을 수 있는 캡션 리스트로 대체했습니다.
- 결과: 스크린 리더가 시각 조각의 내부 텍스트를 불필요하게 읽는 문제를 줄였습니다.

### P3. SEO/공유 미리보기 메타데이터 - 해결

- 파일: `index.html`
- 조치: title, description, canonical, Open Graph, Twitter Card, theme-color를 정리했습니다.
- 추가 조치: `public/images/og-image.webp` 전용 공유 이미지를 생성하고 `og:image`/`twitter:image`에 연결했습니다.
- 남은 선택 사항: 실제 배포 도메인이 확정되면 `%BASE_URL%` 기반 경로를 절대 URL로 고정하면 공유 플랫폼 호환성이 더 좋아집니다.

### P3. Skip Link와 Focus 표시 - 해결

- 파일: `src/styles/experience.css`
- 조치: skip link 이동 시 포커스 표시를 명확히 하고, 고정 내비게이션에 가려지지 않도록 주요 anchor에 `scroll-margin-top`을 적용했습니다.

### P3. 1853/1873 메시지 구분 - 보완

- 파일: `src/experience/HeroOrigin.tsx`
- 조치: 브랜드 창업 1853과 블루진 탄생 1873을 함께 명시해 첫 화면의 역사 정보 오해 가능성을 줄였습니다.

### P3. 문서 품질 - 보완

- 파일: `README.md`, `docs/IMAGE_ASSET_PLAN.md`, `docs/NON_FUNCTIONAL_REVIEW.md`
- 조치: 깨진 한글 문서와 stale placeholder 기준 설명을 현재 generated 기본 모드 기준으로 정리했습니다.

## Verified Items

- generated image mode가 기본값입니다.
- placeholder mode는 `.env.placeholder` 또는 `npm run dev:placeholder`/`npm run build:placeholder`로 확인 가능합니다.
- dedicated OG image가 존재합니다: `public/images/og-image.webp`
- GitHub Pages deep link fallback을 위한 `404.html` 복사 스크립트가 유지됩니다.

## Remaining Polish

- 배포 URL 확정 후 canonical/OG URL 절대 경로 검토.
- README의 case study 문서도 최종 공개 전 한 번 더 인코딩과 표현을 점검.
- 3D archive chunk는 기능 결함이 아니라 품질 리파인 항목으로 별도 추적.
