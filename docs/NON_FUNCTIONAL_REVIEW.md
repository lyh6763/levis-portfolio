# Non-Functional Review

기능 동작 외 접근성·콘텐츠 명확성·SEO/공유 품질·유지보수 관점 검토.
치명적 비기능 오류는 없으며(`typecheck`/`build`/렌더 통과), 아래는 완성도 항목.

## 처리 현황 (2026-06)
| 항목 | 상태 |
|---|---|
| P2. Archive SVG 접근성 | ✅ 해결 |
| P3. SEO/공유 메타 | ✅ 해결 |
| P3. skip-link 포커스 표시 | ⬜ 보류(선택) |
| P3. 1853/1873 카피 명확화 | ⬜ 보류(의도적, 선택) |

## Findings

### ✅ P2. Archive SVG 접근성 — 해결
- 파일: `src/experience/ArchiveExploded.tsx`, `src/styles/experience.css`
- 조치: 장식 SVG·R3F 캔버스에 `aria-hidden="true"` 부여. 501 부품 콜아웃을 읽히는 캡션 리스트로 대체 — 데스크탑은 sr-only(접근성 트리 노출, `display:none` 아님, `aria-label="501 구성 요소"`), 모바일은 시각 표시. 스크린리더가 조각난 SVG 텍스트를 읽던 문제 해소.

### ✅ P3. SEO 및 공유 미리보기 메타 — 해결
- 파일: `index.html`
- 조치: Open Graph(`og:type/title/description/image/image:alt`) + Twitter Card(`summary_large_image`) + `theme-color`(#12213d) + `canonical` 추가. 미사용 hero preload 제거.
- 남은 TODO: `og:image`가 `%BASE_URL%` 상대 경로 → **배포 도메인 확정 시 절대 URL로 교체**(이상적으로 전용 1200×630 이미지, 예: 히어로 스크린샷).

### ⬜ P3. Skip link 이동 후 포커스 표시 — 보류
- 파일: `src/styles/experience.css`(`main:focus { outline: none }`)
- 평가: 경미. -1 tabindex 컨테이너 전체에 아웃라인을 안 주는 건 흔한 관행이라 논쟁적. 다만 함께 권장된 `scroll-margin-top`(고정 nav에 본문이 가리지 않게)은 가치 있음.
- 권장: `outline:none` 유지하되 절제된 `:focus-visible` + `scroll-margin-top` 추가.

### ⬜ P3. 1853 vs 1873 의미 구분 — 보류(선택)
- 파일: `index.html`, `src/experience/*`
- 평가: 역사적으로 자연스럽고(1853 창업/1873 블루진) 의도적으로 구분한 것이라 버그 아님. 한 줄 보조 카피로 더 친절해질 수 있는 정도.

## Verified Items
- `typecheck` / `build` 통과
- 데스크탑 렌더 콘솔 에러 없음 (프리뷰 직접 검증)
- 한글 표시 정상 · 가로 스크롤 없음
- Archive 3D(R3F) 렌더 정상 (프레이밍 수정 후)

## Remaining Next Steps (선택)
1. skip-link 포커스 표시 + `scroll-margin-top`.
2. Hero/Archive 카피에서 1853/1873 차이 명시.
3. 배포 시 `og:image` 절대 URL/전용 이미지 교체.

## Review Scope
포함: 접근성·키보드 사용성·콘텐츠 명확성·SEO/공유·완성도.
제외: 주요 기능 검증·3D 청크 크기 최적화·3D 연출 세부·전면 디자인 시스템 리팩터.
