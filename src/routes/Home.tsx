import { DnaCard } from '../components/DnaCard';
import { GalleryGrid } from '../components/GalleryGrid';
import { ImageCard } from '../components/ImageCard';
import { LazyBackground } from '../components/LazyBackground';
import { ReadMoreLink } from '../components/ReadMoreLink';
import { RevealSection } from '../components/RevealSection';
import { SectionHeader } from '../components/SectionHeader';
import { Timeline } from '../components/Timeline';
import {
  dnaCards,
  fits,
  homeCraftSteps,
  homeGallery,
  homeTimeline,
} from '../data/content';
import { imagePath } from '../data/assets';

export function Home() {
  return (
    <>
      <section className="hero">
        <LazyBackground className="hero__bg" src={imagePath('hero(1).png')} eager ariaHidden />
        <div className="hero__overlay" />
        <div className="container hero__content">
          <span className="red-tab hero__tag">Original American Denim</span>
          <h1 className="hero__title">
            DENIM.
            <br />
            <span className="text-stitch">SINCE 1873.</span>
          </h1>
          <p className="hero__desc">
            150년의 역사, 변하지 않는 본질.
            <br />
            노동자의 작업복에서 문화의 아이콘으로.
          </p>
          <ReadMoreLink to="/heritage">Explore Heritage</ReadMoreLink>
        </div>
      </section>

      <RevealSection className="section dna">
        <div className="container">
          <SectionHeader label="Brand DNA" title="The Signature" description="리바이스를 리바이스답게 만드는 상징적인 디테일" />
          <div className="dna__grid">
            {dnaCards.map((card) => (
              <DnaCard key={card.title} card={card} />
            ))}
          </div>
          <div className="stitch-line" />
          <ReadMoreLink to="/heritage">Discover More</ReadMoreLink>
        </div>
      </RevealSection>

      <RevealSection className="section timeline">
        <div className="container">
          <SectionHeader label="Heritage" title="150 Years of Denim" description="데님 역사를 꿰매어 간 여정" />
          <Timeline items={homeTimeline} />
          <div className="stitch-line" />
          <ReadMoreLink to="/heritage">Full Timeline</ReadMoreLink>
        </div>
      </RevealSection>

      <RevealSection className="section craft">
        <div className="container">
          <SectionHeader label="Craftsmanship" title="The Making" description="한 벌의 청바지가 탄생하기까지" />
          <div className="craft__steps">
            {homeCraftSteps.map((step, index) => (
              <article className="craft__step" key={step.title}>
                <span className="craft__number">{String(index + 1).padStart(2, '0')}</span>
                <div className="craft__image-wrap">
                  <LazyBackground className="craft__image" src={step.image} role="img" ariaLabel={step.alt} />
                </div>
                <h3 className="craft__title">{step.title}</h3>
                <p className="craft__desc">{step.description}</p>
              </article>
            ))}
          </div>
          <div className="stitch-line" />
          <ReadMoreLink to="/craft">Explore Craft</ReadMoreLink>
        </div>
      </RevealSection>

      <RevealSection className="section fits">
        <div className="container">
          <SectionHeader label="Icons" title="Iconic Fits" description="시대를 넘어 사랑받는 핏" />
          <div className="fits__grid">
            {fits.map((fit) => (
              <ImageCard key={fit.title} item={fit} className="fits__card" />
            ))}
          </div>
          <div className="stitch-line" />
          <ReadMoreLink to="/archive">View All Fits</ReadMoreLink>
        </div>
      </RevealSection>

      <RevealSection className="section gallery">
        <div className="container">
          <SectionHeader label="Archive" title="The Gallery" description="시간이 만든 텍스처와 무드" />
          <GalleryGrid items={homeGallery} type="home" />
          <div className="stitch-line" />
          <ReadMoreLink to="/archive">Full Archive</ReadMoreLink>
        </div>
      </RevealSection>

      <RevealSection className="section culture">
        <div className="container">
          <SectionHeader label="Culture" title="Beyond Denim" description="작업복에서 문화 아이콘으로" />
          <div className="culture__content">
            <div className="culture__image-wrap">
              <LazyBackground
                className="culture__image"
                src={imagePath('advertisement(1).png')}
                role="img"
                ariaLabel="빈티지 리바이스 광고 이미지"
              />
            </div>
            <div className="culture__tags">
              <span className="culture__tag">Workwear</span>
              <span className="culture__tag">Rock & Roll</span>
              <span className="culture__tag">Street</span>
            </div>
            <p className="culture__desc">
              광부의 작업복에서 할리우드, 록 음악, 스트리트 패션까지.
              리바이스는 언제나 문화의 중심에 있었습니다.
            </p>
          </div>
          <div className="stitch-line" />
          <ReadMoreLink to="/archive">Explore Culture</ReadMoreLink>
        </div>
      </RevealSection>
    </>
  );
}
