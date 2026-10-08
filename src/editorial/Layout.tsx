import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate, Outlet, useLocation, useMatch } from 'react-router';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { chapterBySlug, chapters } from '../data/chapters';
import { getLenis, scrollToImmediate, useSmoothScroll } from '../hooks/useSmoothScroll';
import { SITE_NAME } from '../hooks/useDocumentTitle';
import { InsideOutProvider, useInsideOut } from '../insideOut/InsideOutContext';
import { Toast } from '../insideOut/Toast';
import { CartProvider } from '../shop/CartContext';
import { CartDrawer } from '../shop/CartDrawer';

const MASTHEAD_OFFSET = -88;

export function Layout() {
  return (
    <InsideOutProvider>
      <CartProvider>
        <Site />
      </CartProvider>
    </InsideOutProvider>
  );
}

function Site() {
  useSmoothScroll();
  const [tocOpen, setTocOpen] = useState(false);
  const closeToc = useCallback(() => setTocOpen(false), []);
  const { isInside } = useInsideOut();

  return (
    <div className={`site${isInside ? ' site--inside' : ''}`}>
      <a className="skip-link" href="#main-content">
        본문 바로가기
      </a>
      <Masthead onOpenToc={() => setTocOpen(true)} />
      <TocDialog open={tocOpen} onClose={closeToc} />
      <TrailingSlash />
      <ScrollManager />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
      <Toast />
      <CartDrawer />
    </div>
  );
}

function Masthead({ onOpenToc }: { onOpenToc: () => void }) {
  const match = useMatch('/chapters/:slug');
  const chapter = match ? chapterBySlug.get(match.params.slug ?? '') : undefined;
  const { isInside } = useInsideOut();
  const isShop = useLocation().pathname.startsWith('/shop');

  return (
    <header className="masthead">
      <div className="masthead__inner">
        <Link to="/" className="masthead__brand">
          {SITE_NAME}
        </Link>
        <span className="masthead__issue">Issue 501</span>
        <span className="masthead__current" aria-live="polite">
          {chapter ? (
            <>
              <span className="masthead__num">{chapter.number}</span> {chapter.title}
            </>
          ) : isInside ? (
            <>
              <span className="masthead__num">↺</span> Inside out
            </>
          ) : isShop ? (
            <>
              <span className="masthead__num">◆</span> Heritage Line
            </>
          ) : null}
        </span>
        <button type="button" className="masthead__toc" aria-haspopup="dialog" onClick={onOpenToc}>
          목차
        </button>
      </div>
      <ReadingProgress />
    </header>
  );
}

function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="progress" aria-hidden="true">
      <div className="progress__bar" ref={barRef} />
    </div>
  );
}

function TocDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    // 열림 상태의 단일 출처는 open. Escape·백드롭·링크 어느 경로로 닫혀도 여기서 Lenis를 재개한다.
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

  // 그 밖의 경로로 네이티브하게 닫힌 경우를 상태에 반영하는 안전장치.
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.addEventListener('close', onClose);
    return () => dialog?.removeEventListener('close', onClose);
  }, [onClose]);

  // 목차에서 링크를 누르면 라우트가 바뀌면서 닫힌다.
  useEffect(() => {
    onClose();
    // pathname 변화에만 반응한다.
  }, [pathname]);

  return (
    <dialog
      ref={dialogRef}
      className="toc"
      aria-label="목차"
      onKeyDown={(event) => {
        // 네이티브 cancel/close 이벤트에 기대지 않고 Escape를 직접 처리한다.
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      }}
      onClick={(event) => {
        // 백드롭 클릭으로 닫기
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="toc__inner">
        <div className="toc__head">
          <span className="toc__label">Contents</span>
          <button type="button" className="toc__close" onClick={onClose}>
            닫기
          </button>
        </div>
        <ol className="toc__list">
          <li>
            <Link to="/" className="toc__item">
              <span className="toc__num">00</span>
              <span className="toc__title">Cover</span>
              <span className="toc__years">Issue 501</span>
            </Link>
          </li>
          {chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link
                to={`/chapters/${chapter.slug}`}
                className="toc__item"
                aria-current={pathname === `/chapters/${chapter.slug}` ? 'page' : undefined}
              >
                <span className="toc__num">{chapter.number}</span>
                <span className="toc__title">{chapter.title}</span>
                <span className="toc__years">{chapter.years}</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="toc__foot">
          <Link to="/shop">Heritage Line</Link>
          <Link to="/sources">Sources</Link>
          <Link to="/colophon">Colophon</Link>
        </div>
      </div>
    </dialog>
  );
}

/**
 * GitHub Pages는 미리 생성한 `<path>/index.html`을 끝에 /가 붙은 주소로 서빙한다.
 * 앱 안의 링크·비교는 / 없는 주소를 쓰므로 들어오자마자 같은 형태로 맞춘다.
 */
function TrailingSlash() {
  const { pathname, search, hash } = useLocation();
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return <Navigate replace to={{ pathname: pathname.replace(/\/+$/, ''), search, hash }} />;
  }
  return null;
}

/** 라우트가 바뀌면 맨 위(또는 해시 대상)로 이동하고, 본문에 포커스를 옮기고, 스크롤 트리거를 다시 잰다. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      scrollToImmediate(target, MASTHEAD_OFFSET);
    } else {
      scrollToImmediate(0);
    }

    if (!isFirst.current) {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
    isFirst.current = false;

    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

function SiteFooter() {
  const { isInside, flip } = useInsideOut();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span className="site-footer__brand">{SITE_NAME}</span>
        <p className="site-footer__note">
          Levi Strauss &amp; Co.와 관계없는 비공식 콘셉트 작업입니다. 상표는 각 소유자에게 있습니다.
        </p>
        <nav className="site-footer__links" aria-label="부가 링크">
          <Link to="/shop">Heritage Line</Link>
          <Link to="/sources">Sources</Link>
          <Link to="/colophon">Colophon</Link>
          <button type="button" className="site-footer__turn" onClick={() => flip()}>
            {isInside ? 'Face' : 'Inside out'} <span aria-hidden="true">↺</span>
          </button>
        </nav>
      </div>
    </footer>
  );
}
