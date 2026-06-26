# Non-Functional Review

## Summary

기능 동작 자체를 제외하고 접근성, 콘텐츠 명확성, SEO/공유 품질, 유지보수 관점에서 검토했다.

현재 상태에서 치명적인 비기능 오류는 발견되지 않았다. `typecheck`, `build`, 브라우저 렌더링 확인은 통과했으며, 한글 표시와 기본 레이아웃도 정상으로 확인되었다.

단, 완성도를 높이기 위해 아래 항목은 후속 리파인 대상으로 관리하는 것이 좋다. 3D 청크 크기와 3D 경험 자체는 현재 계속 다듬는 영역으로 보고, 이번 검토에서는 주요 문제로 평가하지 않았다.

## Findings

### P2. Archive SVG 접근성 전략이 불명확함

- 파일: `src/experience/ArchiveExploded.tsx`
- 위치: Archive jean diagram SVG 영역
- 관점: 접근성

아카이브 섹션의 청바지 분해 SVG에는 시각적 콜아웃 텍스트와 라벨이 포함되어 있다. 현재 구조에서는 이 SVG를 장식 이미지로 처리할지, 의미 있는 이미지로 스크린리더에 제공할지 명확하지 않다.

이 상태에서는 스크린리더가 SVG 내부 텍스트를 조각난 형태로 읽거나, 시각적으로는 자연스러운 콜아웃이 보조 기술에서는 불명확한 정보로 전달될 수 있다.

권장 조치:

- SVG가 장식적/보조적 성격이라면 `aria-hidden="true"`를 부여한다.
- 대신 의미 있는 다이어그램으로 제공하려면 `role="img"`, `aria-labelledby`, `<title>`, `<desc>`를 사용해 명확한 이름과 설명을 제공한다.
- 데스크톱에서도 SVG와 별도로 스크린리더 친화적인 요약 목록을 제공하는 방식을 고려한다.

우선순위:

- 접근성 완성도를 위해 다음 리파인에서 먼저 처리하는 것이 좋다.

### P3. Skip link 이동 후 포커스 표시가 사라짐

- 파일: `src/styles/experience.css`
- 관련 파일: `src/experience/Experience.tsx`
- 관점: 접근성, 키보드 UX

`Experience.tsx`에서 skip link가 `main#main-content`로 이동하도록 구성되어 있고, `main`에는 `tabIndex={-1}`이 설정되어 있다. 이 구조 자체는 적절하다.

다만 CSS에서 `.experience main:focus { outline: none; }`로 포커스 표시를 제거하고 있어, 키보드 사용자는 본문으로 이동했다는 시각적 피드백을 받기 어렵다.

권장 조치:

- `outline: none`을 제거하거나, 더 절제된 커스텀 포커스 스타일로 대체한다.
- `main:focus-visible` 또는 skip link 이동 직후에만 보이는 subtle outline을 고려한다.
- 페이지 상단 고정 내비게이션과 겹치지 않도록 `scroll-margin-top`도 함께 점검한다.

우선순위:

- 치명적 문제는 아니지만 접근성 QA 기준에서는 개선하는 편이 좋다.

### P3. SEO 및 공유 미리보기 메타 정보가 기본 수준임

- 파일: `index.html`
- 관점: SEO, 포트폴리오 공유 품질

현재 `title`과 `description`은 존재하지만, 포트폴리오 링크 공유 시 보여지는 Open Graph/Twitter Card 메타 정보는 정리되어 있지 않다.

기능 문제는 아니지만, GitHub Pages 또는 외부 링크로 공유할 때 첫인상과 신뢰도에 영향을 줄 수 있다.

권장 조치:

- `og:title`
- `og:description`
- `og:image`
- `og:type`
- `twitter:card`
- `theme-color`
- 필요 시 `canonical`

위 항목을 추가한다.

우선순위:

- 배포 전 마감 리파인 단계에서 처리하면 좋다.

### P3. 1853과 1873의 의미 구분이 더 명확하면 좋음

- 파일: `index.html`, `src/experience/*`
- 관점: 콘텐츠 명확성, 브랜드 내러티브

현재 페이지에서는 `1853`과 `1873`이 모두 중요한 연도처럼 등장한다. Levi's 맥락에서 `1853`은 브랜드/회사 기원, `1873`은 블루진 특허와 제품 헤리티지로 해석할 수 있어 역사적으로는 자연스럽다.

다만 첫 화면에서 두 연도가 명확히 구분되지 않으면 사용자는 순간적으로 기준 연도를 헷갈릴 수 있다.

권장 조치:

- 초반 카피에서 `1853`과 `1873`의 역할을 한 번 명확히 설명한다.
- 예: `1853년 브랜드의 시작, 1873년 블루진의 탄생`
- Archive 또는 Hero의 보조 문구에서 두 연도의 차이를 자연스럽게 연결한다.

우선순위:

- 기능 문제가 아니라 내러티브 품질 개선에 가깝다.

## Verified Items

아래 항목은 검토 중 정상으로 확인되었다.

- `npm run typecheck` 통과
- `npm run build` 통과
- 모바일/데스크톱 렌더링에서 콘솔 에러 없음
- 한글 런타임 표시 정상
- 가로 스크롤 없음
- Archive 3D 캔버스 렌더링 확인

## Recommended Next Steps

1. `ArchiveExploded.tsx`의 SVG 접근성 전략을 먼저 결정한다.
2. skip link 이동 후 포커스 표시를 개선한다.
3. `index.html`에 Open Graph/Twitter Card 메타 정보를 추가한다.
4. Hero 또는 Archive 카피에서 `1853`과 `1873`의 차이를 명확히 정리한다.

## Review Scope

이번 검토는 기능 동작 오류를 찾는 리뷰가 아니라, 기능 외 품질을 중심으로 진행했다.

포함한 관점:

- 접근성
- 키보드 사용성
- 콘텐츠 명확성
- SEO/공유 품질
- 포트폴리오 완성도

제외한 관점:

- 주요 기능 동작 검증
- 3D 청크 크기 최적화
- 3D 씬의 세부 연출 품질
- 전면적인 디자인 시스템 리팩터링
