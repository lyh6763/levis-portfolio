import { Link } from 'react-router';

import { chapters, totalReadMinutes } from '../data/chapters';
import { models } from '../data/shop';
import { prefetchHandlers } from '../editorial/prefetch';
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
          <p className="cover__issue">Levi&apos;s 비공식 연대기</p>
          <h1 className="cover__title" id="cover-title">
            {SITE_NAME}
          </h1>
          <p className="cover__dek">
            골드러시의 작업복이 세계에서 가장 평범한 옷이 되기까지.
            <br />
            Levi&apos;s와 블루진의 150년을 아홉 개의 장으로 읽습니다.
          </p>
          <div className="cover__actions">
            <Link to={`/chapters/${first.slug}`} className="cover__start" {...prefetchHandlers(first.slug)}>
              읽기 시작
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
              목차
            </h2>
            <p className="contents__letter">
              01–04장은 1847년부터 1971년까지의 사람과 사건을 따라가고, 05·06장은 염료와 직기, 07장은 청바지가
              세계로 퍼진 경로, 08장은 501 한 벌의 부품을 다룬다. 09장은 한 벌이 생애 동안 쓰는 물에 관한 짧은
              글이다. 사실 서술에는 각주로 출처를 달았고, 자료마다 연도가 엇갈리는 곳은 &lsquo;무렵&rsquo;이라고
              적었다.
            </p>
          </div>
          <ol className="contents__list">
            {chapters.map((chapter) => (
              <li key={chapter.slug}>
                <Link to={`/chapters/${chapter.slug}`} className="contents__item" {...prefetchHandlers(chapter.slug)}>
                  <span className="contents__num">{chapter.number}</span>
                  <span className="contents__years">{chapter.years}</span>
                  <span className="contents__title">{chapter.title}</span>
                  <span className="contents__dek">{chapter.dek}</span>
                  <span className="contents__time">{chapter.readMinutes}분</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cover-shop" aria-labelledby="cover-shop-title">
        <div className="cover-shop__inner">
          <div className="cover-shop__text">
            <h2 className="cover-shop__title" id="cover-shop-title">
              Heritage Line
            </h2>
            <p className="cover-shop__dek">
              본문에 나온 세 시대({models.map((model) => model.year).join(', ')})의 501을 그해 디테일대로 복각한다고
              가정한 콘셉트 상점입니다. 실제로 판매하지 않습니다.
            </p>
            <Link to="/shop" className="cover-shop__link">
              상점 둘러보기
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
