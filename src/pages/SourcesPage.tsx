import { sources } from '../data/sources';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function SourcesPage() {
  useDocumentTitle('Sources');

  return (
    <article className="page">
      <header className="page__head">
        <p className="page__kicker">Back matter</p>
        <h1 className="page__title">Sources</h1>
        <p className="page__dek">
          본문의 각주가 가리키는 자료입니다. 온라인 자료는 2026년 10월에 본문 서술과 대조했습니다. 단행본은 아직
          원문과 대조하지 못해 보조 근거로만 달았고, 따로 표시해 두었습니다.
        </p>
      </header>
      <ol className="sources">
        {sources.map((source) => (
          <li key={source.id} id={source.id} className="sources__item" tabIndex={-1}>
            <span className="sources__author">{source.author}</span>
            <cite className="sources__title">{source.title}</cite>
            <span className="sources__pub">
              {source.publisher ? `${source.publisher}, ` : ''}
              {source.year}
            </span>
            <span className={`sources__status${source.checked ? ' is-checked' : ''}`}>
              {source.checked ? `${source.checked.replace('-', '.')} 대조` : '원문 대조 전'}
            </span>
            {source.url && (
              <a className="sources__link" href={source.url} target="_blank" rel="noreferrer">
                원문 보기 <span className="visually-hidden">(새 창)</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </article>
  );
}
