import { Route, Routes } from 'react-router';

import { Layout } from './editorial/Layout';
import { ChapterPage } from './pages/ChapterPage';
import { ColophonPage } from './pages/ColophonPage';
import { CoverPage } from './pages/CoverPage';
import { InsideOutPage } from './pages/InsideOutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage';
import { ShopPage } from './pages/ShopPage';
import { SourcesPage } from './pages/SourcesPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CoverPage />} />
        <Route path="chapters/:slug" element={<ChapterPage />} />
        <Route path="sources" element={<SourcesPage />} />
        <Route path="colophon" element={<ColophonPage />} />
        <Route path="inside-out" element={<InsideOutPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:slug" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
