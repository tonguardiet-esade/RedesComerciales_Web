
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { UserLevel } from '../types';
import ChatAssistant from '../components/ChatAssistant';
import ModuleProgress from '../components/ModuleProgress';

const contentData: Record<number, { title: string, objective: string, content: string[] }> = {
  [UserLevel.EJEMPLOS_DE_VENTA]: {
    title: "Cómo funciona el proceso de prescripción",
    objective: "Comprender cómo funciona el proceso completo, desde la identificación de una oportunidad hasta la evaluación y gestión del proyecto.",
    content: [
      "El proceso de prescripción es el mecanismo mediante el cual un Ejemplos de venta introduce una oportunidad dentro del ecosistema FundsWIN.",
      "El primer paso consiste en identificar una empresa o entidad que podría beneficiarse de las soluciones de la plataforma. Esto suele surgir a partir de conversaciones, relaciones profesionales o proyectos en los que el Ejemplos de venta ya está involucrado.",
      "Una vez identificada la oportunidad, el Ejemplos de venta realiza la introducción de la empresa o el proyecto dentro del sistema o a través del canal establecido. Esta introducción permite que el equipo de FundsWIN analice la oportunidad y determine si existen soluciones o vías de financiación que puedan aplicarse al caso.",
      "Después de esta introducción, el equipo especializado realiza una evaluación inicial del proyecto o de las necesidades de la empresa. En función de este análisis, se identifican posibles oportunidades de financiación o servicios que puedan aportar valor.",
      "A partir de ese momento se inicia el proceso de acompañamiento, análisis o preparación del proyecto, según corresponda. El Ejemplos de venta puede mantenerse informado del progreso de la oportunidad y continuar acompañando la relación con la empresa si así se establece.",
      "El proceso está diseñado para que el Ejemplos de venta pueda centrarse principalmente en la identificación de oportunidades, mientras que el análisis técnico y la gestión de los proyectos se realiza desde el ecosistema FundsWIN."
    ]
  },
  [UserLevel.COLABORADOR]: {
    title: "Módulo 4. Modelo económico y generación de ingresos",
    objective: "Comprender la estructura de ingresos, el sistema de comisiones y la escalabilidad del modelo.",
    content: [
      "Este módulo explica cómo funciona el modelo económico del Colaborador. Se detalla el canon anual y qué incluye dentro del ecosistema.",
      "Se explica el sistema de comisiones recurrentes y su lógica. El participante entiende cómo se generan ingresos a medio y largo plazo.",
      "Se presentan escenarios realistas de crecimiento económico. El foco está en la recurrencia y la escalabilidad del modelo. Se comparan sus ventajas frente a servicios puntuales.",
      "El módulo aporta claridad y transparencia financiera. El participante visualiza el impacto en su facturación. El resultado es una comprensión clara del potencial del modelo."
    ]
  },
  [UserLevel.MOCOTA_SIN_REDACCION]: {
    title: "MÓDULO 4 · Modelo económico y oportunidad de negocio",
    objective: "Analizar la rentabilidad, los costes y el potencial de escalabilidad del modelo de delegación.",
    content: [
      "El MOCOTA Delegado accede al modelo mediante un canon anual de franquicia de 12.000 €. A cambio, obtiene exclusividad territorial, soporte continuo y una comisión del 30 % sobre cada venta realizada.",
      "Es un modelo orientado a ingresos escalables desde el primer año. Está diseñado para profesionales que desean ser dueños de su zona y construir un negocio sólido en un mercado emergente.",
      "El sector de la financiación pública con IA presenta alta demanda y baja competencia relativa. El Delegado cuenta con herramientas, formación y marca para acelerar resultados.",
      "Este nivel es ideal para quienes buscan impacto, rentabilidad y posicionamiento estratégico a largo plazo."
    ]
  },
  [UserLevel.MOCOTA_CON_REDACCION]: {
    title: "MÓDULO 4 · Modelo económico y oportunidad de negocio",
    objective: "Analizar la rentabilidad, los costes y el potencial de escalabilidad del modelo de delegación.",
    content: [
      "El MOCOTA Delegado accede al modelo mediante un canon anual de franquicia de 12.000 €. A cambio, obtiene exclusividad territorial, soporte continuo y una comisión del 30 % sobre cada venta realizada.",
      "Es un modelo orientado a ingresos escalables desde el primer año. Está diseñado para profesionales que desean ser dueños de su zona y construir un negocio sólido en un mercado emergente.",
      "El sector de la financiación pública con IA presenta alta demanda y baja competencia relativa. El Delegado cuenta con herramientas, formación y marca para acelerar resultados.",
      "Este nivel es ideal para quienes buscan impacto, rentabilidad y posicionamiento estratégico a largo plazo."
    ]
  }
};

const quizData: Record<number, { title: string, questions: { question: string, options: { text: string, correct: boolean }[] }[] }> = {
  [UserLevel.EJEMPLOS_DE_VENTA]: {
    title: "Validación Módulo 4",
    questions: [
      {
        question: "¿Cuál es el primer paso del proceso de prescripción?",
        options: [
          { text: "Elaborar un plan financiero completo.", correct: false },
          { text: "Identificar una empresa que pueda beneficiarse de FundsWIN.", correct: true },
          { text: "Solicitar directamente una subvención.", correct: false }
        ]
      },
      {
        question: "¿Qué ocurre después de que el Ejemplos de venta introduce una oportunidad?",
        options: [
          { text: "El equipo FundsWIN analiza la oportunidad.", correct: true },
          { text: "La empresa recibe automáticamente financiación.", correct: false },
          { text: "El Ejemplos de venta gestiona todo el proyecto.", correct: false }
        ]
      },
      {
        question: "¿Quién se encarga del análisis técnico y la gestión del proyecto?",
        options: [
          { text: "El Ejemplos de venta.", correct: false },
          { text: "El equipo especializado del ecosistema FundsWIN.", correct: true },
          { text: "La empresa cliente.", correct: false }
        ]
      }
    ]
  },
  [UserLevel.COLABORADOR]: {
    title: "Validación: Modelo Económico",
    questions: [
      {
        question: "1. ¿Qué componentes principales incluye el modelo económico del Colaborador?",
        options: [
          { text: "Solo un pago único inicial", correct: false },
          { text: "Un canon anual y un sistema de comisiones recurrentes", correct: true },
          { text: "Un salario mensual fijo y variable", correct: false },
          { text: "Gratuidad total a cambio de soporte técnico", correct: false }
        ]
      },
      {
        question: "2. ¿En qué conceptos reside la mayor ventaja del modelo frente a servicios puntuales?",
        options: [
          { text: "En el bajo nivel de exigencia comercial", correct: false },
          { text: "En la eliminación total de costes operativos", correct: false },
          { text: "En la recurrencia y la escalabilidad", correct: true },
          { text: "En el acceso a subvenciones garantizadas", correct: false }
        ]
      },
      {
        question: "3. ¿Cuál es el objetivo final de aportar claridad financiera en este módulo?",
        options: [
          { text: "Realizar el primer cobro al cliente", correct: false },
          { text: "Reducir la facturación de la agencia", correct: false },
          { text: "Comprensión clara del impacto y potencial del modelo", correct: true },
          { text: "Justificar el aumento de precios al cliente", correct: false }
        ]
      }
    ]
  },
  [UserLevel.MOCOTA_SIN_REDACCION]: {
    title: "Validación: Modelo Económico",
    questions: [
      {
        question: "¿Cuál es el canon anual del MOCOTA Delegado?",
        options: [
          { text: "3.000 €", correct: false },
          { text: "6.000 €", correct: false },
          { text: "10.000 €", correct: false },
          { text: "12.000 €", correct: true }
        ]
      },
      {
        question: "¿Qué comisión recibe por cada venta?",
        options: [
          { text: "10 %", correct: false },
          { text: "15 %", correct: false },
          { text: "20 %", correct: false },
          { text: "30 %", correct: true }
        ]
      },
      {
        question: "¿Para quién es ideal este nivel?",
        options: [
          { text: "Personas sin experiencia laboral", correct: false },
          { text: "Profesionales del Nivel 2 listos para full-time", correct: true },
          { text: "Freelancers ocasionales", correct: false },
          { text: "Técnicos sin interés comercial", correct: false }
        ]
      }
    ]
  },
  [UserLevel.MOCOTA_CON_REDACCION]: {
    title: "Validación: Modelo Económico",
    questions: [
      {
        question: "¿Cuál es el canon anual del MOCOTA Delegado?",
        options: [
          { text: "3.000 €", correct: false },
          { text: "6.000 €", correct: false },
          { text: "10.000 €", correct: false },
          { text: "12.000 €", correct: true }
        ]
      },
      {
        question: "¿Qué comisión recibe por cada venta?",
        options: [
          { text: "10 %", correct: false },
          { text: "15 %", correct: false },
          { text: "20 %", correct: false },
          { text: "30 %", correct: true }
        ]
      },
      {
        question: "¿Para quién es ideal este nivel?",
        options: [
          { text: "Personas sin experiencia laboral", correct: false },
          { text: "Profesionales del Nivel 2 listos para full-time", correct: true },
          { text: "Freelancers ocasionales", correct: false },
          { text: "Técnicos sin interés comercial", correct: false }
        ]
      }
    ]
  }
};

const Module4 = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState<'content' | 'quiz'>('content');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  if (!user) return null;

  const moduleInfo = contentData[user.nivel_elegido] || contentData[UserLevel.EJEMPLOS_DE_VENTA];
  const data = quizData[user.nivel_elegido] || quizData[UserLevel.EJEMPLOS_DE_VENTA];
  const question = data.questions[currentQuestion];

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const isCorrect = question.options[selectedOption].correct;
    if (isCorrect) setScore(score + 1);
    setIsAnswerChecked(true);

    setTimeout(() => {
        if (currentQuestion < data.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsAnswerChecked(false);
        } else {
            setShowResult(true);
            if (score + (isCorrect ? 1 : 0) === data.questions.length) {
                updateUser({ m4_completed: true });
            }
        }
    }, 1000);
  };

  if (step === 'content') {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
            <button onClick={() => navigate('/portal')} className="flex items-center gap-2 text-gray-400 hover:text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-8 group transition-colors">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
              Volver al panel
            </button>
            <ModuleProgress currentModule={4} userLevel={user.nivel_elegido} />
            <div className="bg-white dark:bg-brand-darkCard p-10 md:p-12 rounded-[3rem] shadow-card border border-gray-100 dark:border-white/5">
                <h1 className="text-3xl font-black text-brand-dark dark:text-white uppercase tracking-tighter mb-4">{moduleInfo.title}</h1>
                <div className="bg-brand-primary/5 p-6 rounded-2xl border-l-4 border-brand-primary mb-8">
                    <p className="text-xs font-black text-brand-primary uppercase tracking-widest mb-1">Objetivo del módulo</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{moduleInfo.objective}</p>
                </div>
                <div className="space-y-6 mb-10">
                    {moduleInfo.content.map((p, i) => <p key={i} className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{p}</p>)}
                </div>
                <button onClick={() => setStep('quiz')} className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all">Realizar Test de Validación</button>
            </div>
        </div>
    );
  }

  if (showResult) {
      const passed = score === data.questions.length;
      return (
          <div className="max-w-2xl mx-auto px-4 py-12 text-center animate-fade-in">
              <ModuleProgress currentModule={4} userLevel={user.nivel_elegido} />
              <div className={`p-10 rounded-[3rem] shadow-xl border-2 ${passed ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-500/30' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-500/30'}`}>
                  <div className="text-6xl mb-4">{passed ? '📈' : '📚'}</div>
                  <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-2">{passed ? '¡Módulo Superado!' : 'Necesitas repasar'}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">Has acertado {score} de {data.questions.length} preguntas.</p>
                  {passed ? (
                      <button onClick={() => navigate('/portal')} className="px-10 py-4 bg-brand-primary text-white rounded-full font-bold shadow-lg">Volver al Panel</button>
                  ) : (
                      <button onClick={() => { setStep('content'); setShowResult(false); setScore(0); setCurrentQuestion(0); }} className="px-8 py-3 bg-white dark:bg-brand-dark-card border border-brand-dark text-brand-dark dark:text-white rounded-full font-bold">Repasar Contenido</button>
                  )}
              </div>
          </div>
      )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <ModuleProgress currentModule={4} userLevel={user.nivel_elegido} />
      <div className="bg-white dark:bg-brand-darkCard p-8 md:p-12 rounded-[2.5rem] shadow-card border border-gray-100 dark:border-white/5">
        {/* Imagen Real del Cuestionario */}
        <div className="mb-10 rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 bg-white">
            <img src="/img/3.png" alt="Quiz Preview" className="w-full h-auto" referrerPolicy="no-referrer" />
        </div>
        <h2 className="text-xl font-bold text-brand-dark dark:text-white mb-10 leading-relaxed">{question.question}</h2>
        <div className="space-y-4">
            {question.options.map((opt, idx) => (
                <button key={idx} onClick={() => !isAnswerChecked && setSelectedOption(idx)} className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-bold text-sm ${isAnswerChecked ? (opt.correct ? 'bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/20 dark:border-blue-500/50 dark:text-blue-300' : (selectedOption === idx ? 'bg-red-50 border-red-500 text-red-800 dark:bg-red-900/20 dark:border-red-500/50 dark:text-red-300' : 'opacity-50 dark:text-gray-600')) : (selectedOption === idx ? 'bg-brand-light border-brand-primary text-brand-primary dark:bg-brand-primary/10 dark:border-brand-primary dark:text-brand-primary' : 'bg-white dark:bg-brand-dark-bg border-gray-100 dark:border-gray-800 dark:text-gray-300')}`}>
                    <div className="flex items-center gap-4">
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs border ${isAnswerChecked && opt.correct ? 'bg-blue-500 text-white border-blue-500' : (selectedOption === idx ? 'bg-brand-primary text-white border-brand-primary' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700')}`}>
                            {String.fromCharCode(65 + idx)}
                        </span>
                        {opt.text}
                    </div>
                </button>
            ))}
        </div>
        <div className="mt-12 flex justify-end">
            {!isAnswerChecked && <button onClick={handleCheckAnswer} disabled={selectedOption === null} className="px-10 py-4 bg-brand-primary text-white rounded-full font-bold shadow-lg">Confirmar Respuesta</button>}
        </div>
      </div>
      <ChatAssistant context={`Módulo 4: Modelo económico`} />
    </div>
  );
};

export default Module4;
