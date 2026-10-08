/**
 * Heritage Line: 시대별 복각 모델 (가상 상품).
 * 가격·원단 스펙·수축률은 콘셉트 데모를 위한 가정값이며 실제 제품 정보가 아니다.
 */

export type Model = {
  slug: string;
  year: number;
  name: string;
  chapter: string;
  tagline: string;
  story: string[];
  price: number;
  fit: string;
  fabric: { label: string; value: string }[];
  /** 첫 세탁(소킹) 후 수축률 근사치 */
  shrink: { waist: number; inseam: number };
};

export const WAISTS = [28, 29, 30, 31, 32, 33, 34, 36, 38];
export const INSEAMS = [30, 32, 34, 36];

export const models: Model[] = [
  {
    slug: '1890-xx',
    year: 1890,
    name: '1890 XX',
    chapter: 'lot-501',
    tagline: '로트 번호가 처음 붙은 해의 원형. 신치와 멜빵 단추, 뒷주머니 하나.',
    story: [
      '특허가 만료되던 1890년 무렵, 최상급 XX 데님으로 만든 웨이스트 오버롤에 501이라는 번호가 붙었다. 벨트 고리 대신 멜빵 단추가, 허리 뒤에는 조임끈이 달려 있던 시절이다.',
      '이 복각은 그 시대의 구조를 따른다. 뒷주머니는 하나뿐이고, 리벳은 모두 겉으로 드러나 있다.',
    ],
    price: 459000,
    fit: '높은 허리, 넉넉한 허벅지, 곧은 다리. 멜빵을 전제로 한 작업복 실루엣.',
    fabric: [
      { label: '원단', value: '9.5oz 셀비지 데님' },
      { label: '염색', value: '로프 염색 인디고' },
      { label: '가공', value: '생지 (방축 가공 없음)' },
      { label: '부자재', value: '구리 리벳, 가죽 패치, 신치 버클' },
    ],
    shrink: { waist: 0.04, inseam: 0.1 },
  },
  {
    slug: '1944-wartime',
    year: 1944,
    name: '1944 Wartime',
    chapter: 'war-and-rebellion',
    tagline: '실 한 가닥까지 아낀 전시 규격. 페인트 아큐에이트, 신치도 가랑이 리벳도 없다.',
    story: [
      '제2차 세계대전 중 물자 통제는 501에서 장식과 금속을 덜어 냈다. 뒷주머니의 곡선은 실 대신 페인트로 그려졌고, 신치와 가랑이 리벳이 사라졌다.',
      '부족함이 만든 디자인이다. 이 복각은 그 절제를 그대로 옮겼다.',
    ],
    price: 429000,
    fit: '높은 허리, 곧고 넓은 다리. 1940년대 작업복의 넉넉한 품.',
    fabric: [
      { label: '원단', value: '12.5oz 셀비지 데님' },
      { label: '염색', value: '로프 염색 인디고' },
      { label: '가공', value: '생지 (방축 가공 없음)' },
      { label: '부자재', value: '숨은 리벳, 가죽 패치, 빅 E 레드탭' },
    ],
    shrink: { waist: 0.04, inseam: 0.09 },
  },
  {
    slug: '1966-big-e',
    year: 1966,
    name: '1966 Big E',
    chapter: 'the-spread',
    tagline: '숨은 리벳이 바택으로 바뀐 해. 빅 E 레드탭과 셀비지가 함께한 마지막 시대.',
    story: [
      '1960년대, 청바지는 캠퍼스와 공연장의 옷이 되었다. 1966년 뒷주머니의 숨은 리벳은 굵은 박음질(바택)로 바뀌었고, 레드탭에는 아직 대문자 E가 남아 있었다.',
      '이 복각은 작업복에서 일상복으로 넘어가던 순간의 실루엣을 담았다.',
    ],
    price: 399000,
    fit: '중간 허리, 허벅지에서 밑단으로 살짝 좁아지는 테이퍼드.',
    fabric: [
      { label: '원단', value: '13.5oz 셀비지 데님' },
      { label: '염색', value: '로프 염색 인디고' },
      { label: '가공', value: '생지 (방축 가공 없음)' },
      { label: '부자재', value: '바택 보강, 종이 패치, 빅 E 레드탭' },
    ],
    shrink: { waist: 0.035, inseam: 0.08 },
  },
];

export const modelBySlug = new Map(models.map((model) => [model.slug, model]));
export const modelByChapter = new Map(models.map((model) => [model.chapter, model]));

export const formatPrice = (won: number) => `₩${won.toLocaleString('ko-KR')}`;

/** 추정 연대 구간에 들어가는 모델(exact). 없으면 구간에 가장 가까운 모델 하나. */
export function modelsForRange([from, to]: [number, number]): { models: Model[]; exact: boolean } {
  const inside = models.filter((model) => model.year >= from && model.year <= to);
  if (inside.length > 0) {
    return { models: inside, exact: true };
  }
  const distance = (model: Model) => (model.year < from ? from - model.year : model.year - to);
  return { models: [...models].sort((a, b) => distance(a) - distance(b)).slice(0, 1), exact: false };
}

export type SizeAdvice = {
  waist: number;
  inseam: number;
  after: { waist: number; inseam: number };
  outOfRange: boolean;
};

// 세탁 후 치수가 원하는 치수보다 이만큼(인치)까지 작아도 맞는 것으로 본다.
const TOLERANCE = 0.3;

function pickSize(sizes: number[], desired: number, rate: number) {
  const fits = sizes.filter((size) => size * (1 - rate) >= desired - TOLERANCE);
  return fits.length > 0 ? { size: fits[0], outOfRange: false } : { size: sizes[sizes.length - 1], outOfRange: true };
}

/**
 * 생지 수축을 감안한 태그 사이즈 추천.
 * desired는 '세탁 후' 원하는 허리·기장(인치). 수축 후 치수가 desired 이상인 가장 작은 사이즈를 고른다.
 */
export function adviseSize(model: Model, desired: { waist: number; inseam: number }): SizeAdvice {
  const waist = pickSize(WAISTS, desired.waist, model.shrink.waist);
  const inseam = pickSize(INSEAMS, desired.inseam, model.shrink.inseam);
  return {
    waist: waist.size,
    inseam: inseam.size,
    after: {
      waist: waist.size * (1 - model.shrink.waist),
      inseam: inseam.size * (1 - model.shrink.inseam),
    },
    outOfRange: waist.outOfRange || inseam.outOfRange,
  };
}
