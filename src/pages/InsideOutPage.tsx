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
  Range,
  UNKNOWN,
} from '../data/insideOut';
import { modelsForRange } from '../data/shop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { OptionDrawing } from '../insideOut/ClueDrawing';
import { useInsideOut } from '../insideOut/InsideOutContext';
import { ModelCard } from '../shop/ModelCard';

const pct = (year: number) => ((year - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0])) * 100;
/** 연표 칸 안에서 구간의 왼쪽·오른쪽 끝(CSS 변수) */
const spanStyle = ([from, to]: Range) => ({ '--from': `${pct(from)}%`, '--to': `${pct(to)}%` }) as CSSProperties;
const formatRange = ([from, to]: Range) => `${formatYear(from)}–${formatYear(to)}`;
const TICKS = [1900, 1925, 1950, 1975, 2000];
// 좁은 화면의 연표 칸에는 세 눈금만 적는다
const MAJOR_TICKS = [1900, 1950, 2000];

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

  const done = step >= clues.length;

  return (
    <article className="inside">
      <header className="inside__head">
        <h1 className="inside__title">이 청바지는 몇 년생일까?</h1>
        <p className="inside__dek">
          수집가들은 청바지를 손에 넣으면 먼저 뒤집어 봅니다. 아래 감정 기록의 여덟 단서를 하나씩 채우면, 답마다
          가능한 시기가 연표에 그어지고 모두 겹치는 구간만 남습니다. 모르는 단서는 건너뛰어도 괜찮습니다.
        </p>
      </header>

      <section className="ledger" aria-label="감정 기록">
        <LedgerHead result={result} />
        <div className="ledger__body">
          <ol className="ledger__rows">
            {clues.map((clue, index) => (
              <LedgerRow
                key={clue.id}
                clue={clue}
                index={index}
                answer={answers[clue.id]}
                open={index === step}
                bound={!result.conflict && (result.boundBy.from === clue.id || result.boundBy.to === clue.id)}
                onOpen={() => setStep(index)}
                onAnswer={(value) => answer(clue, value)}
                headingRef={headingRef}
              />
            ))}
          </ol>
          <div className="ledger__grid" aria-hidden="true">
            {TICKS.map((year) => (
              <span key={year} style={{ left: `${pct(year)}%` }} />
            ))}
          </div>
          {/* 모든 답의 구간이 겹치는 곳. 행을 세로로 가로질러 연표 칸에 깐다. */}
          {!result.conflict && <div className="ledger__band" style={spanStyle(result.range)} aria-hidden="true" />}
        </div>
      </section>

      {done && <Result result={result} headingRef={headingRef} onRestart={restart} />}
    </article>
  );
}

/** 기록 머리: 지금까지의 추정 구간과 연표 눈금. 스크롤해도 머리글 아래에 붙어 있다. */
function LedgerHead({ result }: { result: Estimate }) {
  const [from, to] = result.range;
  return (
    <div className={`ledger__head${result.conflict ? ' is-conflict' : ''}`}>
      <p className="ledger__estimate" aria-live="polite">
        {result.conflict ? (
          '단서가 서로 맞지 않습니다'
        ) : (
          <>
            <span className="ledger__kicker">추정</span>
            <span className="ledger__range">
              {formatYear(from)} – {formatYear(to)}
            </span>
            <span className="ledger__span">{to - from}년 범위</span>
          </>
        )}
      </p>
      <div className="ledger__axis" aria-hidden="true">
        {TICKS.map((year) => (
          <span key={year} className={MAJOR_TICKS.includes(year) ? 'is-major' : undefined} style={{ left: `${pct(year)}%` }}>
            {year}
          </span>
        ))}
      </div>
    </div>
  );
}

type RowProps = {
  clue: Clue;
  index: number;
  answer?: string;
  open: boolean;
  bound: boolean;
  onOpen: () => void;
  onAnswer: (value: string) => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
};

/** 기록 한 줄: 번호, 단서, 답과 그 답의 구간. 펼친 줄에서는 질문을 받는다. */
function LedgerRow({ clue, index, answer, open, bound, onOpen, onAnswer, headingRef }: RowProps) {
  const option = clue.options.find((candidate) => candidate.value === answer);
  const skipped = answer === UNKNOWN;
  const state = open ? 'is-open' : option ? 'is-answered' : skipped ? 'is-skipped' : 'is-pending';

  const head = (
    <>
      <span className="row__num">{String(index + 1).padStart(2, '0')}</span>
      <span className="row__text">
        <span className="row__name">{clue.name}</span>
        {option ? (
          <span className="row__answer">
            {option.label}
            <span className="row__range">{option.range ? formatRange(option.range) : '구간 영향 없음'}</span>
          </span>
        ) : skipped ? (
          <span className="row__answer">모름</span>
        ) : open ? (
          <span className="row__answer">확인하는 중</span>
        ) : null}
        {bound && <span className="row__bound">범위를 정한 단서</span>}
      </span>
    </>
  );

  return (
    <li className={`row ${state}${bound ? ' is-bound' : ''}`}>
      {open ? (
        <div className="row__head">{head}</div>
      ) : (
        <button type="button" className="row__head" onClick={onOpen}>
          {head}
          <span className="visually-hidden">{answer ? ', 답 바꾸기' : ', 확인하기'}</span>
        </button>
      )}
      <span className="row__track" aria-hidden="true">
        {option?.range && <span className="row__seg" style={spanStyle(option.range)} />}
      </span>
      {open && <Ask clue={clue} answer={answer} onAnswer={onAnswer} headingRef={headingRef} />}
    </li>
  );
}

type AskProps = {
  clue: Clue;
  answer?: string;
  onAnswer: (value: string) => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
};

/** 펼친 단서의 질문. 선택지마다 선 그림과, 그 답이 가리키는 시기를 함께 보인다. */
function Ask({ clue, answer, onAnswer, headingRef }: AskProps) {
  const chapter = chapterBySlug.get(clue.chapter);
  return (
    <div className="ask">
      <h2 className="ask__title" id="ask-title" ref={headingRef} tabIndex={-1}>
        {clue.title}
      </h2>
      <p className="ask__where">{clue.where}</p>
      <div className="ask__options" role="group" aria-labelledby="ask-title">
        {clue.options.map((option) => (
          <button
            key={option.value}
            type="button"
            className="opt"
            aria-pressed={answer === option.value}
            onClick={() => onAnswer(option.value)}
          >
            <OptionDrawing clue={clue.id} value={option.value} />
            <span className="opt__label">{option.label}</span>
            <span className="opt__range">{option.range ? formatRange(option.range) : '구간 영향 없음'}</span>
          </button>
        ))}
        <button
          type="button"
          className="opt opt--unknown"
          aria-pressed={answer === UNKNOWN}
          onClick={() => onAnswer(UNKNOWN)}
        >
          모르겠음 · 건너뛰기
        </button>
      </div>
      {chapter && (
        <p className="ask__source">
          이 단서의 배경: <Link to={`/chapters/${chapter.slug}`}>{`${chapter.number} ${chapter.title}`}</Link>
        </p>
      )}
    </div>
  );
}

type ResultProps = {
  result: Estimate;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
};

function Result({ result, headingRef, onRestart }: ResultProps) {
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
  const skipped = clues.length - result.findings.length;

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
      <p className="result__kicker">감정 결과</p>
      <h2 className="result__title" id="result-title" ref={headingRef} tabIndex={-1}>
        {result.conflict ? '맞지 않는 단서' : narrowed ? `${formatYear(from)} – ${formatYear(to)}` : '단서가 더 필요해요'}
      </h2>
      <p className="result__summary">
        {result.conflict
          ? '서로 다른 시대를 가리키는 단서가 섞여 있습니다. 위 기록에서 구간 막대가 겹치지 않는 줄을 보세요. 옛 501을 재현한 복각 제품이거나, 수선으로 부품이 바뀐 옷일 수 있어요.'
          : narrowed
            ? [
                fromClue && `가장 이른 시기는 ${phraseOf(fromClue)}`,
                toClue && `가장 늦은 시기는 ${phraseOf(toClue)}`,
              ]
                .filter(Boolean)
                .join(', ') + ' 단서가 정했습니다.'
            : '모든 단서를 건너뛰었거나 구간을 좁히지 않는 답만 골랐습니다. 하나라도 확인해 보면 연표가 좁혀집니다.'}
        {skipped > 0 && ` 건너뛴 단서 ${skipped}개는 위 기록에서 눌러 확인하면 범위가 더 좁혀질 수 있어요.`}
      </p>

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
