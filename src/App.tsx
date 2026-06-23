import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { Archive } from './routes/Archive';
import { Craft } from './routes/Craft';
import { Heritage } from './routes/Heritage';
import { Home } from './routes/Home';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heritage" element={<Heritage />} />
          <Route path="/craft" element={<Craft />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
