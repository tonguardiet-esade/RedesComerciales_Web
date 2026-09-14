
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { UserLevel } from '../types';
import ChatAssistant from '../components/ChatAssistant';
import ModuleProgress from '../components/ModuleProgress';
import { AppPage, AppCard, BackToPortal } from '../components/mosaic/AppShell';
import { ModuleContentView, ModuleResultView, QuizQuestionView } from '../components/mosaic/ModuleViews';

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
      <ModuleContentView moduleNumber={4} userLevel={user.nivel_elegido} title={moduleInfo.title} objective={moduleInfo.objective} content={moduleInfo.content} onStartQuiz={() => setStep('quiz')} />
    );
  }

  if (showResult) {
      const passed = score === data.questions.length;
      return (
        <ModuleResultView moduleNumber={4} userLevel={user.nivel_elegido} passed={passed} score={score} total={data.questions.length} passedEmoji="📈" onBack={() => navigate('/portal')} onRetry={() => { setStep('content'); setShowResult(false); setScore(0); setCurrentQuestion(0); }} />
      );
  }

  return (
    <AppPage maxWidth="3xl">
      <BackToPortal label="Salir del test" />
      <ModuleProgress currentModule={4} userLevel={user.nivel_elegido} />
      <AppCard>
        <QuizQuestionView label="Cuestionario de validación" current={currentQuestion + 1} total={data.questions.length} question={question.question} options={question.options} selectedOption={selectedOption} isAnswerChecked={isAnswerChecked} onSelect={(idx) => !isAnswerChecked && setSelectedOption(idx)} onConfirm={handleCheckAnswer} />
      </AppCard>
      <ChatAssistant context={`Módulo 4: Modelo económico`} />
    </AppPage>
  );
};

export default Module4;
