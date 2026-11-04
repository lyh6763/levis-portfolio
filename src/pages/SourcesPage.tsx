import { Link } from 'react-router';

import { chapterBySlug } from '../data/chapterMeta';
import { citedInChapters, usedInInsideOut } from '../data/citations';
import { Source, SourceGroup, sourceGroups, sources } from '../data/sources';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

/** '2026-10' → '2026년 10월' */
const formatMonth = (month: string) => {
  const [year, mm] = month.split('-');
  return `${year}년 ${Number(mm)}월`;
};

/** 묶음 안 출처의 대조 상태가 모두 같으면 묶음 머리에 한 번만 적는다. 섞여 있으면 항목마다 적는다. */
function groupStatus(group: SourceGroup): string | null {
  const states = new Set(group.sources.map((source) => source.checked ?? ''));
  if (states.size !== 1) {
    return null;
  }
  const [checked] = states;
  return checked ? `${formatMonth(checked)} 본문과 대조` : '원문 대조 전';
}

/** 이 출처를 인용한 장과 감정 도구로 가는 링크 */
function SourceUses({ source }: { source: Source }) {
  const chapters = (citedInChapters[source.id] ?? []).flatMap((slug) => chapterBySlug.get(slug) ?? []);
  const insideOut = usedInInsideOut.includes(source.id);

  return (
    <p className="sources__uses">
      <span className="sources__uses-label">쓰인 곳</span>
      {chapters.map((chapter) => (
        <Link key={chapter.slug} to={`/chapters/${chapter.slug}`}>
          <span className="sources__uses-num">{chapter.number}</span> {chapter.title}
        </Link>
      ))}
      {insideOut && <Link to="/inside-out">감정 도구</Link>}
    </p>
  );
}

export function SourcesPage() {
  useDocumentTitle('출처');

  return (
    <article className="page page--sources">
      <header className="page__head">
        <h1 className="page__title">출처</h1>
        <p className="page__dek">
          본문의 각주가 가리키는 자료입니다. 온라인 자료는 2026년 10월에 본문 서술과 대조했습니다. 단행본은 아직
          원문과 대조하지 못해 보조 근거로만 달았고, 따로 묶어 두었습니다.
        </p>
        <nav className="sources__nav" aria-label="출처 묶음">
          <span>출처 {sources.length}개</span>
          {sourceGroups.map((group) => (
            <a key={group.id} href={`#sources-${group.id}`}>
              {group.title} <span className="sources__nav-count">{group.sources.length}</span>
            </a>
          ))}
        </nav>
      </header>

      {sourceGroups.map((group) => {
        const status = groupStatus(group);
        return (
          <section key={group.id} id={`sources-${group.id}`} className="sources__group" aria-labelledby={`sources-${group.id}-title`}>
            <div className="sources__group-head">
              <h2 id={`sources-${group.id}-title`} className="sources__group-title">
                {group.title}
              </h2>
              <p className="sources__group-meta">
                {group.sources.length}개{status ? ` · ${status}` : ''}
              </p>
            </div>
            <p className="sources__group-note">{group.note}</p>
            <ol className="sources">
              {group.sources.map((source) => (
                <li key={source.id} id={source.id} className="sources__item" tabIndex={-1}>
                  <span className="sources__author">{source.author}</span>
                  <cite className="sources__title">{source.title}</cite>
                  <span className="sources__pub">
                    {source.publisher ? `${source.publisher}, ` : ''}
                    {source.year}
                  </span>
                  {!status && (
                    <span className={`sources__status${source.checked ? ' is-checked' : ''}`}>
                      {source.checked ? `${formatMonth(source.checked)} 대조` : '원문 대조 전'}
                    </span>
                  )}
                  <SourceUses source={source} />
                  {source.url && (
                    <a className="sources__link" href={source.url} target="_blank" rel="noreferrer">
                      원문 보기 <span className="visually-hidden">(새 창)</span>
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </article>
  );
}
