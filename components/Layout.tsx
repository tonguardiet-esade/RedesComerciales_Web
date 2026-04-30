
import React, { useState, useRef, useEffect } from 'react';
import logo from '../img/logo.svg';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { Link, useNavigate } from 'react-router-dom';
import CommunicationsCenter from './CommunicationsCenter';
import MarketingSupportModal from './MarketingSupportModal';
import ContactModal from './ContactModal';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useUser();
  const { lang, setLang, theme, toggleTheme, t } = useSettings();
  const navigate = useNavigate();
  
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isCommCenterOpen, setIsCommCenterOpen] = useState(false);
  const [isMarketingSupportOpen, setIsMarketingSupportOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const isSimulating = user?.id === 'demo';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/');
    setTimeout(() => { logout(); }, 100);
  };

  const languages = [
    { code: 'es', label: 'Español' },
    { code: 'ca', label: 'Català' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' }
  ];

  const currentLangLabel = languages.find(l => l.code === lang)?.code.toUpperCase() || 'ES';

  return (
    <div className={`min-h-screen flex flex-col bg-mesh transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0F172A]/70 text-white' : 'bg-[#f7fafc]/40 text-brand-dark'}`}>
      {isSimulating && (
        <div className="bg-[#38B2DC] text-brand-dark text-center text-[10px] font-bold py-2.5 px-4 shadow-md relative z-50 flex items-center justify-center gap-4 border-b border-black/10">
          <span className="uppercase tracking-[0.2em] font-extrabold">⚠ SIMULACIÓN: Modo Invitado Activo</span>
        </div>
      )}

      <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${theme === 'dark' ? 'bg-brand-dark-bg/90 border-gray-800 text-white' : 'bg-white/90 border-gray-100 text-brand-dark'} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center cursor-pointer group gap-3" onClick={() => navigate('/')}>
            <div className="relative w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="Redescomerciales.ai" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-brand-primary tracking-tighter">Redes</span>
                <span className="text-2xl font-black text-brand-secondary tracking-tighter">comerciales.ai</span>
              </div>
              <span className="text-[7px] font-bold text-gray-400 uppercase tracking-[0.1em] -mt-1 leading-none">Transforma colaboradores en una red de ventas activa</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* BOTONES DE SOPORTE Y NOTIFICACIONES (Solo usuarios logueados) */}
            {user && (
              <div className="flex items-center gap-1 sm:gap-2">
                {/* SOPORTE DE MARKETING */}
                <button 
                  onClick={() => setIsMarketingSupportOpen(true)}
                  className="relative p-2.5 rounded-xl text-gray-400 hover:text-brand-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group"
                  title={t('support.marketing')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-brand-dark text-white text-[8px] font-black uppercase px-2 py-1 rounded transition-all whitespace-nowrap shadow-xl">Soporte</span>
                </button>

                {/* CENTRO DE COMUNICACIONES */}
                <button 
                  onClick={() => setIsCommCenterOpen(true)}
                  className="relative p-2.5 rounded-xl text-gray-400 hover:text-brand-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group"
                  title="Centro de Comunicaciones"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7a6 6 0 10-12 0v.7c0 2.513-.4 4.888-1.143 7.082a23.848 23.848 0 005.454 1.31m4.543 2.233a3 3 0 01-5.414 0m5.414 0a2.333 2.333 0 01-4.666 0" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-primary border-2 border-white dark:border-brand-dark-bg rounded-full"></span>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-brand-dark text-white text-[8px] font-black uppercase px-2 py-1 rounded transition-all whitespace-nowrap shadow-xl">Mensajes</span>
                </button>
              </div>
            )}

            {/* TEMA TOGGLE */}
            <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-gray-400 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
                {theme === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 16.243l.707.707M7.757 7.757l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
            </button>

            {/* IDIOMA SELECTOR */}
            <div className="relative" ref={langMenuRef}>
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{currentLangLabel}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-brand-dark-card rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 py-2 z-50 animate-fade-in-up">
                  {languages.map((l) => (
                    <button 
                      key={l.code}
                      onClick={() => { setLang(l.code as any); setIsLangMenuOpen(false); }}
                      className={`w-full flex items-center justify-between px-5 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${lang === l.code ? 'text-brand-dark dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                      <span>{l.label}</span>
                      {lang === l.code && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <nav className="flex items-center gap-4 border-l border-gray-200 dark:border-gray-700 pl-4 ml-1">
              <button 
                onClick={() => navigate('/soluciones')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${theme === 'dark' ? 'text-white hover:bg-white/5' : 'text-brand-dark hover:bg-gray-50'}`}
              >
                Soluciones
              </button>
              <button 
                onClick={() => navigate('/metodologia')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${theme === 'dark' ? 'text-white hover:bg-white/5' : 'text-brand-dark hover:bg-gray-50'}`}
              >
                Metodología
              </button>
              <button 
                onClick={() => navigate('/casos-de-exito')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${theme === 'dark' ? 'text-white hover:bg-white/5' : 'text-brand-dark hover:bg-gray-50'}`}
              >
                Casos de éxito
              </button>
              <a 
                href="https://ai.studio/apps/1b686564-1891-4307-b1d9-876dd09cb85e"
                target="_blank"
                rel="noreferrer"
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${theme === 'dark' ? 'text-white hover:bg-white/5' : 'text-brand-dark hover:bg-gray-50'}`}
              >
                Plataforma
              </a>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="px-5 py-2.5 bg-brand-primary text-white rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-brand-primary/20"
              >
                Contacto
              </button>
              {user ? (
                <>
                  <div className="hidden md:flex flex-col text-right">
                    <span className="text-sm font-bold dark:text-white leading-tight">{user.nombre}</span>
                    <span className="text-[9px] text-brand-secondary uppercase font-black tracking-widest">{user.estado_actual.toUpperCase()}</span>
                  </div>
                  <button onClick={handleLogout} className="text-sm font-bold text-gray-400 hover:text-brand-primary transition-colors">{t('nav.logout')}</button>
                </>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="px-5 py-2.5 bg-brand-secondary text-white rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-brand-secondary/20"
                >
                  Acceder
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* COMPONENTES DE CAJÓN / MODALES */}
      <CommunicationsCenter isOpen={isCommCenterOpen} onClose={() => setIsCommCenterOpen(false)} />
      <MarketingSupportModal isOpen={isMarketingSupportOpen} onClose={() => setIsMarketingSupportOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <footer className={`py-16 mt-auto border-t transition-colors duration-300 ${theme === 'dark' ? 'bg-brand-dark-bg border-gray-800 text-gray-400' : 'bg-brand-dark text-white border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Logo" className="w-8 h-8 opacity-80" />
                <div className="flex items-baseline">
                  <span className="text-2xl font-black text-brand-primary tracking-tighter">Redes</span>
                  <span className="text-2xl font-black text-brand-secondary tracking-tighter">comerciales.ai</span>
                </div>
              </div>
              <p className="text-sm opacity-60 max-w-xs mb-6">
                Transforma colaboradores en una red de ventas activa mediante tecnología y gestión experta.
              </p>
              <div className="text-xs opacity-50 space-y-1">
                <p className="font-bold">Redescomerciales.ai</p>
                <p>Avda Diagonal, 523, 1er 2. Barcelona</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs opacity-50">Explorar</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => navigate('/soluciones')} className="hover:text-brand-primary transition-colors">Soluciones</button></li>
                <li><button onClick={() => navigate('/metodologia')} className="hover:text-brand-primary transition-colors">Metodología</button></li>
                <li><button onClick={() => navigate('/casos-de-exito')} className="hover:text-brand-primary transition-colors">Casos de éxito</button></li>
                <li><a href="https://ai.studio/apps/1b686564-1891-4307-b1d9-876dd09cb85e" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">Plataforma</a></li>
                <li><button onClick={() => setIsContactOpen(true)} className="hover:text-brand-primary transition-colors">Contacto</button></li>
                <li><a href="https://newsletter.redescomerciales.ai" target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-secondary transition-all">Acceder a nuestra newsletter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs opacity-50">Legal & Social</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a></li>
                <li><Link to="/aviso-legal" className="hover:text-brand-primary transition-colors">Aviso legal</Link></li>
                <li><Link to="/politica-cookies" className="hover:text-brand-primary transition-colors">Política de cookies</Link></li>
                <li><Link to="/politica-privacidad" className="hover:text-brand-primary transition-colors">Política de privacidad</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-xs opacity-40">&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
