import { LazyBackground } from '../components/LazyBackground';
import { PageHero } from '../components/PageHero';
import { RevealSection } from '../components/RevealSection';
import { SectionHeader } from '../components/SectionHeader';
import { Timeline } from '../components/Timeline';
import { heritageTimeline, symbols } from '../data/content';
import { imagePath } from '../data/assets';

export function Heritage() {
  return (
    <>
      <PageHero label="Since 1873" title="Heritage" description="150년의 역사, 데님의 유산" image={imagePath('hero(6).png')} />

      <RevealSection className="section sub-intro">
        <div className="container">
          <div className="sub-intro__content">
            <p className="sub-intro__lead">
              1873년 캘리포니아 골드러시 시대, Levi Strauss와 Jacob Davis는 광부들을 위한 튼튼한 작업복을 만들었습니다.
            </p>
            <p>
              구리 리벳으로 보강한 청바지는 미국 최초의 청바지 특허를 얻었고, 이후 150년 동안 전 세계인의 옷장에 자리 잡았습니다.
            </p>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="section full-timeline">
        <div className="container">
          <SectionHeader label="Timeline" title="The Journey" centered />
          <Timeline items={heritageTimeline} variant="full" />
        </div>
      </RevealSection>

      <RevealSection className="section symbols">
        <div className="container">
          <SectionHeader label="Signature" title="Brand DNA" centered />
          <div className="symbols__grid">
            {symbols.map((symbol) => (
              <article className="symbols__item" key={symbol.title}>
                <LazyBackground className="symbols__image" src={symbol.image} role="img" ariaLabel={symbol.alt} />
                <div className="symbols__content">
                  <h3 className="symbols__title">{symbol.title}</h3>
                  <p className="symbols__desc">{symbol.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>
    </>
  );
}
