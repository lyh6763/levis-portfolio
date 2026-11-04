import { describe, expect, it } from 'vitest';

import { clues } from '../data/insideOut';
import { hasOptionDrawing } from './ClueDrawing';

describe('감정 도구 선 그림', () => {
  it.each(clues)('$id: 모든 선택지에 선 그림이 있다', (clue) => {
    const missing = clue.options.filter((option) => !hasOptionDrawing(clue.id, option.value)).map((option) => option.value);
    expect(missing).toEqual([]);
  });
});
