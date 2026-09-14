import type { AppLanguage } from '../types';

export type LegalListItem = string | { strong: string; text: string };

export type LegalBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: LegalListItem[] }
  | { type: 'links'; intro?: string; items: { label: string; href: string }[] }
  | { type: 'note'; text: string };

export type CookieCategoryContent = {
  id: 'necessary' | 'functional' | 'analytics' | 'advertising';
  title: string;
  description: string;
  items: Array<{ name: string; duration: string; description: string }>;
};

export type CookieListContent = {
  title: string;
  intro: string;
  tableHeaders: { name: string; duration: string; description: string };
  emptyMessage: string;
  categories: CookieCategoryContent[];
};

export type LegalSiteContent = {
  privacy: LegalBlock[];
  cookies: LegalBlock[];
  legal: LegalBlock[];
  cookieList: CookieListContent;
};

export type LegalContentByLang = Record<AppLanguage, LegalSiteContent>;
