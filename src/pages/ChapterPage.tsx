import { Suspense, use, useEffect, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router';

import { Block, Chapter, chapterBySlug, chapters, loadChapterBlocks } from '../data/chapters';
import { ChapterPlate } from '../editorial/ChapterPlate';
import { modelByChapter } from '../data/shop';
import {
  BlockNote,
  collectNotes,
  notesByBlock,
  NotesContext,
  RichText,
  SideNotes,
  SourceCitation,
} from '../editorial/Footnote';
import { prefetchChapter, prefetchHandlers } from '../editorial/prefetch';
import { preloadSerifFontFor } from '../editorial/preloadFonts';
import { Reveal } from '../editorial/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useInsideOut } from '../insideOut/InsideOutContext';
import { LooseThread } from '../insideOut/LooseThread';
import { ModelCard } from '../shop/ModelCard';
import { vizRegistry } from '../viz/registry';
import { NotFoundPage } from './NotFoundPage';

export function ChapterPage() {
  const { slug = '' } = useParams();
  const chapter = chapterBySlug.get(slug);
  useDocumentTitle(chapter ? `${chapter.number} ${chapter.title}` : '찾을 수 없는 페이지');

  if (!chapter) {
    return <NotFoundPage />;
  }
  // slug가 바뀌면 시각화의 스크롤 트리거를 새로 만들도록 key로 다시 마운트한다.
  return <ChapterArticle key={chapter.slug} chapter={chapter} />;
}

function ChapterArticle({ chapter }: { chapter: Chapter }) {
  const index = chapters.indexOf(chapter);
  const prev = chapters[index - 1];
  const next = chapters[index + 1];

  return (
    <article className="chapter">
      <header className="opener">
        <div className="opener__inner">
          {/* 시기는 장 번호 옆에 글자로 적는다(전에는 제목 뒤에 흐린 큰 연도로 깔았다). 05장처럼 비어 있으면 뺀다. */}
          <p className="opener__kicker">
            제{Number(chapter.number)}장{chapter.years && ` · ${chapter.years}`}
          </p>
          <h1 className="opener__title">{chapter.title}</h1>
          <div className="opener__body">
            <div className="opener__text">
              <p className="opener__dek">{chapter.dek}</p>
              <p className="opener__meta">읽는 시간 약 {chapter.readMinutes}분</p>
            </div>
            <ChapterPlate slug={chapter.slug} />
          </div>
        </div>
      </header>

      {/* 오프너와 챕터 이동은 메타데이터로 바로 그리고, 본문만 챕터 청크를 기다린다. */}
      <Suspense fallback={<BodyLoading />}>
        <ChapterBody chapter={chapter} nextSlug={next?.slug} />
      </Suspense>

      <nav className="chapter-nav" aria-label="챕터 이동">
        {prev ? (
          <Link
            to={`/chapters/${prev.slug}`}
            className="chapter-nav__link chapter-nav__link--prev"
            {...prefetchHandlers(prev.slug)}
          >
            <span className="chapter-nav__dir">← 이전 · {prev.number}</span>
            <span className="chapter-nav__title">{prev.title}</span>
          </Link>
        ) : (
          <Link to="/" className="chapter-nav__link chapter-nav__link--prev">
            <span className="chapter-nav__dir">← 처음으로</span>
            <span className="chapter-nav__title">표지와 목차</span>
          </Link>
        )}
        {next ? (
          <Link
            to={`/chapters/${next.slug}`}
            className="chapter-nav__link chapter-nav__link--next"
            {...prefetchHandlers(next.slug)}
          >
            <span className="chapter-nav__dir">다음 · {next.number} →</span>
            <span className="chapter-nav__title">{next.title}</span>
          </Link>
        ) : (
          <Link to="/sources" className="chapter-nav__link chapter-nav__link--next">
            <span className="chapter-nav__dir">다음 →</span>
            <span className="chapter-nav__title">출처와 참고 문헌</span>
          </Link>
        )}
      </nav>
    </article>
  );
}

function ChapterBody({ chapter, nextSlug }: { chapter: Chapter; nextSlug?: string }) {
  const blocks = use(loadChapterBlocks(chapter.slug));
  const notes = useMemo(() => collectNotes(blocks), [blocks]);
  const blockNotes = useMemo(() => notesByBlock(blocks), [blocks]);
  const model = modelByChapter.get(chapter.slug);
  const bodyRef = useRef<HTMLDivElement>(null);

  // 화면 밖 본문 블록의 한글 웹폰트 조각을 미리 받아, 스크롤 중에 글자가 바뀌지 않게 한다.
  // 옆주(.side)는 본문 서체가 아니라서 뺀다.
  useEffect(
    () => preloadSerifFontFor(bodyRef.current, '.body__p:not(.body__p--noted), .body__text, .pull, .note-box__main'),
    [blocks],
  );

  // 본문을 다 그린 뒤 브라우저가 한가할 때 다음 챕터를 미리 받아 둔다.
  useEffect(() => {
    if (!nextSlug) {
      return;
    }
    const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 1500));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => prefetchChapter(nextSlug));
    return () => cancel(handle);
  }, [nextSlug]);

  return (
    <NotesContext.Provider value={notes}>
      <div className="body" ref={bodyRef}>
        {blocks.map((block, i) => (
          <BlockView key={i} block={block} notes={blockNotes[i]} />
        ))}
      </div>

      {model && (
        <aside className="era-pick" aria-label="이 시대의 한 벌">
          <ModelCard model={model} variant="chapter" kicker="이 시대를 복각한 콘셉트 상품" />
        </aside>
      )}

      {notes.length > 0 && (
        <section className="endnotes" aria-labelledby="endnotes-title">
          <h2 id="endnotes-title" className="endnotes__title">
            주
          </h2>
          <ol className="endnotes__list">
            {notes.map((id, i) => (
              <li key={id}>
                <span className="endnotes__num">{i + 1}</span>
                <span>
                  <SourceCitation id={id} />
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </NotesContext.Provider>
  );
}

/** 본문 청크를 받는 동안 문단 자리를 잡아 둔다. */
function BodyLoading() {
  return (
    <div className="body body--loading" role="status" aria-live="polite">
      <span className="visually-hidden">본문을 불러오는 중</span>
      {[100, 96, 92, 98, 64].map((width, i) => (
        <span key={i} className="body__skeleton" style={{ width: `${width}%` }} aria-hidden="true" />
      ))}
    </div>
  );
}

function TurnButton({ text }: { text: string }) {
  const { flip } = useInsideOut();
  return (
    <div className="turn">
      <button type="button" className="turn__button" onClick={() => flip()}>
        <span className="turn__icon" aria-hidden="true">
          ↺
        </span>
        {text}
      </button>
    </div>
  );
}

function BlockView({ block, notes }: { block: Block; notes: BlockNote[] }) {
  switch (block.type) {
    case 'p':
      // 각주가 있는 문단은 넓은 화면에서 본문과 옆주 두 칸으로 나눈다(editorial.css 옆주).
      return notes.length > 0 ? (
        <p className="body__p body__p--noted">
          <span className="body__text">
            <RichText text={block.text} />
          </span>
          <SideNotes notes={notes} />
        </p>
      ) : (
        <p className="body__p">
          <RichText text={block.text} />
        </p>
      );
    case 'h':
      return (
        <Reveal as="h2" className="body__h">
          {block.text}
        </Reveal>
      );
    case 'quote':
      return (
        <Reveal as="blockquote" className="pull">
          <p>{block.text}</p>
          <footer className="pull__cite">{block.cite}</footer>
        </Reveal>
      );
    case 'stat':
      return (
        <Reveal className="stat">
          <span className="stat__value">{block.value}</span>
          <span className="stat__label">{block.label}</span>
        </Reveal>
      );
    case 'aside':
      return (
        <aside className={notes.length > 0 ? 'note-box note-box--noted' : 'note-box'}>
          <div className="note-box__main">
            <h3 className="note-box__title">{block.title}</h3>
            <p>
              <RichText text={block.text} />
            </p>
          </div>
          {notes.length > 0 && <SideNotes notes={notes} />}
        </aside>
      );
    case 'thread':
      return <LooseThread id={block.id} />;
    case 'turn':
      return <TurnButton text={block.text} />;
    case 'viz': {
      const Viz = vizRegistry[block.id];
      return (
        <figure className="figure">
          <Suspense fallback={<div className="figure__loading" role="status" aria-label="도식을 불러오는 중" />}>
            <Viz />
          </Suspense>
          <figcaption className="figure__caption">{block.caption}</figcaption>
        </figure>
      );
    }
  }
}
