import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import Breadcrumbs from './Breadcrumbs';
import { usePageContent } from '../../hooks/usePageContent';
import { useSettings } from '../../context/SettingsContext';

export type LegalPageType = 'legal' | 'privacy' | 'cookies';

interface LegalPageShellProps {
  type: LegalPageType;
  title: string;
  children: React.ReactNode;
}

const LEGAL_TABS: Array<{ type: LegalPageType; path: string }> = [
  { type: 'legal', path: '/aviso-legal' },
  { type: 'privacy', path: '/politica-privacidad' },
  { type: 'cookies', path: '/politica-cookies' },
];

const LegalPageShell = ({ type, title, children }: LegalPageShellProps) => {
  const { footer } = usePageContent();
  const { t } = useSettings();
  const location = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);

  const tabLabels: Record<LegalPageType, string> = {
    legal: footer.legalNotice,
    privacy: footer.privacy,
    cookies: footer.cookies,
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(
      el,
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.05 }
    );
  }, [location.pathname]);

  return (
    <div className="legal-page overflow-x-hidden min-h-[calc(100vh-5rem)]">
      <div className="mosaic-container pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-10">
          <Link to="/" className="legal-back-link mosaic-label inline-flex items-center gap-2 group">
            <span className="text-mosaic-cyan transition-transform group-hover:-translate-x-0.5" aria-hidden="true">←</span>
            <span>{t('legal.backToHome')}</span>
          </Link>
          <p className="mosaic-label text-mosaic-black-300 text-[10px] sm:text-right">
            {t('legal.metaNote')} · {t('legal.lastUpdated')}
          </p>
        </div>

        <div ref={cardRef} className="legal-page-card">
          <Breadcrumbs
            items={[
              { label: t('breadcrumb.home'), path: '/' },
              { label: title },
            ]}
          />
          <header className="legal-page-header border-b border-mosaic-white-300 pb-8 md:pb-10 mb-8 md:mb-10">
            <h1 className="mosaic-h1 legal-page-title mb-8 md:mb-10">{title}</h1>

            <nav className="legal-tabs" aria-label={t('legal.tabsAria')}>
              {LEGAL_TABS.map((tab) => {
                const isActive = tab.type === type;
                return (
                  <Link
                    key={tab.type}
                    to={tab.path}
                    className={`legal-tab ${isActive ? 'legal-tab-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {tabLabels[tab.type]}
                  </Link>
                );
              })}
            </nav>
          </header>

          <div className="legal-prose">{children}</div>

          <div className="legal-page-footer border-t border-mosaic-white-300 mt-12 pt-10 flex flex-col items-center gap-8">
            <Link to="/" className="legal-back-link mosaic-label inline-flex items-center gap-2 group">
              <span className="text-mosaic-cyan" aria-hidden="true">+</span>
              <span className="group-hover:text-mosaic-cyan transition-colors">{t('legal.backToHome')}</span>
            </Link>

            <nav className="legal-tabs legal-tabs-footer" aria-label={t('legal.tabsAria')}>
              {LEGAL_TABS.map((tab) => {
                const isActive = tab.type === type;
                return (
                  <Link
                    key={`footer-${tab.type}`}
                    to={tab.path}
                    className={`legal-tab legal-tab-compact ${isActive ? 'legal-tab-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {tabLabels[tab.type]}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPageShell;
