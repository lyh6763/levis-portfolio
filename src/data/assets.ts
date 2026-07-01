type ImageAsset = {
  placeholder: string;
  generated?: string;
};

type ImageMode = 'placeholder' | 'generated';

const IMAGE_MODE: ImageMode = import.meta.env.VITE_IMAGE_MODE === 'placeholder' ? 'placeholder' : 'generated';

const imageAssets: Record<string, ImageAsset> = {
  '501.png': {
    placeholder: 'placeholder-501-original-fit.svg',
    generated: 'generated-501-original-fit.webp',
  },
  '505.png': {
    placeholder: 'placeholder-505-regular-fit.svg',
    generated: 'generated-505-regular-fit.webp',
  },
  '517.png': {
    placeholder: 'placeholder-517-bootcut.svg',
    generated: 'generated-517-bootcut.webp',
  },
  'abstract_pattern.png': {
    placeholder: 'placeholder-patchwork.svg',
    generated: 'generated-patchwork.webp',
  },
  'advertisement(1).png': {
    placeholder: 'placeholder-rugged-wear-ad.svg',
    generated: 'generated-rugged-wear-ad.webp',
  },
  'arcuate_stitch.png': { placeholder: 'placeholder-arcuate-stitch.svg' },
  'copper_rivet.png': { placeholder: 'placeholder-copper-rivet.svg' },
  'crafting(1).png': {
    placeholder: 'placeholder-warp-threads.svg',
    generated: 'generated-warp-threads.webp',
  },
  'crafting(2).png': { placeholder: 'placeholder-raw-fabric.svg' },
  'crafting(3).png': { placeholder: 'placeholder-cut-and-sew.svg' },
  'dye(1).png': {
    placeholder: 'placeholder-indigo-vat.svg',
    generated: 'generated-indigo-vat.webp',
  },
  'dye(2).png': { placeholder: 'placeholder-indigo-dye-process.svg' },
  'dye(3).png': { placeholder: 'placeholder-denim-texture.svg' },
  'hero(1).png': {
    placeholder: 'placeholder-frayed-layers.svg',
    generated: 'generated-frayed-layers.webp',
  },
  'hero(2).png': { placeholder: 'placeholder-archive-gallery-01.svg' },
  'hero(3).png': { placeholder: 'placeholder-archive-gallery-02.svg' },
  'hero(4).png': { placeholder: 'placeholder-archive-gallery-03.svg' },
  'hero(5).png': { placeholder: 'placeholder-archive-gallery-04.svg' },
  'hero(9).png': {
    placeholder: 'placeholder-seam-detail.svg',
    generated: 'generated-seam-detail.webp',
  },
  "rock'n'roll(2).png": {
    placeholder: 'placeholder-music-icons.svg',
    generated: 'generated-music-icons.webp',
  },
  'red_tab.png': { placeholder: 'placeholder-red-tab-detail.svg' },
  'red_tab(1).png': { placeholder: 'placeholder-red-tab.svg' },
  'stitch_rivet(1).png': { placeholder: 'placeholder-stitch-rivet.svg' },
  'stitch_rivet(2).png': { placeholder: 'placeholder-final-stitching.svg' },
  'streetculture(2).png': {
    placeholder: 'placeholder-urban-culture.svg',
    generated: 'generated-urban-culture.webp',
  },
  'the_beginning(2).png': {
    placeholder: 'placeholder-workwear-origin.svg',
    generated: 'generated-workwear-origin.webp',
  },
};

export const imagePath = (fileName: string) => {
  const asset = imageAssets[fileName];

  if (!asset) {
    return `${import.meta.env.BASE_URL}images/placeholders/placeholder-generic.svg`;
  }

  if (IMAGE_MODE === 'generated' && asset.generated) {
    return `${import.meta.env.BASE_URL}images/generated/${asset.generated}`;
  }

  return `${import.meta.env.BASE_URL}images/placeholders/${asset.placeholder}`;
};
