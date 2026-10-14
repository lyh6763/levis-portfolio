import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router';

import App from './App';

/**
 * 빌드 때 라우트 하나를 HTML로 그린다(scripts/prerenderRoutes.ts가 부른다).
 * prerender는 지연 로딩 페이지·챕터 본문·시각화의 Suspense가 모두 풀릴 때까지 기다리므로
 * 결과에는 본문까지 들어간다. 브라우저에서는 main.tsx가 이 HTML에 hydrate한다.
 * url은 base를 포함한 경로다(예: /levis-portfolio/chapters/lot-501).
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
        <App />
      </StaticRouter>
    </StrictMode>,
    {
      // 기본값이면 큰 Suspense 구역을 따로 빼 두고 인라인 스크립트로 제자리에 옮긴다(스트리밍용).
      // 정적 HTML이므로 모두 제자리에 넣어, 스크립트 없이도 본문이 보이게 한다.
      progressiveChunkSize: Number.POSITIVE_INFINITY,
    },
  );
  let html = '';
  for await (const chunk of prelude) {
    html += chunk;
  }
  return html;
}
