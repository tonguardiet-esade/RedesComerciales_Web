
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
    <div className="fixed inset-0 z-[100] flex flex-col bg-mosaic-white-200 animate-fade-in">
      <div className="p-6 md:p-10 border-b border-mosaic-white-300 flex justify-between items-center bg-mosaic-white-100 shrink-0">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 md:gap-6 min-w-0">
            {activeView !== 'index' && (
              <button
                type="button"
                onClick={() => setActiveView('index')}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-mosaic-white-200 border border-mosaic-white-300 hover:border-mosaic-cyan hover:text-mosaic-cyan transition-colors shrink-0"
              >
                ←
              </button>
            )}
            <div className="min-w-0">
              <h2 className="mosaic-h4 truncate">
                {activeView === 'index' ? 'Biblioteca de éxito' :
                 activeView === 'good_opportunity' ? 'Filtro de oportunidades' :
                 activeView === 'bad_opportunity' ? 'Criterios de exclusión' : 'Kit de comunicación'}
              </h2>
              <p className="mosaic-label text-mosaic-black-300 mt-1">Recursos estratégicos para Ejemplos de venta</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-mosaic-white-300 hover:border-mosaic-cyan hover:text-mosaic-cyan transition-colors shrink-0"
            aria-label="Cerrar biblioteca"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeView === 'index' && (
          <div className="max-w-5xl mx-auto p-8 md:p-16 space-y-12 animate-fade-in-up">
            <div className="bg-mosaic-cyan/10 p-8 md:p-10 border border-mosaic-cyan/20">
              <h3 className="mosaic-label text-mosaic-cyan mb-4">Misión del Ejemplos de venta</h3>
              <p className="mosaic-body text-sm md:text-base">
                Tu éxito depende de la calidad de tus referencias. Utiliza estas guías rápidas para filtrar oportunidades y presentar el ecosistema con la máxima autoridad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <h3 className="mosaic-label text-mosaic-black-300 ml-2">Guías de identificación</h3>
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
                <h3 className="mosaic-label text-mosaic-black-300 ml-2">Herramientas de comunicación</h3>
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
              <h3 className="text-sm font-black text-mosaic-cyan uppercase tracking-[0.3em]">El Pitch de 30 Segundos</h3>
              <div className="bg-mosaic-white-100 border border-mosaic-white-300 p-10 rounded-[3rem] border-2 border-mosaic-cyan shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-mosaic-cyan/5 -mr-16 -mt-16" />
                <p className="mosaic-h4 italic">
                  "Ayudamos a empresas a captar financiación pública no reembolsable usando Inteligencia Artificial para acelerar el proceso un 90% con seguridad total."
                </p>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-sm font-black text-mosaic-cyan uppercase tracking-[0.3em]">Preguntas y Respuestas Reales</h3>
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
              <h3 className="text-sm font-black text-mosaic-cyan uppercase tracking-[0.3em]">Microcontenidos Reutilizables</h3>
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
              <h3 className="text-sm font-black text-mosaic-cyan uppercase tracking-[0.3em]">Checklist de Cualificación</h3>
              <div className="bg-mosaic-white-100 border border-mosaic-white-300 p-8 md:p-10 space-y-4">
                <CheckItem text="Empresa legalmente constituida (SL o SA)." />
                <CheckItem text="Mínimo 10 empleados en plantilla." />
                <CheckItem text="Facturación anual superior a 500.000€." />
                <CheckItem text="Proyectos de inversión previstos (I+D, maquinaria, software, placas solares...)." />
                <CheckItem text="Situación financiera saneada (sin deudas con AEAT o SS)." />
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex justify-between items-end">
                <h3 className="text-sm font-black text-mosaic-cyan uppercase tracking-[0.3em]">Ejemplos Reales de Éxito</h3>
                <span className="mosaic-label text-mosaic-black-300">3 casos de uso comunes</span>
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
              <div className="bg-mosaic-white-100 border border-red-200 p-8 md:p-10 space-y-4">
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
                <span className="mosaic-label text-mosaic-black-300">Ahorra tiempo detectando estos casos</span>
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

      <div className="p-6 md:p-10 border-t border-mosaic-white-300 bg-mosaic-white-100 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="mosaic-label text-mosaic-black-300">Contenido exclusivo para miembros del ecosistema</p>
          <button
            type="button"
            onClick={activeView === 'index' ? onClose : () => setActiveView('index')}
            className="px-8 py-3 bg-mosaic-black-500 text-mosaic-white-100 mosaic-label hover:bg-mosaic-cyan transition-colors"
          >
            {activeView === 'index' ? 'Volver al dashboard' : 'Volver a biblioteca'}
          </button>
        </div>
      </div>
    </div>
  );
};

const LibraryItem = ({ icon, title, desc, onClick }: { icon: string, title: string, desc: string, onClick: () => void }) => (
  <div
    onClick={onClick}
    data-cursor="pointer"
    className="flex flex-col gap-4 p-6 md:p-8 bg-mosaic-white-100 border border-mosaic-white-300 hover:border-mosaic-cyan transition-colors cursor-pointer group"
  >
    <div className="w-12 h-12 bg-mosaic-white-200 border border-mosaic-white-300 flex items-center justify-center text-2xl shrink-0 group-hover:border-mosaic-cyan transition-colors">
      {icon}
    </div>
    <div>
      <h4 className="mosaic-h5 mb-2">{title}</h4>
      <p className="mosaic-body text-sm">{desc}</p>
    </div>
    <span className="mosaic-label text-mosaic-cyan group-hover:translate-x-1 transition-transform inline-block">Ver recurso →</span>
  </div>
);

const CheckItem = ({ text, isNegative }: { text: string, isNegative?: boolean }) => (
  <div className={`flex items-center gap-4 p-4 border border-transparent ${isNegative ? 'hover:border-red-200' : 'hover:border-mosaic-cyan/20'}`}>
    <div className={`w-6 h-6 flex items-center justify-center text-xs ${isNegative ? 'bg-red-100 text-red-500' : 'bg-mosaic-green/20 text-mosaic-green'}`}>
      {isNegative ? '✕' : '✓'}
    </div>
    <p className="mosaic-body text-sm text-mosaic-black-400">{text}</p>
  </div>
);

const ExampleCard = ({ sector, icon, title, desc, isNegative }: { sector: string, icon: string, title: string, desc: string, isNegative?: boolean }) => (
  <div className={`bg-mosaic-white-100 p-6 border transition-colors ${isNegative ? 'border-red-200' : 'border-mosaic-white-300 hover:border-mosaic-cyan'}`}>
    <div className={`mosaic-label mb-3 ${isNegative ? 'text-red-400' : 'text-mosaic-cyan'}`}>{sector}</div>
    <div className="text-3xl mb-3">{icon}</div>
    <h4 className="mosaic-h5 mb-2">{title}</h4>
    <p className="mosaic-body text-xs">{desc}</p>
  </div>
);

const QAItem = ({ q, a }: { q: string, a: string }) => (
  <div className="bg-mosaic-white-100 p-6 border border-mosaic-white-300 hover:border-mosaic-cyan/30 transition-colors">
    <div className="flex gap-4 mb-4">
      <span className="w-8 h-8 bg-mosaic-cyan/10 text-mosaic-cyan flex items-center justify-center mosaic-label text-xs">P</span>
      <h4 className="mosaic-body text-sm text-mosaic-black-500">{q}</h4>
    </div>
    <div className="flex gap-4">
      <span className="w-8 h-8 bg-mosaic-green/10 text-mosaic-green flex items-center justify-center mosaic-label text-xs">R</span>
      <p className="mosaic-body text-sm">{a}</p>
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
      <div className="flex justify-between items-center px-2">
        <span className="mosaic-label text-mosaic-black-300">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className={`mosaic-label px-3 py-1 border transition-colors ${
            copied ? 'bg-mosaic-cyan text-mosaic-white-100 border-mosaic-cyan' : 'border-mosaic-white-300 text-mosaic-cyan hover:bg-mosaic-cyan hover:text-mosaic-white-100'
          }`}
        >
          {copied ? '¡Copiado!' : 'Copiar texto'}
        </button>
      </div>
      <div className="bg-mosaic-white-200 p-5 border border-mosaic-white-300">
        <p className="mosaic-body text-xs italic">"{content}"</p>
      </div>
    </div>
  );
};

export default LibraryDrawer;
