import { Route, Routes } from 'react-router';

import { Layout } from './editorial/Layout';
import { ChapterPage } from './pages/ChapterPage';
import { ColophonPage } from './pages/ColophonPage';
import { CoverPage } from './pages/CoverPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SourcesPage } from './pages/SourcesPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CoverPage />} />
        <Route path="chapters/:slug" element={<ChapterPage />} />
        <Route path="sources" element={<SourcesPage />} />
        <Route path="colophon" element={<ColophonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
