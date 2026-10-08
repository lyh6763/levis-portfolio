import type { Block } from '../../data/chapterMeta';
import { blocks as goldAndCanvas } from './gold-and-canvas';
import { blocks as thePatent } from './the-patent';
import { blocks as lot501 } from './lot-501';
import { blocks as warAndRebellion } from './war-and-rebellion';
import { blocks as indigo } from './indigo';
import { blocks as theLoom } from './the-loom';
import { blocks as theSpread } from './the-spread';
import { blocks as anatomy } from './anatomy';
import { blocks as worn } from './worn';

/**
 * 모든 챕터 본문을 한데 모은 색인. 빌드 도구(scripts/prerenderRoutes.ts) 전용이다.
 * 앱 코드에서 import하면 챕터 분할이 무력화되므로 src/data/chapters.ts의 loadChapterBlocks를 쓴다.
 */
export const blocksBySlug: Record<string, Block[]> = {
  'gold-and-canvas': goldAndCanvas,
  'the-patent': thePatent,
  'lot-501': lot501,
  'war-and-rebellion': warAndRebellion,
  'indigo': indigo,
  'the-loom': theLoom,
  'the-spread': theSpread,
  'anatomy': anatomy,
  'worn': worn,
};
