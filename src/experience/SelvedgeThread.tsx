/**
 * 셀비지 실(②) — 좌측 진행 레일. fill 높이와 knot은 스크럽 타임라인이 구동한다.
 * (전 구간 글로벌 레일화는 후속 스테이지에서.)
 */
export function SelvedgeThread() {
  return (
    <div className="thread" aria-hidden="true">
      <div className="thread__track" />
      <div className="thread__fill">
        <div className="thread__dot" />
      </div>
      <div className="thread__knot" />
    </div>
  );
}
