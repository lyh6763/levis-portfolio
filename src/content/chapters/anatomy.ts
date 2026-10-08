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
    text: '어떤 디테일은 지금도 그대로이고, 어떤 것은 시대에 따라 모양을 바꿨다. 그리고 그 변화의 흔적은 바지를 뒤집었을 때 가장 잘 보인다.',
  },
  { type: 'thread', id: 'anatomy' },
];
