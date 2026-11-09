import { useId, useState } from 'react';
import { Link, useParams } from 'react-router';

import { chapterBySlug } from '../data/chapters';
import { formatPrice, INSEAMS, Model, modelBySlug, models, WAISTS } from '../data/shop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useCart } from '../shop/CartContext';
import { ModelCard, plateNumber } from '../shop/ModelCard';
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

type SizeChartProps = {
  legend: string;
  name: string;
  sizes: number[];
  /** 첫 세탁 수축률 */
  rate: number;
  value: number | null;
  onChange: (value: number) => void;
};

/** 괘선 치수표 한 장. 줄마다 라디오 하나라 방향키로 고를 수 있다. */
function SizeChart({ legend, name, sizes, rate, value, onChange }: SizeChartProps) {
  return (
    <fieldset className="pdp__chart">
      <legend>{legend}</legend>
      <div className="pdp__chart-head" aria-hidden="true">
        <span>태그</span>
        <span>세탁 후</span>
      </div>
      {sizes.map((size) => {
        const after = (size * (1 - rate)).toFixed(1);
        return (
          <label key={size} className="pdp__chart-row">
            {/* 칸이 격자라 글자를 이어 읽으면 사이가 벌어지므로, 읽을 이름은 한 문장으로 준다 (보이는 숫자를 모두 포함) */}
            <input
              type="radio"
              name={name}
              value={size}
              checked={value === size}
              onChange={() => onChange(size)}
              aria-label={`태그 ${size}, 세탁 후 약 ${after}인치`}
            />
            <span className="pdp__chart-tag">{size}</span>
            <span className="pdp__chart-after">{after}</span>
          </label>
        );
      })}
    </fieldset>
  );
}

function Product({ model }: { model: Model }) {
  const { add, setOpen } = useCart();
  const [waist, setWaist] = useState<number | null>(null);
  const [inseam, setInseam] = useState<number | null>(null);
  const [missing, setMissing] = useState(false);
  const chartId = useId();
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
          <p className="pdp__art-caption">
            도판 {plateNumber(model)} · {model.year}년 디테일로 그린 뒷면 도식
          </p>
        </div>

        <div className="pdp__buy">
          <h1 className="pdp__name">{model.name}</h1>
          <p className="pdp__price">
            {formatPrice(model.price)} <span className="pdp__price-note">콘셉트 데모의 가상 가격</span>
          </p>
          <p className="pdp__tagline">{model.tagline}</p>

          {/* 치수표: 태그 사이즈 옆에 첫 세탁 뒤 치수를 함께 적어, 고르면서 생지 수축을 보게 한다 */}
          <div className="pdp__charts">
            <SizeChart
              legend="허리 (W)"
              name={`${chartId}-waist`}
              sizes={WAISTS}
              rate={model.shrink.waist}
              value={waist}
              onChange={(value) => {
                setWaist(value);
                setMissing(false);
              }}
            />
            <SizeChart
              legend="기장 (L)"
              name={`${chartId}-inseam`}
              sizes={INSEAMS}
              rate={model.shrink.inseam}
              value={inseam}
              onChange={(value) => {
                setInseam(value);
                setMissing(false);
              }}
            />
          </div>
          <p className="pdp__chart-note">세탁 후 치수는 콘셉트용 수축률로 계산한 근사치(인치)입니다.</p>

          {/* 여닫기는 네이티브 details가 맡는다(키보드·펼침 상태 안내 포함). +/− 표시는 CSS가 [open]을 보고 바꾼다. */}
          <details className="pdp__advisor">
            <summary className="pdp__advisor-toggle">
              생지 수축 감안해서 사이즈 추천받기 <span className="pdp__advisor-sign" aria-hidden="true" />
            </summary>
            <SizeAdvisor
              model={model}
              onApply={(size) => {
                setWaist(size.waist);
                setInseam(size.inseam);
                setMissing(false);
              }}
            />
          </details>

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
              {chapter.number} {chapter.title} 읽기
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
