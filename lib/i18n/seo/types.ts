import type { AppLanguage } from '../types';

export type SeoRouteKey =
  | 'home'
  | 'solutions'
  | 'methodology'
  | 'successCases'
  | 'contact'
  | 'legal'
  | 'cookies'
  | 'privacy';

export interface PageSeoMeta {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

export type SeoContentByLang = Record<AppLanguage, Record<SeoRouteKey, PageSeoMeta>>;
