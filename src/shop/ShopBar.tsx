import { Link } from 'react-router';

import { useCart } from './CartContext';

/** 상점 페이지 상단 띠: 경로, 콘셉트 고지, 장바구니 버튼. */
export function ShopBar({ current }: { current?: string }) {
  const { count, setOpen } = useCart();

  return (
    <div className="shop-bar">
      <nav className="shop-bar__crumbs" aria-label="상점 경로">
        <Link to="/shop" aria-current={current ? undefined : 'page'}>
          Heritage Line
        </Link>
        {current && (
          <>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{current}</span>
          </>
        )}
      </nav>
      <p className="shop-bar__notice">콘셉트 데모 · 실제로 판매하지 않습니다</p>
      <button type="button" className="shop-bar__cart" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        장바구니 <span className="shop-bar__count">{count}</span>
      </button>
    </div>
  );
}
