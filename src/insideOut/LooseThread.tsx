import { useInsideOut } from './InsideOutContext';

/**
 * 본문 여백에 숨은 '풀린 실밥'. 당기면 실이 팽팽해지며 수집된다.
 * 장식처럼 보이지만 실제 버튼이라 키보드·스크린 리더로도 찾을 수 있다.
 */
export function LooseThread({ id }: { id: string }) {
  const { threads, collect } = useInsideOut();
  const pulled = threads.has(id);

  return (
    <div className="thread-slot">
      <button
        type="button"
        className={`thread${pulled ? ' is-pulled' : ''}`}
        aria-label={pulled ? '당긴 실밥' : '풀린 실밥 당기기'}
        aria-pressed={pulled}
        onClick={() => collect(id)}
      >
        <svg viewBox="0 0 120 40" aria-hidden="true">
          <path className="thread__seam" d="M0,20 L72,20" />
          <path className="thread__loose" d={pulled ? 'M72,20 L116,20' : 'M72,20 C88,20 92,34 102,30 C112,26 104,12 114,10'} />
        </svg>
      </button>
    </div>
  );
}
