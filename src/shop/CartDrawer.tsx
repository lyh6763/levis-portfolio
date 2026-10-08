import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';

import { formatPrice, modelBySlug } from '../data/shop';
import { getLenis } from '../hooks/useSmoothScroll';
import { JeanBack } from '../viz/JeanBack';
import { itemKey, useCart } from './CartContext';

/** 오른쪽에서 열리는 장바구니. 목차 다이얼로그와 같은 방식으로 열림 상태를 단일 출처로 둔다. */
export function CartDrawer() {
  const { items, subtotal, setQty, remove, open, setOpen } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
      getLenis()?.stop();
    } else {
      if (dialog.open) {
        dialog.close();
      }
      getLenis()?.start();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const onClose = () => setOpen(false);
    dialog?.addEventListener('close', onClose);
    return () => dialog?.removeEventListener('close', onClose);
  }, [setOpen]);

  // 장바구니 안의 링크로 이동하면 닫는다.
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="cart"
      aria-labelledby="cart-title"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          setOpen(false);
        }
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          setOpen(false);
        }
      }}
    >
      <div className="cart__inner">
        <div className="cart__head">
          <h2 id="cart-title" className="cart__title">
            장바구니
          </h2>
          <button type="button" className="cart__close" onClick={() => setOpen(false)}>
            닫기
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart__empty">
            <p>아직 담은 옷이 없어요.</p>
            <Link to="/shop" className="cart__browse">
              Heritage Line 둘러보기
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart__items">
              {items.map((item) => {
                const model = modelBySlug.get(item.slug);
                if (!model) {
                  return null;
                }
                const key = itemKey(item);
                return (
                  <li key={key} className="cart__item">
                    <JeanBack year={model.year} className="cart__thumb" />
                    <div className="cart__info">
                      <Link to={`/shop/${model.slug}`} className="cart__name">
                        {model.name}
                      </Link>
                      <p className="cart__size">
                        W{item.waist} · L{item.inseam}
                      </p>
                      <div className="cart__qty" role="group" aria-label={`${model.name} 수량`}>
                        <button
                          type="button"
                          onClick={() => setQty(key, item.qty - 1)}
                          disabled={item.qty <= 1}
                          aria-label="수량 줄이기"
                        >
                          −
                        </button>
                        <span aria-live="polite">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(key, item.qty + 1)}
                          disabled={item.qty >= 9}
                          aria-label="수량 늘리기"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart__side">
                      <p className="cart__price">{formatPrice(model.price * item.qty)}</p>
                      <button type="button" className="cart__remove" onClick={() => remove(key)}>
                        빼기<span className="visually-hidden">: {model.name} W{item.waist} L{item.inseam}</span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="cart__foot">
              <p className="cart__subtotal">
                <span>합계</span>
                <span>{formatPrice(subtotal)}</span>
              </p>
              <button type="button" className="cart__checkout" disabled aria-describedby="cart-note">
                결제하기
              </button>
              <p className="cart__note" id="cart-note">
                콘셉트 데모라 결제 단계는 만들지 않았습니다. 장바구니는 이 브라우저에만 저장됩니다.
              </p>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
