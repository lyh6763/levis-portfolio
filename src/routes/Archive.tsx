import { CultureList } from '../components/CultureList';
import { GalleryGrid } from '../components/GalleryGrid';
import { ModelList } from '../components/ModelList';
import { PageHero } from '../components/PageHero';
import { RevealSection } from '../components/RevealSection';
import { SectionHeader } from '../components/SectionHeader';
import { cultureItems, models, textureGallery } from '../data/content';
import { imagePath } from '../data/assets';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function Archive() {
  useDocumentMeta(
    "Archive | LEVI'S Heritage",
    '501·505·517 모델과 텍스처 갤러리, 리바이스를 둘러싼 문화 아카이브.',
  );

  return (
    <>
      <PageHero label="Collection" title="Archive" description="시간이 만든 텍스처와 무드" image={imagePath('hero(8).png')} />

      <RevealSection className="section models">
        <div className="container">
          <SectionHeader label="Icons" title="Legendary Fits" description="시대를 넘어 사랑받는 핏" centered />
          <ModelList items={models} />
        </div>
      </RevealSection>

      <RevealSection className="section texture-gallery">
        <div className="container">
          <SectionHeader label="Texture" title="Raw & Faded" description="시간이 만든 질감" centered />
          <GalleryGrid items={textureGallery} type="texture" />
        </div>
      </RevealSection>

      <RevealSection className="section culture-full">
        <div className="container">
          <SectionHeader label="Culture" title="Beyond Denim" description="작업복에서 문화 아이콘으로" centered />
          <CultureList items={cultureItems} />
        </div>
      </RevealSection>
    </>
  );
}
