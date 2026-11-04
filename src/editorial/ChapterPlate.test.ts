import { describe, expect, it } from 'vitest';

import { chapters } from '../data/chapterMeta';
import { hasChapterPlate } from './ChapterPlate';

describe('장 첫 화면 도판', () => {
  it.each(chapters)('$number $title: 도판이 있다', (chapter) => {
    expect(hasChapterPlate(chapter.slug)).toBe(true);
  });
});
