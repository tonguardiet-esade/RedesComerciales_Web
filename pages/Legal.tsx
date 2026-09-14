import React from 'react';
import LegalPageShell from '../components/mosaic/LegalPageShell';
import LegalBlocks from '../components/mosaic/LegalBlocks';
import CookieListSection from '../components/mosaic/CookieListSection';
import { usePageContent } from '../hooks/usePageContent';
import { useLegalContent } from '../hooks/useLegalContent';

const Legal = ({ type }: { type: 'privacy' | 'cookies' | 'legal' }) => {
  const { footer } = usePageContent();
  const legalContent = useLegalContent();

  const titles = {
    privacy: footer.privacy,
    cookies: footer.cookies,
    legal: footer.legalNotice,
  };

  const blocks = legalContent[type];

  return (
    <LegalPageShell type={type} title={titles[type]}>
      <LegalBlocks blocks={blocks} />
      {type === 'cookies' ? <CookieListSection /> : null}
    </LegalPageShell>
  );
};

export default Legal;
