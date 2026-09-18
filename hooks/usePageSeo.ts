import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import {
  getPageSeo,
  getSeoKeyFromPath,
  isNoIndexPath,
} from '../lib/i18n/seo';
import type { AppLanguage } from '../lib/i18n/types';
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  OG_LOCALE,
  SITE_NAME,
  SITE_URL,
  THEME_COLOR,
} from '../lib/seo/site';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const selector = extra?.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
  if (extra) {
    Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
  }
}

function removeHreflangLinks() {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
}

export function usePageSeo() {
  const { pathname } = useLocation();
  const { lang } = useSettings();
  const contentLang = (['es', 'en', 'ca'].includes(lang) ? lang : 'es') as AppLanguage;

  useEffect(() => {
    const routeKey = getSeoKeyFromPath(pathname);
    const noindex = isNoIndexPath(pathname);
    const seo = routeKey
      ? getPageSeo(contentLang, routeKey)
      : {
          title: SITE_NAME,
          description: getPageSeo('es', 'home').description,
          path: pathname,
        };

    const canonicalUrl = `${SITE_URL}${seo.path}`;
    const title = seo.title;
    const description = seo.description;

    document.documentElement.lang = contentLang;
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:image', OG_IMAGE);
    upsertMeta('property', 'og:image:width', OG_IMAGE_WIDTH);
    upsertMeta('property', 'og:image:height', OG_IMAGE_HEIGHT);
    upsertMeta('property', 'og:image:alt', OG_IMAGE_ALT);
    upsertMeta('property', 'og:locale', OG_LOCALE[contentLang] ?? 'es_ES');
    upsertMeta('name', 'theme-color', THEME_COLOR);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', OG_IMAGE);

    if (noindex || seo.noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else {
      upsertMeta('name', 'robots', 'index, follow');
      upsertLink('canonical', canonicalUrl);
    }

    // Sin hreflang: el idioma cambia en cliente sin URLs distintas por locale.
    removeHreflangLinks();
  }, [pathname, contentLang]);
}
