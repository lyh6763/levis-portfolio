import { useMemo } from 'react';
import { Link, useParams } from 'react-router';

import { Block, Chapter, chapterBySlug, chapters } from '../data/chapters';
import { modelByChapter } from '../data/shop';
import { collectNotes, NotesContext, RichText, SourceCitation } from '../editorial/Footnote';
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
  const notes = useMemo(() => collectNotes(chapter.blocks), [chapter]);
  const index = chapters.indexOf(chapter);
  const prev = chapters[index - 1];
  const next = chapters[index + 1];
  const model = modelByChapter.get(chapter.slug);

  return (
    <NotesContext.Provider value={notes}>
      <article className="chapter">
        <header className="opener">
          <div className="opener__inner">
            <p className="opener__kicker">
              Chapter {chapter.number} · {chapter.kicker}
            </p>
            <p className="opener__years" aria-hidden="true">
              {chapter.years}
            </p>
            <h1 className="opener__title">{chapter.title}</h1>
            <p className="opener__dek">{chapter.dek}</p>
            <p className="opener__meta">
              <span className="visually-hidden">시기 {chapter.years}, </span>
              읽는 시간 약 {chapter.readMinutes}분
            </p>
          </div>
        </header>

        <div className="body">
          {chapter.blocks.map((block, i) => (
            <BlockView key={i} block={block} isFirst={i === 0} />
          ))}
        </div>

        {model && (
          <aside className="era-pick" aria-label="이 시대의 한 벌">
            <ModelCard model={model} variant="chapter" kicker="이 시대의 한 벌 · Heritage Line" />
          </aside>
        )}

        {notes.length > 0 && (
          <section className="endnotes" aria-labelledby="endnotes-title">
            <h2 id="endnotes-title" className="endnotes__title">
              Notes
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

        <nav className="chapter-nav" aria-label="챕터 이동">
          {prev ? (
            <Link to={`/chapters/${prev.slug}`} className="chapter-nav__link chapter-nav__link--prev">
              <span className="chapter-nav__dir">← Previous · {prev.number}</span>
              <span className="chapter-nav__title">{prev.title}</span>
            </Link>
          ) : (
            <Link to="/" className="chapter-nav__link chapter-nav__link--prev">
              <span className="chapter-nav__dir">← Cover</span>
              <span className="chapter-nav__title">Issue 501</span>
            </Link>
          )}
          {next ? (
            <Link to={`/chapters/${next.slug}`} className="chapter-nav__link chapter-nav__link--next">
              <span className="chapter-nav__dir">Next · {next.number} →</span>
              <span className="chapter-nav__title">{next.title}</span>
            </Link>
          ) : (
            <Link to="/sources" className="chapter-nav__link chapter-nav__link--next">
              <span className="chapter-nav__dir">Sources →</span>
              <span className="chapter-nav__title">출처와 참고 문헌</span>
            </Link>
          )}
        </nav>
      </article>
    </NotesContext.Provider>
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

function BlockView({ block, isFirst }: { block: Block; isFirst: boolean }) {
  switch (block.type) {
    case 'p':
      return (
        <p className={`body__p${isFirst ? ' body__p--lead' : ''}`}>
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
        <aside className="note-box">
          <h3 className="note-box__title">{block.title}</h3>
          <p>
            <RichText text={block.text} />
          </p>
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
          <Viz />
          <figcaption className="figure__caption">{block.caption}</figcaption>
        </figure>
      );
    }
  }
}
