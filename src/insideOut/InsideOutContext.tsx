import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const INSIDE_PATH = '/inside-out';
export const THREAD_GOAL = 5;

const STORAGE_KEY = 'warp-weft:threads';
const FLIP_MS = 1100;
const SWAP_AT_MS = 520; // 시트가 90도를 넘어 뒷면이 화면을 덮는 시점

type Toast = { id: number; text: string; action?: { label: string; onClick: () => void } };

type InsideOutValue = {
  threads: ReadonlySet<string>;
  collect: (id: string) => void;
  isInside: boolean;
  /** 사이트를 뒤집으며 이동한다. 기본값은 안쪽 ↔ 겉면 토글. */
  flip: (to?: string) => void;
  toast: Toast | null;
  dismissToast: () => void;
};

const InsideOutContext = createContext<InsideOutValue | null>(null);

export function useInsideOut() {
  const value = useContext(InsideOutContext);
  if (!value) {
    throw new Error('useInsideOut must be used inside InsideOutProvider');
  }
  return value;
}

function readThreads(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeThreads(threads: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...threads]));
  } catch {
    // 저장소를 쓸 수 없는 환경(사생활 보호 모드 등)에서는 이번 방문 동안만 기억한다.
  }
}

export function InsideOutProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isInside = pathname.startsWith(INSIDE_PATH);

  const [threads, setThreads] = useState<Set<string>>(readThreads);
  const [toast, setToast] = useState<Toast | null>(null);
  const [flipping, setFlipping] = useState<'in' | 'out' | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const flip = useCallback(
    (to?: string) => {
      const target = to ?? (isInside ? '/' : INSIDE_PATH);
      const direction = target.startsWith(INSIDE_PATH) ? 'in' : 'out';
      setToast(null);
      if (flipping) {
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        navigate(target);
        return;
      }
      setFlipping(direction);
      timers.current.push(
        window.setTimeout(() => navigate(target), SWAP_AT_MS),
        window.setTimeout(() => setFlipping(null), FLIP_MS),
      );
    },
    [flipping, isInside, navigate],
  );

  const collect = useCallback(
    (id: string) => {
      if (threads.has(id)) {
        return;
      }
      const next = new Set(threads).add(id);
      setThreads(next);
      writeThreads(next);
      setToast(
        next.size >= THREAD_GOAL
          ? {
              id: Date.now(),
              text: `풀린 실밥 ${next.size}개를 모두 찾았습니다. 이 옷의 안쪽을 볼 차례예요.`,
              action: { label: '뒤집어 보기', onClick: () => flip(INSIDE_PATH) },
            }
          : { id: Date.now(), text: `풀린 실밥 ${next.size} / ${THREAD_GOAL}. 바지 안쪽에 무언가 있습니다.` },
      );
    },
    [threads, flip],
  );

  // 알림은 잠시 뒤 사라진다. 행동 버튼이 있는 알림은 조금 더 오래 둔다.
  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(null), toast.action ? 9000 : 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const value = useMemo(
    () => ({ threads, collect, isInside, flip, toast, dismissToast: () => setToast(null) }),
    [threads, collect, isInside, flip, toast],
  );

  return (
    <InsideOutContext.Provider value={value}>
      {children}
      {flipping && <FlipOverlay direction={flipping} />}
    </InsideOutContext.Provider>
  );
}

/** 원단을 뒤집는 전환. 앞면(인디고, 오른쪽 위 사선) ↔ 뒷면(흰 씨실, 왼쪽 위 사선). */
function FlipOverlay({ direction }: { direction: 'in' | 'out' }) {
  return (
    <div className={`flip flip--${direction}`} aria-hidden="true">
      <div className="flip__sheet">
        <div className="flip__face flip__face--front">
          <span>Face</span>
        </div>
        <div className="flip__face flip__face--back">
          <span>Inside out</span>
        </div>
      </div>
    </div>
  );
}
