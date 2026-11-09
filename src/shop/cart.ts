import { INSEAMS, modelBySlug, WAISTS } from '../data/shop';

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

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

/**
 * 저장된 장바구니를 읽는다. 저장값은 예전 형식이거나 손상됐을 수 있으므로 형변환을 믿지 않고
 * 항목마다 상품·허용 사이즈·정수 수량을 확인한 뒤 알려진 필드만 새 객체로 담는다.
 * 숫자가 아닌 사이즈가 서랍에 그대로 그려지면 사이트 전체가 멈추므로 여기서 걸러야 한다.
 * 잘못된 항목 하나 때문에 정상 항목까지 잃지 않도록 항목별로 버리고, 수량은 한도 안으로 맞춘다.
 */
export function parseCart(raw: string | null): CartItem[] {
  let parsed: unknown;
  try {
    parsed = raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) {
    return [];
  }

  const items: CartItem[] = [];
  const seen = new Set<string>();
  for (const entry of parsed) {
    if (!isRecord(entry)) {
      continue;
    }
    const { slug, waist, inseam, qty } = entry;
    const valid =
      typeof slug === 'string' &&
      modelBySlug.has(slug) &&
      typeof waist === 'number' &&
      WAISTS.includes(waist) &&
      typeof inseam === 'number' &&
      INSEAMS.includes(inseam) &&
      typeof qty === 'number' &&
      Number.isInteger(qty) &&
      qty > 0;
    if (!valid) {
      continue;
    }
    const item = { slug, waist, inseam, qty: clampQty(qty) };
    // 같은 상품·사이즈가 두 줄이면 서랍의 key가 겹치므로 처음 것만 남긴다.
    const key = itemKey(item);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    items.push(item);
  }
  return items;
}
