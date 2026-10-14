/**
 * 웹폰트 CSS(index.html의 #webfonts)는 미리 받아 두기만 하고, 첫 화면이 그려진 뒤에 적용한다.
 * 첫 페인트 전에 적용되면 첫 화면이 웹폰트를 다 받을 때까지 1.5–2.5초 늦게 그려지는 경우가 있었고,
 * Lighthouse도 웹폰트 다운로드를 첫 화면 시간에 넣는다. 그려진 뒤 적용하면 언제나 기본 서체로 먼저 보이고 웹폰트로 바뀐다.
 *
 * 기다리는 기준은 브라우저가 기록한 first-contentful-paint다. 예전에는 requestAnimationFrame 다음 틱과
 * 1초 대비 타이머를 썼는데, 첫 프레임이 1초 넘게 늦은 환경(PageSpeed Insights 측정기에서 1–2.4초)에서는
 * 타이머가 먼저 돌아 웹폰트가 첫 페인트 앞에 끼었다.
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

  if (typeof PerformanceObserver === 'undefined' || !PerformanceObserver.supportedEntryTypes?.includes('paint')) {
    // Paint Timing이 없는 브라우저: requestAnimationFrame은 다음 페인트 직전에, 그 안의 setTimeout은 페인트 뒤에 돈다.
    requestAnimationFrame(() => window.setTimeout(apply));
    window.setTimeout(apply, 1000);
    return;
  }

  const observer = new PerformanceObserver((list) => {
    if (list.getEntriesByName('first-contentful-paint').length > 0) {
      observer.disconnect();
      window.setTimeout(apply);
    }
  });
  // buffered: 이미 그려졌다면(hydrate 전에 HTML이 먼저 그려진 경우) 기록된 항목으로 바로 불린다.
  observer.observe({ type: 'paint', buffered: true });
  // 첫 페인트 기록이 끝내 오지 않는 경우에 대비한 안전장치. 첫 화면 경합과 겹치지 않을 만큼 넉넉히 둔다.
  window.setTimeout(() => {
    observer.disconnect();
    apply();
  }, 10000);
}
