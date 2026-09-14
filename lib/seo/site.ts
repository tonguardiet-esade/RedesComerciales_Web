/** Configuración global SEO — dominio y assets configurables vía .env */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.trim() || 'https://redescomerciales.ai';

export const SITE_NAME = 'Redescomerciales.ai';

export const OG_IMAGE =
  import.meta.env.VITE_OG_IMAGE_URL?.trim() || `${SITE_URL}/img/case-saas-scaleup.png`;

export const SUPPORTED_LOCALES = ['es', 'en', 'ca'] as const;

export const LOCALE_HREFLANG: Record<string, string> = {
  es: 'es',
  en: 'en',
  ca: 'ca',
};

export const OG_LOCALE: Record<string, string> = {
  es: 'es_ES',
  en: 'en_GB',
  ca: 'ca_ES',
};
