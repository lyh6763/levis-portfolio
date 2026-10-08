import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import { chapterBySlug } from '../data/chapters';
import {
  Answers,
  answersFromParams,
  Clue,
  clueById,
  clues,
  DOMAIN,
  estimate,
  Estimate,
  formatYear,
  UNKNOWN,
} from '../data/insideOut';
import { modelsForRange } from '../data/shop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ClueGlyph } from '../insideOut/ClueGlyph';
import { useInsideOut } from '../insideOut/InsideOutContext';
import { ModelCard } from '../shop/ModelCard';

const pct = (year: number) => ((year - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0])) * 100;
const firstUnanswered = (answers: Answers) => {
  const index = clues.findIndex((clue) => !answers[clue.id]);
  return index === -1 ? clues.length : index;
};

export function InsideOutPage() {
  useDocumentTitle('Inside Out');
  const [params, setParams] = useSearchParams();
  const answers = answersFromParams(params);
  const result = estimate(answers);
  // 공유 링크로 들어오면 이어서(또는 결과부터) 보여 준다.
  const [step, setStep] = useState(() => firstUnanswered(answers));
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const answer = (clue: Clue, value: string) => {
    const next = new URLSearchParams(params);
    next.set(clue.id, value);
    setParams(next, { replace: true });
    // 답을 고치러 돌아온 경우에도 아직 답하지 않은 첫 단서(없으면 결과)로 이어 간다.
    setStep(firstUnanswered(answersFromParams(next)));
  };

  const restart = () => {
    setParams(new URLSearchParams(), { replace: true });
    setStep(0);
  };

  const clue = clues[step];

  return (
    <article className="inside">
      <header className="inside__head">
        <p className="inside__kicker">Inside out · 빈티지 501 감정</p>
        <h1 className="inside__title">이 청바지는 몇 년생일까?</h1>
        <p className="inside__dek">
          수집가들은 청바지를 손에 넣으면 먼저 뒤집어 봅니다. 여덟 가지 단서를 차례로 확인하면, 아래 연표 위에서
          가능한 시기가 좁혀집니다. 모르는 단서는 건너뛰어도 괜찮습니다.
        </p>
      </header>

      <DateMeter result={result} />

      {clue ? (
        <section className="clue" aria-labelledby="clue-title">
          <div className="clue__top">
            <p className="clue__count">
              Clue {step + 1} / {clues.length}
            </p>
            {step > 0 && (
              <button type="button" className="clue__back" onClick={() => setStep(step - 1)}>
                ← 이전 단서
              </button>
            )}
          </div>
          <div className="clue__body">
            <ClueGlyph glyph={clue.glyph} />
            <div>
              <h2 className="clue__title" id="clue-title" ref={headingRef} tabIndex={-1}>
                {clue.title}
              </h2>
              <p className="clue__where">{clue.where}</p>
            </div>
          </div>
          <div className="clue__options" role="group" aria-labelledby="clue-title">
            {clue.options.map((option) => (
              <button
                key={option.value}
                type="button"
                className="clue__option"
                aria-pressed={answers[clue.id] === option.value}
                onClick={() => answer(clue, option.value)}
              >
                {option.label}
              </button>
            ))}
            <button
              type="button"
              className="clue__option clue__option--unknown"
              aria-pressed={answers[clue.id] === UNKNOWN}
              onClick={() => answer(clue, UNKNOWN)}
            >
              모르겠음 · 건너뛰기
            </button>
          </div>
        </section>
      ) : (
        <Result result={result} headingRef={headingRef} onRestart={restart} onEdit={setStep} />
      )}
    </article>
  );
}

/** 1873–현재 연표. 응답마다 가능한 구간이 좁혀진다. */
function DateMeter({ result }: { result: Estimate }) {
  const [from, to] = result.range;
  const ticks = [1880, 1900, 1920, 1940, 1960, 1980, 2000, 2020];
  const style = result.conflict ? undefined : ({ '--from': `${pct(from)}%`, '--to': `${pct(to)}%` } as CSSProperties);

  return (
    <div className={`meter${result.conflict ? ' is-conflict' : ''}`}>
      <p className="meter__label" aria-live="polite">
        {result.conflict ? (
          '단서가 서로 맞지 않습니다'
        ) : (
          <>
            <span className="meter__range">
              {formatYear(from)} – {formatYear(to)}
            </span>
            <span className="meter__span">{to - from}년 범위</span>
          </>
        )}
      </p>
      <div className="meter__track" aria-hidden="true">
        <div className="meter__fill" style={style} />
      </div>
      <div className="meter__ticks" aria-hidden="true">
        {ticks.map((year) => (
          <span key={year} style={{ left: `${pct(year)}%` }}>
            {year}
          </span>
        ))}
      </div>
    </div>
  );
}

type ResultProps = {
  result: Estimate;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
  onEdit: (step: number) => void;
};

function Result({ result, headingRef, onRestart, onEdit }: ResultProps) {
  const { flip } = useInsideOut();
  const [copied, setCopied] = useState(false);
  const [from, to] = result.range;
  const narrowed = result.boundBy.from || result.boundBy.to;
  const fromClue = result.boundBy.from ? clueById.get(result.boundBy.from) : undefined;
  const toClue = result.boundBy.to ? clueById.get(result.boundBy.to) : undefined;
  const phraseOf = (clue?: Clue) => {
    const finding = result.findings.find((candidate) => candidate.clue === clue);
    return finding ? `${finding.clue.name}(${finding.option.label})` : '';
  };
  const matches = modelsForRange(result.range);
  const skipped = clues.filter((clue) => !result.findings.some((finding) => finding.clue === clue));

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.prompt('이 링크를 복사하세요', window.location.href);
    }
  };

  return (
    <section className="result" aria-labelledby="result-title">
      <p className="result__kicker">Estimate</p>
      <h2 className="result__title" id="result-title" ref={headingRef} tabIndex={-1}>
        {result.conflict ? '맞지 않는 단서' : narrowed ? `${formatYear(from)} – ${formatYear(to)}` : '단서가 더 필요해요'}
      </h2>
      <p className="result__summary">
        {result.conflict
          ? '서로 다른 시대를 가리키는 단서가 섞여 있습니다. 옛 501을 재현한 복각 제품이거나, 수선으로 부품이 바뀐 옷일 수 있어요.'
          : narrowed
            ? [
                fromClue && `가장 이른 시기는 ${phraseOf(fromClue)}`,
                toClue && `가장 늦은 시기는 ${phraseOf(toClue)}`,
              ]
                .filter(Boolean)
                .join(', ') + ' 단서가 정했습니다.'
            : '모든 단서를 건너뛰었거나 구간을 좁히지 않는 답만 골랐습니다. 하나라도 확인해 보면 연표가 좁혀집니다.'}
      </p>

      <ol className="result__findings">
        {result.findings.map(({ clue, option }) => {
          const index = clues.indexOf(clue);
          const chapter = chapterBySlug.get(clue.chapter);
          const bound = result.boundBy.from === clue.id || result.boundBy.to === clue.id;
          return (
            <li key={clue.id} className={`finding${bound ? ' is-bound' : ''}`}>
              <ClueGlyph glyph={clue.glyph} small />
              <div className="finding__text">
                <p className="finding__q">{clue.title}</p>
                <p className="finding__a">
                  {option.label}
                  <span className="finding__range">
                    {option.range ? `${formatYear(option.range[0])}–${formatYear(option.range[1])}` : '구간 영향 없음'}
                  </span>
                  {bound && <span className="finding__badge">결정적 단서</span>}
                </p>
                <p className="finding__links">
                  <button type="button" onClick={() => onEdit(index)}>
                    답 바꾸기
                  </button>
                  {chapter && (
                    <Link to={`/chapters/${chapter.slug}`}>
                      {chapter.number} {chapter.title} 읽기
                    </Link>
                  )}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {skipped.length > 0 && (
        <div className="result__skipped">
          <p>건너뛴 단서를 확인하면 범위가 더 좁혀질 수 있어요.</p>
          <ul>
            {skipped.map((clue) => (
              <li key={clue.id}>
                <button type="button" onClick={() => onEdit(clues.indexOf(clue))}>
                  {clue.name} 확인하기
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!result.conflict && narrowed && (
        <div className="result__models">
          <p className="result__models-title">
            {matches.exact ? '이 시대를 다시 지은 한 벌' : '이 시대와 가장 가까운 복각'}
          </p>
          {matches.models.map((model) => (
            <ModelCard key={model.slug} model={model} variant="inline" />
          ))}
        </div>
      )}

      <div className="result__actions">
        <button type="button" className="result__primary" onClick={copyLink}>
          {copied ? '링크를 복사했어요' : '결과 링크 복사'}
        </button>
        <button type="button" className="result__secondary" onClick={onRestart}>
          처음부터 다시
        </button>
        <button type="button" className="result__secondary" onClick={() => flip('/')}>
          겉면으로 돌아가기 ↺
        </button>
      </div>

      <p className="result__disclaimer">
        501 기준의 일반적인 경향으로 추정한 참고용 결과이며, 실제 감정을 대신하지 않습니다. 공장과 재고, 수선 이력에
        따라 예외가 있습니다. 근거는 <Link to="/sources#lsco-501">출처</Link>를 참고하세요.
      </p>
    </section>
  );
}
