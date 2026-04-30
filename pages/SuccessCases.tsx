
import React from 'react';
import { motion } from 'motion/react';
import { useSettings } from '../context/SettingsContext';
import { 
  Target, 
  Zap, 
  Globe, 
  CheckCircle2
} from 'lucide-react';

const SuccessCasesPage = () => {
  const { theme } = useSettings();

  const successCases = [
    {
      title: "Consultoría Estratégica B2B",
      challenge: "Red de 2.000 contactos 'dormida' y dependencia total del CEO para captación.",
      solution: "Activación del sistema de Red Comercial Online y gestión automatizada de referidos.",
      results: [
        "+35% de Leads cualificado en el primer trimestre",
        "Apertura de 2 mercados internacionales sin delegaciones físicas",
        "Retorno de inversión (ROI) del 400% en 6 meses"
      ],
      icon: <Globe className="w-8 h-8" />
    },
    {
      title: "Software SaaS (Scale-up)",
      challenge: "Programa de partners opaco con falta de predictibilidad en el pipeline.",
      solution: "Digitalización del onboarding y trazabilidad total de introducciones comerciales.",
      results: [
        "Reducción del 50% en el tiempo de cierre de ventas indirectas",
        "Incremento del 20% en el MRR proveniente de canal",
        "Visibilidad 100% sobre las gestiones de cada partner"
      ],
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Fondo de Inversión (Portfolio)",
      challenge: "Nula sinergia comercial entre las 12 participadas del fondo.",
      solution: "Creación de un HUB comercial compartido basado en la metodología Acceleralia.",
      results: [
        "8 ventas cruzadas generadas de forma orgánica en un año",
        "Reducción del coste de adquisición (CAC) en un 15%",
        "Aceleración del crecimiento en empresas estancadas"
      ],
      icon: <Target className="w-8 h-8" />
    }
  ];

  return (
    <div className={`min-h-screen pt-32 pb-20 bg-transparent`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">Proyectos que transforman</h1>
            <p className={`text-xl font-bold max-w-2xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>
              Resultados reales de la implementación del sistema Acceleralia en diferentes ecosistemas comerciales.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successCases.map((caseItem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-10 rounded-[3rem] border flex flex-col h-full transition-all backdrop-blur-sm ${
                theme === 'dark' ? 'bg-brand-dark-card/40 border-white/10 hover:border-brand-primary/40' : 'bg-white/40 border-white shadow-xl shadow-gray-200/20 hover:shadow-2xl'
              }`}
            >
              <div className={`w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-8 ${theme === 'dark' ? '!text-white' : 'text-brand-primary'}`}>
                {caseItem.icon}
              </div>
              <h3 className="text-2xl font-black mb-6 tracking-tight">{caseItem.title}</h3>
              
              <div className="space-y-6 flex-grow">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-2">Desafío</h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-gray-600'}`}>{caseItem.challenge}</p>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-2">Solución</h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-gray-600'}`}>{caseItem.solution}</p>
                </div>
                <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                  <h4 className="text-xs font-black uppercase tracking-widest text-green-500 mb-4">Resultados</h4>
                  <ul className="space-y-3">
                    {caseItem.results.map((result, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className={`text-sm font-bold ${theme === 'dark' ? '!text-white' : 'text-gray-700'}`}>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action at the bottom of success cases */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-32 p-12 md:p-20 rounded-[4rem] bg-brand-dark text-white text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6 tracking-tight">¿Quieres ser el próximo caso de éxito?</h2>
            <p className="text-lg opacity-80 mb-10 max-w-xl mx-auto font-medium">
              Activa hoy mismo tu red comercial y empieza a ver resultados medibles en menos de 90 días.
            </p>
            <button className="px-10 py-5 bg-brand-primary text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-brand-primary/40">
              Solicitar Auditoría de Red
            </button>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/10 rounded-full -ml-48 -mb-48 blur-[100px]"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessCasesPage;
