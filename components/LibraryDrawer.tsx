
import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type LibraryView = 'index' | 'pitch_30s' | 'good_opportunity' | 'bad_opportunity';

const LibraryDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeView, setActiveView] = useState<LibraryView>('index');

  if (!isOpen) return null;

  const handleClose = () => {
    setActiveView('index');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white dark:bg-brand-darkBg animate-fade-in">
      {/* Header a pantalla completa */}
      <div className="p-8 md:p-12 border-b dark:border-white/5 flex justify-between items-center bg-white dark:bg-brand-darkCard shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            {activeView !== 'index' && (
              <button 
                onClick={() => setActiveView('index')}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-brand-primary hover:text-white transition-all shadow-md group"
              >
                <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div>
              <h2 className="text-3xl font-black text-brand-dark dark:text-white uppercase tracking-tighter">
                {activeView === 'index' ? 'Biblioteca de Éxito' : 
                 activeView === 'good_opportunity' ? 'Filtro de Oportunidades' : 
                 activeView === 'bad_opportunity' ? 'Criterios de Exclusión' : 'Kit de Comunicación'}
              </h2>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-300 uppercase tracking-widest mt-1">Recursos estratégicos para Ejemplos de venta</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white transition-all text-xl font-bold shadow-lg"
            aria-label="Cerrar biblioteca"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/30 dark:bg-brand-darkBg">
        {activeView === 'index' && (
          <div className="max-w-5xl mx-auto p-8 md:p-16 space-y-12 animate-fade-in-up">
            <div className="bg-brand-primary/10 p-10 rounded-[3rem] border-2 border-brand-primary/20 shadow-xl">
              <h3 className="text-brand-primary font-black uppercase tracking-widest text-sm mb-4">Misión del Ejemplos de venta</h3>
              <p className="text-xl text-brand-dark dark:text-gray-200 font-medium leading-relaxed">
                Tu éxito depende de la calidad de tus referencias. Utiliza estas guías rápidas para filtrar oportunidades y presentar el ecosistema con la máxima autoridad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-300 uppercase tracking-[0.3em] ml-4">Guías de Identificación</h3>
                <div className="space-y-6">
                  <LibraryItem 
                    icon="✅" 
                    title="Qué es una buena oportunidad (checklist)" 
                    desc="Aprende los requisitos mínimos y descubre ejemplos reales de éxito por sectores."
                    onClick={() => setActiveView('good_opportunity')}
                  />
                  <LibraryItem 
                    icon="❌" 
                    title="Qué NO es una buena oportunidad" 
                    desc="Evita perder tiempo con perfiles que no encajan: particulares, micro-pymes o empresas con deudas."
                    onClick={() => setActiveView('bad_opportunity')}
                  />
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-300 uppercase tracking-[0.3em] ml-4">Herramientas de Comunicación</h3>
                <div className="space-y-6">
                  <LibraryItem 
                    icon="⏱️" 
                    title="Cómo explicar nuestra propuesta en 30 segundos" 
                    desc="Pitch definitivo, Q&A de dudas frecuentes y microcontenidos listos para copiar."
                    onClick={() => setActiveView('pitch_30s')}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'pitch_30s' && (
          <div className="max-w-4xl mx-auto p-8 md:p-16 space-y-16 animate-fade-in">
            <section className="space-y-6">
              <h3 className="text-sm font-black text-brand-primary uppercase tracking-[0.3em]">El Pitch de 30 Segundos</h3>
              <div className="bg-white dark:bg-brand-darkCard p-10 rounded-[3rem] border-2 border-brand-primary shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                <p className="text-2xl md:text-3xl text-brand-dark dark:text-white font-bold leading-tight italic">
                  "Ayudamos a empresas a captar financiación pública no reembolsable usando Inteligencia Artificial para acelerar el proceso un 90% con seguridad total."
                </p>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-sm font-black text-brand-primary uppercase tracking-[0.3em]">Preguntas y Respuestas Reales</h3>
              <div className="grid gap-6">
                <QAItem 
                  q="¿Es seguro usar IA con mis datos?" 
                  a="Totalmente. Usamos un entorno privado y seguro. Los datos no se usan para entrenar modelos públicos y el cliente mantiene la propiedad total del contenido." 
                />
                <QAItem 
                  q="¿Qué coste tiene para la empresa?" 
                  a="Trabajamos con un modelo orientado a resultados. Hay un fee de gestión mínimo y el grueso es una comisión de éxito sobre la ayuda concedida." 
                />
                <QAItem 
                  q="¿Qué garantías de éxito hay?" 
                  a="Realizamos un pre-filtro técnico riguroso. Si vemos que el proyecto no tiene encaje, lo decimos antes de empezar para no perder el tiempo." 
                />
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-sm font-black text-brand-primary uppercase tracking-[0.3em]">Microcontenidos Reutilizables</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <CopyBlock 
                  label="Para WhatsApp / Telegram"
                  content="¡Hola! He empezado a colaborar con una plataforma que usa IA para conseguir subvenciones no reembolsables en tiempo récord. Si estás invirtiendo en I+D o digitalización, deberíamos hablar porque hay fondos interesantes ahora mismo."
                />
                <CopyBlock 
                  label="Introducción en LinkedIn"
                  content="Hola [Nombre], he visto vuestro crecimiento y quería comentarte que formo parte de un ecosistema que ayuda a empresas a financiar sus proyectos mediante fondos públicos sin retorno con una tecnología que reduce el papeleo un 90%."
                />
              </div>
            </section>
          </div>
        )}

        {activeView === 'good_opportunity' && (
          <div className="max-w-4xl mx-auto p-8 md:p-16 space-y-16 animate-fade-in">
            <section className="space-y-8">
              <h3 className="text-sm font-black text-brand-primary uppercase tracking-[0.3em]">Checklist de Cualificación</h3>
              <div className="bg-white dark:bg-brand-darkCard p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl space-y-6">
                <CheckItem text="Empresa legalmente constituida (SL o SA)." />
                <CheckItem text="Mínimo 10 empleados en plantilla." />
                <CheckItem text="Facturación anual superior a 500.000€." />
                <CheckItem text="Proyectos de inversión previstos (I+D, maquinaria, software, placas solares...)." />
                <CheckItem text="Situación financiera saneada (sin deudas con AEAT o SS)." />
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex justify-between items-end">
                <h3 className="text-sm font-black text-brand-primary uppercase tracking-[0.3em]">Ejemplos Reales de Éxito</h3>
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-300 uppercase tracking-widest">3 casos de uso comunes</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ExampleCard 
                  sector="Industrial"
                  icon="🏭"
                  title="Digitalización 4.0"
                  desc="Fábrica de muebles que invierte 150k€ en automatización de corte y software de diseño conectado."
                />
                <ExampleCard 
                  sector="Tecnológico"
                  icon="💻"
                  title="Desarrollo I+D"
                  desc="Software house que desarrolla un nuevo motor de IA para salud. Invierten en perfiles técnicos senior."
                />
                <ExampleCard 
                  sector="Turismo / Agro"
                  icon="🌿"
                  title="Sostenibilidad"
                  desc="Bodega que instala energía fotovoltaica y sistema de depuración circular. Inversión 80k€."
                />
              </div>
            </section>
          </div>
        )}

        {activeView === 'bad_opportunity' && (
          <div className="max-w-4xl mx-auto p-8 md:p-16 space-y-16 animate-fade-in">
            {/* RED FLAGS CHECKLIST */}
            <section className="space-y-8">
              <h3 className="text-sm font-black text-red-500 uppercase tracking-[0.3em]">Red Flags (Criterios de Exclusión)</h3>
              <div className="bg-white dark:bg-brand-darkCard p-10 rounded-[3rem] border border-red-100 dark:border-red-900/20 shadow-2xl space-y-6">
                <CheckItem text="Particulares (Personas físicas sin actividad profesional)." isNegative />
                <CheckItem text="Empresas con deudas activas no aplazadas con Hacienda o Seg. Social." isNegative />
                <CheckItem text="Micro-negocios con menos de 3 empleados y facturación residual." isNegative />
                <CheckItem text="Inversiones ya realizadas (la mayoría de ayudas no son retroactivas)." isNegative />
                <CheckItem text="Negocios que solo buscan dinero para gastos corrientes (sueldos, alquiler)." isNegative />
              </div>
            </section>

            {/* EJEMPLOS NEGATIVOS */}
            <section className="space-y-8">
              <div className="flex justify-between items-end">
                <h3 className="text-sm font-black text-red-500 uppercase tracking-[0.3em]">Ejemplos de Malos Leads</h3>
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-300 uppercase tracking-widest">Ahorra tiempo detectando estos casos</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ExampleCard 
                  sector="Autónomo"
                  icon="👤"
                  title="El Profesional Solitario"
                  desc="Un diseñador freelance que quiere una subvención para comprarse un MacBook Pro de 3.000€. No hay inversión productiva ni estructura."
                  isNegative
                />
                <ExampleCard 
                  sector="Crisis"
                  icon="📉"
                  title="La Empresa en Quiebra"
                  desc="S.L. con embargos activos que busca una ayuda a fondo perdido para pagar nóminas atrasadas. Será denegada por solvencia."
                  isNegative
                />
                <ExampleCard 
                  sector="Retroactivo"
                  icon="⌛"
                  title="La Inversión de Ayer"
                  desc="Empresa que compró maquinaria hace 1 año y ahora quiere 'ver si hay algo'. El efecto incentivador se pierde si ya se ha pagado."
                  isNegative
                />
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Footer pantalla completa */}
      <div className="p-10 border-t dark:border-white/5 bg-white dark:bg-brand-darkCard text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-300 uppercase tracking-widest">Contenido exclusivo para Miembros del Ecosistema</p>
          <button 
            onClick={activeView === 'index' ? onClose : () => setActiveView('index')}
            className="px-12 py-4 bg-brand-dark dark:bg-gray-800 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-brand-primary transition-all active:scale-95"
          >
            {activeView === 'index' ? 'Volver al Dashboard' : 'Volver a Biblioteca'}
          </button>
        </div>
      </div>
    </div>
  );
};

const LibraryItem = ({ icon, title, desc, onClick }: { icon: string, title: string, desc: string, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="flex flex-col gap-5 p-8 bg-white dark:bg-brand-darkCard rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-card hover:shadow-2xl hover:border-brand-primary/40 transition-all cursor-pointer group"
  >
    <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-brand-darkBg flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 group-hover:bg-brand-primary/10 transition-all shadow-sm">
      {icon}
    </div>
    <div>
      <h4 className="text-xl font-black text-brand-dark dark:text-white leading-tight mb-3 uppercase tracking-tighter">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-200 leading-relaxed font-medium">{desc}</p>
    </div>
    <div className="pt-4 mt-auto">
        <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest group-hover:translate-x-2 transition-transform inline-block">Ver recurso →</span>
    </div>
  </div>
);

const CheckItem = ({ text, isNegative }: { text: string, isNegative?: boolean }) => (
  <div className={`flex items-center gap-4 p-4 rounded-2xl transition-colors border border-transparent ${isNegative ? 'hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-500/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-brand-primary/10'}`}>
    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isNegative ? 'bg-red-100 text-red-500' : 'bg-brand-secondary/20 text-brand-secondary'}`}>
      {isNegative ? '✕' : '✓'}
    </div>
    <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{text}</p>
  </div>
);

const ExampleCard = ({ sector, icon, title, desc, isNegative }: { sector: string, icon: string, title: string, desc: string, isNegative?: boolean }) => (
  <div className={`bg-white dark:bg-brand-darkCard p-8 rounded-[2.5rem] border shadow-lg hover:shadow-2xl transition-all group ${isNegative ? 'border-red-50 dark:border-red-900/20' : 'border-gray-100 dark:border-white/5'}`}>
    <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${isNegative ? 'text-red-400' : 'text-brand-primary'}`}>{sector}</div>
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <h4 className="text-lg font-black text-brand-dark dark:text-white mb-2 leading-tight">{title}</h4>
    <p className="text-xs text-gray-500 dark:text-gray-200 leading-relaxed font-medium">{desc}</p>
  </div>
);

const QAItem = ({ q, a }: { q: string, a: string }) => (
  <div className="bg-white dark:bg-brand-darkCard p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:border-brand-primary/20 transition-all">
    <div className="flex gap-4 mb-4">
      <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black text-xs">P</span>
      <h4 className="text-lg font-bold text-brand-dark dark:text-white leading-tight">{q}</h4>
    </div>
    <div className="flex gap-4">
      <span className="w-8 h-8 rounded-lg bg-brand-secondary/10 text-brand-secondary flex items-center justify-center font-black text-xs">R</span>
      <p className="text-sm text-gray-500 dark:text-gray-200 leading-relaxed font-medium">{a}</p>
    </div>
  </div>
);

const CopyBlock = ({ label, content }: { label: string, content: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center px-4">
        <span className="text-[10px] font-black text-gray-400 dark:text-gray-300 uppercase tracking-widest">{label}</span>
        <button 
          onClick={handleCopy}
          className={`text-[9px] font-black uppercase px-3 py-1 rounded-lg transition-all ${copied ? 'bg-blue-50 text-white' : 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white'}`}
        >
          {copied ? '¡Copiado!' : 'Copiar Texto'}
        </button>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic">
          "{content}"
        </p>
      </div>
    </div>
  );
};

export default LibraryDrawer;
