import { loadChapterBlocks } from '../data/chapters';
import { loadChapterPage } from '../pages/loaders';
import { preloadViz } from '../viz/registry';

/** 데이터 절약 모드에서는 미리 받지 않는다. */
const saveData = () =>
  typeof navigator !== 'undefined' &&
  Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

/**
 * 챕터로 가기 전에 페이지 모듈, 본문, 그 챕터의 시각화를 미리 받는다.
 * 링크에 포인터를 올리거나 포커스할 때, 그리고 다음 챕터는 브라우저가 한가할 때 부른다.
 */
export function prefetchChapter(slug: string) {
  if (saveData()) {
    return;
  }
  loadChapterPage().catch(() => undefined);
  loadChapterBlocks(slug)
    .then((blocks) => {
      for (const block of blocks) {
        if (block.type === 'viz') {
          preloadViz(block.id);
        }
      }
    })
    .catch(() => undefined);
}

/** 링크에 붙이는 이벤트 묶음. */
export const prefetchHandlers = (slug: string) => ({
  onPointerEnter: () => prefetchChapter(slug),
  onFocus: () => prefetchChapter(slug),
});
