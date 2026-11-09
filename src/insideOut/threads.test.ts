import { describe, expect, it } from 'vitest';

import { parseThreads } from './InsideOutContext';

describe('저장된 실밥 목록 읽기', () => {
  it('문자열 배열은 그대로 읽는다', () => {
    expect([...parseThreads(JSON.stringify(['a', 'b']))]).toEqual(['a', 'b']);
  });

  it('비었거나 깨진 값은 빈 목록으로 읽는다', () => {
    expect(parseThreads(null).size).toBe(0);
    expect(parseThreads('{not json').size).toBe(0);
    expect(parseThreads(JSON.stringify({ a: 1 })).size).toBe(0);
  });

  it('문자열 하나를 글자마다 실밥으로 세지 않는다', () => {
    expect(parseThreads(JSON.stringify('abcde')).size).toBe(0);
  });

  it('문자열이 아닌 항목은 뺀다', () => {
    expect([...parseThreads(JSON.stringify(['a', 1, null, { id: 'b' }, 'c']))]).toEqual(['a', 'c']);
  });
});
