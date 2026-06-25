import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { Archive } from './Archive';
import { HeroOrigin } from './HeroOrigin';
import { ProgressRail } from './ProgressRail';
import { StoryChapter, StoryChapterProps } from './StoryChapter';

const chapters: Required<StoryChapterProps>[] = [
  {
    id: 'patent',
    tone: 'tone-600',
    mode: 'dark',
    eyebrow: 'Chapter 02 · 1873',
    title: 'The Patent.',
    body: 'Jacob Davis와 함께 리벳으로 보강한 청바지 특허를 취득하며 오늘날 청바지의 원형을 만들었습니다.',
  },
  {
    id: 'culture',
    tone: 'tone-500',
    mode: 'dark',
    eyebrow: 'Chapter 03 · 1936–1967',
    title: 'Cultural Icon.',
    body: 'Red Tab과 청년·반문화 속에서 데님은 자유와 개성의 상징으로 자리 잡았습니다.',
  },
  {
    id: 'craft',
    tone: 'tone-500',
    mode: 'dark',
    eyebrow: 'Chapter 04',
    title: 'The Craft.',
    body: '셀비지 원단·인디고 염색·재단·봉제. 한 벌의 청바지가 시간을 입을 준비를 합니다.',
  },
  {
    id: 'today',
    tone: 'tone-ecru',
    mode: 'light',
    eyebrow: 'Chapter 05 · Today',
    title: '150 Years, Worn-in.',
    body: '오래 입을수록 선명해지는 헤리티지. 당신이 스크롤한 만큼 길든 한 벌처럼.',
  },
];

export function Experience() {
  useSmoothScroll();

  // 밝은 섹션(Today → Archive) 위에서는 nav를 잉크색으로 전환
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.experience .nav');
    const firstLight = document.querySelector<HTMLElement>('.experience .mode-light');
    const lastLight = document.querySelector<HTMLElement>('.experience .archive-stage');
    if (!nav || !firstLight || !lastLight) {
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: firstLight,
      start: 'top 56px',
      endTrigger: lastLight,
      end: 'bottom 56px',
      onToggle: (self) => nav.classList.toggle('is-light', self.isActive),
    });
    ScrollTrigger.refresh();

    return () => trigger.kill();
  }, []);

  return (
    <div className="experience">
      <nav className="nav">
        <div className="nav__brand">
          <span className="nav__logo">LEVI&apos;S</span>
          <span className="nav__tab">EST. 1853</span>
        </div>
        <div className="nav__links">
          <a href="#hero">Heritage</a>
          <a href="#craft">Craft</a>
          <a href="#archive">Archive</a>
        </div>
      </nav>

      <ProgressRail />

      <HeroOrigin />

      {chapters.map((chapter) => (
        <StoryChapter key={chapter.id} {...chapter} />
      ))}

      <Archive />
    </div>
  );
}
