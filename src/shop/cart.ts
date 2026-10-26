import { modelBySlug } from '../data/shop';

export type CartItem = {
  slug: string;
  waist: number;
  inseam: number;
  qty: number;
};

/** 한 상품·사이즈 조합에 담을 수 있는 최대 수량. 서랍의 + 버튼도 이 값에서 멈춘다. */
export const MAX_QTY = 9;

export const itemKey = (item: Pick<CartItem, 'slug' | 'waist' | 'inseam'>) => `${item.slug}:${item.waist}:${item.inseam}`;

const clampQty = (qty: number) => Math.max(1, Math.min(MAX_QTY, qty));

/** 같은 상품·사이즈가 있으면 수량을 하나 올리고(최대 수량까지), 없으면 하나를 새로 담는다. */
export function addItem(items: CartItem[], item: Omit<CartItem, 'qty'>): CartItem[] {
  const key = itemKey(item);
  const existing = items.find((candidate) => itemKey(candidate) === key);
  return existing
    ? items.map((candidate) => (candidate === existing ? { ...candidate, qty: clampQty(candidate.qty + 1) } : candidate))
    : [...items, { ...item, qty: 1 }];
}

export function setItemQty(items: CartItem[], key: string, qty: number): CartItem[] {
  return items.map((item) => (itemKey(item) === key ? { ...item, qty: clampQty(qty) } : item));
}

/** 저장된 장바구니를 읽는다. 바뀐 상품 목록과 어긋난 항목은 버리고, 수량은 한도 안으로 맞춘다. */
export function parseCart(raw: string | null): CartItem[] {
  try {
    const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return parsed
      .filter((item) => modelBySlug.has(item.slug) && item.qty > 0)
      .map((item) => ({ ...item, qty: clampQty(item.qty) }));
  } catch {
    return [];
  }
}
