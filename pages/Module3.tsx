
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
    title: "Identificación de empresas que pueden beneficiarse de FundsWIN",
    objective: "Ser capaz de reconocer qué tipo de empresas pueden beneficiarse de FundsWIN y en qué situaciones puede tener sentido presentar la plataforma.",
    content: [
      "Uno de los aspectos clave del rol del Ejemplos de venta es saber identificar qué empresas pueden beneficiarse de las soluciones de FundsWIN.",
      "Muchas empresas necesitan financiación, apoyo para innovar o recursos para desarrollar nuevos proyectos, pero no siempre saben dónde encontrar estas oportunidades o cómo acceder a ellas. Aquí es donde el Ejemplos de venta puede aportar un gran valor.",
      "Las empresas que suelen beneficiarse de este tipo de soluciones son aquellas que están en procesos de crecimiento, innovación o transformación. Por ejemplo, empresas que están desarrollando nuevos productos o tecnologías, que quieren expandirse a nuevos mercados, que están digitalizando sus procesos o que buscan mejorar su competitividad.",
      "También es frecuente encontrar oportunidades en startups, pymes innovadoras, empresas tecnológicas, empresas industriales con proyectos de innovación o compañías que están iniciando procesos de transformación digital o sostenibilidad.",
      "Algunas señales que pueden indicar que una empresa podría beneficiarse de FundsWIN son la necesidad de financiación para desarrollar un proyecto, la intención de invertir en innovación, la búsqueda de nuevas oportunidades de crecimiento o la participación en proyectos de investigación y desarrollo.",
      "El Ejemplos de venta no necesita analizar en profundidad cada caso. Su función principal es detectar que existe una posible oportunidad y conectar a la empresa con el equipo o la plataforma adecuada para evaluar el proyecto."
    ]
  },
  [UserLevel.COLABORADOR]: {
    title: "Módulo 3. Propuesta de valor para el cliente",
    objective: "Aprender a comunicar el valor del servicio desde un enfoque de negocio estratégico.",
    content: [
      "Este módulo se centra en aprender a comunicar el valor del servicio de financiación pública. El enfoque es completamente de negocio, no técnico.",
      "Se parte de los problemas habituales de las Pymes y sus objetivos de crecimiento. El participante aprende a posicionar la financiación como una oportunidad estratégica.",
      "Se trabaja la diferenciación frente a otras ofertas del mercado. El módulo ayuda a construir un discurso claro y orientado a resultados. Se evita el lenguaje complejo o administrativo.",
      "El Colaborador gana seguridad al presentar el servicio. Aprende a conectar el servicio con decisiones reales del cliente. El resultado es una comunicación efectiva y persuasiva."
    ]
  },
  [UserLevel.MOCOTA_SIN_REDACCION]: {
    title: "MÓDULO 3 · Funciones y responsabilidades clave",
    objective: "Definir el alcance de actuación y las capacidades comerciales del Delegado.",
    content: [
      "El MOCOTA Delegado gestiona su zona en exclusividad, asumiendo la responsabilidad total del desarrollo comercial del territorio. Lidera campañas de marketing personalizadas adaptadas de su mercado local.",
      "Vende a todo tipo de clientes: grandes empresas (A), medianas (B) y pymes o entidades (C). Tiene derecho de firma sobre los contratos, lo que refuerza su autonomía y autoridad.",
      "Además, puede captar y coordinar Ejemplos de venta y colaboradores para ampliar su alcance. Su rol combina estrategia, ejecución comercial y liderazgo.",
      "No depende de terceros para cerrar acuerdos, lo que acelera resultados. Esta posición exige compromiso, disciplina y orientación clara a objetivos."
    ]
  },
  [UserLevel.MOCOTA_CON_REDACCION]: {
    title: "MÓDULO 3 · Funciones y responsabilidades clave",
    objective: "Definir el alcance de actuación y las capacidades comerciales del Delegado.",
    content: [
      "El MOCOTA Delegado gestiona su zona en exclusividad, asumiendo la responsabilidad total del desarrollo comercial del territorio. Lidera campañas de marketing personalizadas adaptadas de su mercado local.",
      "Vende a todo tipo de clientes: grandes empresas (A), medianas (B) y pymes o entidades (C). Tiene derecho de firma sobre los contratos, lo que refuerza su autonomía y autoridad.",
      "Además, puede captar y coordinar Ejemplos de venta y colaboradores para ampliar su alcance. Su rol combina estrategia, ejecución comercial y liderazgo.",
      "No depende de terceros para cerrar acuerdos, lo que acelera resultados. Esta posición exige compromiso, disciplina y orientación clara a objetivos."
    ]
  }
};

const quizData: Record<number, { title: string, questions: { question: string, options: { text: string, correct: boolean }[] }[] }> = {
  [UserLevel.EJEMPLOS_DE_VENTA]: {
    title: "Validación Módulo 3",
    questions: [
      {
        question: "¿Qué tipo de empresas suelen beneficiarse de FundsWIN?",
        options: [
          { text: "Empresas que están innovando, creciendo o desarrollando nuevos proyectos.", correct: true },
          { text: "Solo empresas públicas.", correct: false },
          { text: "Solo grandes multinacionales.", correct: false }
        ]
      },
      {
        question: "¿Cuál puede ser una señal de que una empresa necesita soluciones como las de FundsWIN?",
        options: [
          { text: "Quiere desarrollar nuevos productos o proyectos de innovación.", correct: true },
          { text: "Quiere cambiar el nombre de su empresa.", correct: false },
          { text: "Quiere cambiar de oficina.", correct: false }
        ]
      },
      {
        question: "¿Qué tipo de organizaciones pueden ser oportunidades para FundsWIN?",
        options: [
          { text: "Startups, pymes innovadoras o empresas tecnológicas.", correct: true },
          { text: "Solo bancos.", correct: false },
          { text: "Solo organismos públicos.", correct: false }
        ]
      }
    ]
  },
  [UserLevel.COLABORADOR]: {
    title: "Validación: Propuesta de Valor",
    questions: [
      {
        question: "1. ¿Cuál es el enfoque recomendado para comunicar el valor del servicio?",
        options: [
          { text: "Enfoque administrativo y legal", correct: false },
          { text: "Enfoque técnico de convocatorias", correct: false },
          { text: "Enfoque de negocio y estratégico", correct: true },
          { text: "Enfoque de soporte técnico", correct: false }
        ]
      },
      {
        question: "2. ¿Qué tipo de lenguaje se debe evitar al construir el discurso comercial?",
        options: [
          { text: "Lenguaje persuasivo", correct: false },
          { text: "Lenguaje complejo o administrativo", correct: true },
          { text: "Lenguaje orientado a resultados", correct: false },
          { text: "Lenguaje empático", correct: false }
        ]
      },
      {
        question: "3. ¿Cómo gana seguridad el Colaborador al presentar el servicio según el módulo?",
        options: [
          { text: "Memorizando leyes de subvenciones", correct: false },
          { text: "Conectando el servicio con decisiones reales del cliente", correct: true },
          { text: "Prometiendo resultados técnicos inmediatos", correct: false },
          { text: "Mostrando bases de datos técnicas", correct: false }
        ]
      }
    ]
  },
  [UserLevel.MOCOTA_SIN_REDACCION]: {
    title: "Validación: Funciones Delegado",
    questions: [
      {
        question: "¿Qué tipo de clientes puede gestionar el MOCOTA Delegado?",
        options: [
          { text: "Solo pymes", correct: false },
          { text: "Solo grandes empresas", correct: false },
          { text: "Clientes A, B y C", correct: true },
          { text: "Únicamente administraciones públicas", correct: false }
        ]
      },
      {
        question: "¿Qué derecho exclusivo tiene el MOCOTA Delegado?",
        options: [
          { text: "Uso de redes sociales corporativas", correct: false },
          { text: "Firma de contratos", correct: true },
          { text: "Desarrollo del software", correct: false },
          { text: "Gestión financiera global", correct: false }
        ]
      },
      {
        question: "¿Qué actividad forma parte de su rol?",
        options: [
          { text: "Soporte técnico de la plataforma", correct: false },
          { text: "Redacción de código", correct: false },
          { text: "Liderar campañas de marketing locales", correct: true },
          { text: "Auditorías legales", correct: false }
        ]
      }
    ]
  },
  [UserLevel.MOCOTA_CON_REDACCION]: {
    title: "Validación: Funciones Delegado",
    questions: [
      {
        question: "¿Qué tipo de clientes puede gestionar el MOCOTA Delegado?",
        options: [
          { text: "Solo pymes", correct: false },
          { text: "Solo grandes empresas", correct: false },
          { text: "Clientes A, B y C", correct: true },
          { text: "Únicamente administraciones públicas", correct: false }
        ]
      },
      {
        question: "¿Qué derecho exclusivo tiene el MOCOTA Delegado?",
        options: [
          { text: "Uso de redes sociales corporativas", correct: false },
          { text: "Firma de contratos", correct: true },
          { text: "Desarrollo del software", correct: false },
          { text: "Gestión financiera global", correct: false }
        ]
      },
      {
        question: "¿Qué actividad forma parte de su rol?",
        options: [
          { text: "Soporte técnico de la plataforma", correct: false },
          { text: "Redacción de código", correct: false },
          { text: "Liderar campañas de marketing locales", correct: true },
          { text: "Auditorías legales", correct: false }
        ]
      }
    ]
  }
};

const Module3 = () => {
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
                updateUser({ m3_completed: true });
            }
        }
    }, 1000);
  };

  if (step === 'content') {
    return (
      <ModuleContentView moduleNumber={3} userLevel={user.nivel_elegido} title={moduleInfo.title} objective={moduleInfo.objective} content={moduleInfo.content} onStartQuiz={() => setStep('quiz')} />
    );
  }

  if (showResult) {
      const passed = score === data.questions.length;
      return (
        <ModuleResultView moduleNumber={3} userLevel={user.nivel_elegido} passed={passed} score={score} total={data.questions.length} passedEmoji="🗣️" onBack={() => navigate('/portal')} onRetry={() => { setStep('content'); setShowResult(false); setScore(0); setCurrentQuestion(0); }} />
      );
  }

  return (
    <AppPage maxWidth="3xl">
      <BackToPortal label="Salir del test" />
      <ModuleProgress currentModule={3} userLevel={user.nivel_elegido} />
      <AppCard>
        <QuizQuestionView label="Cuestionario de validación" current={currentQuestion + 1} total={data.questions.length} question={question.question} options={question.options} selectedOption={selectedOption} isAnswerChecked={isAnswerChecked} onSelect={(idx) => !isAnswerChecked && setSelectedOption(idx)} onConfirm={handleCheckAnswer} />
      </AppCard>
      <ChatAssistant context={`Módulo 3: Propuesta de valor`} />
    </AppPage>
  );
};

export default Module3;
