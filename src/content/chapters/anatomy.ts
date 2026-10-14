import type { Block } from '../../data/chapterMeta';

/** 08 Anatomy of a 501 본문. 챕터 페이지에서 지연 로딩한다. */
export const blocks: Block[] = [
  {
    type: 'p',
    text: '지금까지 따라온 501의 이야기를 한 벌 위에 겹쳐 보자. 각 부품에는 그것이 처음 등장한 해가 새겨져 있다.',
  },
  { type: 'viz', id: 'anatomy', caption: '스크롤하면 501이 부품별로 분해됩니다' },
  {
    type: 'p',
    text: '구리 리벳과 아큐에이트는 1873년부터 있었고, 레드탭은 1936년에 더해졌다.',
  },
  { type: 'thread', id: 'anatomy' },
];
