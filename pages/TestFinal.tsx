
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { evaluateTest } from '../services/geminiService';

const TestFinal = () => {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{passed: boolean, score: number, feedback: string} | null>(null);

  const questions = [
    { id: 'q1', text: '¿Cuál es la principal barrera de las empresas para pedir ayudas?', type: 'text' },
    { id: 'q2', text: 'Define en una frase la propuesta de valor de Redescomerciales.ai.', type: 'text' },
    { id: 'q3', text: '¿Qué es un fondo perdido?', type: 'text' },
    { id: 'q4', text: '¿Por qué es importante el CNAE en nuestro buscador?', type: 'text' },
    { id: 'q5', text: 'Actitud: Un cliente te dice que no cree en las subvenciones. ¿Qué respondes?', type: 'text' }
  ];

  const handleAnswer = (id: string, val: string) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Por favor responde todas las preguntas.");
      return;
    }

    setLoading(true);
    const evalResult = await evaluateTest(answers);
    setLoading(false);

    if (evalResult) {
      setResult(evalResult);
      updateUser({
        test_score: evalResult.score,
        test_passed: evalResult.passed,
        test_feedback: evalResult.feedback
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-dark dark:text-white mb-2">Test Final de Competencias</h1>
      <p className="text-gray-500 mb-8">Demuestra lo aprendido. La IA evaluará tus respuestas.</p>

      {/* Imagen Real del Cuestionario */}
      <div className="mb-10 rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 bg-white">
          <img src="/img/3.png" alt="Quiz Preview" className="w-full h-auto" referrerPolicy="no-referrer" />
      </div>

      {!result ? (
        <div className="space-y-8">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-white dark:bg-brand-darkCard p-6 rounded-xl border border-gray-200 dark:border-gray-800">
              <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">{idx + 1}. {q.text}</label>
              <textarea
                className="w-full p-3 border border-gray-300 dark:bg-brand-darkBg dark:border-gray-700 dark:text-white rounded focus:ring-brand-primary focus:border-brand-primary text-sm"
                rows={3}
                onChange={(e) => handleAnswer(q.id, e.target.value)}
              ></textarea>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-brand-primary hover:bg-opacity-90 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 transition-all"
          >
            {loading ? 'Evaluando Test...' : 'Enviar Test Final'}
          </button>
        </div>
      ) : (
        <div className={`text-center p-12 rounded-xl border-2 animate-fade-in-up ${result.passed ? 'border-brand-secondary bg-blue-50 dark:bg-blue-900/10' : 'border-red-400 bg-red-50 dark:bg-red-900/10'}`}>
          <div className="text-6xl mb-4">{result.passed ? '🎉' : '❌'}</div>
          <h2 className="text-3xl font-bold mb-4 text-brand-dark dark:text-white">
            {result.passed ? '¡Has aprobado el Test!' : 'No has superado el Test'}
          </h2>
          <div className="text-5xl font-black text-brand-dark dark:text-brand-secondary mb-6">{result.score}/100</div>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-lg mx-auto">{result.feedback}</p>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/portal')}
              className="px-8 py-3 bg-white dark:bg-brand-darkBg border border-gray-300 dark:border-gray-800 text-brand-dark dark:text-white rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              Volver al Portal
            </button>
            {!result.passed && (
              <button
                onClick={() => setResult(null)}
                className="px-8 py-3 bg-brand-primary text-white rounded-lg font-bold hover:brightness-110 shadow-md"
              >
                Reintentar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestFinal;
