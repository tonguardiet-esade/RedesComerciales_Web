import { getPageSeo, getSeoKeyFromPath } from '../i18n/seo';
import type { AppLanguage } from '../i18n/types';
import type { SeoRouteKey } from '../i18n/seo/types';

const HOME_LABELS: Record<AppLanguage, string> = {
  es: 'Inicio',
  en: 'Home',
  ca: 'Inici',
};

const PAGE_LABELS: Record<AppLanguage, Record<Exclude<SeoRouteKey, 'home'>, string>> = {
  es: {
    solutions: 'Soluciones',
    methodology: 'Metodología',
    successCases: 'Casos de éxito',
    contact: 'Contacto',
    legal: 'Aviso legal',
    cookies: 'Política de cookies',
    privacy: 'Política de privacidad',
  },
  en: {
    solutions: 'Solutions',
    methodology: 'Methodology',
    successCases: 'Success stories',
    contact: 'Contact',
    legal: 'Legal notice',
    cookies: 'Cookie policy',
    privacy: 'Privacy policy',
  },
  ca: {
    solutions: 'Solucions',
    methodology: 'Metodologia',
    successCases: 'Casos d\'èxit',
    contact: 'Contacte',
    legal: 'Avís legal',
    cookies: 'Política de cookies',
    privacy: 'Política de privacitat',
  },
};

export function getBreadcrumbItems(pathname: string, lang: AppLanguage) {
  if (pathname === '/') return undefined;

  const routeKey = getSeoKeyFromPath(pathname);
  if (!routeKey || routeKey === 'home') return undefined;

  const seo = getPageSeo(lang, routeKey);
  const pageName = PAGE_LABELS[lang][routeKey];

  return [
    { name: HOME_LABELS[lang], path: '/' },
    { name: pageName, path: seo.path },
  ];
}
