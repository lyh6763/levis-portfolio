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
          본문의 각주가 가리키는 자료입니다. 이 사이트는 초안 단계이며, 일부 연도와 수치는 원문 대조를 진행하고
          있습니다.
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
