export type Source = {
  id: string;
  author: string;
  title: string;
  publisher?: string;
  year: string;
  url?: string;
  /** 본문 서술과 대조한 시점. 없으면 아직 원문과 대조하지 못한 자료(주로 단행본). */
  checked?: string;
};

/**
 * 본문 각주가 참조하는 출처. 챕터 텍스트의 `[^id]` 마커가 이 id를 가리킨다.
 * 온라인 자료는 2026년 10월에 본문 서술과 대조했다. 단행본은 원문 대조 전이라 보조 근거로만 쓴다.
 */
export const sources: Source[] = [
  // ---------- 1차 자료 ----------
  {
    id: 'patent139121',
    author: 'Jacob W. Davis',
    title: 'Improvement in Fastening Pocket-Openings, US Patent No. 139,121',
    publisher: 'United States Patent Office',
    year: '1873',
    url: 'https://patents.google.com/patent/US139121A/en',
    checked: '2026-10',
  },
  {
    id: 'lapham-davis',
    author: "Lapham's Quarterly",
    title: '1873 | Reno, NV — Jacob Davis의 1872년 편지 전문',
    publisher: "Lapham's Quarterly",
    year: 'n.d.',
    url: 'https://www.laphamsquarterly.org/node/5917',
    checked: '2026-10',
  },
  {
    id: 'ftc-care',
    author: 'Federal Trade Commission',
    title: 'Care Labeling of Textile Wearing Apparel (16 CFR Part 423)',
    publisher: 'eCFR',
    year: '1971 (1972년 7월 시행)',
    url: 'https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-423',
    checked: '2026-10',
  },

  // ---------- Levi Strauss & Co. 아카이브·역사 글 ----------
  {
    id: 'lsco-since1850',
    author: 'Levi Strauss & Co.',
    title: 'Levi Strauss & Co. . . . Since 1850?',
    publisher: 'levistrauss.com',
    year: '2020',
    url: 'https://www.levistrauss.com/2020/02/06/levi-strauss-co-since-1850/',
    checked: '2026-10',
  },
  {
    id: 'lsco-truth2024',
    author: 'Tracey Panek, Levi Strauss & Co.',
    title: 'The Truth — and Exaggerations — of LS&Co.',
    publisher: 'levistrauss.com',
    year: '2024',
    url: 'https://www.levistrauss.com/2024/06/11/truth-and-exaggerations-of-lsco/',
    checked: '2026-10',
  },
  {
    id: 'lsco-records2017',
    author: 'Levi Strauss & Co.',
    title: 'Throwback Thursday: Rare Records Revealed',
    publisher: 'levistrauss.com',
    year: '2017',
    url: 'https://www.levistrauss.com/2017/03/02/throwback-thursday-rare-records-revealed/',
    checked: '2026-10',
  },
  {
    id: 'lsco-davis',
    author: 'Levi Strauss & Co.',
    title: 'Jacob Davis: His Life and Contributions',
    publisher: 'levistrauss.com',
    year: 'n.d.',
    url: 'https://www.levistrauss.com/wp-content/uploads/2014/01/Jacob-Davis-His-Life-and-Contributions1.pdf',
    checked: '2026-10',
  },
  {
    id: 'lsco-denim2019',
    author: 'Levi Strauss & Co.',
    title: 'The History of Denim',
    publisher: 'levistrauss.com',
    year: '2019',
    url: 'https://www.levistrauss.com/2019/07/04/the-history-of-denim/',
    checked: '2026-10',
  },
  {
    id: 'lsco-arcuate2018',
    author: 'Levi Strauss & Co.',
    title: 'Happy 75th Anniversary, Arcuate! 5 Facts About Our Pocket Design',
    publisher: 'levistrauss.com',
    year: '2018',
    url: 'https://www.levistrauss.com/2018/11/15/happy-75th-anniversary-arcuate-5-facts-pocket-design/',
    checked: '2026-10',
  },
  {
    id: 'lsco-501',
    author: 'Levi Strauss & Co.',
    title: "History of Levi's 501 Jeans",
    publisher: 'levistrauss.com',
    year: '2014',
    url: 'https://www.levistrauss.com/wp-content/uploads/2014/01/History-of-Levis-501-Jeans.pdf',
    checked: '2026-10',
  },
  {
    id: 'lsco-coverup2017',
    author: 'Levi Strauss & Co.',
    title: 'The 80-Year Coverup',
    publisher: 'levistrauss.com',
    year: '2017',
    url: 'https://www.levistrauss.com/2017/07/06/80-year-cover/',
    checked: '2026-10',
  },
  {
    id: 'lsco-beltloops2022',
    author: 'Levi Strauss & Co.',
    title: 'Countdown to 150: 501 Fab Facts — The First Belt Loops',
    publisher: 'levistrauss.com',
    year: '2022',
    url: 'https://levistrauss.com/2022/05/18/countdown-to-150-501-fab-facts-the-first-belt-loops',
    checked: '2026-10',
  },
  {
    id: 'lsco-ww2',
    author: 'Levi Strauss & Co.',
    title: 'How World War II Changed Levi’s®',
    publisher: 'levistrauss.com',
    year: '2020',
    url: 'https://www.levistrauss.com/2020/09/30/world-war-ii-levis/',
    checked: '2026-10',
  },
  {
    id: 'lsco-blockbuster2017',
    author: 'Levi Strauss & Co.',
    title: 'Blockbuster Leads in Levi’s®: A Look Back',
    publisher: 'levistrauss.com',
    year: '2017',
    url: 'https://www.levistrauss.com/2017/06/14/blockbuster-leads-levis-look-back/',
    checked: '2026-10',
  },
  {
    id: 'lsco-school2018',
    author: 'Levi Strauss & Co.',
    title: 'Right for School – The Historic Campaign for Levi’s® Jeans in the Classroom',
    publisher: 'levistrauss.com',
    year: '2018',
    url: 'https://www.levistrauss.com/2018/09/12/right-school-historic-campaign-levis-jeans-classroom/',
    checked: '2026-10',
  },
  {
    id: 'lsco-selvedge2023',
    author: 'Levi Strauss & Co.',
    title: '501® Fab Facts: The Story of Selvedge',
    publisher: 'levistrauss.com',
    year: '2023',
    url: 'https://www.levistrauss.com/2023/02/21/501-fab-facts-the-story-of-selvedge',
    checked: '2026-10',
  },
  {
    id: 'lsco-dudeen2019',
    author: 'Levi Strauss & Co.',
    title: 'Letters from a Genuine Levi’s® Dudeen',
    publisher: 'levistrauss.com',
    year: '2019',
    url: 'https://www.levistrauss.com/2019/03/07/letters-genuine-levis-dudeen/',
    checked: '2026-10',
  },
  {
    id: 'lsco-lady2014',
    author: 'Levi Strauss & Co.',
    title: 'Report from the Ranch: The 80th Anniversary of Lady Levi’s® Jeans',
    publisher: 'levistrauss.com',
    year: '2014',
    url: 'https://www.levistrauss.com/2014/04/24/report-from-the-ranch-the-80th-anniversary-of-lady-levis-jeans/',
    checked: '2026-10',
  },
  {
    id: 'lsco-russia2016',
    author: 'Levi Strauss & Co.',
    title: 'On the Road in Russia—Sharing the 501® Globally',
    publisher: 'levistrauss.com',
    year: '2016',
    url: 'https://www.levistrauss.com/2016/03/03/on-the-road-in-russia-sharing-the-501-globally/',
    checked: '2026-10',
  },
  {
    id: 'lsco-lca2015',
    author: 'Levi Strauss & Co.',
    title: 'The Life Cycle of a Jean: Understanding the Environmental Impact of a Pair of Levi’s 501 Jeans',
    publisher: 'levistrauss.com',
    year: '2015',
    url: 'https://www.levistrauss.com/2015/03/26/3-surprising-insights-about-those-501-jeans/',
    checked: '2026-10',
  },

  // ---------- 2차 자료 ----------
  {
    id: 'wiki-jeans',
    author: 'Wikipedia',
    title: 'Jeans',
    publisher: 'Wikimedia Foundation',
    year: 'n.d.',
    url: 'https://en.wikipedia.org/wiki/Jeans',
    checked: '2026-10',
  },
  {
    id: 'bamf2015',
    author: 'BAMF Style',
    title: 'Rebel Without a Cause – Red Windbreaker and Jeans',
    publisher: 'bamfstyle.com',
    year: '2015',
    url: 'https://bamfstyle.com/2015/09/30/rebel-without-a-cause-3-windbreaker/',
    checked: '2026-10',
  },

  // ---------- 단행본 (원문 대조 전) ----------
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
    id: 'balfourpaul2011',
    author: 'Jenny Balfour-Paul',
    title: 'Indigo: Egyptian Mummies to Blue Jeans',
    publisher: 'British Museum Press',
    year: '2011',
  },
];

export const sourceById = new Map(sources.map((source) => [source.id, source]));
