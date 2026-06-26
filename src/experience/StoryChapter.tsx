import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { SceneBlock } from './SceneBlock';

export type StoryChapterProps = {
  id: string;
  tone: string;
  mode?: 'dark' | 'light';
  eyebrow: string;
  title: string;
  body: string;
};

/**
 * 내러티브 reveal 챕터. fade-scale을 단계적으로 잇는 tone + 진입 시 fade-up.
 * Hero→Origin의 연속 스크럽 뒤를 잇는 에디토리얼 비트.
 */
export function StoryChapter({ id, tone, mode = 'dark', eyebrow, title, body }: StoryChapterProps) {
  const [ref, isVisible] = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className={`story-chapter ${tone} mode-${mode}`} id={id}>
      <div ref={ref} className={`reveal${isVisible ? ' is-visible' : ''}`}>
        <SceneBlock variant="story" eyebrow={eyebrow} eyebrowVariant="chapter">
          <h2 className="story__title">{title}</h2>
          <p className="story__body">{body}</p>
        </SceneBlock>
      </div>
    </section>
  );
}
