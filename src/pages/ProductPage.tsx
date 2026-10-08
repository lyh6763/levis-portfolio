import { useId, useState } from 'react';
import { Link, useParams } from 'react-router';

import { chapterBySlug } from '../data/chapters';
import { formatPrice, INSEAMS, Model, modelBySlug, models, WAISTS } from '../data/shop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useCart } from '../shop/CartContext';
import { ModelCard } from '../shop/ModelCard';
import { ShopBar } from '../shop/ShopBar';
import { SizeAdvisor } from '../shop/SizeAdvisor';
import { describeFeatures, JeanBack } from '../viz/JeanBack';
import { NotFoundPage } from './NotFoundPage';

export function ProductPage() {
  const { slug = '' } = useParams();
  const model = modelBySlug.get(slug);
  useDocumentTitle(model ? `${model.name} · Heritage Line` : '찾을 수 없는 페이지');

  if (!model) {
    return <NotFoundPage />;
  }
  // 모델이 바뀌면 선택한 사이즈를 초기화하도록 다시 마운트한다.
  return <Product key={model.slug} model={model} />;
}

function Product({ model }: { model: Model }) {
  const { add, setOpen } = useCart();
  const [waist, setWaist] = useState<number | null>(null);
  const [inseam, setInseam] = useState<number | null>(null);
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [missing, setMissing] = useState(false);
  const advisorId = useId();
  const chapter = chapterBySlug.get(model.chapter);
  const others = models.filter((candidate) => candidate !== model);

  const addToCart = () => {
    if (waist === null || inseam === null) {
      setMissing(true);
      return;
    }
    add({ slug: model.slug, waist, inseam });
    setOpen(true);
  };

  return (
    <div className="shop">
      <ShopBar current={model.name} />

      <div className="pdp">
        <div className="pdp__art">
          <JeanBack year={model.year} label={`${model.name} 뒷면 도식: ${describeFeatures(model.year).join(', ')}`} />
          <p className="pdp__art-caption">Back view · {model.year} 디테일 기준 도식</p>
        </div>

        <div className="pdp__buy">
          <p className="pdp__kicker">Heritage Line · Lot 501</p>
          <h1 className="pdp__name">{model.name}</h1>
          <p className="pdp__price">
            {formatPrice(model.price)} <span className="pdp__price-note">콘셉트 데모의 가상 가격</span>
          </p>
          <p className="pdp__tagline">{model.tagline}</p>

          <fieldset className="pdp__sizes">
            <legend>허리 (W)</legend>
            <div className="pdp__size-grid">
              {WAISTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  className="pdp__size"
                  aria-pressed={waist === value}
                  onClick={() => {
                    setWaist(value);
                    setMissing(false);
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="pdp__sizes">
            <legend>기장 (L)</legend>
            <div className="pdp__size-grid">
              {INSEAMS.map((value) => (
                <button
                  key={value}
                  type="button"
                  className="pdp__size"
                  aria-pressed={inseam === value}
                  onClick={() => {
                    setInseam(value);
                    setMissing(false);
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            className="pdp__advisor-toggle"
            aria-expanded={advisorOpen}
            aria-controls={advisorId}
            onClick={() => setAdvisorOpen((value) => !value)}
          >
            생지 수축 감안해서 사이즈 추천받기 <span aria-hidden="true">{advisorOpen ? '−' : '+'}</span>
          </button>
          <div id={advisorId} hidden={!advisorOpen}>
            <SizeAdvisor
              model={model}
              onApply={(size) => {
                setWaist(size.waist);
                setInseam(size.inseam);
                setMissing(false);
              }}
            />
          </div>

          <button type="button" className="pdp__add" onClick={addToCart}>
            {waist !== null && inseam !== null ? `W${waist} · L${inseam} 장바구니에 담기` : '장바구니에 담기'}
          </button>
          <p className="pdp__missing" role="alert">
            {missing ? '허리와 기장을 먼저 골라 주세요.' : ''}
          </p>
        </div>
      </div>

      <div className="pdp__details">
        <section className="pdp__section" aria-labelledby="pdp-story">
          <h2 id="pdp-story">이 모델의 이야기</h2>
          {model.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {chapter && (
            <Link to={`/chapters/${chapter.slug}`} className="pdp__chapter-link">
              Chapter {chapter.number} · {chapter.title} 읽기 →
            </Link>
          )}
        </section>

        <section className="pdp__section" aria-labelledby="pdp-fit">
          <h2 id="pdp-fit">핏과 원단</h2>
          <p>{model.fit}</p>
          <dl className="pdp__specs">
            {model.fabric.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
            <div>
              <dt>수축 (근사)</dt>
              <dd>
                허리 약 {Math.round(model.shrink.waist * 100)}% · 기장 약 {Math.round(model.shrink.inseam * 100)}%
              </dd>
            </div>
          </dl>
        </section>

        <section className="pdp__section" aria-labelledby="pdp-year">
          <h2 id="pdp-year">{model.year}년의 디테일</h2>
          <ul className="pdp__features">
            {describeFeatures(model.year).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <p className="pdp__hint">
            빈티지 한 벌의 나이가 궁금하다면, 이 디테일들이 단서가 됩니다. 사이트 맨 아래의 Inside out을 눌러 보세요.
          </p>
        </section>
      </div>

      <section className="pdp__others" aria-labelledby="pdp-others">
        <h2 id="pdp-others" className="pdp__others-title">
          다른 시대
        </h2>
        <ul className="shop__grid shop__grid--two">
          {others.map((other) => (
            <li key={other.slug}>
              <ModelCard model={other} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
