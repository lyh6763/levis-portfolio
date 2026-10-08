import { createContext, Fragment, ReactNode, useContext, useEffect, useId, useRef, useState } from 'react';
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

function FootnoteRef({ id }: { id: string }) {
  const order = useContext(NotesContext);
  const number = order.indexOf(id) + 1;
  const [open, setOpen] = useState(false);
  const popId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);

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
        <span className="fn__pop" id={popId} role="note">
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
