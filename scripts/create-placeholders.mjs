import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outDir = 'public/images/placeholders';

const placeholders = [
  ['placeholder-501-original-fit.svg', '501 Original Fit', 'Generated product asset slot'],
  ['placeholder-505-regular-fit.svg', '505 Regular Fit', 'Generated product asset slot'],
  ['placeholder-517-bootcut.svg', '517 Bootcut', 'Generated product asset slot'],
  ['placeholder-patchwork.svg', 'Patchwork', 'Texture study asset slot'],
  ['placeholder-rugged-wear-ad.svg', 'Rugged Wear Ad', 'Culture image asset slot'],
  ['placeholder-arcuate-stitch.svg', 'Arcuate Stitch', 'Detail asset slot'],
  ['placeholder-copper-rivet.svg', 'Copper Rivet', 'Detail asset slot'],
  ['placeholder-warp-threads.svg', 'Warp Threads', 'Craft image asset slot'],
  ['placeholder-raw-fabric.svg', 'Raw Fabric', 'Craft image asset slot'],
  ['placeholder-cut-and-sew.svg', 'Cut and Sew', 'Craft image asset slot'],
  ['placeholder-indigo-vat.svg', 'Indigo Vat', 'Texture study asset slot'],
  ['placeholder-indigo-dye-process.svg', 'Indigo Dye Process', 'Craft image asset slot'],
  ['placeholder-denim-texture.svg', 'Denim Texture', 'Detail asset slot'],
  ['placeholder-frayed-layers.svg', 'Frayed Layers', 'Texture study asset slot'],
  ['placeholder-archive-gallery-01.svg', 'Archive Gallery 01', 'Archive image asset slot'],
  ['placeholder-archive-gallery-02.svg', 'Archive Gallery 02', 'Archive image asset slot'],
  ['placeholder-archive-gallery-03.svg', 'Archive Gallery 03', 'Archive image asset slot'],
  ['placeholder-archive-gallery-04.svg', 'Archive Gallery 04', 'Archive image asset slot'],
  ['placeholder-seam-detail.svg', 'Seam Detail', 'Texture study asset slot'],
  ['placeholder-music-icons.svg', 'Music Icons', 'Culture image asset slot'],
  ['placeholder-red-tab-detail.svg', 'Red Tab Detail', 'Detail asset slot'],
  ['placeholder-red-tab.svg', 'Red Tab', 'Symbol asset slot'],
  ['placeholder-stitch-rivet.svg', 'Stitch and Rivet', 'Craft detail asset slot'],
  ['placeholder-final-stitching.svg', 'Final Stitching', 'Craft image asset slot'],
  ['placeholder-urban-culture.svg', 'Urban Culture', 'Culture image asset slot'],
  ['placeholder-workwear-origin.svg', 'Workwear Origin', 'Culture image asset slot'],
  ['placeholder-generic.svg', 'Image Placeholder', 'Generated image asset slot'],
];

const escapeXml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const createSvg = (title, subtitle) => `\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500" role="img" aria-label="${escapeXml(title)} placeholder">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#efe4cf"/>
      <stop offset="1" stop-color="#c9b891"/>
    </linearGradient>
    <pattern id="weave" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M0 12H48M0 36H48M12 0V48M36 0V48" stroke="#10264a" stroke-opacity="0.08" stroke-width="2"/>
    </pattern>
  </defs>
  <rect width="1200" height="1500" fill="url(#bg)"/>
  <rect width="1200" height="1500" fill="url(#weave)"/>
  <rect x="96" y="96" width="1008" height="1308" rx="18" fill="none" stroke="#10264a" stroke-width="3" stroke-dasharray="18 18" opacity="0.5"/>
  <path d="M282 520C390 452 488 452 600 520C712 452 810 452 918 520V980C814 1048 710 1048 600 980C490 1048 386 1048 282 980V520Z" fill="#10264a" opacity="0.14"/>
  <path d="M600 520V980M282 740H918" stroke="#10264a" stroke-opacity="0.18" stroke-width="5"/>
  <text x="600" y="650" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="6" fill="#10264a">PLACEHOLDER</text>
  <text x="600" y="728" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="800" fill="#10264a">${escapeXml(title)}</text>
  <text x="600" y="800" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="28" fill="#7a5630">${escapeXml(subtitle)}</text>
  <text x="600" y="1280" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="22" letter-spacing="3" fill="#10264a" opacity="0.62">LEVIS HERITAGE PORTFOLIO ASSET</text>
</svg>
`;

await mkdir(outDir, { recursive: true });

await Promise.all(
  placeholders.map(([fileName, title, subtitle]) =>
    writeFile(join(outDir, fileName), createSvg(title, subtitle), 'utf8'),
  ),
);
