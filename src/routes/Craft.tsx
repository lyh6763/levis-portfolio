import { GalleryGrid } from '../components/GalleryGrid';
import { PageHero } from '../components/PageHero';
import { ProcessSteps } from '../components/ProcessSteps';
import { RevealSection } from '../components/RevealSection';
import { SectionHeader } from '../components/SectionHeader';
import { detailGallery, processSteps } from '../data/content';
import { imagePath } from '../data/assets';

export function Craft() {
  return (
    <>
      <PageHero
        label="Craftsmanship"
        title="The Craft"
        description="한 벌의 청바지가 탄생하기까지"
        image={imagePath('hero(7).png')}
      />

      <RevealSection className="section sub-intro">
        <div className="container">
          <div className="sub-intro__content">
            <p className="sub-intro__lead">
              진정한 데님은 시간과 정성으로 만들어집니다. 원단 선정부터 최종 스티치까지 모든 공정에는 장인 정신이 담겨 있습니다.
            </p>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="section process">
        <div className="container">
          <ProcessSteps steps={processSteps} />
        </div>
      </RevealSection>

      <RevealSection className="section detail-gallery">
        <div className="container">
          <SectionHeader label="Details" title="Macro View" description="장인 정신이 담긴 디테일" centered />
          <GalleryGrid items={detailGallery} type="detail" />
        </div>
      </RevealSection>
    </>
  );
}
