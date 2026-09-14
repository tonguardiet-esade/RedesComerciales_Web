import ModuleProgress from './ModuleProgress';
import { AppPage, AppCard, BackToPortal } from './AppShell';
import MosaicButton from './MosaicButton';
import { quizPreview } from '../../assets/images';

export const ModuleContentView = ({
  moduleNumber,
  userLevel,
  title,
  objective,
  content,
  onStartQuiz,
  quizButtonLabel = 'Realizar test de validación',
}: {
  moduleNumber: number;
  userLevel: number;
  title: string;
  objective: string;
  content: string[];
  onStartQuiz: () => void;
  quizButtonLabel?: string;
}) => (
  <AppPage>
    <BackToPortal label="Volver al panel" />
    <ModuleProgress currentModule={moduleNumber} userLevel={userLevel} />
    <AppCard>
      <h1 className="mosaic-h3 mb-6">{title}</h1>
      <div className="border-l-2 border-mosaic-cyan pl-6 mb-8">
        <p className="mosaic-label text-mosaic-cyan mb-2">Objetivo del módulo</p>
        <p className="mosaic-body text-sm">{objective}</p>
      </div>
      <div className="space-y-5 mb-10">
        {content.map((p, i) => (
          <p key={i} className="mosaic-body text-sm">{p}</p>
        ))}
      </div>
      <MosaicButton onClick={onStartQuiz}>{quizButtonLabel}</MosaicButton>
    </AppCard>
  </AppPage>
);

export const ModuleResultView = ({
  moduleNumber,
  userLevel,
  passed,
  score,
  total,
  onBack,
  onRetry,
  passedEmoji = '🏆',
  passedTitle = '¡Módulo superado!',
  failedTitle = 'Necesitas repasar',
  passedButtonLabel = 'Volver al panel',
  failedButtonLabel = 'Repasar contenido',
}: {
  moduleNumber: number;
  userLevel: number;
  passed: boolean;
  score: number;
  total: number;
  onBack: () => void;
  onRetry: () => void;
  passedEmoji?: string;
  passedTitle?: string;
  failedTitle?: string;
  passedButtonLabel?: string;
  failedButtonLabel?: string;
}) => (
  <AppPage maxWidth="2xl">
    <ModuleProgress currentModule={moduleNumber} userLevel={userLevel} />
    <AppCard className={`text-center ${passed ? 'border-mosaic-cyan' : 'border-red-400'}`}>
      <div className="text-5xl mb-4">{passed ? passedEmoji : '📚'}</div>
      <h2 className="mosaic-h4 mb-2">{passed ? passedTitle : failedTitle}</h2>
      <p className="mosaic-body text-sm mb-8">Has acertado {score} de {total} preguntas.</p>
      {passed ? (
        <MosaicButton fullWidth={false} className="px-10" onClick={onBack}>{passedButtonLabel}</MosaicButton>
      ) : (
        <MosaicButton fullWidth={false} variant="secondary" className="px-8" onClick={onRetry}>{failedButtonLabel}</MosaicButton>
      )}
    </AppCard>
  </AppPage>
);

export const QuizQuestionView = ({
  label,
  current,
  total,
  question,
  options,
  selectedOption,
  isAnswerChecked,
  onSelect,
  onConfirm,
}: {
  label: string;
  current: number;
  total: number;
  question: string;
  options: { text: string; correct: boolean }[];
  selectedOption: number | null;
  isAnswerChecked: boolean;
  onSelect: (idx: number) => void;
  onConfirm: () => void;
}) => (
  <>
    <div className="mb-10 border border-mosaic-white-300 overflow-hidden">
      <img src={quizPreview} alt="Quiz Preview" className="w-full h-auto" />
    </div>
    <div className="mb-10">
      <div className="flex justify-between items-end mb-2">
        <span className="mosaic-label text-mosaic-cyan">{label}</span>
        <span className="mosaic-label text-mosaic-black-300">{current} de {total}</span>
      </div>
      <div className="w-full h-1 bg-mosaic-white-300 overflow-hidden">
        <div className="h-full bg-mosaic-cyan transition-all duration-500" style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
    <h2 className="mosaic-h4 mb-8">{question}</h2>
    <div className="space-y-3">
      {options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
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
        <MosaicButton fullWidth={false} className="px-10" onClick={onConfirm} disabled={selectedOption === null}>
          Confirmar respuesta
        </MosaicButton>
      )}
    </div>
  </>
);

export const getQuizOptionClass = (
  isAnswerChecked: boolean,
  isSelected: boolean,
  isCorrect: boolean,
) => {
  let cls = 'w-full text-left p-4 border transition-all mosaic-body text-sm ';
  if (isAnswerChecked) {
    if (isCorrect) cls += 'bg-mosaic-cyan/10 border-mosaic-cyan text-mosaic-black-500';
    else if (isSelected) cls += 'bg-red-50 border-red-400 text-red-800';
    else cls += 'bg-mosaic-white-200 border-mosaic-white-300 text-mosaic-black-300 opacity-50';
  } else {
    if (isSelected) cls += 'bg-mosaic-white-200 border-mosaic-cyan text-mosaic-cyan';
    else cls += 'bg-mosaic-white-100 border-mosaic-white-300 text-mosaic-black-400 hover:border-mosaic-cyan/50';
  }
  return cls;
};

export const getQuizLetterClass = (
  isAnswerChecked: boolean,
  isSelected: boolean,
  isCorrect: boolean,
) => {
  if (isAnswerChecked && isCorrect) return 'bg-mosaic-cyan text-mosaic-white-100 border-mosaic-cyan';
  if (isSelected) return 'bg-mosaic-black-500 text-mosaic-white-100 border-mosaic-black-500';
  return 'bg-mosaic-white-200 text-mosaic-black-300 border-mosaic-white-300';
};
