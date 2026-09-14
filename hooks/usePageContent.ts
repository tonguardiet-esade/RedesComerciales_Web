import { useSettings } from '../context/SettingsContext';
import { pageContentByLang } from '../lib/i18n/content';
import type { AppLanguage, PageContent } from '../lib/i18n/types';

const SUPPORTED_LANGS: AppLanguage[] = ['es', 'en', 'ca'];

export function usePageContent(): PageContent {
  const { lang } = useSettings();
  const contentLang = SUPPORTED_LANGS.includes(lang as AppLanguage)
    ? (lang as AppLanguage)
    : 'es';
  return pageContentByLang[contentLang];
}
