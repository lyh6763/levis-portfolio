/**
 * 웹폰트 CSS(index.html의 #webfonts)는 미리 받아 두기만 하고, 앱이 첫 화면을 그린 뒤에 적용한다.
 * 첫 렌더 전에 적용되면(폰트 CSS가 JS보다 먼저 도착한 경우) 첫 화면이 웹폰트를 다 받을 때까지
 * 1.5–2.5초 늦게 그려지는 경우가 있었다. 그려진 뒤 적용하면 언제나 기본 서체로 먼저 보이고 웹폰트로 바뀐다.
 */
export function applyWebFontsAfterPaint() {
  const apply = () => {
    const link = document.getElementById('webfonts');
    if (link instanceof HTMLLinkElement && link.rel !== 'stylesheet') {
      link.rel = 'stylesheet';
    }
  };
  // requestAnimationFrame은 다음 페인트 직전에, 그 안의 setTimeout은 페인트가 끝난 뒤에 돈다.
  requestAnimationFrame(() => window.setTimeout(apply));
  // 백그라운드 탭에서는 requestAnimationFrame이 돌지 않으므로 늦게라도 적용한다.
  window.setTimeout(apply, 1000);
}
