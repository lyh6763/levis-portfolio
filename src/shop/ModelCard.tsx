import { Link } from 'react-router';

import { formatPrice, Model } from '../data/shop';
import { JeanBack } from '../viz/JeanBack';

type ModelCardProps = {
  model: Model;
  /** chapter: 챕터 끝 '이 시대의 한 벌', inline: 감정 결과 안의 작은 카드 */
  variant?: 'grid' | 'chapter' | 'inline';
  kicker?: string;
};

/** Heritage Line 상품 카드. 상점·챕터 끝·감정 결과에서 같은 모양으로 쓴다. */
export function ModelCard({ model, variant = 'grid', kicker }: ModelCardProps) {
  return (
    <Link to={`/shop/${model.slug}`} className={`model-card model-card--${variant}`}>
      <div className="model-card__art">
        <JeanBack year={model.year} />
      </div>
      <div className="model-card__text">
        {kicker && <p className="model-card__kicker">{kicker}</p>}
        <p className="model-card__year">{model.year}</p>
        <h3 className="model-card__name">{model.name}</h3>
        <p className="model-card__tagline">{model.tagline}</p>
        <p className="model-card__price">
          {formatPrice(model.price)} <span className="model-card__more" aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}
