
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ModuleProgress from '../components/ModuleProgress';
import { AppPage, AppCard, BackToPortal } from '../components/mosaic/AppShell';
import { ModuleContentView, ModuleResultView, QuizQuestionView } from '../components/mosaic/ModuleViews';

const Module5 = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'content' | 'quiz'>('content');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  if (!user) return null;

  const moduleInfo = {
    title: "Beneficios de participar como Ejemplos de venta FundsWIN",
    objective: "Conocer las ventajas y beneficios de formar parte del ecosistema FundsWIN como Ejemplos de venta.",
    content: [
      "Participar como Ejemplos de venta en el ecosistema FundsWIN ofrece diversas ventajas y beneficios, tanto para el propio Ejemplos de venta como para las empresas que introduce.",
      "Para el Ejemplos de venta, una de las principales ventajas es la posibilidad de aportar un valor añadido a sus clientes o contactos. Al facilitar el acceso a soluciones de financiación e innovación, el Ejemplos de venta refuerza su posición como un colaborador estratégico y ayuda a las empresas a impulsar sus proyectos.",
      "Además, formar parte de FundsWIN permite al Ejemplos de venta estar al día de las últimas tendencias y oportunidades en el ámbito de la financiación y la innovación empresarial, lo que enriquece su propio conocimiento y capacidad de asesoramiento.",
      "Otro beneficio importante es la posibilidad de generar nuevas oportunidades de colaboración y networking dentro del ecosistema FundsWIN, conectando con otros profesionales, expertos y empresas que comparten intereses similares.",
      "Para las empresas introducidas, el beneficio es directo: acceden a un ecosistema especializado que les ayuda a identificar y aprovechar oportunidades de financiación y crecimiento que de otro modo podrían pasar desapercibidas.",
      "En resumen, el rol del Ejemplos de venta es una pieza fundamental del ecosistema FundsWIN que genera valor para todas las partes involucradas, fomentando la innovación y el crecimiento empresarial."
    ]
  };

  const questions = [
    {
      question: "¿Qué ventaja ofrece el programa de Ejemplos de venta?",
      options: [
        { text: "Acceso a un ecosistema de herramientas, conocimiento y oportunidades.", correct: true },
        { text: "Acceso a un software de contabilidad.", correct: false },
        { text: "Acceso a servicios legales gratuitos.", correct: false }
      ]
    },
    {
      question: "¿Qué valor aporta el Ejemplos de venta a las empresas?",
      options: [
        { text: "Ayudar a identificar oportunidades de financiación y crecimiento.", correct: true },
        { text: "Gestionar la contabilidad de la empresa.", correct: false },
        { text: "Crear páginas web.", correct: false }
      ]
    },
    {
      question: "¿Qué tipo de apoyo reciben los Ejemplos de venta?",
      options: [
        { text: "Apoyo del equipo FundsWIN y acceso a materiales informativos.", correct: true },
        { text: "Formación obligatoria en derecho fiscal.", correct: false },
        { text: "Gestión completa de sus clientes.", correct: false }
      ]
    }
  ];

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const isCorrect = questions[currentQuestion].options[selectedOption].correct;
    if (isCorrect) setScore(score + 1);
    setIsAnswerChecked(true);

    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsAnswerChecked(false);
        } else {
            setShowResult(true);
            if (score + (isCorrect ? 1 : 0) === questions.length) {
                updateUser({ m5_completed: true });
            }
        }
    }, 1000);
  };

  if (step === 'content') {
    return (
      <ModuleContentView
        moduleNumber={5}
        userLevel={user.nivel_elegido}
        title={moduleInfo.title}
        objective={moduleInfo.objective}
        content={moduleInfo.content}
        quizButtonLabel="Validar módulo final"
        onStartQuiz={() => setStep('quiz')}
      />
    );
  }

  if (showResult) {
      const passed = score === questions.length;
      return (
        <ModuleResultView
          moduleNumber={5}
          userLevel={user.nivel_elegido}
          passed={passed}
          score={score}
          total={questions.length}
          passedEmoji="🤝"
          passedTitle="¡Formación completada!"
          failedTitle="Repasa para finalizar"
          passedButtonLabel="Acceder a mi panel final"
          failedButtonLabel="Volver al contenido"
          onBack={() => navigate('/portal')}
          onRetry={() => { setStep('content'); setShowResult(false); setScore(0); setCurrentQuestion(0); }}
        />
      );
  }

  return (
    <AppPage maxWidth="3xl">
      <BackToPortal label="Salir del test" />
      <ModuleProgress currentModule={5} userLevel={user.nivel_elegido} />
      <AppCard>
        <QuizQuestionView
          label="Cuestionario de validación final"
          current={currentQuestion + 1}
          total={questions.length}
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          selectedOption={selectedOption}
          isAnswerChecked={isAnswerChecked}
          onSelect={(idx) => setSelectedOption(idx)}
          onConfirm={handleCheckAnswer}
        />
      </AppCard>
    </AppPage>
  );
};

export default Module5;
