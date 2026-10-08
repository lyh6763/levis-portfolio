import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { modelBySlug } from '../data/shop';

const STORAGE_KEY = 'warp-weft:cart';

export type CartItem = {
  slug: string;
  waist: number;
  inseam: number;
  qty: number;
};

type CartValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, 'qty'>) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const itemKey = (item: Pick<CartItem, 'slug' | 'waist' | 'inseam'>) => `${item.slug}:${item.waist}:${item.inseam}`;

const CartContext = createContext<CartValue | null>(null);

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return value;
}

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
    // 저장된 값이 바뀐 상품 목록과 어긋나면 버린다.
    return parsed.filter((item) => modelBySlug.has(item.slug) && item.qty > 0);
  } catch {
    return [];
  }
}

/** 콘셉트 데모용 장바구니. 이 브라우저에만 저장되고 결제 단계는 없다. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // 저장소를 쓸 수 없으면 이번 방문 동안만 유지한다.
    }
  }, [items]);

  const add = useCallback((item: Omit<CartItem, 'qty'>) => {
    setItems((previous) => {
      const key = itemKey(item);
      const existing = previous.find((candidate) => itemKey(candidate) === key);
      return existing
        ? previous.map((candidate) => (candidate === existing ? { ...candidate, qty: candidate.qty + 1 } : candidate))
        : [...previous, { ...item, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((previous) =>
      previous.map((item) => (itemKey(item) === key ? { ...item, qty: Math.max(1, Math.min(9, qty)) } : item)),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setItems((previous) => previous.filter((item) => itemKey(item) !== key));
  }, []);

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = items.reduce((sum, item) => sum + (modelBySlug.get(item.slug)?.price ?? 0) * item.qty, 0);
    return { items, count, subtotal, add, setQty, remove, open, setOpen };
  }, [items, add, setQty, remove, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
