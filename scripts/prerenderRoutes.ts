import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type { Plugin } from 'vite';

import { chapters } from '../src/data/chapters';
import { models } from '../src/data/shop';

/**
 * 빌드 후 라우트마다 `<path>/index.html`을 써서 GitHub Pages가 딥 링크에 200을 돌려주게 한다.
 * 본문은 클라이언트에서 렌더링하고, <head>의 제목·설명·canonical·OG만 라우트별로 바꾼다.
 * 함께 404.html(noindex)과 sitemap.xml도 만든다.
 */

const SITE_NAME = 'WARP & WEFT';

type RouteMeta = {
  /** base 기준 경로, 앞뒤 슬래시 없음. 표지는 '' */
  path: string;
  title: string;
  description: string;
  /** sitemap에서 뺄 라우트 (숨은 층) */
  hidden?: boolean;
};

export function routeMetas(): RouteMeta[] {
  return [
    ...chapters.map((chapter) => ({
      path: `chapters/${chapter.slug}`,
      title: `${chapter.number} ${chapter.title}`,
      description: chapter.dek,
    })),
    {
      path: 'sources',
      title: 'Sources',
      description: 'WARP & WEFT 본문 각주가 가리키는 자료와, 자료마다 본문과 대조했는지를 정리한 출처 목록.',
    },
    {
      path: 'colophon',
      title: 'Colophon',
      description: 'WARP & WEFT가 무엇이고 어떻게 만들어졌는지. 편집 원칙, 타이포그래피, 사용한 기술.',
    },
    {
      path: 'shop',
      title: 'Heritage Line',
      description: '책 속 세 시대의 501을 그 해의 디테일로 다시 짓는다면. 1890 XX, 1944 Wartime, 1966 Big E (콘셉트 데모).',
    },
    ...models.map((model) => ({
      path: `shop/${model.slug}`,
      title: `${model.name} · Heritage Line`,
      description: `${model.tagline} (콘셉트 데모)`,
    })),
    {
      path: 'inside-out',
      title: 'Inside Out',
      description: '여덟 가지 단서로 빈티지 501의 나이를 가늠해 보는 감정 도구.',
      hidden: true,
    },
  ];
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** 태그 하나의 속성값을 바꾼다. 패턴이 없으면 빌드를 멈춰 잘못된 메타가 배포되지 않게 한다. */
function replaceOnce(html: string, pattern: RegExp, replacement: string, label: string) {
  if (!pattern.test(html)) {
    throw new Error(`[prerender-routes] index.html에서 ${label}을(를) 찾지 못했습니다.`);
  }
  return html.replace(pattern, replacement);
}

const attr = (opening: string, attribute: string) =>
  new RegExp(`(${opening}\\s+${attribute}=")[^"]*(")`);

function withHead(html: string, { title, description, url }: { title: string; description: string; url: string }) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const u = escapeHtml(url);
  let out = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`, '<title>');
  out = replaceOnce(out, attr('<meta\\s+name="description"', 'content'), `$1${d}$2`, 'description');
  out = replaceOnce(out, attr('<link\\s+rel="canonical"', 'href'), `$1${u}$2`, 'canonical');
  out = replaceOnce(out, attr('<meta\\s+property="og:url"', 'content'), `$1${u}$2`, 'og:url');
  out = replaceOnce(out, attr('<meta\\s+property="og:title"', 'content'), `$1${t}$2`, 'og:title');
  out = replaceOnce(out, attr('<meta\\s+property="og:description"', 'content'), `$1${d}$2`, 'og:description');
  out = replaceOnce(out, attr('<meta\\s+name="twitter:title"', 'content'), `$1${t}$2`, 'twitter:title');
  out = replaceOnce(out, attr('<meta\\s+name="twitter:description"', 'content'), `$1${d}$2`, 'twitter:description');
  return out;
}

export function prerenderRoutes(): Plugin {
  let outDir = '';
  let siteUrl = '';

  return {
    name: 'prerender-routes',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
      siteUrl = String(config.env.VITE_SITE_URL ?? '');
      if (!siteUrl.endsWith('/')) {
        throw new Error('[prerender-routes] .env의 VITE_SITE_URL은 /로 끝나는 절대 주소여야 합니다.');
      }
    },
    async closeBundle() {
      const template = await readFile(join(outDir, 'index.html'), 'utf8');
      const routes = routeMetas();

      for (const route of routes) {
        const dir = join(outDir, route.path);
        await mkdir(dir, { recursive: true });
        const html = withHead(template, {
          title: `${route.title} | ${SITE_NAME}`,
          description: route.description,
          url: `${siteUrl}${route.path}/`,
        });
        await writeFile(join(dir, 'index.html'), html);
      }

      // 목록에 없는 주소: 앱이 NotFound를 그린다. 검색 엔진에는 색인하지 말라고 알린다.
      const notFound = replaceOnce(
        withHead(template, { title: `찾을 수 없는 페이지 | ${SITE_NAME}`, description: '찾으시는 페이지가 없습니다.', url: siteUrl }),
        /<\/title>/,
        '</title>\n    <meta name="robots" content="noindex" />',
        '</title>',
      );
      await writeFile(join(outDir, '404.html'), notFound);

      const urls = [siteUrl, ...routes.filter((route) => !route.hidden).map((route) => `${siteUrl}${route.path}/`)];
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`),
        '</urlset>',
        '',
      ].join('\n');
      await writeFile(join(outDir, 'sitemap.xml'), sitemap);

      this.info?.(`prerendered ${routes.length} routes + 404.html + sitemap.xml (${urls.length} urls)`);
    },
  };
}
