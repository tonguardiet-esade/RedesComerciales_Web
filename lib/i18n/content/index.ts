import { esContent } from './es';
import { enContent } from './en';
import { caContent } from './ca';
import type { AppLanguage, PageContent } from '../types';

export const pageContentByLang: Record<AppLanguage, PageContent> = {
  es: esContent,
  en: enContent,
  ca: caContent,
};
