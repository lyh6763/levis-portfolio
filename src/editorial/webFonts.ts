/** 마지막 페인트 기록(FCP·LCP 후보) 뒤로 이만큼 새 기록이 없으면 첫 화면이 다 그려졌다고 본다. */
const QUIET_MS = 300;
/** 첫 페인트 뒤 LCP 후보가 계속 이어져도 이 시간이 지나면 적용한다. */
const MAX_WAIT_AFTER_FCP_MS = 3000;

/**
 * 웹폰트 CSS(index.html의 #webfonts)는 미리 받아 두기만 하고, 첫 화면이 다 그려진 뒤에 적용한다.
 * 첫 페인트 전에 적용되면 첫 화면이 웹폰트를 다 받을 때까지 1.5–2.5초 늦게 그려지는 경우가 있었고,
 * Lighthouse도 첫 화면(FCP·LCP) 전에 요청된 웹폰트 다운로드를 그 시간에 넣는다.
 * 그려진 뒤 적용하면 언제나 기본 서체로 먼저 보이고 웹폰트로 바뀐다.
 *
 * 기다리는 기준은 브라우저가 기록한 페인트 시점이다.
 * - 예전의 requestAnimationFrame + 1초 타이머는 첫 프레임이 1초 넘게 늦은 환경(PageSpeed Insights 측정기에서 1–2.4초)에서
 *   타이머가 먼저 돌아 웹폰트가 첫 페인트 앞에 끼었다.
 * - first-contentful-paint 직후도 이르다. 첫 프레임에는 제목만 그려지고 본문 문단(LCP)은 hydrate가 끝난 다음 프레임에
 *   그려지는 경우가 있어(측정기에서 170–220ms 뒤), 그 사이에 웹폰트가 끼면 LCP가 5초대로 계산됐다.
 * 그래서 마지막 LCP 후보 뒤로 잠잠하고 메인 스레드가 한가할 때 적용한다.
 */
export function applyWebFontsAfterPaint() {
  let applied = false;
  const apply = () => {
    if (applied) {
      return;
    }
    applied = true;
    const link = document.getElementById('webfonts');
    if (link instanceof HTMLLinkElement && link.rel !== 'stylesheet') {
      link.rel = 'stylesheet';
    }
  };

  // 백그라운드 탭은 보일 때까지 그리지 않으므로 경합이 없다. 바로 적용해 그사이 받아 둔다.
  if (document.visibilityState === 'hidden') {
    apply();
    return;
  }

  const entryTypes = typeof PerformanceObserver === 'undefined' ? [] : (PerformanceObserver.supportedEntryTypes ?? []);
  if (!entryTypes.includes('paint')) {
    // Paint Timing이 없는 브라우저: requestAnimationFrame은 다음 페인트 직전에, 그 안의 setTimeout은 페인트 뒤에 돈다.
    requestAnimationFrame(() => window.setTimeout(apply));
    window.setTimeout(apply, 1000);
    return;
  }

  const idle =
    window.requestIdleCallback ?? ((callback: () => void, _options?: IdleRequestOptions) => window.setTimeout(callback, 50));
  let lastPaintAt = -1;
  let capped = false;
  let timer: number | undefined;

  const finish = () => {
    observer.disconnect();
    window.clearTimeout(timer);
    apply();
  };
  // 마지막 기록 뒤 QUIET_MS가 지났고 메인 스레드가 한가하면 적용한다. 기다리는 사이 새 후보가 오면 다시 기다린다.
  const finishWhenQuiet = () => {
    if (applied) {
      return;
    }
    const wait = lastPaintAt + QUIET_MS - performance.now();
    if (wait > 0) {
      window.clearTimeout(timer);
      timer = window.setTimeout(finishWhenQuiet, wait);
      return;
    }
    idle(() => (performance.now() - lastPaintAt >= QUIET_MS ? finish() : finishWhenQuiet()), { timeout: 1000 });
  };

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'paint' && entry.name !== 'first-contentful-paint') {
        continue;
      }
      if (!capped && entry.entryType === 'paint') {
        capped = true;
        window.setTimeout(finish, MAX_WAIT_AFTER_FCP_MS);
      }
      lastPaintAt = Math.max(lastPaintAt, entry.startTime);
    }
    if (lastPaintAt >= 0) {
      finishWhenQuiet();
    }
  });
  // buffered: 이미 그려졌다면(hydrate 전에 HTML이 먼저 그려진 경우) 기록된 항목으로 바로 불린다.
  observer.observe({ type: 'paint', buffered: true });
  if (entryTypes.includes('largest-contentful-paint')) {
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }
  // 첫 페인트 기록이 끝내 오지 않는 경우에 대비한 안전장치. 첫 화면 경합과 겹치지 않을 만큼 넉넉히 둔다.
  window.setTimeout(finish, 10000);
}
