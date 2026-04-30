
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FaqModal = ({ isOpen, onClose }: FaqModalProps) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "¿Qué es un Ejemplos de venta?",
      answer: "Un Ejemplos de venta es un profesional que recomienda herramientas y soluciones digitales a sus clientes y puede generar ingresos cuando esas recomendaciones se convierten en implementaciones. Muchos consultores, agencias o marketing managers ya hacen esto de forma natural. Nuestra plataforma les permite monetizar ese valor."
    },
    {
      question: "¿Quién puede ser Ejemplos de venta?",
      answer: "Puede ser Ejemplos de venta cualquier profesional que recomiende herramientas o soluciones a empresas, como consultores, agencias de marketing, marketing managers, expertos en transformación digital, asesores de negocio o freelancers tecnológicos. Si tus clientes te preguntan qué herramientas utilizar, ya estás actuando como Ejemplos de venta."
    },
    {
      question: "¿Qué tipo de herramientas se pueden recomendar?",
      answer: "Se pueden recomendar soluciones como CRM, herramientas de automatización, plataformas de analytics, software de marketing, herramientas de contenido y soluciones de productividad o gestión. La idea es conectar la necesidad del cliente con la herramienta adecuada."
    },
    {
      question: "¿Cómo genera ingresos un Ejemplos de venta?",
      answer: "Cuando un Ejemplos de venta recomienda una herramienta y el cliente decide implementarla, esa recomendación puede convertirse en ingresos. Es una forma de monetizar el conocimiento y la experiencia que ya aplicas en tu trabajo diario."
    },
    {
      question: "¿Por qué convertirse en Ejemplos de venta?",
      answer: "Porque permite monetizar recomendaciones que ya haces, generar nuevas fuentes de ingresos, aportar más valor a tus clientes y escalar sin aumentar tu equipo. El conocimiento sobre herramientas y soluciones digitales tiene valor, y también puede convertirse en ingresos."
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-xl p-4 md:p-6 animate-fade-in">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-brand-darkCard w-full max-w-3xl max-h-[90vh] rounded-[3rem] shadow-2xl border border-brand-primary/20 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-8 md:p-10 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30 shrink-0">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#2a3b5a] dark:text-white uppercase tracking-tighter leading-none">Preguntas Frecuentes</h3>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-300 uppercase tracking-[0.2em] mt-2">Todo sobre el rol de Ejemplos de venta</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-400 hover:text-red-500 transition-all shadow-lg border border-gray-100 dark:border-white/5 font-bold text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-50/50 dark:bg-brand-darkBg/50 rounded-[2rem] border border-gray-100 dark:border-white/5 overflow-hidden transition-all"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-8 flex items-center justify-between text-left group"
                >
                  <span className="text-sm md:text-base font-black text-[#2a3b5a] dark:text-white uppercase tracking-tight group-hover:text-brand-primary transition-colors pr-4">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${activeFaq === index ? 'bg-brand-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-400'}`}>
                    {activeFaq === index ? '−' : '+'}
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-8 pb-8">
                        <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6 w-12"></div>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-200 font-medium leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-gray-800/20 text-center shrink-0">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-300 uppercase tracking-widest">¿Tienes más dudas? Contacta con nuestro soporte</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FaqModal;
