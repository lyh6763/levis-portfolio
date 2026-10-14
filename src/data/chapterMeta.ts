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
  /** 1차 자료에서 옮긴 인용. cite는 누가 언제 쓴 글인지(번역이면 그렇다고 적는다). */
  | { type: 'quote'; text: string; cite: string }
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
  years: string;
  title: string;
  dek: string;
  /** 본문 글자 수(공백 포함) ÷ 분당 500자 + 시각화마다 1분, 반올림. 본문을 고치면 다시 잰다. */
  readMinutes: number;
};

export const chapters: Chapter[] = [
  {
    slug: 'gold-and-canvas',
    number: '01',
    years: '1847–1853',
    title: 'Gold & Canvas',
    dek: '1847년 바이에른을 떠난 뢰브 슈트라우스가 1853년 샌프란시스코에 가족 사업의 서부 지점을 열기까지.',
    readMinutes: 3,
  },
  {
    slug: 'the-patent',
    number: '02',
    years: '1870–1873',
    title: 'The Patent',
    dek: '네바다의 재단사 제이콥 데이비스가 작업 바지 주머니 모서리에 리벳을 박고, 원단 도매상 리바이 스트라우스와 함께 특허를 받기까지.',
    readMinutes: 3,
  },
  {
    slug: 'lot-501',
    number: '03',
    years: '1890–1971',
    title: 'Lot 501',
    dek: '1890년 501이라는 번호가 붙은 뒤 1971년까지, 한 벌의 뒷면이 바뀌어 온 순서.',
    readMinutes: 2,
  },
  {
    slug: 'war-and-rebellion',
    number: '04',
    years: '1941–1959',
    title: 'War & Rebellion',
    dek: '전시 물자 통제로 바뀐 1940년대의 501과, 1950년대 영화와 학교 금지령 속의 청바지.',
    readMinutes: 2,
  },
  {
    slug: 'indigo',
    number: '05',
    years: '염료',
    title: 'Indigo',
    dek: '인디고는 실의 바깥층에만 물든다. 입을수록 흰 심이 드러나 색이 옅어지는 이유다.',
    readMinutes: 2,
  },
  {
    slug: 'the-loom',
    number: '06',
    years: '직조',
    title: 'The Loom',
    dek: '셔틀 직기에서는 씨실이 원단 끝에서 되돌아와 가장자리가 풀리지 않는다. 그 끝선이 셀비지다.',
    readMinutes: 2,
  },
  {
    slug: 'the-spread',
    number: '07',
    years: '1930–1980년대',
    title: 'The Spread',
    dek: '서부 관광 목장의 휴가객과 해외에 주둔한 미군을 따라 청바지가 미국 밖으로 퍼진 과정.',
    readMinutes: 2,
  },
  {
    slug: 'anatomy',
    number: '08',
    years: '1873–현재',
    title: 'Anatomy of a 501',
    dek: '501 한 벌의 부품을 처음 등장한 해와 함께 펼친 분해도.',
    readMinutes: 1,
  },
  {
    slug: 'worn',
    number: '09',
    years: '현재',
    title: 'Worn',
    dek: '2015년 전 과정 평가로 본 501 한 벌의 물 사용량.',
    readMinutes: 1,
  },
];

export const chapterBySlug = new Map(chapters.map((chapter) => [chapter.slug, chapter]));

export const totalReadMinutes = chapters.reduce((sum, chapter) => sum + chapter.readMinutes, 0);
