import { imagePath } from './assets';

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type ImageContent = {
  title: string;
  description?: string;
  image: string;
  alt: string;
};

export type ProcessStep = ImageContent & {
  number: string;
  subtitle: string;
  paragraphs: string[];
  facts: string[];
};

export type ModelItem = ImageContent & {
  year: string;
  specs: string[];
};

export type CultureItem = ImageContent & {
  tag: string;
};

export const homeTimeline: TimelineItem[] = [
  {
    year: '1873',
    title: 'The Beginning',
    description: 'Jacob Davis와 Levi Strauss가 구리 리벳으로 보강한 최초의 청바지 특허를 취득했습니다.',
  },
  {
    year: '1936',
    title: 'Red Tab',
    description: '뒷주머니에 작은 빨간 탭을 도입하며 멀리서도 알아볼 수 있는 브랜드 시그니처가 탄생했습니다.',
  },
  {
    year: '1967',
    title: 'Cultural Icon',
    description: '반문화 운동과 청년 문화 속에서 데님은 자유와 개성의 상징으로 자리 잡았습니다.',
  },
  {
    year: '2023',
    title: '150th Anniversary',
    description: '150년의 유산을 기념하며 변치 않는 핏과 스타일의 힘을 다시 증명했습니다.',
  },
];

export const heritageTimeline: TimelineItem[] = [
  {
    year: '1853',
    title: 'The Founding',
    description: '독일 이민자 Levi Strauss가 샌프란시스코에서 직물과 건화물 사업을 시작했습니다.',
  },
  {
    year: '1873',
    title: 'The Patent',
    description: 'Jacob Davis와 함께 리벳으로 보강한 청바지 특허를 취득하며 오늘날 청바지의 원형을 만들었습니다.',
  },
  {
    year: '1890',
    title: '501 Lot Number',
    description: "제품에 '501' 로트 번호가 붙으며 이후 가장 상징적인 청바지 모델명이 되었습니다.",
  },
  {
    year: '1936',
    title: 'Red Tab',
    description: '뒷주머니에 빨간 탭을 붙여 리바이스를 한눈에 알아볼 수 있는 시그니처를 만들었습니다.',
  },
  {
    year: '1950s',
    title: 'Youth Culture',
    description: 'Marlon Brando와 James Dean이 스크린에서 착용하며 청바지는 반항과 젊음의 상징이 되었습니다.',
  },
  {
    year: '1967',
    title: 'Summer of Love',
    description: '히피 문화와 함께 자유와 평화의 상징으로 확장되며 데님은 문화의 언어가 되었습니다.',
  },
  {
    year: '1980s',
    title: 'Global Icon',
    description: '전 세계로 퍼진 아메리칸 스타일 속에서 청바지는 글로벌 패션 아이콘이 되었습니다.',
  },
  {
    year: '2023',
    title: '150th Anniversary',
    description: '150주년을 맞아 오래 입을수록 선명해지는 브랜드 헤리티지를 다시 보여주었습니다.',
  },
];

export const dnaCards = [
  {
    title: 'Red Tab',
    description: '1936년 도입된 작은 빨간 라벨. 진품의 표식이자 브랜드 정체성의 핵심입니다.',
    icon: 'tab',
  },
  {
    title: 'Arcuate Stitch',
    description: '1873년부터 이어진 뒷주머니 아치형 스티치. 미국 최초 의류 상표 중 하나입니다.',
    icon: 'stitch',
  },
  {
    title: 'Copper Rivet',
    description: '내구성을 위해 탄생한 구리 리벳. 거친 작업 환경에서 증명된 장인 정신입니다.',
    icon: 'rivet',
  },
] as const;

export const homeCraftSteps: ImageContent[] = [
  {
    title: 'Raw Fabric',
    description: '최상급 코튼으로 직조한 셀비지 데님 원단.',
    image: imagePath('crafting(1).png'),
    alt: '셀비지 데님 원단 이미지',
  },
  {
    title: 'Indigo Dye',
    description: '전통 인디고 염색으로 시간이 만드는 페이딩의 시작.',
    image: imagePath('dye(1).png'),
    alt: '인디고 염색 이미지',
  },
  {
    title: 'Stitch & Rivet',
    description: '정교한 스티치와 리벳 보강으로 완성되는 내구성.',
    image: imagePath('stitch_rivet(1).png'),
    alt: '스티치와 리벳 디테일 이미지',
  },
];

export const fits: ImageContent[] = [
  {
    title: '501 Original',
    description: '1873년부터 이어진 오리지널 핏. 모든 청바지의 원형입니다.',
    image: imagePath('501.png'),
    alt: '501 오리지널 핏 이미지',
  },
  {
    title: '505 Regular',
    description: '1967년 등장한 스트레이트 레그의 정석입니다.',
    image: imagePath('505.png'),
    alt: '505 레귤러 핏 이미지',
  },
  {
    title: '517 Bootcut',
    description: '음악 문화와 함께한 부츠컷 실루엣의 아이콘입니다.',
    image: imagePath('517.png'),
    alt: '517 부츠컷 핏 이미지',
  },
];

export const homeGallery = [
  { image: imagePath('hero(2).png'), alt: '아카이브 갤러리 이미지 1' },
  { image: imagePath('hero(3).png'), alt: '아카이브 갤러리 이미지 2' },
  { image: imagePath('hero(4).png'), alt: '아카이브 갤러리 이미지 3' },
  { image: imagePath('hero(5).png'), alt: '아카이브 갤러리 이미지 4' },
];

export const symbols: ImageContent[] = [
  {
    title: 'Red Tab',
    description: '1936년 도입된 뒷주머니의 빨간 라벨은 정품 리바이스의 증거이자 패션 역사에서 가장 인지도가 높은 디테일 중 하나입니다.',
    image: imagePath('red_tab(1).png'),
    alt: '레드 탭 디테일 이미지',
  },
  {
    title: 'Arcuate Stitch',
    description: '뒷주머니의 아치형 스티치는 1873년부터 이어진 리바이스의 대표 패턴입니다.',
    image: imagePath('arcuate_stitch.png'),
    alt: '아큐에이트 스티치 디테일 이미지',
  },
  {
    title: 'Copper Rivet',
    description: '스트레스 지점에 박힌 구리 리벳은 광부들의 거친 노동에서 검증된 내구성의 상징입니다.',
    image: imagePath('copper_rivet.png'),
    alt: '코퍼 리벳 디테일 이미지',
  },
  {
    title: 'Gold Rush Origins',
    description: '캘리포니아 골드러시 시대의 노동자들을 위해 데님은 실용적인 작업복에서 출발했습니다.',
    image: imagePath('the_beginning(2).png'),
    alt: '골드러시 시대 작업복 기원 이미지',
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Raw Fabric',
    subtitle: '셀비지 데님',
    image: imagePath('crafting(2).png'),
    alt: '셀비지 데님 원단 이미지',
    paragraphs: [
      '최상급 코튼으로 직조한 셀비지 데님은 오래 입을수록 밀도 있는 질감과 자연스러운 결을 드러냅니다.',
      '가장자리의 self edge는 올이 풀리지 않도록 돕고, 롤업했을 때 특유의 붉은 라인을 보여줍니다.',
    ],
    facts: ['무게: 12~14oz 헤비웨이트', '직조: 3x1 트윌 데님', '코튼: 엄선된 미국산 코튼'],
  },
  {
    number: '02',
    title: 'Indigo Dye',
    subtitle: '전통 인디고 염색',
    image: imagePath('dye(2).png'),
    alt: '인디고 염색 공정 이미지',
    paragraphs: [
      '인디고 염료는 섬유 표면에 남아 착용할수록 개인의 생활 방식에 맞춘 페이딩을 만듭니다.',
      '반복적인 딥 다이 공정은 깊고 밀도 있는 블루 톤을 완성합니다.',
    ],
    facts: ['염료: 천연/합성 인디고', '공정: 6~12회 반복 염색', '특징: Rope Dyeing'],
  },
  {
    number: '03',
    title: 'Cut & Sew',
    subtitle: '재단과 봉제',
    image: imagePath('crafting(3).png'),
    alt: '재단과 봉제 공정 이미지',
    paragraphs: [
      '정확한 패턴 재단과 견고한 봉제로 하나의 청바지가 구조를 갖추기 시작합니다.',
      '체인 스티치와 오버록 등 다양한 봉제 기법을 적재적소에 사용해 독특한 페이딩을 만듭니다.',
    ],
    facts: ['스티치: 체인/오버록', '부품: 약 60개', '공정: 40개 이상 단계'],
  },
  {
    number: '04',
    title: 'Final Stitching',
    subtitle: '봉제 마감 디테일',
    image: imagePath('stitch_rivet(2).png'),
    alt: '봉제 마감 디테일 이미지',
    paragraphs: [
      '마지막 공정에서는 굵은 실과 견고한 봉제로 데님의 구조를 완성합니다.',
      '주요 모서리와 접합부를 정밀하게 마감해 오래 입을수록 입체적인 페이딩과 주름이 남습니다.',
    ],
    facts: ['스티치: 체인/탑 스티치', '포인트: 보강 및 접합 마감', '효과: 내구성 강화와 페이딩 형성'],
  },
];

export const detailGallery = [
  { image: imagePath('stitch_rivet(1).png'), alt: '스티치 디테일 이미지', label: 'Stitch Detail' },
  { image: imagePath('copper_rivet.png'), alt: '리벳 클로즈업 이미지', label: 'Rivet Close-up' },
  { image: imagePath('dye(3).png'), alt: '데님 텍스처 이미지', label: 'Denim Texture' },
  { image: imagePath('red_tab.png'), alt: '레드 탭 디테일 이미지', label: 'Red Tab Detail' },
];

export const models: ModelItem[] = [
  {
    year: 'Since 1873',
    title: '501 Original Fit',
    description: '모든 청바지의 원형. 스트레이트 레그와 버튼 플라이로 150년간 기본 실루엣을 지켜온 아이콘입니다.',
    image: imagePath('501.png'),
    alt: '501 오리지널 핏 이미지',
    specs: ['Rise: Mid Rise', 'Leg: Straight', 'Fly: Button'],
  },
  {
    year: 'Since 1967',
    title: '505 Regular Fit',
    description: '501의 DNA를 이어받은 지퍼 플라이 모델로, 편안함과 클래식한 실루엣을 함께 제공합니다.',
    image: imagePath('505.png'),
    alt: '505 레귤러 핏 이미지',
    specs: ['Rise: Mid Rise', 'Leg: Straight', 'Fly: Zip'],
  },
  {
    year: 'Since 1969',
    title: '517 Bootcut',
    description: '음악 문화와 함께한 부츠컷의 정석. 무릎 아래로 자연스럽게 퍼지는 라인이 특징입니다.',
    image: imagePath('517.png'),
    alt: '517 부츠컷 핏 이미지',
    specs: ['Rise: Mid Rise', 'Leg: Bootcut', 'Fly: Zip'],
  },
];

export const textureGallery = [
  { image: imagePath('hero(1).png'), alt: '해진 데님 레이어 텍스처 이미지', label: 'Frayed Layers', large: true },
  { image: imagePath('abstract_pattern.png'), alt: '패치워크 데님 텍스처 이미지', label: 'Patchwork' },
  { image: imagePath('hero(9).png'), alt: '데님 심 스티치 클로즈업 이미지', label: 'Seam Detail' },
  { image: imagePath('dye(1).png'), alt: '인디고 염색 공정 이미지', label: 'Indigo Vat' },
  { image: imagePath('crafting(1).png'), alt: '직조 중인 데님 워프 실 이미지', label: 'Warp Threads' },
];

export const cultureItems: CultureItem[] = [
  {
    tag: 'Workwear',
    title: 'The Origin',
    description: '광부, 카우보이, 철도 노동자의 작업복에서 출발한 청바지는 튼튼함과 실용성의 언어였습니다.',
    image: imagePath('the_beginning(2).png'),
    alt: '워크웨어 기원 이미지',
  },
  {
    tag: 'Campaign',
    title: 'Rugged Wear Ad',
    description: '빈티지 캠페인은 리바이스의 견고함과 야외성을 시각 언어로 만들며 브랜드 신화를 확장했습니다.',
    image: imagePath('advertisement(1).png'),
    alt: '빈티지 리바이스 캠페인 광고 이미지',
  },
  {
    tag: 'Rock & Roll',
    title: 'Music Icons',
    description: 'Rolling Stones, Ramones, Bruce Springsteen. 록과 데님은 무대 위에서 함께 성장했습니다.',
    image: imagePath("rock'n'roll(2).png"),
    alt: '록 앤 롤 문화 이미지',
  },
  {
    tag: 'Street',
    title: 'Urban Culture',
    description: '힙합, 스케이트보드, 스트리트웨어 속에서 청바지는 자신을 표현하는 방식이 되었습니다.',
    image: imagePath('streetculture(2).png'),
    alt: '스트리트 문화 이미지',
  },
];
