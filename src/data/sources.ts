export type Source = {
  id: string;
  author: string;
  title: string;
  publisher?: string;
  year: string;
  url?: string;
};

/**
 * 본문 각주가 참조하는 출처. 챕터 텍스트의 `[^id]` 마커가 이 id를 가리킨다.
 * 초안 단계이므로 일부 서술은 원문 대조가 남아 있다 (docs/REDESIGN_PLAN.md 참고).
 */
export const sources: Source[] = [
  {
    id: 'downey2016',
    author: 'Lynn Downey',
    title: 'Levi Strauss: The Man Who Gave Blue Jeans to the World',
    publisher: 'University of Massachusetts Press',
    year: '2016',
  },
  {
    id: 'sullivan2006',
    author: 'James Sullivan',
    title: 'Jeans: A Cultural History of an American Icon',
    publisher: 'Gotham Books',
    year: '2006',
  },
  {
    id: 'patent139121',
    author: 'Jacob W. Davis',
    title: 'Improvement in Fastening Pocket-Openings, US Patent No. 139,121',
    publisher: 'United States Patent Office',
    year: '1873',
    url: 'https://patents.google.com/patent/US139121A/en',
  },
  {
    id: 'lsco-history',
    author: 'Levi Strauss & Co.',
    title: 'Our History',
    publisher: 'levistrauss.com',
    year: 'n.d.',
    url: 'https://www.levistrauss.com/who-we-are/history/',
  },
  {
    id: 'lsco-501',
    author: 'Levi Strauss & Co.',
    title: "History of Levi's 501 Jeans",
    publisher: 'levistrauss.com',
    year: '2014',
    url: 'https://www.levistrauss.com/wp-content/uploads/2014/01/History-of-Levis-501-Jeans.pdf',
  },
  {
    id: 'lsco-lca2015',
    author: 'Levi Strauss & Co.',
    title: 'The Life Cycle of a Jean: Understanding the Environmental Impact of a Pair of Levi’s 501 Jeans',
    publisher: 'levistrauss.com',
    year: '2015',
    url: 'https://www.levistrauss.com/2015/03/26/3-surprising-insights-about-those-501-jeans/',
  },
  {
    id: 'balfourpaul2011',
    author: 'Jenny Balfour-Paul',
    title: 'Indigo: Egyptian Mummies to Blue Jeans',
    publisher: 'British Museum Press',
    year: '2011',
  },
];

export const sourceById = new Map(sources.map((source) => [source.id, source]));
