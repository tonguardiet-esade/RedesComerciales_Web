
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
      <ModuleContentView
        moduleNumber={2}
        userLevel={user.nivel_elegido}
        title={moduleInfo.title}
        objective={moduleInfo.objective}
        content={moduleInfo.content}
        onStartQuiz={() => setStep('quiz')}
      />
    );
  }

  if (showResult) {
      const passed = score === data.questions.length;
      return (
        <ModuleResultView
          moduleNumber={2}
          userLevel={user.nivel_elegido}
          passed={passed}
          score={score}
          total={data.questions.length}
          passedEmoji="🎯"
          onBack={() => navigate('/portal')}
          onRetry={() => { setStep('content'); setShowResult(false); setScore(0); setCurrentQuestion(0); }}
        />
      );
  }

  return (
    <AppPage maxWidth="3xl">
      <BackToPortal label="Salir del test" />
      <ModuleProgress currentModule={2} userLevel={user.nivel_elegido} />
      <AppCard>
        <QuizQuestionView
          label="Cuestionario de validación"
          current={currentQuestion + 1}
          total={data.questions.length}
          question={question.question}
          options={question.options}
          selectedOption={selectedOption}
          isAnswerChecked={isAnswerChecked}
          onSelect={(idx) => !isAnswerChecked && setSelectedOption(idx)}
          onConfirm={handleCheckAnswer}
        />
      </AppCard>
      <ChatAssistant context={`Módulo 2: Perfil ideal`} />
    </AppPage>
  );
};

export default Module2;
