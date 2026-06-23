import { ProcessStep } from '../data/content';

import { LazyBackground } from './LazyBackground';

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <>
      {steps.map((step, index) => (
        <div key={step.number}>
          <article className="process__step">
            <div className="process__header">
              <span className="process__number">{step.number}</span>
              <h2 className="process__title">{step.title}</h2>
            </div>
            <div className={`process__body${index % 2 === 1 ? ' process__body--reverse' : ''}`}>
              <div className="process__image-wrap">
                <LazyBackground className="process__image" src={step.image} role="img" ariaLabel={step.alt} />
              </div>
              <div className="process__content">
                <h3 className="process__subtitle">{step.subtitle}</h3>
                {step.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <ul className="process__list">
                  {step.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
          {index < steps.length - 1 ? <div className="stitch-line" /> : null}
        </div>
      ))}
    </>
  );
}
