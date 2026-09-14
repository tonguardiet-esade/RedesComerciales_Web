
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { evaluateTest } from '../services/geminiService';
import { AppPage, AppCard, BackToPortal, AppSectionTitle } from '../components/mosaic/AppShell';
import MosaicButton from '../components/mosaic/MosaicButton';
import { quizPreview } from '../assets/images';

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
    <AppPage maxWidth="3xl">
      <BackToPortal />
      <AppSectionTitle
        label="Evaluación final"
        title="Test final de competencias"
        subtitle="Demuestra lo aprendido. La IA evaluará tus respuestas."
      />

      <div className="mb-10 border border-mosaic-white-300 overflow-hidden">
        <img src={quizPreview} alt="Quiz Preview" className="w-full h-auto" />
      </div>

      {!result ? (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <AppCard key={q.id} className="!p-6">
              <label className="block mosaic-label text-mosaic-black-500 mb-3">{idx + 1}. {q.text}</label>
              <textarea
                className="app-input resize-none"
                rows={3}
                onChange={(e) => handleAnswer(q.id, e.target.value)}
              />
            </AppCard>
          ))}

          <MosaicButton onClick={handleSubmit} disabled={loading}>
            {loading ? 'Evaluando test...' : 'Enviar test final'}
          </MosaicButton>
        </div>
      ) : (
        <AppCard className={`text-center ${result.passed ? 'border-mosaic-cyan' : 'border-red-400'}`}>
          <div className="text-5xl mb-4">{result.passed ? '🎉' : '❌'}</div>
          <h2 className="mosaic-h4 mb-4">
            {result.passed ? '¡Has aprobado el test!' : 'No has superado el test'}
          </h2>
          <div className="text-4xl font-bold text-mosaic-cyan mb-6">{result.score}/100</div>
          <p className="mosaic-body text-sm mb-8 max-w-lg mx-auto">{result.feedback}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <MosaicButton fullWidth={false} variant="secondary" className="px-8" onClick={() => navigate('/portal')}>
              Volver al portal
            </MosaicButton>
            {!result.passed && (
              <MosaicButton fullWidth={false} className="px-8" onClick={() => setResult(null)}>
                Reintentar
              </MosaicButton>
            )}
          </div>
        </AppCard>
      )}
    </AppPage>
  );
};

export default TestFinal;
