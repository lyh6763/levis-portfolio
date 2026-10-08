import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { onLenis, registerScrollRefresh } from '../hooks/useSmoothScroll';

/**
 * GSAP + ScrollTrigger 설정. 스크롤 스크럽을 쓰는 시각화가 처음 불러올 때 한 번 실행된다.
 * 이 모듈을 첫 화면 경로에서 import하지 않아야 GSAP가 별도 청크로 남는다.
 */
gsap.registerPlugin(ScrollTrigger);
// 모바일 주소창 show/hide로 인한 리프레시(점프) 방지
ScrollTrigger.config({ ignoreMobileResize: true });

onLenis((lenis) => lenis.on('scroll', ScrollTrigger.update));

// 여러 시각화가 같은 프레임에 요청해도 재계산은 한 번만 한다.
let frame = 0;
registerScrollRefresh(() => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => ScrollTrigger.refresh());
});

export { gsap, ScrollTrigger };
