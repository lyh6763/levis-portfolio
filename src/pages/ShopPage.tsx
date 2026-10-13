import { Link } from 'react-router';

import { models } from '../data/shop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ModelCard } from '../shop/ModelCard';
import { ShopBar } from '../shop/ShopBar';

export function ShopPage() {
  useDocumentTitle('Heritage Line');

  return (
    <div className="shop">
      <ShopBar />

      <header className="shop__hero">
        <h1 className="shop__title">Heritage Line</h1>
        <p className="shop__dek">
          본문에 나온 세 시대의 501을 그해 디테일대로 복각한다고 가정한 콘셉트 상점입니다. 뒷주머니가 하나인 1890년형,
          신치와 가랑이 리벳을 뺀 1944년 전시 규격, 빅 E 레드탭이 달린 1966년형을 골랐습니다.
        </p>
      </header>

      <ul className="shop__grid">
        {models.map((model) => (
          <li key={model.slug}>
            <ModelCard model={model} />
          </li>
        ))}
      </ul>

      <section className="shop__guide" aria-labelledby="shop-guide-title">
        <h2 id="shop-guide-title" className="shop__guide-title">
          생지는 줄어듭니다
        </h2>
        <div className="shop__guide-body">
          <p>
            세 모델 모두 방축 가공을 하지 않은 생지 데님입니다. 첫 세탁에서 허리와 기장이 함께 줄어들기 때문에, 평소
            사이즈보다 한두 치수 크게 고르는 것이 보통입니다. 각 상품 페이지의 사이즈 추천기가 세탁 후 원하는 치수에
            맞춰 태그 사이즈를 골라 드립니다.
          </p>
          <p>
            어떤 시대가 나와 맞는지 모르겠다면, 각 모델이 등장하는 챕터를 먼저 읽어 보세요.{' '}
            <Link to="/chapters/lot-501">03 Lot 501</Link>의 연도 슬라이더로 디테일이 어떻게 달라지는지 직접 비교할 수
            있습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
