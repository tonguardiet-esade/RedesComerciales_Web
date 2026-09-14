import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../img/logo.svg';
import { useSettings } from '../../context/SettingsContext';
import { usePageContent } from '../../hooks/usePageContent';
import { EXTERNAL_LINKS } from '../../config/externalLinks';
import { openCookieConsent } from '../../lib/cookieConsent';

const MosaicFooter = () => {
  const location = useLocation();
  const { t } = useSettings();
  const { nav, footer } = usePageContent();

  const exploreLinks = [
    { label: nav.solutions, path: '/soluciones' },
    { label: nav.methodology, path: '/metodologia' },
    { label: nav.successCases, path: '/casos-de-exito' },
    { label: nav.contact, path: '/contacto' },
  ];

  const linkClass = (path: string) =>
    `mosaic-body text-sm transition-colors mosaic-focus-ring rounded-sm ${
      location.pathname === path
        ? 'text-mosaic-cyan'
        : 'text-mosaic-on-dark-400 hover:text-mosaic-cyan'
    }`;

  return (
    <footer className="mosaic-footer-shell text-mosaic-on-dark-400 pt-var-spacer-lg" style={{ paddingTop: 'var(--spacer-lg)' }}>
      <div className="mosaic-container pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <img src={logo} alt="" className="w-8 h-8 brightness-0 invert opacity-80" aria-hidden="true" />
              <span className="mosaic-label text-mosaic-on-dark-100">Redescomerciales.ai</span>
            </div>
            <p className="mosaic-body text-mosaic-on-dark-500 text-sm max-w-xs mb-6">
              {footer.tagline}
            </p>
            <p className="mosaic-label text-mosaic-on-dark-500 text-[10px]">
              {footer.address}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="mosaic-label text-mosaic-on-dark-500 mb-6">{footer.explore}</p>
            <ul className="space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`${linkClass(item.path)} text-left`}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={EXTERNAL_LINKS.sales}
                  target="_blank"
                  rel="noreferrer"
                  className="mosaic-body text-sm text-mosaic-on-dark-400 hover:text-mosaic-cyan transition-colors mosaic-focus-ring rounded-sm"
                >
                  {nav.platform}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mosaic-label text-mosaic-on-dark-500 mb-6">{footer.legal}</p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/aviso-legal"
                  className={linkClass('/aviso-legal')}
                  aria-current={location.pathname === '/aviso-legal' ? 'page' : undefined}
                >
                  {footer.legalNotice}
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-cookies"
                  className={linkClass('/politica-cookies')}
                  aria-current={location.pathname === '/politica-cookies' ? 'page' : undefined}
                >
                  {footer.cookies}
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-privacidad"
                  className={linkClass('/politica-privacidad')}
                  aria-current={location.pathname === '/politica-privacidad' ? 'page' : undefined}
                >
                  {footer.privacy}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookieConsent}
                  className="mosaic-body text-sm text-mosaic-on-dark-400 hover:text-mosaic-cyan transition-colors mosaic-focus-ring rounded-sm cursor-pointer text-left"
                >
                  {t('cookies.manage')}
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mosaic-label text-mosaic-on-dark-500 mb-4">{footer.newsletter}</p>
            <a
              href="https://newsletter.redescomerciales.ai"
              target="_blank"
              rel="noreferrer"
              className="mosaic-link text-mosaic-cyan mosaic-focus-ring rounded-sm"
            >
              <span>{footer.newsletterLink}</span>
              <span className="mosaic-link-icon">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
              </span>
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-mosaic-inverse-soft">
          <p className="mosaic-label text-mosaic-on-dark-500 text-center text-[10px]">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MosaicFooter;
