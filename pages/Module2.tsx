
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { UserLevel } from '../types';
import ChatAssistant from '../components/ChatAssistant';
import ModuleProgress from '../components/ModuleProgress';

const contentData: Record<number, { title: string, objective: string, content: string[] }> = {
  [UserLevel.EJEMPLOS_DE_VENTA]: {
    title: "Qué significa ser Ejemplos de venta FundsWIN",
    objective: "Entender claramente cuál es su rol, qué tipo de oportunidades puede identificar y cómo puede aportar valor dentro del ecosistema FundsWIN.",
    content: [
      "Un Ejemplos de venta FundsWIN es una persona u organización que identifica empresas o entidades que podrían beneficiarse de las soluciones de FundsWIN y las conecta con la plataforma.",
      "El rol del Ejemplos de venta es fundamental porque muchas empresas desconocen las oportunidades de financiación o los recursos disponibles para impulsar sus proyectos. Los Ejemplos de venta ayudan a identificar estas necesidades y a acercar a las empresas a las soluciones adecuadas.",
      "Ser Ejemplos de venta no implica necesariamente realizar el trabajo técnico o gestionar los proyectos. La función principal consiste en detectar oportunidades, identificar empresas que puedan beneficiarse del ecosistema FundsWIN y facilitar el contacto o la introducción.",
      "Los Ejemplos de venta suelen ser perfiles que ya tienen relación con empresas o proyectos innovadores. Entre ellos se encuentran consultores, asesores empresariales, despachos profesionales, partners tecnológicos, incubadoras, aceleradoras, asociaciones empresariales o profesionales que trabajan cerca del ecosistema empresarial.",
      "El valor del Ejemplos de venta radica en su capacidad para identificar oportunidades y conectar a las empresas con las soluciones adecuadas en el momento oportuno."
    ]
  },
  [UserLevel.COLABORADOR]: {
    title: "Módulo 2. Perfil ideal y encaje profesional",
    objective: "Evaluar el encaje del perfil profesional con el modelo de Colaborador y sus habilidades clave.",
    content: [
      "Este módulo ayuda al participante a evaluar si su perfil encaja con el modelo de Colaborador. Se analizan los tipos de profesionales que mejor funcionan in este rol.",
      "El foco está en habilidades como la relación con el cliente, la visión comercial y la generación de confianza. Se muestra cómo el rol puede integrarse en una actividad profesional existente.",
      "El módulo evita plantear el rol como algo aislado o forzado. Se presentan escenarios reales de encaje profesional. El participante identifica sus fortalezas aplicables al modelo.",
      "También reconoce posibles límites o áreas a reforzar. Esto facilita una adopción consciente del rol. El resultado es una decisión informada y realista."
    ]
  },
  [UserLevel.MOCOTA_SIN_REDACCION]: {
    title: "MÓDULO 2 · Perfil y motivaciones del MOCOTA Delegado",
    objective: "Identificar las características personales y profesionales que conducen al éxito en la delegación.",
    content: [
      "El perfil típico del MOCOTA Delegado es el de un comercial senior, con experiencia consolidada y capacidad para liderar o crear equipo. Se caracteriza por una mentalidad estratégica, visión a largo plazo y alta resiliencia.",
      "Su principal motivación es alcanzar ingresos elevados y estables, con un objetivo aproximado de 80.000 € anuales solo en ventas. Valora especialmente la seguridad de un contrato de franquicia y el respaldo de una marca sólida.",
      "Busca independencia profesional sin renunciar a soporte, metodología y herramientas de alto nivel. Este rol atrae a personas que quieren escalar su impacto y convertirse en referentes en su provincia.",
      "La combinación de ambición, compromiso y mentalidad MOCOTA es clave para el éxito."
    ]
  },
  [UserLevel.MOCOTA_CON_REDACCION]: {
    title: "MÓDULO 2 · Perfil y motivaciones del MOCOTA Delegado",
    objective: "Identificar las características personales y profesionales que conducen al éxito en la delegación.",
    content: [
      "El perfil típico del MOCOTA Delegado es el de un comercial senior, con experiencia consolidada y capacidad para liderar o crear equipo. Se caracteriza por una mentalidad estratégica, visión a largo plazo y alta resiliencia.",
      "Su principal motivación es alcanzar ingresos elevados y estables, con un objetivo aproximado de 80.000 € anuales solo en ventas. Valora especialmente la seguridad de un contrato de franquicia y el respaldo de una marca sólida.",
      "Busca independencia profesional sin renunciar a soporte, metodología y herramientas de alto nivel. Este rol atrae a personas que quieren escalar su impacto y convertirse en referentes en su provincia.",
      "La combinación de ambición, compromiso y mentalidad MOCOTA es clave para el éxito."
    ]
  }
};

const quizData: Record<number, { title: string, questions: { question: string, options: { text: string, correct: boolean }[] }[] }> = {
  [UserLevel.EJEMPLOS_DE_VENTA]: {
    title: "Validación Módulo 2",
    questions: [
      {
        question: "¿Qué es un Ejemplos de venta FundsWIN?",
        options: [
          { text: "Un profesional que desarrolla software para la plataforma.", correct: false },
          { text: "Una persona u organización que identifica empresas que pueden beneficiarse de FundsWIN.", correct: true },
          { text: "Un gestor financiero que administra subvenciones públicas.", correct: false }
        ]
      },
      {
        question: "¿Cuál es la función principal de un Ejemplos de venta?",
        options: [
          { text: "Gestionar técnicamente los proyectos de financiación.", correct: false },
          { text: "Identificar oportunidades y conectar empresas con FundsWIN.", correct: true },
          { text: "Auditar las cuentas de las empresas.", correct: false }
        ]
      },
      {
        question: "¿Qué tipo de perfiles suelen ser Ejemplos de venta?",
        options: [
          { text: "Consultores, asesores, partners tecnológicos o asociaciones empresariales.", correct: true },
          { text: "Únicamente abogados especializados en subvenciones.", correct: false },
          { text: "Exclusivamente empleados internos de FundsWIN.", correct: false }
        ]
      }
    ]
  },
  [UserLevel.COLABORADOR]: {
    title: "Validación: Perfil y Encaje",
    questions: [
      {
        question: "1. ¿En qué habilidades se centra principalmente el perfil del Colaborador?",
        options: [
          { text: "Redacción técnica y administración", correct: false },
          { text: "Relación con el cliente y generación de confianza", correct: true },
          { text: "Gestión de bases de datos", correct: false },
          { text: "Soporte administrativo", correct: false }
        ]
      },
      {
        question: "2. ¿Cómo se plantea la integración del rol de Colaborador en el día a día?",
        options: [
          { text: "Como una actividad aislada y exclusiva", correct: false },
          { text: "Como algo forzado en la agenda", correct: false },
          { text: "Integrado en una actividad profesional existente", correct: true },
          { text: "Sustituyendo el negocio principal del participante", correct: false }
        ]
      },
      {
        question: "3. ¿Cuál es el resultado de identificar fortalezas y límites durante este módulo?",
        options: [
          { text: "Una decisión informada y realista", correct: true },
          { text: "El abandono inmediato del programa", correct: false },
          { text: "La contratación automática de un equipo técnico", correct: false },
          { text: "El acceso directo a la redacción técnica", correct: false }
        ]
      }
    ]
  },
  [UserLevel.MOCOTA_SIN_REDACCION]: {
    title: "Validación: Perfil Delegado",
    questions: [
      {
        question: "¿Qué experiencia previa suele tener un MOCOTA Delegado?",
        options: [
          { text: "Perfil junior en prácticas", correct: false },
          { text: "Experiencia técnica en IT", correct: false },
          { text: "Comercial senior", correct: true },
          { text: "Administrativo financiero", correct: false }
        ]
      },
      {
        question: "¿Cuál es una motivación clave del MOCOTA Delegado?",
        options: [
          { text: "Trabajar sin objetivos", correct: false },
          { text: "Seguridad de un contrato franquicia", correct: true },
          { text: "Evitar responsabilidades", correct: false },
          { text: "Trabajo 100 % remoto sin clientes", correct: false }
        ]
      },
      {
        question: "¿Qué rasgo NO es característico del perfil?",
        options: [
          { text: "Visión", correct: false },
          { text: "Persistencia", correct: false },
          { text: "Resiliencia", correct: false },
          { text: "Pasividad", correct: true }
        ]
      }
    ]
  },
  [UserLevel.MOCOTA_CON_REDACCION]: {
    title: "Validación: Perfil Delegado",
    questions: [
      {
        question: "¿Qué experiencia previa suele tener un MOCOTA Delegado?",
        options: [
          { text: "Perfil junior en prácticas", correct: false },
          { text: "Experiencia técnica en IT", correct: false },
          { text: "Comercial senior", correct: true },
          { text: "Administrativo financiero", correct: false }
        ]
      },
      {
        question: "¿Cuál es una motivación clave del MOCOTA Delegado?",
        options: [
          { text: "Trabajar sin objetivos", correct: false },
          { text: "Seguridad de un contrato franquicia", correct: true },
          { text: "Evitar responsabilidades", correct: false },
          { text: "Trabajo 100 % remoto sin clientes", correct: false }
        ]
      },
      {
        question: "¿Qué rasgo NO es característico del perfil?",
        options: [
          { text: "Visión", correct: false },
          { text: "Persistencia", correct: false },
          { text: "Resiliencia", correct: false },
          { text: "Pasividad", correct: true }
        ]
      }
    ]
  }
};

const Module2 = () => {
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
                updateUser({ m2_completed: true });
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
            <ModuleProgress currentModule={2} userLevel={user.nivel_elegido} />
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
              <ModuleProgress currentModule={2} userLevel={user.nivel_elegido} />
              <div className={`p-10 rounded-[3rem] shadow-xl border-2 ${passed ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-500/30' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-500/30'}`}>
                  <div className="text-6xl mb-4">{passed ? '🎯' : '📚'}</div>
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
      <ModuleProgress currentModule={2} userLevel={user.nivel_elegido} />
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
      <ChatAssistant context={`Módulo 2: Perfil ideal`} />
    </div>
  );
};

export default Module2;
