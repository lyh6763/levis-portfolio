import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './styles/reset.css';
import './styles/common.css';
import './styles/home.css';
import './styles/sub.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
