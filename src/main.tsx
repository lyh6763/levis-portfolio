import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App';
import './styles/reset.css';
import './styles/tokens.css';
import './styles/editorial.css';
import './styles/viz.css';
import './styles/inside-out.css';
import './styles/shop.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

/*
  빌드 때 미리 그린 라우트(scripts/prerenderRoutes.ts)는 그 HTML에 붙는다(hydrate).
  404.html처럼 비어 있거나, 다른 경로용 HTML이 대신 서빙된 경우(로컬 미리보기의 SPA 폴백 등)는 새로 그린다.
*/
const trim = (path: string) => path.replace(/\/+$/, '');
const prerendered = container.dataset.prerendered;
if (prerendered !== undefined && trim(prerendered) === trim(window.location.pathname)) {
  hydrateRoot(container, app);
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}
