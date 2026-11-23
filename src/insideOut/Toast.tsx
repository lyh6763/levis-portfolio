import { useEffect, useRef, useState, type FocusEvent } from 'react';

import { useInsideOut } from './InsideOutContext';

/** 알림이 떠 있는 시간. 행동 버튼이 있는 알림은 조금 더 오래 둔다. */
const TOAST_MS = 4200;
const TOAST_WITH_ACTION_MS = 9000;

type ToastData = NonNullable<ReturnType<typeof useInsideOut>['toast']>;

/** 실밥 수집 알림. 항상 마운트된 live region 안에서 내용만 바뀐다. */
export function Toast() {
  const { toast, dismissToast } = useInsideOut();

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {/* 알림마다 새로 그려 멈춤 상태와 돌아갈 포커스를 초기화한다. */}
      {toast && <ToastCard key={toast.id} toast={toast} onDismiss={dismissToast} />}
    </div>
  );
}

function ToastCard({ toast, onDismiss }: { toast: ToastData; onDismiss: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // 알림에 들어오기 직전에 포커스가 있던 요소. 닫기 버튼으로 닫으면 그리로 돌려보낸다.
  const returnFocus = useRef<HTMLElement | null>(null);

  // 잠시 뒤 사라지되, 마우스가 올라가 있거나 키보드 포커스가 안에 있는 동안은 멈춘다.
  // 벗어나면 처음부터 다시 센다(행동 버튼을 누르려던 사람이 놓치지 않게).
  useEffect(() => {
    if (hovered || focused) {
      return;
    }
    const timer = window.setTimeout(onDismiss, toast.action ? TOAST_WITH_ACTION_MS : TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [hovered, focused, toast.action, onDismiss]);

  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    // 바깥 요소에서 들어올 때만 기억한다. 문서(body)에서 들어오면 앞서 기억한 위치를 지우지 않는다.
    const from = event.relatedTarget;
    if (from instanceof HTMLElement && !event.currentTarget.contains(from)) {
      returnFocus.current = from;
    }
    setFocused(true);
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setFocused(false);
    }
  };

  const close = () => {
    const target = returnFocus.current;
    onDismiss();
    if (target?.isConnected) {
      target.focus({ preventScroll: true });
    }
  };

  return (
    <div
      className="toast"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <p>{toast.text}</p>
      <div className="toast__actions">
        {toast.action && (
          <button type="button" className="toast__action" onClick={toast.action.onClick}>
            {toast.action.label} <span aria-hidden="true">↺</span>
          </button>
        )}
        <button type="button" className="toast__close" onClick={close} aria-label="알림 닫기">
          ×
        </button>
      </div>
    </div>
  );
}
