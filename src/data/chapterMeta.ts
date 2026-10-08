export type VizId =
  | 'route'
  | 'patent'
  | 'lot501'
  | 'warpaint'
  | 'indigo'
  | 'loom'
  | 'spread'
  | 'anatomy'
  | 'water';

/** 본문 텍스트는 `[^sourceId]` 마커로 각주를 단다. 번호는 챕터 안에서 등장 순으로 매긴다. */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'stat'; value: string; label: string }
  | { type: 'aside'; title: string; text: string }
  | { type: 'viz'; id: VizId; caption: string }
  /** Inside Out으로 이어지는 숨은 '풀린 실밥'. id는 수집 단위. */
  | { type: 'thread'; id: string }
  /** 사이트를 뒤집어 Inside Out으로 가는 명시적 진입점. */
  | { type: 'turn'; text: string };

/**
 * 챕터 메타데이터. 목차·마스트헤드·표지와 빌드 시 라우트 생성(scripts/prerenderRoutes.ts)이 함께 쓴다.
 * 본문 블록은 src/content/chapters/<slug>.ts에 따로 두고 챕터 페이지에서 지연 로딩한다.
 */
export type Chapter = {
  slug: string;
  number: string;
  kicker: string;
  years: string;
  title: string;
  dek: string;
  readMinutes: number;
};

export const chapters: Chapter[] = [
  {
    slug: 'gold-and-canvas',
    number: '01',
    kicker: 'Migration',
    years: '1847–1853',
    title: 'Gold & Canvas',
    dek: '바이에른의 작은 마을에서 샌프란시스코의 부두까지. 청바지 이야기는 바지가 아니라 한 상인의 이주에서 시작된다.',
    readMinutes: 4,
  },
  {
    slug: 'the-patent',
    number: '02',
    kicker: 'Invention',
    years: '1870–1873',
    title: 'The Patent',
    dek: '네바다의 한 재단사가 작업 바지 주머니 모서리에 리벳을 박았다. 그리고 그에게는 특허를 낼 68달러가 없었다.',
    readMinutes: 5,
  },
  {
    slug: 'lot-501',
    number: '03',
    kicker: 'Evolution',
    years: '1890–1971',
    title: 'Lot 501',
    dek: '특허가 만료되고 경쟁자가 몰려들었다. 그 사이 한 벌의 바지는 80년 동안 조금씩, 그러나 쉬지 않고 모습을 바꿨다.',
    readMinutes: 6,
  },
  {
    slug: 'war-and-rebellion',
    number: '04',
    kicker: 'Culture',
    years: '1941–1959',
    title: 'War & Rebellion',
    dek: '실 한 가닥까지 아껴야 했던 전쟁, 그리고 그 옷을 반항의 상징으로 바꿔 놓은 전후의 십대들.',
    readMinutes: 5,
  },
  {
    slug: 'indigo',
    number: '05',
    kicker: 'Material',
    years: 'Dye',
    title: 'Indigo',
    dek: '청바지가 닳을수록 아름다워지는 이유는, 인디고가 실의 속까지 스며들지 않기 때문이다.',
    readMinutes: 5,
  },
  {
    slug: 'the-loom',
    number: '06',
    kicker: 'Craft',
    years: 'Weave',
    title: 'The Loom',
    dek: '좁은 직기 위를 북이 오가며 원단의 가장자리를 스스로 닫았다. 그 끝선이 셀비지다.',
    readMinutes: 5,
  },
  {
    slug: 'the-spread',
    number: '07',
    kicker: 'Diffusion',
    years: '1930s–1980s',
    title: 'The Spread',
    dek: '서부의 작업복은 휴가객의 짐에, 병사의 배낭에, 밀수꾼의 가방에 실려 세계로 퍼졌다.',
    readMinutes: 5,
  },
  {
    slug: 'anatomy',
    number: '08',
    kicker: 'Object',
    years: '1873–Today',
    title: 'Anatomy of a 501',
    dek: '150년 동안 덧붙고, 숨고, 사라진 디테일들. 한 벌을 분해하면 그대로 연표가 된다.',
    readMinutes: 3,
  },
  {
    slug: 'worn',
    number: '09',
    kicker: 'Epilogue',
    years: 'Today',
    title: 'Worn',
    dek: '가장 오래 입은 청바지가 가장 지속 가능한 청바지다.',
    readMinutes: 3,
  },
];

export const chapterBySlug = new Map(chapters.map((chapter) => [chapter.slug, chapter]));

export const totalReadMinutes = chapters.reduce((sum, chapter) => sum + chapter.readMinutes, 0);
