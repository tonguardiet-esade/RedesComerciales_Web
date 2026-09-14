import type { AppLanguage } from '../types';
import { caSeo } from './ca';
import { enSeo } from './en';
import { esSeo } from './es';
import type { PageSeoMeta, SeoContentByLang, SeoRouteKey } from './types';

export const seoContentByLang: SeoContentByLang = {
  es: esSeo,
  en: enSeo,
  ca: caSeo,
};

export const PATH_TO_SEO_KEY: Record<string, SeoRouteKey> = {
  '/': 'home',
  '/soluciones': 'solutions',
  '/metodologia': 'methodology',
  '/casos-de-exito': 'successCases',
  '/contacto': 'contact',
  '/aviso-legal': 'legal',
  '/politica-cookies': 'cookies',
  '/politica-privacidad': 'privacy',
};

const NOINDEX_PREFIXES = [
  '/login',
  '/registro',
  '/portal',
  '/bienvenida',
  '/modulo',
  '/test-final',
  '/contrato',
  '/entrevista',
  '/update-password',
  '/unirse-invitado',
  '/acceso-denegado',
];

export function isNoIndexPath(pathname: string): boolean {
  return NOINDEX_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function getPageSeo(lang: AppLanguage, routeKey: SeoRouteKey): PageSeoMeta {
  return seoContentByLang[lang]?.[routeKey] ?? seoContentByLang.es[routeKey];
}

export function getSeoKeyFromPath(pathname: string): SeoRouteKey | null {
  return PATH_TO_SEO_KEY[pathname] ?? null;
}

export type { PageSeoMeta, SeoRouteKey };
