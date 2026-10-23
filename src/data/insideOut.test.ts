import { describe, expect, it } from 'vitest';

import { chapterBySlug } from './chapterMeta';
import { answersFromParams, clues, DOMAIN, estimate, UNKNOWN } from './insideOut';

describe('estimate', () => {
  it('답이 없으면 전체 구간을 돌려준다', () => {
    expect(estimate({})).toEqual({
      range: DOMAIN,
      findings: [],
      boundBy: { from: null, to: null },
      conflict: false,
    });
  });

  it('단서 하나는 그 선택지의 구간이 된다', () => {
    const result = estimate({ tab: 'bigE' });
    expect(result.range).toEqual([1936, 1971]);
    expect(result.boundBy).toEqual({ from: 'tab', to: 'tab' });
    expect(result.findings.map((finding) => finding.clue.id)).toEqual(['tab']);
  });

  it('여러 단서는 교집합을 내고 하한·상한을 정한 단서를 따로 기록한다', () => {
    // 빅 E [1936, 1971] ∩ 세탁 라벨 있음 [1971, 2025]
    const result = estimate({ tab: 'bigE', label: 'yes' });
    expect(result.range).toEqual([1971, 1971]);
    expect(result.boundBy).toEqual({ from: 'label', to: 'tab' });
    expect(result.conflict).toBe(false);
  });

  it('경계가 같으면 먼저 나온 단서가 결정한 것으로 둔다', () => {
    // 가랑이 리벳과 신치 모두 [1873, 1944]
    expect(estimate({ crotch: 'yes', cinch: 'yes' }).boundBy).toEqual({ from: null, to: 'crotch' });
  });

  it('교집합이 비면 conflict로 표시한다', () => {
    // 겉 리벳 [1873, 1937] ∩ 세탁 라벨 있음 [1971, 2025]
    const result = estimate({ rivet: 'exposed', label: 'yes' });
    expect(result.conflict).toBe(true);
    expect(result.range[0]).toBeGreaterThan(result.range[1]);
  });

  it('구간을 좁히지 않는 선택지는 결과에는 남되 구간을 바꾸지 않는다', () => {
    const result = estimate({ arcuate: 'stitched' });
    expect(result.range).toEqual(DOMAIN);
    expect(result.findings.map((finding) => finding.option.value)).toEqual(['stitched']);
  });

  it('"모르겠음"과 없는 선택지는 무시한다', () => {
    const result = estimate({ tab: UNKNOWN, rivet: 'nonexistent' });
    expect(result.range).toEqual(DOMAIN);
    expect(result.findings).toEqual([]);
  });
});

describe('answersFromParams', () => {
  it('알려진 단서의 선택지와 "모르겠음"만 받는다', () => {
    const params = new URLSearchParams('tab=bigE&rivet=unknown&crotch=maybe&label=&color=red');
    expect(answersFromParams(params)).toEqual({ tab: 'bigE', rivet: UNKNOWN });
  });
});

describe('단서 데이터', () => {
  it('단서 id가 겹치지 않는다', () => {
    const ids = clues.map((clue) => clue.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(clues)('$id: 선택지 값이 겹치지 않고 "모르겠음"과 충돌하지 않는다', (clue) => {
    const values = clue.options.map((option) => option.value);
    expect(new Set(values).size).toBe(values.length);
    expect(values).not.toContain(UNKNOWN);
  });

  it.each(clues)('$id: 구간이 전체 범위 안에 있고 시작이 끝보다 늦지 않다', (clue) => {
    for (const option of clue.options) {
      if (!option.range) {
        continue;
      }
      const [from, to] = option.range;
      expect(from, option.value).toBeGreaterThanOrEqual(DOMAIN[0]);
      expect(to, option.value).toBeLessThanOrEqual(DOMAIN[1]);
      expect(from, option.value).toBeLessThanOrEqual(to);
    }
  });

  it.each(clues)('$id: 관련 챕터가 실제로 있다', (clue) => {
    expect(chapterBySlug.has(clue.chapter)).toBe(true);
  });
});
