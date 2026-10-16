import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ColophonPage() {
  useDocumentTitle('사이트 소개');

  return (
    <article className="page">
      <header className="page__head">
        <h1 className="page__title">사이트 소개</h1>
        <p className="page__dek">이 사이트가 무엇이고, 어떻게 만들어졌는지.</p>
      </header>
      <div className="page__body">
        <h2>무엇인가</h2>
        <p>
          WARP &amp; WEFT는 Levi&apos;s와 블루진의 역사를 각주 달린 짧은 장들로 재구성한 개인 포트폴리오 작업입니다.
          Levi Strauss &amp; Co.와 제휴하거나 승인받은 사이트가 아니며, 언급된 상표는 각 소유자에게 있습니다.
        </p>
        <h2>편집 원칙</h2>
        <p>
          사실 서술에는 각주로 출처를 달고, 널리 퍼졌지만 근거가 약한 일화는 그렇다고 밝힙니다. 사진 대신
          타이포그래피와 도식으로 이야기를 전합니다.
        </p>
        <h2>타이포그래피</h2>
        <p>
          제목은 Fraunces, 한글 본문은 Noto Serif KR, 데이터와 캡션은 IBM Plex Mono. 인터페이스는 내려받지 않고 기기의
          기본 고딕을 씁니다.
        </p>
        <h2>만든 방식</h2>
        <p>
          AI 코딩 도구 Claude Code와 함께 만들었습니다. 코드와 원고 초안, 공개 자료 대조는 AI가 했고, 사이트의 방향과
          구조는 직접 정했습니다. 화면과 문구를 검토해 어색한 디자인과 꾸며낸 인용을 고치게 했고, 사실 대조 결과를
          확인해 원고에 반영했습니다.
        </p>
        <h2>사용한 기술</h2>
        <p>React, TypeScript, Vite, React Router, GSAP ScrollTrigger, Lenis. 도식은 이미지 파일 없이 SVG 코드로 그렸습니다.</p>
      </div>
    </article>
  );
}
