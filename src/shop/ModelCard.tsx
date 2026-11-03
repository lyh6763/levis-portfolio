import { Link } from 'react-router';

import { formatPrice, Model, models } from '../data/shop';
import { JeanBack } from '../viz/JeanBack';

type ModelCardProps = {
  model: Model;
  /** chapter: 챕터 끝 '이 시대의 한 벌', inline: 감정 결과 안의 작은 카드 */
  variant?: 'grid' | 'chapter' | 'inline';
  kicker?: string;
};

/** 도판 번호. 모델은 연도순이라 번호가 곧 시대 순서다. */
export const plateNumber = (model: Model) => models.indexOf(model) + 1;

/**
 * Heritage Line 상품. 상점에서는 상자 없는 도판(도식 + 캡션), 챕터 끝·감정 결과에서는 가로 카드로 쓴다.
 */
export function ModelCard({ model, variant = 'grid', kicker }: ModelCardProps) {
  const plate = variant === 'grid';

  return (
    <Link to={`/shop/${model.slug}`} className={`model-card model-card--${variant}`}>
      <div className="model-card__art">
        <JeanBack year={model.year} />
      </div>
      {plate && (
        <p className="model-card__plate">
          도판 {plateNumber(model)} · {model.year}년 뒷면
        </p>
      )}
      <div className="model-card__text">
        {kicker && <p className="model-card__kicker">{kicker}</p>}
        {!plate && <p className="model-card__year">{model.year}</p>}
        <h3 className="model-card__name">{model.name}</h3>
        <p className="model-card__tagline">{model.tagline}</p>
        <p className="model-card__price">{formatPrice(model.price)}</p>
      </div>
    </Link>
  );
}
