import { Link } from 'react-router';

import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('찾을 수 없는 페이지');

  return (
    <article className="page page--center">
      <p className="page__kicker">404</p>
      <h1 className="page__title">페이지를 찾을 수 없습니다</h1>
      <p className="page__dek">주소가 바뀌었거나 없는 페이지입니다.</p>
      <Link to="/" className="cover__start">
        표지로 돌아가기
      </Link>
    </article>
  );
}
