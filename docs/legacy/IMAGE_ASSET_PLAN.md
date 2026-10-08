# Image Asset Plan

## Summary

현재 사이트의 기본 이미지 모드는 `generated`입니다. `public/images/generated/`의 WebP asset이 우선 사용되며, generated 이미지가 없는 항목이나 placeholder 모드에서는 `public/images/placeholders/`의 SVG fallback을 사용합니다.

원본 PNG는 `images-src/generated/`에 보관하고, 배포용 WebP만 `public/images/generated/`에 둡니다. 공유 미리보기용 OG 이미지는 `public/images/og-image.webp`로 별도 관리합니다.

## Current Mode

- Default mode: `generated`
- Placeholder override: `VITE_IMAGE_MODE=placeholder`
- Switch file: `src/data/assets.ts`
- Runtime generated assets: `public/images/generated/*.webp`
- Placeholder assets: `public/images/placeholders/*.svg`
- Generated source PNGs: `images-src/generated/*.png`
- OG image: `public/images/og-image.webp`
- OG source: `images-src/og-image.png`

## Commands

```bash
npm run dev
npm run build
```

```bash
npm run dev:placeholder
npm run build:placeholder
```

```bash
npm run assets:placeholders
npm run assets:generated
npm run assets:og
```

## Generated Runtime Assets

| Slot | Runtime asset | Source PNG | Status |
| --- | --- | --- | --- |
| 501 Original Fit | `public/images/generated/generated-501-original-fit.webp` | `images-src/generated/generated-501-original-fit.png` | Complete |
| 505 Regular Fit | `public/images/generated/generated-505-regular-fit.webp` | `images-src/generated/generated-505-regular-fit.png` | Complete |
| 517 Bootcut | `public/images/generated/generated-517-bootcut.webp` | `images-src/generated/generated-517-bootcut.png` | Complete |
| Frayed Layers | `public/images/generated/generated-frayed-layers.webp` | `images-src/generated/generated-frayed-layers.png` | Complete |
| Patchwork | `public/images/generated/generated-patchwork.webp` | `images-src/generated/generated-patchwork.png` | Complete |
| Seam Detail | `public/images/generated/generated-seam-detail.webp` | `images-src/generated/generated-seam-detail.png` | Complete |
| Indigo Vat | `public/images/generated/generated-indigo-vat.webp` | `images-src/generated/generated-indigo-vat.png` | Complete |
| Warp Threads | `public/images/generated/generated-warp-threads.webp` | `images-src/generated/generated-warp-threads.png` | Complete |
| Workwear Origin | `public/images/generated/generated-workwear-origin.webp` | `images-src/generated/generated-workwear-origin.png` | Complete |
| Rugged Wear Ad | `public/images/generated/generated-rugged-wear-ad.webp` | `images-src/generated/generated-rugged-wear-ad.png` | Complete |
| Music Icons | `public/images/generated/generated-music-icons.webp` | `images-src/generated/generated-music-icons.png` | Complete |
| Urban Culture | `public/images/generated/generated-urban-culture.webp` | `images-src/generated/generated-urban-culture.png` | Complete |

## Runtime Mapping

| Legacy filename | Placeholder | Generated image |
| --- | --- | --- |
| `501.png` | `placeholder-501-original-fit.svg` | `generated-501-original-fit.webp` |
| `505.png` | `placeholder-505-regular-fit.svg` | `generated-505-regular-fit.webp` |
| `517.png` | `placeholder-517-bootcut.svg` | `generated-517-bootcut.webp` |
| `abstract_pattern.png` | `placeholder-patchwork.svg` | `generated-patchwork.webp` |
| `advertisement(1).png` | `placeholder-rugged-wear-ad.svg` | `generated-rugged-wear-ad.webp` |
| `crafting(1).png` | `placeholder-warp-threads.svg` | `generated-warp-threads.webp` |
| `dye(1).png` | `placeholder-indigo-vat.svg` | `generated-indigo-vat.webp` |
| `hero(1).png` | `placeholder-frayed-layers.svg` | `generated-frayed-layers.webp` |
| `hero(9).png` | `placeholder-seam-detail.svg` | `generated-seam-detail.webp` |
| `rock'n'roll(2).png` | `placeholder-music-icons.svg` | `generated-music-icons.webp` |
| `streetculture(2).png` | `placeholder-urban-culture.svg` | `generated-urban-culture.webp` |
| `the_beginning(2).png` | `placeholder-workwear-origin.svg` | `generated-workwear-origin.webp` |

Generated image가 없는 legacy filename은 placeholder SVG를 계속 사용합니다. 이 항목들은 현재 화면에서 fallback 용도이거나 시각적 우선순위가 낮은 보조 asset입니다.

## QA Notes

- desktop, tablet, mobile viewport에서 generated 이미지 로딩을 확인했습니다.
- 모델 카드, texture 카드, culture 카드의 crop은 현재 레이아웃 기준으로 유지 가능합니다.
- horizontal overflow는 발견되지 않았습니다.
- 3D archive는 별도 리파인 대상이므로 이미지 asset 완료 범위와 분리해서 관리합니다.

## Next Refinement

- 실제 브랜드/제품 사진 사용 권한을 확보할 경우 generated asset을 실사 asset으로 교체합니다.
- hero 또는 LCP 후보 이미지가 명확해지면 preload/eager 전략을 별도 적용합니다.
- 배포 도메인이 확정되면 `og:image`를 절대 URL로 고정할 수 있습니다.
