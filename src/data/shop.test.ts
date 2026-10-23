import { describe, expect, it } from 'vitest';

import { chapterBySlug } from './chapterMeta';
import { adviseSize, INSEAMS, modelBySlug, models, modelsForRange, WAISTS } from './shop';

// 수축률 허리 0.04, 기장 0.1
const xx = modelBySlug.get('1890-xx')!;

describe('adviseSize', () => {
  it('세탁 후 원하는 치수를 채우는 가장 작은 태그 사이즈를 고른다', () => {
    const advice = adviseSize(xx, { waist: 30, inseam: 30 });
    // 기장 32는 세탁 후 28.8로 모자라고, 34가 30.6이 된다.
    expect(advice.inseam).toBe(34);
    expect(advice.after.inseam).toBeCloseTo(30.6);
    expect(advice.outOfRange).toBe(false);
  });

  it('허용 오차(0.3인치)만큼 작은 것은 맞는 것으로 본다', () => {
    // 허리 31은 세탁 후 29.76: 30보다 0.24 작아 허용된다.
    const advice = adviseSize(xx, { waist: 30, inseam: 30 });
    expect(advice.waist).toBe(31);
    expect(advice.after.waist).toBeCloseTo(29.76);
  });

  it('허용 오차를 넘게 작으면 한 사이즈 올린다', () => {
    // 30.1을 원하면 31(29.76)은 0.34 작아 탈락하고 32(30.72)가 된다.
    expect(adviseSize(xx, { waist: 30.1, inseam: 30 }).waist).toBe(32);
  });

  it('가장 큰 사이즈로도 모자라면 가장 큰 사이즈와 outOfRange를 돌려준다', () => {
    const advice = adviseSize(xx, { waist: 40, inseam: 30 });
    expect(advice.waist).toBe(WAISTS[WAISTS.length - 1]);
    expect(advice.outOfRange).toBe(true);
  });

  it('기장이 범위를 넘어도 outOfRange가 된다', () => {
    const advice = adviseSize(xx, { waist: 30, inseam: 36 });
    expect(advice.inseam).toBe(INSEAMS[INSEAMS.length - 1]);
    expect(advice.outOfRange).toBe(true);
  });
});

describe('modelsForRange', () => {
  const slugs = (range: [number, number]) => {
    const result = modelsForRange(range);
    return { slugs: result.models.map((model) => model.slug), exact: result.exact };
  };

  it('구간 안의 모델을 모두 돌려준다', () => {
    expect(slugs([1936, 1971])).toEqual({ slugs: ['1944-wartime', '1966-big-e'], exact: true });
  });

  it('구간 경계 연도도 구간 안으로 본다', () => {
    expect(slugs([1944, 1944])).toEqual({ slugs: ['1944-wartime'], exact: true });
  });

  it('구간 안에 없으면 가장 가까운 모델 하나를 돌려준다', () => {
    expect(slugs([1971, 2025])).toEqual({ slugs: ['1966-big-e'], exact: false });
    expect(slugs([1873, 1880])).toEqual({ slugs: ['1890-xx'], exact: false });
  });
});

describe('상품 데이터', () => {
  it('slug가 겹치지 않는다', () => {
    const slugList = models.map((model) => model.slug);
    expect(new Set(slugList).size).toBe(slugList.length);
  });

  it('챕터마다 모델이 하나다 (modelByChapter가 덮어쓰지 않도록)', () => {
    const chapterList = models.map((model) => model.chapter);
    expect(new Set(chapterList).size).toBe(chapterList.length);
  });

  it.each(models)('$slug: 연결된 챕터가 실제로 있다', (model) => {
    expect(chapterBySlug.has(model.chapter)).toBe(true);
  });

  it.each(models)('$slug: 수축률이 0 이상 20% 미만이다', (model) => {
    for (const rate of [model.shrink.waist, model.shrink.inseam]) {
      expect(rate).toBeGreaterThanOrEqual(0);
      expect(rate).toBeLessThan(0.2);
    }
  });
});
