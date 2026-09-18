import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import { getPageSeo, getSeoKeyFromPath } from '../../lib/i18n/seo';
import type { AppLanguage } from '../../lib/i18n/types';
import { getBreadcrumbItems } from '../../lib/seo/breadcrumbs';
import {
  buildBreadcrumbSchema,
  buildContactPageSchema,
  buildFaqPageSchema,
  buildOrganizationSchema,
  buildServiceSchema,
  buildWebPageSchema,
  buildWebSiteSchema,
} from '../../lib/seo/schema';

interface StructuredDataProps {
  faqItems?: Array<{ question: string; answer: string }>;
}

const StructuredData = ({ faqItems }: StructuredDataProps) => {
  const { pathname } = useLocation();
  const { lang } = useSettings();
  const contentLang = (['es', 'en', 'ca'].includes(lang) ? lang : 'es') as AppLanguage;
  const routeKey = getSeoKeyFromPath(pathname);

  const schemas: object[] = [buildOrganizationSchema(), buildWebSiteSchema()];

  if (routeKey) {
    const seo = getPageSeo(contentLang, routeKey);
    schemas.push(
      buildWebPageSchema({
        name: seo.title,
        description: seo.description,
        path: seo.path,
        lang: contentLang,
      })
    );
  }

  if (pathname === '/soluciones') {
    schemas.push(buildServiceSchema(contentLang));
  }

  if (pathname === '/contacto') {
    schemas.push(buildContactPageSchema(contentLang));
  }

  if (faqItems?.length) {
    schemas.push(buildFaqPageSchema(faqItems));
  }

  const breadcrumbs = getBreadcrumbItems(pathname, contentLang);
  if (breadcrumbs?.length) {
    schemas.push(buildBreadcrumbSchema(breadcrumbs));
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default StructuredData;
