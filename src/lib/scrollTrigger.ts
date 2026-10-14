import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { onLenis, registerScrollRefresh } from '../hooks/useSmoothScroll';

/**
 * GSAP + ScrollTrigger 설정. 스크롤 스크럽을 쓰는 시각화가 처음 불러올 때 한 번 실행된다.
 * 이 모듈을 첫 화면 경로에서 import하지 않아야 GSAP가 별도 청크로 남는다.
 * 빌드 때 페이지를 미리 그릴 때(브라우저 없음)도 불러오므로, 브라우저에서만 설정한다.
 */
if (typeof window !== 'undefined') {
  setUpScrollTrigger();
}

function setUpScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);
  // 모바일 주소창 show/hide로 인한 리프레시(점프) 방지
  ScrollTrigger.config({ ignoreMobileResize: true });

  onLenis((lenis) => lenis.on('scroll', ScrollTrigger.update));

  // 여러 시각화가 같은 프레임에 요청해도 재계산은 한 번만 한다.
  let frame = 0;
  const refresh = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => ScrollTrigger.refresh());
  };
  registerScrollRefresh(refresh);

  // 트리거 위치는 앞쪽 글의 높이에 달려 있다. 높이가 바뀌는 두 경우에 다시 잰다.
  // - 웹폰트가 도착하면 문단 높이가 바뀐다(대체 서체와 줄바꿈이 다르다).
  // - 화면 밖 본문 블록(content-visibility: auto)은 다가올 때 실제 높이로 그려진다.
  // 여러 번 이어서 일어나므로 잠잠해진 뒤 한 번만 잰다.
  let settle = 0;
  const refreshWhenSettled = () => {
    window.clearTimeout(settle);
    settle = window.setTimeout(refresh, 120);
  };
  document.fonts?.addEventListener('loadingdone', refreshWhenSettled);
  document.addEventListener(
    'contentvisibilityautostatechange',
    (event) => {
      if (!(event as ContentVisibilityAutoStateChangeEvent).skipped) {
        refreshWhenSettled();
      }
    },
    { capture: true },
  );
}

export { gsap, ScrollTrigger };
