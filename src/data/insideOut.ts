/**
 * Inside Out: 빈티지 501 연대 감정 단서.
 * 각 선택지는 가능한 연도 구간을 좁힌다. 경계 연도는 전환기를 감안해 서로 겹치게 잡았다.
 * 501 기준의 일반적인 경향이며 공장·재고·수선에 따라 예외가 있다. (근거: lsco-501, downey2016)
 */

export const DOMAIN: [number, number] = [1873, 2025];

export type Range = [number, number];

export type ClueOption = {
  value: string;
  label: string;
  range: Range | null; // null = 구간을 좁히지 않음
};

export type Clue = {
  id: string;
  /** 결과 요약에 쓰는 짧은 이름 */
  name: string;
  title: string;
  where: string;
  glyph: 'tab' | 'rivet' | 'crotch' | 'cinch' | 'patch' | 'selvedge' | 'label' | 'arcuate';
  chapter: string;
  options: ClueOption[];
};

export const UNKNOWN = 'unknown';

export const clues: Clue[] = [
  {
    id: 'tab',
    name: '레드탭',
    title: '레드탭의 글자는?',
    where: '오른쪽 뒷주머니 왼쪽 옆, 작은 빨간 천 조각을 보세요.',
    glyph: 'tab',
    chapter: 'lot-501',
    options: [
      { value: 'none', label: '레드탭이 없다', range: [1873, 1936] },
      { value: 'bigE', label: "대문자 LEVI'S (빅 E)", range: [1936, 1971] },
      { value: 'smallE', label: "소문자 e, Levi's", range: [1971, 2025] },
    ],
  },
  {
    id: 'rivet',
    name: '뒷주머니 리벳',
    title: '뒷주머니 모서리에는?',
    where: '바지를 뒤집어 뒷주머니 위쪽 모서리 안쪽을 보세요.',
    glyph: 'rivet',
    chapter: 'lot-501',
    options: [
      { value: 'exposed', label: '겉에서 리벳이 보인다', range: [1873, 1937] },
      { value: 'hidden', label: '안쪽에만 리벳이 있다 (숨은 리벳)', range: [1937, 1967] },
      { value: 'bartack', label: '리벳 없이 굵은 박음질(바택)', range: [1966, 2025] },
    ],
  },
  {
    id: 'crotch',
    name: '가랑이 리벳',
    title: '앞섶 아래 가랑이에 리벳이?',
    where: '단추 앞섶이 끝나는 가랑이 지점을 보세요.',
    glyph: 'crotch',
    chapter: 'lot-501',
    options: [
      { value: 'yes', label: '있다', range: [1873, 1941] },
      { value: 'no', label: '없다', range: [1941, 2025] },
    ],
  },
  {
    id: 'cinch',
    name: '신치',
    title: '허리 뒤에 조임끈(신치)이?',
    where: '뒤 허리띠 바로 아래, 버클 달린 끈이 있는지 보세요.',
    glyph: 'cinch',
    chapter: 'war-and-rebellion',
    options: [
      { value: 'yes', label: '있다', range: [1873, 1942] },
      { value: 'no', label: '없다', range: [1942, 2025] },
    ],
  },
  {
    id: 'patch',
    name: '패치',
    title: '허리 뒤 패치의 소재는?',
    where: '오른쪽 뒤 허리띠 위의 투 호스 패치를 만져 보세요.',
    glyph: 'patch',
    chapter: 'lot-501',
    options: [
      { value: 'leather', label: '가죽', range: [1886, 1956] },
      { value: 'paper', label: '가죽처럼 가공한 종이', range: [1954, 2025] },
    ],
  },
  {
    id: 'arcuate',
    name: '아큐에이트',
    title: '뒷주머니의 아큐에이트는?',
    where: '뒷주머니 위 갈매기 모양 곡선을 보세요.',
    glyph: 'arcuate',
    chapter: 'war-and-rebellion',
    options: [
      { value: 'stitched', label: '실로 꿰맸다', range: null },
      { value: 'painted', label: '실 없이 페인트로 그렸다', range: [1942, 1947] },
    ],
  },
  {
    id: 'selvedge',
    name: '셀비지',
    title: '바깥 솔기 안쪽의 가장자리는?',
    where: '바지를 뒤집어 다리 바깥쪽 솔기의 원단 끝을 보세요.',
    glyph: 'selvedge',
    chapter: 'the-loom',
    options: [
      { value: 'selvedge', label: '깔끔한 셀비지 (붉은 실 선)', range: [1873, 1986] },
      { value: 'overlock', label: '잘린 끝을 오버록으로 감쌌다', range: [1983, 2025] },
    ],
  },
  {
    id: 'label',
    name: '세탁 라벨',
    title: '안쪽에 세탁 라벨이?',
    where: '허리 안쪽이나 주머니 천에 붙은 케어 라벨을 찾아보세요.',
    glyph: 'label',
    chapter: 'lot-501',
    options: [
      { value: 'none', label: '없다', range: [1873, 1972] },
      { value: 'yes', label: '있다', range: [1971, 2025] },
    ],
  },
];

export const clueById = new Map(clues.map((clue) => [clue.id, clue]));

export type Answers = Record<string, string>;

export type Finding = {
  clue: Clue;
  option: ClueOption;
};

export type Estimate = {
  range: Range;
  findings: Finding[];
  /** 하한(from)과 상한(to)을 결정한 단서 id */
  boundBy: { from: string | null; to: string | null };
  conflict: boolean;
};

/** 응답들의 구간을 교집합한다. 교집합이 비면 conflict(복각·수선 가능성). */
export function estimate(answers: Answers): Estimate {
  let [from, to] = DOMAIN;
  let fromBy: string | null = null;
  let toBy: string | null = null;
  const findings: Finding[] = [];

  for (const clue of clues) {
    const option = clue.options.find((candidate) => candidate.value === answers[clue.id]);
    if (!option) {
      continue;
    }
    findings.push({ clue, option });
    if (!option.range) {
      continue;
    }
    if (option.range[0] > from) {
      from = option.range[0];
      fromBy = clue.id;
    }
    if (option.range[1] < to) {
      to = option.range[1];
      toBy = clue.id;
    }
  }

  return { range: [from, to], findings, boundBy: { from: fromBy, to: toBy }, conflict: from > to };
}

/** URL 쿼리 → 응답. 알려진 단서와 선택지만 받아들인다. */
export function answersFromParams(params: URLSearchParams): Answers {
  const answers: Answers = {};
  for (const clue of clues) {
    const value = params.get(clue.id);
    if (value && (value === UNKNOWN || clue.options.some((option) => option.value === value))) {
      answers[clue.id] = value;
    }
  }
  return answers;
}

export const formatYear = (year: number) => (year >= DOMAIN[1] ? '현재' : String(year));
