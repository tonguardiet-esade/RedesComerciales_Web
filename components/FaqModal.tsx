
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MosaicModal from './mosaic/MosaicModal';

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

  return (
    <MosaicModal
      isOpen={isOpen}
      onClose={onClose}
      title="Preguntas frecuentes"
      subtitle="Todo sobre el rol de Ejemplos de venta"
      maxWidth="3xl"
    >
      <div className="p-6 md:p-8">
        <div className="space-y-3">
          {faqData.map((item, index) => (
            <div key={index} className="border border-mosaic-white-300 bg-mosaic-white-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-5 md:p-6 flex items-center justify-between text-left group"
              >
                <span className="mosaic-body text-sm text-mosaic-black-500 group-hover:text-mosaic-cyan transition-colors pr-4">
                  {item.question}
                </span>
                <span className={`w-8 h-8 flex items-center justify-center mosaic-label shrink-0 transition-colors ${
                  activeFaq === index ? 'bg-mosaic-cyan text-mosaic-white-100' : 'bg-mosaic-white-100 text-mosaic-black-300 border border-mosaic-white-300'
                }`}>
                  {activeFaq === index ? '−' : '+'}
                </span>
              </button>

              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-mosaic-white-300">
                      <p className="mosaic-body text-sm pt-4">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <p className="mosaic-label text-mosaic-black-300 text-center mt-8">
          ¿Tienes más dudas? Contacta con nuestro soporte
        </p>
      </div>
    </MosaicModal>
  );
};

export default FaqModal;
