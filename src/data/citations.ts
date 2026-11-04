/**
 * 출처마다 쓰인 곳. 출처 페이지가 장 본문(장마다 따로 받는 청크)을 모두 불러오지 않도록 여기에 적어 둔다.
 * 장 각주와 맞는지는 sources.test.ts가 본문에서 다시 뽑아 확인하므로, 각주를 고치면 테스트가 알려 준다.
 * 장 순서는 목차 순서를 따른다.
 */
export const citedInChapters: Record<string, string[]> = {
  'patent139121': ['the-patent'],
  'lapham-davis': ['the-patent'],
  'lsco-since1850': ['gold-and-canvas'],
  'lsco-truth2024': ['gold-and-canvas'],
  'lsco-records2017': ['gold-and-canvas'],
  'lsco-davis': ['the-patent'],
  'lsco-denim2019': ['the-patent'],
  'lsco-arcuate2018': ['the-patent'],
  'lsco-501': ['lot-501'],
  'lsco-coverup2017': ['lot-501'],
  'lsco-beltloops2022': ['lot-501'],
  'lsco-ww2': ['lot-501', 'war-and-rebellion'],
  'lsco-blockbuster2017': ['war-and-rebellion'],
  'lsco-school2018': ['war-and-rebellion'],
  'lsco-selvedge2023': ['the-patent', 'the-loom'],
  'lsco-dudeen2019': ['the-spread'],
  'lsco-lady2014': ['the-spread'],
  'lsco-russia2016': ['the-spread'],
  'lsco-lca2015': ['worn'],
  'wiki-jeans': ['the-patent'],
  'bamf2015': ['war-and-rebellion'],
  'downey2016': ['gold-and-canvas', 'lot-501'],
  'sullivan2006': ['war-and-rebellion', 'the-spread'],
  'balfourpaul2011': ['indigo'],
};

/**
 * 감정 도구(Inside Out) 단서의 근거. 단서에는 각주가 없어 src/data/insideOut.ts 머리 주석과 함께 고친다.
 * ftc-care(케어 라벨 규칙)는 장 본문에서는 인용하지 않고 여기서만 쓴다.
 */
export const usedInInsideOut: string[] = ['lsco-coverup2017', 'lsco-ww2', 'lsco-selvedge2023', 'lsco-501', 'ftc-care'];
