import { describe, expect, it } from 'vitest';

import { addItem, CartItem, itemKey, MAX_QTY, parseCart, setItemQty } from './cart';

const jean = { slug: '1890-xx', waist: 31, inseam: 32 };

describe('장바구니 수량 한도', () => {
  it('같은 상품·사이즈를 계속 담아도 최대 수량에서 멈춘다', () => {
    let items: CartItem[] = [];
    for (let i = 0; i < MAX_QTY + 3; i += 1) {
      items = addItem(items, jean);
    }
    expect(items).toHaveLength(1);
    expect(items[0].qty).toBe(MAX_QTY);
  });

  it('사이즈가 다르면 따로 담는다', () => {
    const items = addItem(addItem([], jean), { ...jean, inseam: 34 });
    expect(items.map((item) => item.qty)).toEqual([1, 1]);
  });

  it('서랍의 수량 변경도 1과 최대 수량 사이로 맞춘다', () => {
    const items = addItem([], jean);
    const key = itemKey(jean);
    expect(setItemQty(items, key, MAX_QTY + 5)[0].qty).toBe(MAX_QTY);
    expect(setItemQty(items, key, 0)[0].qty).toBe(1);
  });

  it('저장된 수량이 한도를 넘으면 한도로 읽는다', () => {
    const raw = JSON.stringify([{ ...jean, qty: 10 }]);
    expect(parseCart(raw)[0].qty).toBe(MAX_QTY);
  });

  it('없는 상품이나 깨진 값은 버린다', () => {
    expect(parseCart(JSON.stringify([{ ...jean, slug: 'no-such-model', qty: 1 }]))).toEqual([]);
    expect(parseCart('{not json')).toEqual([]);
    expect(parseCart(null)).toEqual([]);
  });
});
