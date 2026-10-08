import type { Block } from './chapterMeta';

export * from './chapterMeta';

// 챕터 본문은 챕터마다 별도 청크로 나눈다. 정적 분석이 되도록 import 경로를 하나씩 적는다.
const loaders: Record<string, () => Promise<{ blocks: Block[] }>> = {
  'gold-and-canvas': () => import('../content/chapters/gold-and-canvas'),
  'the-patent': () => import('../content/chapters/the-patent'),
  'lot-501': () => import('../content/chapters/lot-501'),
  'war-and-rebellion': () => import('../content/chapters/war-and-rebellion'),
  indigo: () => import('../content/chapters/indigo'),
  'the-loom': () => import('../content/chapters/the-loom'),
  'the-spread': () => import('../content/chapters/the-spread'),
  anatomy: () => import('../content/chapters/anatomy'),
  worn: () => import('../content/chapters/worn'),
};

const cache = new Map<string, Promise<Block[]>>();

/**
 * 챕터 본문을 불러온다. 같은 slug에는 같은 Promise를 돌려주므로 React `use()`와 미리 불러오기에 함께 쓸 수 있다.
 * 불러오기에 실패하면 캐시에서 지워 다음 시도에서 다시 받는다.
 */
export function loadChapterBlocks(slug: string): Promise<Block[]> {
  let promise = cache.get(slug);
  if (!promise) {
    const loader = loaders[slug];
    promise = loader
      ? loader().then((module) => module.blocks)
      : Promise.reject(new Error(`Unknown chapter: ${slug}`));
    promise.catch(() => cache.delete(slug));
    cache.set(slug, promise);
  }
  return promise;
}
