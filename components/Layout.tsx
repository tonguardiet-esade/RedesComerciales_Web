
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ContactProvider } from '../context/ContactContext';
import MosaicHeader from './mosaic/MosaicHeader';
import MosaicFooter from './mosaic/MosaicFooter';
import MosaicVisualField from './mosaic/MosaicVisualField';
import StickyCta from './mosaic/StickyCta';
import CommunicationsCenter from './CommunicationsCenter';
import MarketingSupportModal from './MarketingSupportModal';
import CustomCursor from './mosaic/CustomCursor';
import CookieConsent from './mosaic/CookieConsent';
import WhatsAppButton from './mosaic/WhatsAppButton';
import StructuredData from './seo/StructuredData';
import { useSettings } from '../context/SettingsContext';
import { usePageSeo } from '../hooks/usePageSeo';
import { useFaqItems } from '../hooks/useFaqItems';
import { captureUtmFromUrl } from '../lib/utm';
import { trackPageView } from '../lib/analytics';

const MARKETING_PATHS = ['/', '/metodologia', '/soluciones', '/casos-de-exito', '/contacto'];

interface LayoutProps {
  children?: React.ReactNode;
}

const LayoutInner = ({ children }: LayoutProps) => {
  const { user } = useUser();
  const { t } = useSettings();
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isMarketing = MARKETING_PATHS.includes(location.pathname);
  const showVisualField = location.pathname === '/';
  usePageSeo();
  const faqItems = useFaqItems(10);
  const homeFaq = location.pathname === '/' ? faqItems : undefined;

  useEffect(() => {
    captureUtmFromUrl();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);
  const [isCommCenterOpen, setIsCommCenterOpen] = React.useState(false);
  const [isMarketingSupportOpen, setIsMarketingSupportOpen] = React.useState(false);

  const isSimulating = user?.id === 'demo';

  return (
    <div className="min-h-screen flex flex-col bg-mosaic-white-200 text-mosaic-black-500 transition-colors duration-400">
      <StructuredData faqItems={homeFaq} />
      <CustomCursor />
      {isSimulating && (
        <div className="bg-mosaic-cyan text-mosaic-black-500 text-center text-[10px] font-bold py-2 px-4 relative z-[55] mosaic-label">
          Simulación: modo invitado activo
        </div>
      )}

      <a href="#main-content" className="skip-to-content mosaic-focus-ring">
        {t('a11y.skipToContent')}
      </a>

      <MosaicHeader />

      {user && (
        <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setIsMarketingSupportOpen(true)}
            className="w-11 h-11 rounded-full bg-mosaic-white-100 border border-mosaic-white-300 shadow-lg flex items-center justify-center text-mosaic-black-300 hover:text-mosaic-cyan transition-colors cursor-pointer"
            title="Soporte marketing"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIsCommCenterOpen(true)}
            className="w-11 h-11 rounded-full bg-mosaic-white-100 border border-mosaic-white-300 shadow-lg flex items-center justify-center text-mosaic-black-300 hover:text-mosaic-cyan transition-colors cursor-pointer relative"
            title="Centro de comunicaciones"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7a6 6 0 10-12 0v.7c0 2.513-.4 4.888-1.143 7.082a23.848 23.848 0 005.454 1.31m4.543 2.233a3 3 0 01-5.414 0" />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-mosaic-cyan rounded-full" />
          </button>
        </div>
      )}

      <main id="main-content" ref={mainRef} className="flex-grow relative" tabIndex={-1}>
        {showVisualField && <MosaicVisualField key={location.pathname} scrollRootRef={mainRef} />}
        <div className="relative z-10">
          {children}
        </div>
      </main>

      {isMarketing && location.pathname !== '/contacto' && <StickyCta />}
      {isMarketing && <WhatsAppButton variant="float" />}

      <CommunicationsCenter isOpen={isCommCenterOpen} onClose={() => setIsCommCenterOpen(false)} />
      <MarketingSupportModal isOpen={isMarketingSupportOpen} onClose={() => setIsMarketingSupportOpen(false)} />
      <CookieConsent />

      <MosaicFooter />
    </div>
  );
};

const Layout = ({ children }: LayoutProps) => (
  <ContactProvider>
    <LayoutInner>{children}</LayoutInner>
  </ContactProvider>
);

export default Layout;
