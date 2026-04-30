
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ModuleProgress from '../components/ModuleProgress';

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
        <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
            <button onClick={() => navigate('/portal')} className="flex items-center gap-2 text-gray-400 hover:text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-8 transition-colors group">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
              Volver al panel
            </button>
            <ModuleProgress currentModule={5} userLevel={user.nivel_elegido} />
            <div className="bg-white dark:bg-brand-darkCard p-10 md:p-12 rounded-[3rem] shadow-card border border-gray-100 dark:border-white/5">
                <h1 className="text-3xl font-black text-brand-dark dark:text-white uppercase tracking-tighter mb-4">{moduleInfo.title}</h1>
                <div className="bg-brand-primary/5 p-6 rounded-2xl border-l-4 border-brand-primary mb-8">
                    <p className="text-xs font-black text-brand-primary uppercase tracking-widest mb-1">Objetivo del módulo</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{moduleInfo.objective}</p>
                </div>
                <div className="space-y-6 mb-10">
                    {moduleInfo.content.map((p, i) => <p key={i} className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{p}</p>)}
                </div>
                <button onClick={() => setStep('quiz')} className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all">Validar Módulo Final</button>
            </div>
        </div>
    );
  }

  if (showResult) {
      const passed = score === questions.length;
      return (
          <div className="max-w-2xl mx-auto px-4 py-12 text-center animate-fade-in">
              <ModuleProgress currentModule={5} userLevel={user.nivel_elegido} />
              <div className={`p-10 rounded-[3rem] shadow-xl border-2 ${passed ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="text-6xl mb-4">{passed ? '🤝' : '📚'}</div>
                  <h2 className="text-3xl font-bold text-brand-dark mb-2">{passed ? '¡Formación Completada!' : 'Repasa para finalizar'}</h2>
                  <p className="text-gray-600 mb-8">Has acertado {score} de {questions.length} preguntas.</p>
                  {passed ? (
                      <button onClick={() => navigate('/portal')} className="px-10 py-4 bg-brand-primary text-white rounded-full font-bold shadow-lg">Acceder a mi Panel Final</button>
                  ) : (
                      <button onClick={() => { setStep('content'); setShowResult(false); setScore(0); setCurrentQuestion(0); }} className="px-8 py-3 bg-white dark:bg-brand-dark-card border border-brand-dark dark:border-white/20 text-brand-dark dark:text-white rounded-full font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Volver al contenido</button>
                  )}
              </div>
          </div>
      )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button onClick={() => navigate('/portal')} className="flex items-center gap-2 text-gray-400 hover:text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-8 transition-colors group">
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
        Salir del test
      </button>
      <ModuleProgress currentModule={5} userLevel={user.nivel_elegido} />
      <div className="bg-white dark:bg-brand-darkCard p-8 md:p-12 rounded-[2.5rem] shadow-card border border-gray-100 dark:border-white/5">
        
        {/* Imagen Real del Cuestionario */}
        <div className="mb-10 rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 bg-white">
            <img src="/img/3.png" alt="Quiz Preview" className="w-full h-auto" referrerPolicy="no-referrer" />
        </div>

        {/* Indicador de Pregunta */}
        <div className="mb-10">
            <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em]">Cuestionario de Validación Final</span>
                <span className="text-xs font-bold text-gray-400">{currentQuestion + 1} de {questions.length}</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-brand-primary transition-all duration-500" 
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
            </div>
        </div>

        <h2 className="text-xl font-bold text-brand-dark dark:text-white mb-10 leading-relaxed">{questions[currentQuestion].question}</h2>
        
        <div className="space-y-4">
            {questions[currentQuestion].options.map((opt, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedOption(idx)} 
                  disabled={isAnswerChecked} 
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-bold text-sm ${
                    isAnswerChecked 
                      ? (opt.correct ? 'bg-blue-50 border-blue-500 text-blue-800' : (selectedOption === idx ? 'bg-red-50 border-red-500 text-red-800' : 'opacity-50')) 
                      : (selectedOption === idx ? 'bg-brand-light border-brand-primary text-brand-primary dark:bg-brand-primary/10 dark:border-brand-primary dark:text-brand-primary' : 'bg-white dark:bg-brand-dark-bg border-gray-100 dark:border-gray-800 dark:text-gray-300')
                  }`}
                >
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
    </div>
  );
};

export default Module5;
