import { useSettings } from '../context/SettingsContext';
import { legalContentByLang } from '../lib/i18n/legal';
import type { AppLanguage } from '../lib/i18n/types';
import type { LegalSiteContent } from '../lib/i18n/legal/types';

const SUPPORTED_LANGS: AppLanguage[] = ['es', 'en', 'ca'];

export function useLegalContent(): LegalSiteContent {
  const { lang } = useSettings();
  const contentLang = SUPPORTED_LANGS.includes(lang as AppLanguage)
    ? (lang as AppLanguage)
    : 'es';
  return legalContentByLang[contentLang];
}
