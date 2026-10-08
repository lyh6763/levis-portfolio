import { Link } from 'react-router';

import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('찾을 수 없는 페이지');

  return (
    <article className="page page--center">
      <p className="page__kicker">404</p>
      <h1 className="page__title">Unravelled.</h1>
      <p className="page__dek">실이 풀린 자리입니다. 찾으시는 페이지가 없어요.</p>
      <Link to="/" className="cover__start">
        표지로 돌아가기
      </Link>
    </article>
  );
}
