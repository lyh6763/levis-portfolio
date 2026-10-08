import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App';
import './styles/reset.css';
import './styles/tokens.css';
import './styles/editorial.css';
import './styles/viz.css';
import './styles/inside-out.css';
import './styles/shop.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
