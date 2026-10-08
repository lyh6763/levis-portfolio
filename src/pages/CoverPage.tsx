import { Link } from 'react-router';

import { chapters, totalReadMinutes } from '../data/chapters';
import { models } from '../data/shop';
import { SITE_NAME, useDocumentTitle } from '../hooks/useDocumentTitle';
import { CoverDrawing } from '../viz/CoverDrawing';
import { JeanBack } from '../viz/JeanBack';

export function CoverPage() {
  useDocumentTitle(null);
  const first = chapters[0];

  return (
    <>
      <section className="cover" aria-labelledby="cover-title">
        <div className="cover__inner">
          <p className="cover__issue">Issue 501 · An unofficial long read</p>
          <h1 className="cover__title" id="cover-title">
            {SITE_NAME}
          </h1>
          <p className="cover__dek">
            골드러시의 작업복이 세계에서 가장 평범한 옷이 되기까지.
            <br />
            Levi&apos;s와 블루진의 150년을 아홉 개의 장으로 읽습니다.
          </p>
          <div className="cover__actions">
            <Link to={`/chapters/${first.slug}`} className="cover__start">
              읽기 시작 <span aria-hidden="true">→</span>
            </Link>
            <span className="cover__meta">
              {chapters.length}개 챕터 · 약 {totalReadMinutes}분
            </span>
          </div>
        </div>
        <CoverDrawing />
      </section>

      <section className="contents" aria-labelledby="contents-title">
        <div className="contents__inner">
          <div className="contents__intro">
            <h2 className="contents__label" id="contents-title">
              Contents
            </h2>
            <p className="contents__letter">
              날실은 푸르고 씨실은 희다. 데님은 겉으로 보이는 색과 안에 숨은 색이 함께 짜인 옷이다. 이 기록도
              그렇게 읽히길 바란다. 겉으로는 한 브랜드의 연대기지만, 안쪽에는 노동과 이주, 전쟁과 반항, 그리고
              오래 입는 일에 대한 이야기가 함께 짜여 있다.
            </p>
          </div>
          <ol className="contents__list">
            {chapters.map((chapter) => (
              <li key={chapter.slug}>
                <Link to={`/chapters/${chapter.slug}`} className="contents__item">
                  <span className="contents__num">{chapter.number}</span>
                  <span className="contents__years">{chapter.years}</span>
                  <span className="contents__title">{chapter.title}</span>
                  <span className="contents__dek">{chapter.dek}</span>
                  <span className="contents__time">{chapter.readMinutes} min</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cover-shop" aria-labelledby="cover-shop-title">
        <div className="cover-shop__inner">
          <div className="cover-shop__text">
            <p className="cover-shop__kicker">Heritage Line · Concept</p>
            <h2 className="cover-shop__title" id="cover-shop-title">
              읽은 시대를 입다.
            </h2>
            <p className="cover-shop__dek">
              {models.map((model) => model.year).join(' · ')}. 책 속 세 시대의 501을 그 해의 디테일로 다시 짓는다면.
            </p>
            <Link to="/shop" className="cover-shop__link">
              Heritage Line 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="cover-shop__art" aria-hidden="true">
            {models.map((model) => (
              <JeanBack key={model.slug} year={model.year} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
