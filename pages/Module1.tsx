
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { UserLevel } from '../types';
import ChatAssistant from '../components/ChatAssistant';
import ModuleProgress from '../components/ModuleProgress';
import { AppPage, AppCard, BackToPortal } from '../components/mosaic/AppShell';
import MosaicButton from '../components/mosaic/MosaicButton';
import { ModuleContentView, ModuleResultView, getQuizOptionClass, getQuizLetterClass } from '../components/mosaic/ModuleViews';
import { quizPreview } from '../assets/images';

const contentData: Record<number, { title: string, objective: string, content: string[] }> = {
  [UserLevel.EJEMPLOS_DE_VENTA]: {
    title: "Introducción a Redescomerciales.ai y su ecosistema",
    objective: "Comprender qué es Redescomerciales.ai, cuál es su propósito y cómo se organizan las diferentes soluciones dentro de su ecosistema.",
    content: [
      "Redescomerciales.ai es una plataforma orientada a facilitar el acceso a financiación, innovación y oportunidades de crecimiento para empresas. Su objetivo es conectar a organizaciones que necesitan financiación o apoyo para desarrollar proyectos con soluciones, herramientas y expertos que les permitan aprovechar al máximo las oportunidades disponibles.",
      "Dentro de este ecosistema, Redescomerciales.ai actúa como la marca principal que agrupa diferentes soluciones especializadas. Estas soluciones pueden presentarse bajo distintas marcas o productos, pero todas forman parte de la misma estructura y responden a un mismo propósito: ayudar a empresas e instituciones a identificar, preparar y acceder a oportunidades de financiación y crecimiento.",
      "Cada una de las marcas o herramientas asociadas cumple una función específica dentro del proceso. Algunas se centran en la identificación de oportunidades, otras en el análisis de proyectos o en la preparación de propuestas, y otras en la gestión del proceso completo. Sin embargo, todas están integradas dentro del mismo ecosistema y trabajan de forma complementaria.",
      "Para un Ejemplos de venta es importante entender que, aunque existan diferentes productos o soluciones dentro del ecosistema, todos pertenecen a Redescomerciales.ai y forman parte de una propuesta global orientada a facilitar el acceso a financiación y a impulsar la innovación empresarial."
    ]
  },
  [UserLevel.COLABORADOR]: {
    title: "Módulo 1: Introducción al rol de Colaborador",
    objective: "Definir la función estratégica y el alcance operativo del Colaborador dentro del ecosistema.",
    content: [
      "Bienvenido al Módulo Formativo Colaborador, diseñado para profesionales y agencias con perfil comercial que desean ampliar su propuesta de valor incorporando la financiación pública como un servicio estratégico para sus clientes, sin asumir responsabilidades técnicas u operativas.",
      "A través de este módulo, vas a adquirir una comprensión clara del rol de Colaborador, su encaje profesional, sus funciones comerciales y su modelo económico, así como de los beneficios que aporta tanto al cliente final como a su propia actividad profesional.",
      "El programa establece un marco de actuación estructurado, orientado a negocio y alineado con un modelo de crecimiento escalable, permitiendo al Colaborador identificar oportunidades, presentar la solución de forma efectiva y acompañar el proceso comercial con rigor y coherencia.",
      "Este módulo tiene como objetivo profesionalizar el rol de Colaborador y garantizar una representación sólida, clara y consistente del servicio dentro de un entorno corporativo especializado."
    ]
  },
  [UserLevel.MOCOTA_SIN_REDACCION]: {
    title: "MÓDULO 1 · ¿Qué es un MOCOTA Delegado?",
    objective: "Comprender la naturaleza exclusiva y estratégica del rol de Delegado.",
    content: [
      "El MOCOTA Delegado es un profesional senior que lidera un territorio en exclusiva bajo un modelo de franquicia. Su rol es estratégico y comercial, actuando como representante de Redescomerciales.ai en su zona.",
      "Opera con dedicación full-time y tiene autonomía para gestionar clientes, campañas y acuerdos. Este perfil está orientado a personas con experiencia en ventas, visión de negocio y ambición de crecimiento.",
      "El MOCOTA Delegado no solo vende, sino que conquista su mercado local con respaldo de marca, formación y herramientas avanzadas. Es el paso natural para quienes desean pasar de colaborar a ser dueños de su propio mercado.",
      "La exclusividad territorial garantiza foco, posicionamiento y control del desarrollo comercial. Su objetivo es construir un negocio rentable y sostenible en el sector de la financiación pública con IA."
    ]
  },
  [UserLevel.MOCOTA_CON_REDACCION]: {
    title: "MÓDULO 1 · ¿Qué es un MOCOTA Delegado?",
    objective: "Comprender la naturaleza exclusiva y estratégica del rol de Delegado.",
    content: [
      "El MOCOTA Delegado es un profesional senior que lidera un territorio en exclusiva bajo un modelo de franquicia. Su rol es estratégico y comercial, actuando como representante de Redescomerciales.ai en su zona.",
      "Opera con dedicación full-time y tiene autonomía para gestionar clientes, campañas y acuerdos. Este perfil está orientado a personas con experiencia en ventas, visión de negocio y ambición de crecimiento.",
      "El MOCOTA Delegado no solo vende, sino que conquista su mercado local con respaldo de marca, formación y herramientas avanzadas. Es el paso natural para quienes desean pasar de colaborar a ser dueños de su propio mercado.",
      "La exclusividad territorial garantiza foco, posicionamiento y control del desarrollo comercial. Su objetivo es construir un negocio rentable y sostenible en el sector de la financiación pública con IA."
    ]
  }
};

const quizData: Record<number, { title: string, questions: { question: string, options: { text: string, correct: boolean }[] }[] }> = {
  [UserLevel.EJEMPLOS_DE_VENTA]: {
    title: "Validación Módulo 1",
    questions: [
      {
        question: "¿Qué es Redescomerciales.ai?",
        options: [
          { text: "Una plataforma orientada a facilitar el acceso a financiación, innovación y crecimiento empresarial.", correct: true },
          { text: "Una consultora dedicada exclusivamente a la gestión de impuestos.", correct: false },
          { text: "Un software de contabilidad para empresas.", correct: false }
        ]
      },
      {
        question: "¿Qué relación tienen las otras marcas con Redescomerciales.ai?",
        options: [
          { text: "Son empresas completamente independientes.", correct: false },
          { text: "Son productos o soluciones que forman parte del ecosistema Redescomerciales.ai.", correct: true },
          { text: "Son competidores directos de Redescomerciales.ai.", correct: false }
        ]
      },
      {
        question: "¿Cuál es el objetivo principal del ecosistema Redescomerciales.ai?",
        options: [
          { text: "Gestionar únicamente subvenciones regionales.", correct: false },
          { text: "Facilitar el acceso a oportunidades de financiación y apoyar el crecimiento empresarial.", correct: true },
          { text: "Ofrecer servicios legales a empresas.", correct: false }
        ]
      }
    ]
  },
  [UserLevel.COLABORADOR]: {
    title: "Validación: El Rol de Colaborador",
    questions: [
      {
        question: "1. ¿Cuál es la función principal del rol de Colaborador dentro del ecosistema?",
        options: [
          { text: "Preparar expedientes técnicos de subvenciones", correct: false },
          { text: "Gestionar trámites administrativos con organismos públicos", correct: false },
          { text: "Actuar como nexo comercial y estratégico con el cliente", correct: true },
          { text: "Analizar requisitos legales de las convocatorias", correct: false }
        ]
      },
      {
        question: "2. ¿Qué NO forma parte del rol de Colaborador?",
        options: [
          { text: "Relación directa con el cliente", correct: false },
          { text: "Detección de oportunidades de financiación", correct: false },
          { text: "Análisis técnico de convocatorias", correct: true },
          { text: "Acompañamiento comercial", correct: false }
        ]
      },
      {
        question: "3. ¿Por qué es importante definir claramente el rol desde el inicio?",
        options: [
          { text: "Para reducir la duración de los proyectos", correct: false },
          { text: "Para evitar confusiones operativas y de responsabilidad", correct: true },
          { text: "Para aumentar el número de clientes automáticamente", correct: false },
          { text: "Para sustituir al equipo técnico", correct: false }
        ]
      }
    ]
  },
  [UserLevel.MOCOTA_SIN_REDACCION]: {
    title: "Validación: MOCOTA Delegado",
    questions: [
      {
        question: "¿Qué define principalmente al MOCOTA Delegado?",
        options: [
          { text: "Un rol ocasional sin exclusividad", correct: false },
          { text: "Un perfil técnico sin funciones comerciales", correct: false },
          { text: "Un franquiciado con exclusividad territorial", correct: true },
          { text: "Un Ejemplos de venta sin dedicación fija", correct: false }
        ]
      },
      {
        question: "¿Cuál es el nivel de dedicación esperado?",
        options: [
          { text: "10 horas semanales", correct: false },
          { text: "Media jornada", correct: false },
          { text: "Puntual según proyectos", correct: false },
          { text: "Dedicación full-time", correct: true }
        ]
      },
      {
        question: "¿Qué representa el MOCOTA Delegado dentro del modelo?",
        options: [
          { text: "Un apoyo administrativo", correct: false },
          { text: "Un líder de mercado local", correct: true },
          { text: "Un formador interno", correct: false },
          { text: "Un asesor externo", correct: false }
        ]
      }
    ]
  },
  [UserLevel.MOCOTA_CON_REDACCION]: {
    title: "Validación: MOCOTA Delegado",
    questions: [
      {
        question: "¿Qué define principalmente al MOCOTA Delegado?",
        options: [
          { text: "Un rol ocasional sin exclusividad", correct: false },
          { text: "Un perfil técnico sin funciones comerciales", correct: false },
          { text: "Un franquiciado con exclusividad territorial", correct: true },
          { text: "Un Ejemplos de venta sin dedicación fija", correct: false }
        ]
      },
      {
        question: "¿Cuál es el nivel de dedicación esperado?",
        options: [
          { text: "10 horas semanales", correct: false },
          { text: "Media jornada", correct: false },
          { text: "Puntual según proyectos", correct: false },
          { text: "Dedicación full-time", correct: true }
        ]
      },
      {
        question: "¿Qué representa el MOCOTA Delegado dentro del modelo?",
        options: [
          { text: "Un apoyo administrativo", correct: false },
          { text: "Un líder de mercado local", correct: true },
          { text: "Un formador interno", correct: false },
          { text: "Un asesor externo", correct: false }
        ]
      }
    ]
  }
};

const Module1 = () => {
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

  const handleOptionClick = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(idx);
  };

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
                updateUser({ m1_completed: true });
            }
        }
    }, 1000);
  };

  if (step === 'content') {
    return (
      <ModuleContentView
        moduleNumber={1}
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
          moduleNumber={1}
          userLevel={user.nivel_elegido}
          passed={passed}
          score={score}
          total={data.questions.length}
          onBack={() => navigate('/portal')}
          onRetry={() => { setStep('content'); setShowResult(false); setScore(0); setCurrentQuestion(0); }}
        />
      );
  }

  return (
    <AppPage maxWidth="3xl">
      <BackToPortal label="Salir del test" />
      <ModuleProgress currentModule={1} userLevel={user.nivel_elegido} />
      <AppCard>
        
        <div className="mb-10 border border-mosaic-white-300 overflow-hidden">
            <img src={quizPreview} alt="Quiz Preview" className="w-full h-auto" />
        </div>

        <div className="mb-10">
            <div className="flex justify-between items-end mb-2">
                <span className="mosaic-label text-mosaic-cyan">Cuestionario de validación</span>
                <span className="mosaic-label text-mosaic-black-300">{currentQuestion + 1} de {data.questions.length}</span>
            </div>
            <div className="w-full h-1 bg-mosaic-white-300 overflow-hidden">
                <div
                    className="h-full bg-mosaic-cyan transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / data.questions.length) * 100}%` }}
                />
            </div>
        </div>

        <h2 className="mosaic-h4 mb-8">{question.question}</h2>

        <div className="space-y-3">
            {question.options.map((opt, idx) => (
                <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isAnswerChecked}
                    className={getQuizOptionClass(isAnswerChecked, selectedOption === idx, opt.correct)}
                >
                    <div className="flex items-center gap-4">
                        <span className={`w-9 h-9 flex items-center justify-center text-xs border mosaic-label ${getQuizLetterClass(isAnswerChecked, selectedOption === idx, opt.correct)}`}>
                            {String.fromCharCode(65 + idx)}
                        </span>
                        {opt.text}
                    </div>
                </button>
            ))}
        </div>
        <div className="mt-10 flex justify-end">
            {!isAnswerChecked && (
              <MosaicButton fullWidth={false} className="px-10" onClick={handleCheckAnswer} disabled={selectedOption === null}>
                Confirmar respuesta
              </MosaicButton>
            )}
        </div>
      </AppCard>
      <ChatAssistant context={`Módulo 1: ${moduleInfo.title}`} />
    </AppPage>
  );
};

export default Module1;
