import { esSeo } from '../i18n/seo/es';
import type { SeoRouteKey } from '../i18n/seo/types';
import {
  CRAWLER_CONTENT_ES,
  CRAWLER_NAV_LINKS,
  type CrawlerPageContent,
} from './crawlerContent';
import { buildStaticRouteSchemas } from './schema';
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
  THEME_COLOR,
} from './site';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function buildSectionsHtml(sections: CrawlerPageContent['sections']): string {
  if (!sections?.length) return '';

  return sections
    .map(
      (section) => `
      <section>
        <h2>${escapeHtml(section.heading)}</h2>
        ${section.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n        ')}
      </section>`
    )
    .join('\n');
}

function buildFaqHtml(faq: CrawlerPageContent['faq']): string {
  if (!faq?.length) return '';

  const items = faq
    .map(
      (item) => `
        <dt>${escapeHtml(item.question)}</dt>
        <dd>${escapeHtml(item.answer)}</dd>`
    )
    .join('\n');

  return `
      <section>
        <h2>Preguntas frecuentes</h2>
        <dl>
        ${items}
        </dl>
      </section>`;
}

export function buildCrawlerNoscript(routeKey: SeoRouteKey): string {
  const content = CRAWLER_CONTENT_ES[routeKey];
  const nav = CRAWLER_NAV_LINKS.map(
    (link) => `<li><a href="${link.href}">${escapeHtml(link.label)}</a></li>`
  ).join('\n        ');

  return `<noscript>
    <header>
      <p><strong>${escapeHtml(SITE_NAME)}</strong></p>
      <nav aria-label="Navegación principal">
        <ul>
        ${nav}
        </ul>
      </nav>
    </header>
    <main id="main-content">
      <h1>${escapeHtml(content.h1)}</h1>
      <p>${escapeHtml(content.intro)}</p>
      ${buildSectionsHtml(content.sections)}
      ${buildFaqHtml(content.faq)}
    </main>
  </noscript>`;
}

export function buildJsonLdScripts(routeKey: SeoRouteKey): string {
  const seo = esSeo[routeKey];
  const schemas = buildStaticRouteSchemas(routeKey);

  return schemas
    .map(
      (schema) =>
        `    <script type="application/ld+json">${JSON.stringify(schema)}</script>`
    )
    .join('\n');
}

export function buildCommonHeadMeta(): string {
  return `
    <meta name="theme-color" content="${THEME_COLOR}" />
    <meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />
    <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />
    <meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />`;
}

export function buildRouteHtml(routeKey: SeoRouteKey): string {
  const seo = esSeo[routeKey];
  const canonical = `${SITE_URL}${seo.path}`;
  const noscript = buildCrawlerNoscript(routeKey);
  const jsonLd = buildJsonLdScripts(routeKey);
  const headExtras = buildCommonHeadMeta();

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/img/logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:locale" content="es_ES" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <title>${escapeHtml(seo.title)}</title>${headExtras}
${jsonLd}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <script>
      (function () {
        var t = localStorage.getItem('gw_theme');
        var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (dark) document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
      })();
    </script>
  </head>
  <body class="bg-mosaic-white-200 text-mosaic-black-500 antialiased">
    ${noscript}
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>
`;
}

/** Schemas estáticos para la home (index.html fuente). */
export function buildHomeJsonLdScripts(): string {
  return buildJsonLdScripts('home');
}

export function buildHomeNoscript(): string {
  return buildCrawlerNoscript('home');
}
