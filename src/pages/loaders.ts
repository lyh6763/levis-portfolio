/**
 * 지연 로딩하는 페이지 모듈. App의 lazy 라우트와 링크 미리 불러오기(prefetch)가 같은 함수를 써서
 * 모듈 캐시를 공유한다. 표지와 404 페이지는 첫 화면용이라 여기 두지 않는다.
 */
export const loadChapterPage = () => import('./ChapterPage');
export const loadSourcesPage = () => import('./SourcesPage');
export const loadColophonPage = () => import('./ColophonPage');
export const loadInsideOutPage = () => import('./InsideOutPage');
export const loadShopPage = () => import('./ShopPage');
export const loadProductPage = () => import('./ProductPage');
