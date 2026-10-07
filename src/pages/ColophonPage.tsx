import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ColophonPage() {
  useDocumentTitle('Colophon');

  return (
    <article className="page">
      <header className="page__head">
        <p className="page__kicker">Back matter</p>
        <h1 className="page__title">Colophon</h1>
        <p className="page__dek">이 사이트가 무엇이고, 어떻게 만들어졌는지.</p>
      </header>
      <div className="page__body">
        <h2>About</h2>
        <p>
          WARP &amp; WEFT는 Levi&apos;s와 블루진의 역사를 롱폼 에디토리얼 형식으로 재구성한 개인 포트폴리오
          작업입니다. Levi Strauss &amp; Co.와 제휴하거나 승인받은 사이트가 아니며, 언급된 상표는 각 소유자에게
          있습니다.
        </p>
        <h2>Editorial principles</h2>
        <p>
          모든 사실 서술에는 각주로 출처를 달고, 널리 퍼졌지만 근거가 약한 일화는 그렇다고 밝힙니다. 사진 대신
          타이포그래피와 직접 그린 도식으로 이야기를 전합니다.
        </p>
        <h2>Typography</h2>
        <p>제목은 Fraunces, 한글 본문은 Noto Serif KR, 인터페이스는 IBM Plex Sans KR, 데이터와 캡션은 IBM Plex Mono.</p>
        <h2>Built with</h2>
        <p>React, TypeScript, Vite, React Router, GSAP ScrollTrigger, Lenis. 모든 도식은 SVG로 직접 그렸습니다.</p>
      </div>
    </article>
  );
}
