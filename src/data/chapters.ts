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

export type Chapter = {
  slug: string;
  number: string;
  kicker: string;
  years: string;
  title: string;
  dek: string;
  readMinutes: number;
  blocks: Block[];
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
    blocks: [
      {
        type: 'p',
        text: '1829년 바이에른 왕국의 부텐하임에서 태어난 뢰브 슈트라우스(Löb Strauss)는 1847년, 어머니와 두 누이와 함께 뉴욕으로 건너갔다. 먼저 이민해 있던 형들은 이미 직물과 건화물(dry goods)을 다루는 가게를 꾸리고 있었다. 그는 미국에서 이름을 리바이(Levi)로 바꾸고, 형들의 물건을 짊어진 채 행상으로 장사를 배웠다.[^downey2016]',
      },
      {
        type: 'p',
        text: '1848년 캘리포니아에서 금이 발견되자 서부로 사람이 몰렸다. 금을 캐는 사람만큼이나 그들에게 물건을 파는 사람도 필요했다. 1853년 초, 리바이는 가족 사업의 서부 지점을 열기 위해 파나마 지협을 거쳐 샌프란시스코에 닿았다.[^downey2016]',
      },
      { type: 'viz', id: 'route', caption: '리바이 스트라우스의 이동 경로 (도식, 실제 축척 아님)' },
      { type: 'h', text: '바지가 아니라 도매상' },
      {
        type: 'p',
        text: '리바이 스트라우스가 광부들에게 천막 천으로 바지를 지어 팔았다는 이야기는 널리 알려져 있지만, 후대에 다듬어진 일화에 가깝다. 그의 실제 사업은 뉴욕의 형들이 배로 보내 주는 직물과 의류, 침구, 잡화를 서부 곳곳의 작은 상점에 공급하는 도매업이었다.[^downey2016][^lsco-history]',
      },
      {
        type: 'quote',
        text: '골드러시에서 가장 확실하게 돈을 번 사람들은, 금을 캔 사람이 아니라 금을 캐는 사람에게 필요한 물건을 판 사람들이었다.',
      },
      {
        type: 'p',
        text: '사업은 매형 데이비드 스턴과 함께 커졌고, 회사는 곧 "Levi Strauss & Co."라는 이름으로 자리 잡았다. 샌프란시스코 부두 근처의 창고는 서부 개척지로 향하는 물건들의 관문이 되었다.[^downey2016]',
      },
      { type: 'thread', id: 'gold' },
      {
        type: 'aside',
        title: '기록이 사라진 회사',
        text: '1906년 샌프란시스코 대지진과 이어진 화재로 회사 본사가 불타면서 초기 장부와 기록 대부분이 함께 사라졌다. 오늘날 초창기 역사의 상당 부분이 신문, 특허, 다른 기관의 문서를 통해 재구성된 이유다.[^lsco-history]',
      },
    ],
  },
  {
    slug: 'the-patent',
    number: '02',
    kicker: 'Invention',
    years: '1870–1873',
    title: 'The Patent',
    dek: '네바다의 한 재단사가 작업 바지 주머니 모서리에 리벳을 박았다. 그리고 그에게는 특허를 낼 68달러가 없었다.',
    readMinutes: 5,
    blocks: [
      {
        type: 'p',
        text: '1870년 겨울, 네바다주 리노의 재단사 제이콥 데이비스(Jacob Davis)는 한 여성에게서 나무꾼인 남편이 입을, 쉽게 찢어지지 않는 바지를 주문받았다. 그는 말 담요를 고정할 때 쓰던 구리 리벳을 주머니 모서리처럼 힘이 몰리는 지점에 박았다.[^downey2016]',
      },
      {
        type: 'p',
        text: '리벳 바지는 금세 입소문을 탔다. 데이비스는 모방을 막고 싶었지만 특허 출원 비용을 혼자 감당하기 어려웠다. 1872년, 그는 원단을 사 오던 샌프란시스코의 도매상 리바이 스트라우스에게 편지를 보내 함께 특허를 내자고 제안했다.[^downey2016][^sullivan2006]',
      },
      { type: 'stat', value: '$68', label: '제이콥 데이비스가 혼자 감당하지 못했던 특허 출원 비용' },
      {
        type: 'p',
        text: '1873년 5월 20일, 미국 특허 제139,121호 「주머니 입구 고정 방식의 개선(Improvement in Fastening Pocket-Openings)」이 데이비스와 리바이 스트라우스 회사 앞으로 등록되었다. 회사는 이날을 블루진의 생일로 기념한다.[^patent139121][^lsco-history]',
      },
      { type: 'viz', id: 'patent', caption: '특허의 핵심: 힘이 몰리는 모서리를 금속 리벳으로 고정한다' },
      { type: 'h', text: '웨이스트 오버롤' },
      {
        type: 'p',
        text: '당시 이 옷의 이름은 "진"이 아니었다. 회사는 허리까지 오는 작업용 바지라는 뜻으로 웨이스트 오버롤(waist overalls)이라 불렀고, 광고에 진(jeans)이라는 단어를 공식적으로 쓰기 시작한 것은 1960년의 일이다.[^lsco-history]',
      },
      {
        type: 'p',
        text: '데이비스는 샌프란시스코로 옮겨 와 생산을 감독했다. 초기 오버롤은 푸른 데님과 갈색 면 덕(duck) 두 가지로 만들어졌고, 데님 원단은 뉴햄프셔의 아모스케그 제조사에서 들여왔다.[^downey2016]',
      },
      {
        type: 'aside',
        title: '아큐에이트 스티치',
        text: '뒷주머니 위를 가로지르는 갈매기 모양의 이중 곡선. 회사는 이 장식이 1873년부터 쓰였다고 밝히며, 미국에서 가장 오래된 의류 상표 가운데 하나로 소개한다.[^lsco-history]',
      },
    ],
  },
  {
    slug: 'lot-501',
    number: '03',
    kicker: 'Evolution',
    years: '1890–1971',
    title: 'Lot 501',
    dek: '특허가 만료되고 경쟁자가 몰려들었다. 그 사이 한 벌의 바지는 80년 동안 조금씩, 그러나 쉬지 않고 모습을 바꿨다.',
    readMinutes: 6,
    blocks: [
      {
        type: 'p',
        text: '1890년, 리벳 특허가 만료되었다. 같은 무렵 회사는 제품에 로트 번호를 붙이기 시작했고, 최상급 XX 데님으로 만든 웨이스트 오버롤에는 501이라는 번호가 붙었다.[^lsco-501][^downey2016]',
      },
      {
        type: 'p',
        text: '이후의 변화는 대부분 작고 실용적이었다. 1901년에는 두 번째 뒷주머니가 생겼고, 멜빵 대신 벨트를 매는 사람이 늘어나자 1922년 벨트 고리가 달렸다. 디테일의 변천을 따라가면 그 시대 사람들이 어떻게 일하고 앉고 움직였는지가 보인다.[^lsco-501]',
      },
      { type: 'viz', id: 'lot501', caption: '연도를 움직여 501 뒷면의 변화를 따라가 보세요' },
      { type: 'h', text: '숨은 리벳' },
      {
        type: 'p',
        text: '1937년, 뒷주머니 리벳이 원단 안쪽으로 숨었다. 겉으로 드러난 리벳이 학교 의자와 가구, 말안장을 긁는다는 불만이 이어졌기 때문이다. 리벳은 사라지지 않았다. 원단 아래에서 같은 일을 계속했을 뿐이다.[^lsco-501][^downey2016]',
      },
      { type: 'thread', id: 'rivet' },
      {
        type: 'p',
        text: '앞섶 아래의 가랑이 리벳은 1941년에 없어졌다. 회사 경영진 한 사람이 모닥불 앞에 쪼그려 앉았다가 달궈진 리벳 때문에 곤욕을 치른 뒤였다는 일화가 전한다. 이듬해에는 허리 뒤를 조이던 신치(cinch)도 사라지고, 벨트가 완전히 자리를 넘겨받았다.[^lsco-501][^sullivan2006]',
      },
      {
        type: 'p',
        text: '1950년대 중반에는 가죽 패치가 가죽처럼 보이도록 가공한 종이 패치로 바뀌었고, 1971년에는 레드탭의 대문자 "LEVI\'S"가 소문자 e를 쓴 "Levi\'s"로 바뀌었다. 수집가들은 앞의 것을 빅 E(Big E)라 부른다.[^lsco-501]',
      },
      {
        type: 'aside',
        title: '이 디테일들을 기억해 두세요',
        text: '레드탭의 글자, 숨은 리벳, 패치의 소재. 이 작은 차이들은 훗날 빈티지 청바지의 나이를 가늠하는 단서가 된다.',
      },
    ],
  },
  {
    slug: 'war-and-rebellion',
    number: '04',
    kicker: 'Culture',
    years: '1941–1959',
    title: 'War & Rebellion',
    dek: '실 한 가닥까지 아껴야 했던 전쟁, 그리고 그 옷을 반항의 상징으로 바꿔 놓은 전후의 십대들.',
    readMinutes: 5,
    blocks: [
      {
        type: 'p',
        text: '제2차 세계대전 동안 미국 정부는 금속과 실, 원단 같은 물자 사용을 엄격하게 제한했다. 501도 예외가 아니었다. 시계 주머니의 리벳과 허리 뒤 신치가 사라졌고, 뒷주머니의 아큐에이트 스티치는 실 대신 페인트로 그려졌다.[^lsco-501][^sullivan2006]',
      },
      { type: 'viz', id: 'warpaint', caption: '1942–1946: 꿰매는 대신 그린 아큐에이트' },
      { type: 'thread', id: 'paint' },
      {
        type: 'p',
        text: '전쟁은 청바지를 바다 건너로도 실어 날랐다. 비번인 미군 병사들이 입던 청바지는 유럽과 아시아의 사람들에게 미국 그 자체를 떠올리게 하는 옷으로 기억되었다.[^sullivan2006]',
      },
      { type: 'h', text: '스크린 위의 반항아' },
      {
        type: 'p',
        text: '1950년대, 청바지는 처음으로 작업복이 아니라 태도가 되었다. 영화 속 오토바이 갱과 방황하는 십대들이 청바지와 가죽 재킷, 흰 티셔츠를 입었고, 극장을 나선 관객들은 그 차림을 그대로 따라 했다.[^sullivan2006]',
      },
      { type: 'quote', text: '어른들이 금지할수록, 청바지는 더 분명한 메시지가 되었다.' },
      {
        type: 'p',
        text: '일부 학교는 비행 청소년의 옷이라는 이유로 청바지 착용을 금지했다. 금지는 역설적으로 청바지를 한 세대의 표식으로 만들었다.[^sullivan2006]',
      },
      {
        type: 'aside',
        title: '정확히 짚고 가기',
        text: '1955년 영화 〈이유 없는 반항〉에서 제임스 딘이 입은 청바지는 리바이스가 아닌 다른 브랜드의 제품으로 알려져 있다. 이 시기의 청바지 열풍은 한 브랜드가 아니라 옷 자체의 이야기였다.[^sullivan2006]',
      },
    ],
  },
  {
    slug: 'indigo',
    number: '05',
    kicker: 'Material',
    years: 'Dye',
    title: 'Indigo',
    dek: '청바지가 닳을수록 아름다워지는 이유는, 인디고가 실의 속까지 스며들지 않기 때문이다.',
    readMinutes: 5,
    blocks: [
      {
        type: 'p',
        text: '인디고는 물에 녹지 않는다. 염색을 하려면 먼저 산소를 빼앗아 녹는 형태로 바꾼 뒤, 실을 담갔다 꺼내 공기에 노출시켜야 한다. 염료 통에서 막 나온 실은 노란빛이 도는 초록색이고, 산소와 만나는 몇 분 사이 푸른색으로 변한다.[^balfourpaul2011]',
      },
      { type: 'h', text: '로프 염색' },
      {
        type: 'p',
        text: '데님용 실은 수십 가닥을 밧줄처럼 묶어 염료 통에 반복해서 담그는 로프 염색(rope dyeing)으로 물들인다. 담그고 산화시키는 과정을 여러 번 거듭할수록 색은 깊어진다.[^balfourpaul2011]',
      },
      {
        type: 'p',
        text: '핵심은 인디고가 실의 바깥층에만 달라붙는다는 점이다. 실의 단면을 잘라 보면 푸른 고리 안에 흰 심이 남아 있다. 이것을 링 염색(ring dyeing)이라 부른다.',
      },
      { type: 'viz', id: 'indigo', caption: '스크롤하면 염색 횟수가 늘어납니다. 슬라이더로 실을 닳게 해 보세요' },
      { type: 'quote', text: '페이드는 색이 빠지는 것이 아니라, 숨어 있던 흰색이 드러나는 것이다.' },
      {
        type: 'p',
        text: '청바지를 입고 움직이면 무릎 뒤, 허벅지 앞, 주머니 가장자리처럼 마찰이 잦은 곳부터 푸른 겉층이 깎여 나간다. 데님 애호가들이 수염(whiskers)과 벌집(honeycombs)이라 부르는 무늬는, 한 사람의 생활이 원단 위에 남긴 기록이다.',
      },
    ],
  },
  {
    slug: 'the-loom',
    number: '06',
    kicker: 'Craft',
    years: 'Weave',
    title: 'The Loom',
    dek: '좁은 직기 위를 북이 오가며 원단의 가장자리를 스스로 닫았다. 그 끝선이 셀비지다.',
    readMinutes: 5,
    blocks: [
      {
        type: 'p',
        text: '데님은 3x1 능직(twill)으로 짠다. 푸르게 물들인 날실(warp)이 흰 씨실(weft) 세 가닥 위를 지나 한 가닥 아래로 내려가기를 반복하며, 원단 표면에 비스듬한 결을 만든다. 날실이 대부분 겉에 떠 있기 때문에 앞면은 파랗고, 씨실이 모인 뒷면은 하얗다.',
      },
      { type: 'viz', id: 'loom', caption: '앞면과 뒷면을 전환해 보세요. 뒷면의 결은 반대 방향으로 흐릅니다' },
      { type: 'h', text: '스스로 닫히는 가장자리' },
      {
        type: 'p',
        text: '20세기 중반까지 데님은 북(shuttle)이 좌우로 오가는 셔틀 직기로 짰다. 씨실 한 가닥이 끊기지 않고 원단 끝에서 되돌아오기 때문에 가장자리가 풀리지 않게 마감되는데, 이 스스로 닫힌 가장자리(self-edge)가 셀비지(selvedge)다.',
      },
      {
        type: 'p',
        text: '오랫동안 리바이스에 데님을 공급한 콘 밀스(Cone Mills)는 셀비지 가장자리에 붉은 실을 넣었다. 바짓단을 걷었을 때 바깥 솔기를 따라 보이는 붉은 선이 바로 그것이다.[^sullivan2006]',
      },
      { type: 'thread', id: 'selvedge' },
      {
        type: 'p',
        text: '1980년대에 들어 빠르고 폭이 넓은 직기가 셔틀 직기를 대신했다. 넓은 원단은 가장자리를 잘라 내야 했고, 셀비지는 대량 생산 청바지에서 자취를 감췄다.[^sullivan2006]',
      },
      {
        type: 'aside',
        title: '안쪽을 보는 사람들',
        text: '빈티지 수집가들은 청바지를 손에 넣으면 먼저 뒤집어 본다. 셀비지 선, 숨은 리벳, 안쪽의 라벨처럼 나이를 알려 주는 단서는 대부분 안쪽에 있기 때문이다.',
      },
    ],
  },
  {
    slug: 'the-spread',
    number: '07',
    kicker: 'Diffusion',
    years: '1930s–1980s',
    title: 'The Spread',
    dek: '서부의 작업복은 휴가객의 짐에, 병사의 배낭에, 밀수꾼의 가방에 실려 세계로 퍼졌다.',
    readMinutes: 5,
    blocks: [
      {
        type: 'p',
        text: '1930년대, 서부의 관광 목장(dude ranch)을 찾은 동부의 휴가객들은 카우보이의 청바지를 기념품처럼 사 들고 돌아갔다. 청바지가 처음으로 서부 바깥에서 패션이 된 순간이었다.[^downey2016][^sullivan2006]',
      },
      { type: 'viz', id: 'spread', caption: '지역별로 청바지가 일상복이 되어 간 흐름 (주요 계기 중심의 요약)' },
      {
        type: 'p',
        text: '1959년 모스크바에서 열린 미국 국가 박람회에는 미국인의 일상을 보여 주는 물건 가운데 하나로 청바지가 전시되었다.[^lsco-history][^sullivan2006]',
      },
      {
        type: 'p',
        text: '1960~70년대 청바지는 반전 시위와 록 공연장, 대학 캠퍼스의 옷이 되었다. 같은 시기 철의 장막 너머에서는 진짜 미국 청바지가 암시장에서 높은 값에 거래되었다.[^sullivan2006]',
      },
      { type: 'quote', text: '청바지는 국경을 넘을 때마다 다른 의미를 입었다.' },
      {
        type: 'p',
        text: '1980년대에 이르면 청바지는 더 이상 특정 세대나 계층의 옷이 아니었다. 세계 어디서나 입는, 가장 평범하고 가장 보편적인 옷이 되었다.',
      },
    ],
  },
  {
    slug: 'anatomy',
    number: '08',
    kicker: 'Object',
    years: '1873–Today',
    title: 'Anatomy of a 501',
    dek: '150년 동안 덧붙고, 숨고, 사라진 디테일들. 한 벌을 분해하면 그대로 연표가 된다.',
    readMinutes: 3,
    blocks: [
      {
        type: 'p',
        text: '지금까지 따라온 501의 이야기를 한 벌 위에 겹쳐 보자. 각 부품에는 그것이 처음 등장한 해가 새겨져 있다.',
      },
      { type: 'viz', id: 'anatomy', caption: '스크롤하면 501이 부품별로 분해됩니다' },
      {
        type: 'p',
        text: '어떤 디테일은 지금도 그대로이고, 어떤 것은 시대에 따라 모양을 바꿨다. 그리고 그 변화의 흔적은 바지를 뒤집었을 때 가장 잘 보인다.',
      },
      { type: 'thread', id: 'anatomy' },
    ],
  },
  {
    slug: 'worn',
    number: '09',
    kicker: 'Epilogue',
    years: 'Today',
    title: 'Worn',
    dek: '가장 오래 입은 청바지가 가장 지속 가능한 청바지다.',
    readMinutes: 3,
    blocks: [
      {
        type: 'p',
        text: '2015년 리바이 스트라우스 앤드 컴퍼니가 발표한 전 과정 평가(LCA)에 따르면, 501 한 벌이 생애 동안 쓰는 물은 약 3,781리터에 이른다.[^lsco-lca2015]',
      },
      { type: 'viz', id: 'water', caption: '501 한 벌의 생애 물 사용량 (2015 LCA 기준)' },
      {
        type: 'p',
        text: '그중 가장 큰 몫은 목화 재배이고, 그다음은 우리가 집에서 하는 세탁이다. 덜 빨고, 오래 입고, 고쳐 입는 것만으로도 한 벌이 남기는 발자국은 줄어든다.[^lsco-lca2015]',
      },
      { type: 'quote', text: '청바지는 새것일 때 완성되지 않는다. 입는 사람의 시간이 마지막 공정이다.' },
      {
        type: 'p',
        text: '1873년의 리벳은 옷을 더 오래 입기 위한 발명이었다. 150년이 지난 지금, 청바지가 다시 묻는 질문도 같다. 얼마나 오래 입을 수 있는가.',
      },
      {
        type: 'p',
        text: '그리고 혹시 옷장 깊은 곳에 오래된 청바지 한 벌이 있다면, 한번 뒤집어 보길 권한다.',
      },
      { type: 'turn', text: '이 사이트도 뒤집어 보기' },
    ],
  },
];

export const chapterBySlug = new Map(chapters.map((chapter) => [chapter.slug, chapter]));

export const totalReadMinutes = chapters.reduce((sum, chapter) => sum + chapter.readMinutes, 0);
