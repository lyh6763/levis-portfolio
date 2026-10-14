import type { Block } from '../../data/chapterMeta';

/** 09 Worn 본문. 챕터 페이지에서 지연 로딩한다. */
export const blocks: Block[] = [
  {
    type: 'p',
    text: '2015년 리바이 스트라우스 앤드 컴퍼니가 발표한 전 과정 평가(LCA)에 따르면, 501 한 벌이 생애 동안 쓰는 물은 약 3,781리터에 이른다.[^lsco-lca2015]',
  },
  { type: 'viz', id: 'water', caption: '501 한 벌의 생애 물 사용량 (2015 LCA 기준)' },
  {
    type: 'p',
    text: '그중 가장 큰 몫은 목화 재배이고, 그다음은 집에서 하는 세탁이다.[^lsco-lca2015]',
  },
  {
    type: 'p',
    text: '1873년의 리벳도 주머니 솔기가 터지지 않게, 곧 옷을 더 오래 입게 하려는 발명이었다.',
  },
  {
    type: 'p',
    text: '옷장에 오래된 청바지가 있다면 한번 뒤집어 보길 권한다.',
  },
  { type: 'turn', text: '이 사이트도 뒤집어 보기' },
];
