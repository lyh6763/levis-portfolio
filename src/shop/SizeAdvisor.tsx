import { useId, useState } from 'react';

import { adviseSize, Model } from '../data/shop';

const WAIST_CHOICES = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
const INSEAM_CHOICES = [28, 29, 30, 31, 32, 33, 34];

const toCm = (inch: number) => (inch * 2.54).toFixed(1);

type SizeAdvisorProps = {
  model: Model;
  onApply: (size: { waist: number; inseam: number }) => void;
};

/**
 * 생지 수축 사이즈 추천기. '세탁 후 원하는 치수'를 받아 태그 사이즈를 고른다.
 * 태그 기장과 세탁 후 기장을 막대로 나란히 보여 줘 수축을 직관적으로 이해하게 한다.
 */
export function SizeAdvisor({ model, onApply }: SizeAdvisorProps) {
  const [waist, setWaist] = useState(32);
  const [inseam, setInseam] = useState(32);
  const waistId = useId();
  const inseamId = useId();
  const advice = adviseSize(model, { waist, inseam });
  const maxInseam = Math.max(...INSEAM_CHOICES, advice.inseam);

  return (
    <div className="advisor">
      <p className="advisor__intro">
        생지 데님은 첫 세탁에서 허리가 약 {Math.round(model.shrink.waist * 100)}%, 기장이 약{' '}
        {Math.round(model.shrink.inseam * 100)}% 줄어듭니다. 세탁 후 원하는 치수를 고르면 태그 사이즈를 골라 드려요.
      </p>

      <div className="advisor__inputs">
        <label htmlFor={waistId}>
          <span>지금 잘 맞는 청바지 허리</span>
          <select id={waistId} value={waist} onChange={(event) => setWaist(Number(event.target.value))}>
            {WAIST_CHOICES.map((value) => (
              <option key={value} value={value}>
                {value}인치 ({toCm(value)}cm)
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={inseamId}>
          <span>세탁 후 원하는 기장(인심)</span>
          <select id={inseamId} value={inseam} onChange={(event) => setInseam(Number(event.target.value))}>
            {INSEAM_CHOICES.map((value) => (
              <option key={value} value={value}>
                {value}인치 ({toCm(value)}cm)
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="advisor__result" aria-live="polite">
        <p className="advisor__label">추천 태그 사이즈</p>
        <p className="advisor__size">
          W{advice.waist} · L{advice.inseam}
        </p>
        <p className="advisor__after">
          세탁 후 예상 허리 {advice.after.waist.toFixed(1)}인치 · 기장 {advice.after.inseam.toFixed(1)}인치
        </p>
        {advice.outOfRange && (
          <p className="advisor__warn">준비된 가장 큰 사이즈로도 원하는 치수에 조금 못 미칠 수 있어요.</p>
        )}
      </div>

      <div className="advisor__bars" aria-hidden="true">
        <div className="advisor__bar-row">
          <span>태그 L{advice.inseam}</span>
          <div className="advisor__bar advisor__bar--tag" style={{ width: `${(advice.inseam / maxInseam) * 100}%` }} />
        </div>
        <div className="advisor__bar-row">
          <span>세탁 후</span>
          <div
            className="advisor__bar advisor__bar--after"
            style={{ width: `${(advice.after.inseam / maxInseam) * 100}%` }}
          />
        </div>
      </div>

      <button type="button" className="advisor__apply" onClick={() => onApply({ waist: advice.waist, inseam: advice.inseam })}>
        W{advice.waist} · L{advice.inseam} 선택하기
      </button>
      <p className="advisor__note">수축률은 콘셉트용 근사치입니다. 원단과 세탁 방법에 따라 달라집니다.</p>
    </div>
  );
}
