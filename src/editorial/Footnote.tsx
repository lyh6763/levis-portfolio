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

export type BlockNote = { id: string; first: boolean };

/** 블록마다 붙은 각주(블록 안 등장 순서, 중복 없이). 그 출처가 챕터에서 처음 나오는 블록이면 first. */
export function notesByBlock(blocks: Block[]): BlockNote[][] {
  const seen = new Set<string>();
  return blocks.map((block) => {
    const notes: BlockNote[] = [];
    if (block.type !== 'p' && block.type !== 'aside') {
      return notes;
    }
    for (const match of block.text.matchAll(NOTE_PATTERN)) {
      if (!notes.some((note) => note.id === match[1])) {
        notes.push({ id: match[1], first: !seen.has(match[1]) });
      }
    }
    for (const note of notes) {
      seen.add(note.id);
    }
    return notes;
  });
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

/**
 * 옆주 표기. 여백이 좁아 게시처는 문말 주와 출처 목록에 맡기고, 제목을 출처 목록 링크로 쓴다.
 * 같은 출처가 다시 나오면 번호가 같으므로 저자와 연도만 쓴다.
 */
function SideCitation({ id, first }: BlockNote): ReactNode {
  const source = sourceById.get(id);
  if (!source) {
    return id;
  }
  if (!first) {
    return `${source.author}, ${source.year}.`;
  }
  return (
    <>
      {source.author},{' '}
      <Link className="side__link" to={`/sources#${id}`}>
        <cite>{source.title}</cite>
      </Link>
      , {source.year}.
    </>
  );
}

/**
 * 넓은 화면에서 문단 오른쪽 여백에 두는 각주(옆주). 좁은 화면에서는 CSS가 숨기고 본문의 각주 버튼을 쓴다.
 * 문단(`p`) 안에도 들어가므로 구문 요소(span, small)로만 짓는다.
 */
export function SideNotes({ notes }: { notes: BlockNote[] }) {
  const order = useContext(NotesContext);
  return (
    <span className="side">
      {notes.map((note) => (
        <small key={note.id} className="side__note">
          <span className="side__num">
            <span className="visually-hidden">각주 </span>
            {order.indexOf(note.id) + 1}
          </span>
          <span>
            <SideCitation {...note} />
          </span>
        </small>
      ))}
    </span>
  );
}

// editorial.css에서 팝오버가 하단 시트로 바뀌는 기준, 각주가 옆주로 바뀌는 기준과 같다.
const SHEET_QUERY = '(max-width: 768px)';
const WIDE_QUERY = '(min-width: 1200px)';
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
    const wide = window.matchMedia(WIDE_QUERY);
    let frame = 0;
    const place = () => {
      frame = 0;
      const rect = button.getBoundingClientRect();
      // 창을 넓혀 옆주로 바뀌면 버튼이 숨으므로 팝오버도 닫는다.
      if (wide.matches || rect.bottom < 0 || rect.top > window.innerHeight) {
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
        if (popRef.current?.contains(document.activeElement)) {
          event.preventDefault();
          buttonRef.current?.focus({ preventScroll: true });
        }
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
      {/* 넓은 화면에서 버튼 대신 보이는 번호. 읽기 프로그램은 옆주에서 번호를 읽는다. */}
      <span className="fn__mark" aria-hidden="true">
        {number}
      </span>
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
