const SERIF_FAMILY = 'Noto Serif KR';

/** 페이지 load 뒤 브라우저가 한가할 때 실행한다. 첫 화면 그리기(LCP)와 네트워크를 다투지 않게 한다. */
function afterLoadIdle(run: () => void) {
  const idle = () => (window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 1)))(run);
  if (document.readyState === 'complete') {
    idle();
  } else {
    window.addEventListener('load', idle, { once: true });
  }
}

/**
 * 화면 밖 블록(content-visibility: auto)은 다가올 때에야 글자 모양을 계산하므로, 한글 웹폰트 조각(unicode-range)도
 * 그때 받는다. 그대로 두면 스크롤하던 중에 글자가 대체 서체에서 웹폰트로 바뀐다.
 * 그래서 첫 화면의 웹폰트가 도착하고 페이지 load가 끝난 뒤, 블록 전체 글자에 필요한 조각을 미리 받아 둔다.
 * 웹폰트 CSS가 이미 있으면(다른 페이지에서 넘어온 경우) 바로 예약한다. 정리 함수를 돌려준다.
 */
export function preloadSerifFontFor(root: ParentNode | null, selector: string): () => void {
  const fonts = document.fonts;
  if (!root || typeof fonts?.load !== 'function') {
    return () => {};
  }
  const text = [...new Set([...root.querySelectorAll(selector)].map((el) => el.textContent ?? '').join(''))].join('');
  if (!text.trim()) {
    return () => {};
  }

  const hasFace = () => {
    for (const face of fonts) {
      if (face.family.replace(/["']/g, '') === SERIF_FAMILY) {
        return true;
      }
    }
    return false;
  };
  const load = () =>
    afterLoadIdle(() => {
      fonts.load(`1em "${SERIF_FAMILY}"`, text).catch(() => {});
    });

  if (hasFace()) {
    load();
    return () => {};
  }
  const onLoadingDone = () => {
    if (hasFace()) {
      fonts.removeEventListener('loadingdone', onLoadingDone);
      load();
    }
  };
  fonts.addEventListener('loadingdone', onLoadingDone);
  return () => fonts.removeEventListener('loadingdone', onLoadingDone);
}
