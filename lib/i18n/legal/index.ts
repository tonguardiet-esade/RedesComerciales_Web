import { caLegalContent } from './ca';
import { enLegalContent } from './en';
import { esLegalContent } from './es';
import type { AppLanguage } from '../types';
import type { LegalContentByLang } from './types';

export const legalContentByLang: LegalContentByLang = {
  es: esLegalContent,
  en: enLegalContent,
  ca: caLegalContent,
};

export type { LegalSiteContent, LegalBlock, CookieListContent } from './types';

export function getLegalContent(lang: AppLanguage) {
  return legalContentByLang[lang] ?? esLegalContent;
}
