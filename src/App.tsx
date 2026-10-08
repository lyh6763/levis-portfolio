import { lazy } from 'react';
import { Route, Routes } from 'react-router';

import { Layout } from './editorial/Layout';
import { CoverPage } from './pages/CoverPage';
import {
  loadChapterPage,
  loadColophonPage,
  loadInsideOutPage,
  loadProductPage,
  loadShopPage,
  loadSourcesPage,
} from './pages/loaders';
import { NotFoundPage } from './pages/NotFoundPage';

const ChapterPage = lazy(() => loadChapterPage().then((m) => ({ default: m.ChapterPage })));
const SourcesPage = lazy(() => loadSourcesPage().then((m) => ({ default: m.SourcesPage })));
const ColophonPage = lazy(() => loadColophonPage().then((m) => ({ default: m.ColophonPage })));
const InsideOutPage = lazy(() => loadInsideOutPage().then((m) => ({ default: m.InsideOutPage })));
const ShopPage = lazy(() => loadShopPage().then((m) => ({ default: m.ShopPage })));
const ProductPage = lazy(() => loadProductPage().then((m) => ({ default: m.ProductPage })));

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
