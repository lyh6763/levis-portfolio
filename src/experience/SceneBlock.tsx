import { ReactNode } from 'react';

type SceneBlockProps = {
  variant: 'hero' | 'origin' | 'story';
  eyebrow: string;
  eyebrowVariant?: 'tab' | 'chapter';
  children: ReactNode;
};

/** 내러티브 텍스트 블록: eyebrow + (caller가 구성한) 타이틀/본문. 스크럽으로 크로스페이드된다. */
export function SceneBlock({ variant, eyebrow, eyebrowVariant = 'tab', children }: SceneBlockProps) {
  return (
    <div className={`scene scene--${variant}`}>
      <span className={`eyebrow eyebrow--${eyebrowVariant}`}>{eyebrow}</span>
      {children}
    </div>
  );
}
