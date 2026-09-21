import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import logo from '../../img/logo.svg';
import { useUser } from '../../context/UserContext';
import { useSettings } from '../../context/SettingsContext';
import { usePageContent } from '../../hooks/usePageContent';
import { EXTERNAL_LINKS } from '../../config/externalLinks';
import WhatsAppButton from './WhatsAppButton';

const LANGUAGES = [
  { code: 'es' as const, label: 'ES' },
  { code: 'ca' as const, label: 'CA' },
  { code: 'en' as const, label: 'EN' },
];

const LOCALE_MAP = { es: 'es-ES', ca: 'ca-ES', en: 'en-GB' } as const;

const MosaicHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();
  const { lang, setLang, theme, toggleTheme, t } = useSettings();
  const { nav } = usePageContent();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { label: nav.solutions, path: '/soluciones' },
    { label: nav.methodology, path: '/metodologia' },
    { label: nav.successCases, path: '/casos-de-exito' },
    { label: nav.contact, path: '/contacto' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const navClass = (path: string) =>
    `mosaic-label transition-colors cursor-pointer mosaic-focus-ring rounded-sm px-1 py-0.5 ${
      isActive(path)
        ? 'text-mosaic-cyan'
        : 'text-mosaic-black-300 hover:text-mosaic-cyan'
    }`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!langRef.current?.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [langOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleNav = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/');
    setTimeout(() => logout(), 100);
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString(LOCALE_MAP[lang], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-mosaic-white-200/95 backdrop-blur-sm border-b border-mosaic-white-300/60' : 'bg-transparent'
        }`}
      >
        <div className="mosaic-container h-16 md:h-20 grid grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 mosaic-focus-ring rounded-sm"
            aria-label="Redescomerciales.ai — inicio"
          >
            <img src={logo} alt="" className="w-7 h-7 md:w-8 md:h-8" aria-hidden="true" />
            <span className="mosaic-label text-mosaic-black-500 hidden xl:inline whitespace-nowrap">
              Redescomerciales<span className="text-mosaic-cyan">.ai</span>
            </span>
          </Link>

          <nav
            className="hidden min-[1100px]:flex items-center justify-center gap-4 xl:gap-6 min-w-0 px-1"
            aria-label={t('a11y.mainNav')}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`${navClass(item.path)} whitespace-nowrap`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 md:gap-3 xl:gap-4 shrink-0">
            <div className="relative hidden md:block" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="mosaic-label text-mosaic-black-300 hover:text-mosaic-cyan transition-colors cursor-pointer mosaic-focus-ring rounded-sm px-1"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label={`${t('a11y.mainNav')}: ${lang.toUpperCase()}`}
              >
                {lang.toUpperCase()}
              </button>
              {langOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 top-full mt-2 bg-mosaic-white-100 border border-mosaic-white-300 py-2 min-w-[80px] shadow-lg z-50"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      role="option"
                      aria-selected={lang === l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-1.5 mosaic-label cursor-pointer hover:text-mosaic-cyan mosaic-focus-ring ${
                        lang === l.code ? 'text-mosaic-cyan' : 'text-mosaic-black-300'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center text-mosaic-black-300 hover:text-mosaic-cyan transition-colors cursor-pointer mosaic-focus-ring rounded-sm p-1"
              aria-label={theme === 'dark' ? t('theme.toggleToLight') : t('theme.toggleToDark')}
              aria-pressed={theme === 'dark'}
              title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>

            <span className="mosaic-label text-mosaic-black-300 hidden xl:inline whitespace-nowrap" aria-hidden="true">
              {lang} {timeStr}
            </span>

            {!user && (
              <div className="hidden min-[1100px]:block">
                <WhatsAppButton variant="nav" />
              </div>
            )}

            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="mosaic-label text-mosaic-black-300 hover:text-mosaic-cyan hidden md:inline cursor-pointer mosaic-focus-ring rounded-sm px-1"
              >
                {t('nav.logout')}
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <a
                  href={EXTERNAL_LINKS.sales}
                  target="_blank"
                  rel="noreferrer"
                  className="mosaic-label text-mosaic-red hover:opacity-80 mosaic-focus-ring rounded-sm px-1"
                >
                  {nav.platform}
                </a>
                <a
                  href={EXTERNAL_LINKS.plataforma}
                  target="_blank"
                  rel="noreferrer"
                  className="mosaic-label text-mosaic-cyan hover:opacity-80 mosaic-focus-ring rounded-sm px-1"
                >
                  {nav.access}
                </a>
              </div>
            )}

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              className="min-[1100px]:hidden flex flex-col gap-1.5 p-2 cursor-pointer mosaic-focus-ring rounded-sm"
              aria-label={t('a11y.openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-main-nav"
            >
              <span className="block w-5 h-[1.5px] bg-mosaic-black-500" />
              <span className="block w-5 h-[1.5px] bg-mosaic-black-500" />
              <span className="block w-3 h-[1.5px] bg-mosaic-black-500 ml-auto" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-mosaic-white-200 flex flex-col" role="dialog" aria-modal="true" aria-label={nav.menu}>
          <div className="mosaic-container flex justify-between items-center h-16">
            <span className="mosaic-label text-mosaic-black-500">{nav.menu}</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="mosaic-label text-mosaic-black-300 cursor-pointer mosaic-focus-ring rounded-sm px-2 py-1"
            >
              {nav.close}
            </button>
          </div>
          <nav id="mobile-main-nav" className="flex-1 mosaic-container flex flex-col justify-center gap-8 py-12" aria-label={t('a11y.mainNav')}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`mosaic-h2 text-left transition-colors mosaic-focus-ring rounded-sm ${
                  isActive(item.path) ? 'text-mosaic-cyan' : 'hover:text-mosaic-cyan'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            {!user && (
              <WhatsAppButton
                variant="nav-menu"
                onClick={() => setMenuOpen(false)}
              />
            )}
            <a
              href={EXTERNAL_LINKS.sales}
              target="_blank"
              rel="noreferrer"
              className="mosaic-h2 text-mosaic-red hover:opacity-80 mosaic-focus-ring rounded-sm"
            >
              {nav.platform}
            </a>
            <div className="flex gap-4 pt-4 items-center">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 border border-mosaic-white-300 text-mosaic-black-300 hover:text-mosaic-cyan hover:border-mosaic-cyan transition-colors cursor-pointer mosaic-focus-ring"
                aria-label={theme === 'dark' ? t('theme.toggleToLight') : t('theme.toggleToDark')}
                aria-pressed={theme === 'dark'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                ) : (
                  <Moon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                )}
              </button>
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={`mosaic-label cursor-pointer mosaic-focus-ring rounded-sm px-2 py-1 ${
                    lang === l.code ? 'text-mosaic-cyan' : 'text-mosaic-black-300'
                  }`}
                  aria-pressed={lang === l.code}
                >
                  {l.label}
                </button>
              ))}
            </div>
            {!user && (
              <a
                href={EXTERNAL_LINKS.plataforma}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mosaic-h2 text-left text-mosaic-cyan mosaic-focus-ring rounded-sm"
              >
                {nav.access}
              </a>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default MosaicHeader;
