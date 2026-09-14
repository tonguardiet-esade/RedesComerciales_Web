import { CONTACT_INFO } from '../../config/contactInfo';
import { SITE_NAME, SITE_URL } from './site';

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/img/logo.svg`,
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone ?? undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address,
      addressLocality: 'Barcelona',
      addressCountry: 'ES',
    },
    description:
      'Redescomerciales.ai activa redes comerciales B2B mediante metodología, tecnología e inteligencia artificial.',
    sameAs: [CONTACT_INFO.social.linkedin].filter(Boolean),
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ['es', 'en', 'ca'],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildWebPageSchema({
  name,
  description,
  path,
  lang,
}: {
  name: string;
  description: string;
  path: string;
  lang: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${SITE_URL}${path}`,
    inLanguage: lang,
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: SITE_NAME },
  };
}

export function buildServiceSchema(lang: string) {
  const descriptions: Record<string, string> = {
    es: 'Activación y gestión de redes comerciales B2B: partners, prescriptores y delegados territoriales.',
    en: 'B2B commercial network activation and management: partners, prescribers and territorial delegates.',
    ca: 'Activació i gestió de xarxes comercials B2B: partners, prescriptors i delegats territorials.',
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Activación de red comercial B2B',
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'Spain' },
    description: descriptions[lang] ?? descriptions.es,
    serviceType: 'Commercial network activation',
  };
}

export function buildContactPageSchema(lang: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contacto',
    url: `${SITE_URL}/contacto`,
    inLanguage: lang,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      email: CONTACT_INFO.email,
      telephone: CONTACT_INFO.phone ?? undefined,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT_INFO.address,
        addressLocality: 'Barcelona',
        addressCountry: 'ES',
      },
    },
  };
}

export function buildFaqPageSchema(
  items: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
