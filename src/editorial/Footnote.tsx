import { createContext, Fragment, ReactNode, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

import type { Block } from '../data/chapters';
import { sourceById } from '../data/sources';

const NOTE_PATTERN = /\[\^([a-z0-9-]+)\]/g;

/** 챕터 안에서 각주가 처음 등장하는 순서. 같은 출처는 같은 번호를 쓴다. */
export const NotesContext = createContext<string[]>([]);

export function collectNotes(blocks: Block[]): string[] {
  const order: string[] = [];
  for (const block of blocks) {
    if (block.type !== 'p' && block.type !== 'aside') {
      continue;
    }
    for (const match of block.text.matchAll(NOTE_PATTERN)) {
      if (!order.includes(match[1])) {
        order.push(match[1]);
      }
    }
  }
  return order;
}

/** `[^id]` 마커를 각주 버튼으로 바꿔 렌더링한다. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(NOTE_PATTERN);
  // split 결과는 [텍스트, id, 텍스트, id, ...] 순서로 번갈아 온다.
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? <FootnoteRef key={index} id={part} /> : <Fragment key={index}>{part}</Fragment>,
      )}
    </>
  );
}

export function SourceCitation({ id }: { id: string }): ReactNode {
  const source = sourceById.get(id);
  if (!source) {
    return id;
  }
  return (
    <>
      {source.author}, <cite>{source.title}</cite>
      {source.publisher ? `, ${source.publisher}` : ''}, {source.year}.
    </>
  );
}

// editorial.css에서 팝오버가 하단 시트로 바뀌는 기준과 같다.
const SHEET_QUERY = '(max-width: 768px)';
const EDGE = 12;

function FootnoteRef({ id }: { id: string }) {
  const order = useContext(NotesContext);
  const number = order.indexOf(id) + 1;
  const [open, setOpen] = useState(false);
  const popId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLSpanElement>(null);

  /*
    팝오버를 최상위 레이어(popover)로 띄운다. 본문 블록은 content-visibility로 그리기를 미루는데,
    그 안에서 그리면 블록 밖으로 나간 부분이 잘린다. DOM 위치는 그대로라 키보드 순서는 버튼 바로 다음이다.
    데스크톱에서는 버튼 아래에 붙여 스크롤을 따라가고, 버튼이 화면 밖으로 나가면 닫는다.
  */
  useLayoutEffect(() => {
    const pop = popRef.current;
    const button = buttonRef.current;
    if (!open || !pop || !button || typeof pop.showPopover !== 'function') {
      return;
    }
    pop.showPopover();
    const sheet = window.matchMedia(SHEET_QUERY);
    let frame = 0;
    const place = () => {
      frame = 0;
      const rect = button.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setOpen(false);
        return;
      }
      if (sheet.matches) {
        pop.style.removeProperty('left');
        pop.style.removeProperty('top');
        return;
      }
      const width = pop.offsetWidth;
      const center = rect.left + rect.width / 2 - width / 2;
      pop.style.left = `${Math.min(Math.max(center, EDGE), window.innerWidth - width - EDGE)}px`;
      pop.style.top = `${rect.bottom + 6}px`;
    };
    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(place);
      }
    };
    place();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (pop.isConnected && pop.matches(':popover-open')) {
        pop.hidePopover();
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <span className="fn" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        className="fn__ref"
        aria-expanded={open}
        aria-controls={popId}
        aria-label={`각주 ${number}`}
        onClick={() => setOpen((value) => !value)}
      >
        {number}
      </button>
      {open && (
        <span className="fn__pop" id={popId} role="note" popover="manual" ref={popRef}>
          <span className="fn__num">{number}</span>
          <span>
            <SourceCitation id={id} />{' '}
            <Link className="fn__more" to={`/sources#${id}`}>
              출처 목록
            </Link>
          </span>
        </span>
      )}
    </span>
  );
}
