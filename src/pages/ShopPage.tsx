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
        <p className="shop__kicker">Heritage Line · Concept</p>
        <h1 className="shop__title">읽은 시대를 입다.</h1>
        <p className="shop__dek">
          이 책에 나온 세 시대의 501을 그 해의 디테일 그대로 다시 짓는다면. 뒷주머니 하나뿐이던 1890년의 원형부터,
          실을 아낀 전시 규격, 빅 E 레드탭의 마지막 시대까지.
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
