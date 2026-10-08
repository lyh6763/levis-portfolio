import { useInsideOut } from './InsideOutContext';

/** 실밥 수집 알림. 항상 마운트된 live region 안에서 내용만 바뀐다. */
export function Toast() {
  const { toast, dismissToast } = useInsideOut();

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div className="toast" key={toast.id}>
          <p>{toast.text}</p>
          <div className="toast__actions">
            {toast.action && (
              <button type="button" className="toast__action" onClick={toast.action.onClick}>
                {toast.action.label} <span aria-hidden="true">↺</span>
              </button>
            )}
            <button type="button" className="toast__close" onClick={dismissToast} aria-label="알림 닫기">
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
