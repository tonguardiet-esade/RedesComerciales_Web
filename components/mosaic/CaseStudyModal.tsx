import React, { useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { usePageContent } from '../../hooks/usePageContent';

export type CaseStudy = {
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  tags: string[];
};

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

const CaseStudyModal = ({ caseStudy, onClose }: CaseStudyModalProps) => {
  const { t } = useSettings();
  const { successCases } = usePageContent();
  const labels = successCases.labels;
  useEffect(() => {
    if (!caseStudy) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 mosaic-overlay backdrop-blur-sm cursor-pointer"
        onClick={onClose}
        aria-label={t('common.close')}
      />
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-mosaic-white-100 border border-mosaic-cyan/20 shadow-2xl">
        <div className="aspect-[16/9] overflow-hidden border-b border-mosaic-white-300">
          <img src={caseStudy.image} alt={caseStudy.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-start gap-4 mb-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {caseStudy.tags.map((tag) => (
                  <span key={tag} className="mosaic-label text-mosaic-cyan text-[10px]">{tag}</span>
                ))}
              </div>
              <h2 className="mosaic-h3 text-mosaic-black-500">{caseStudy.title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center border border-mosaic-white-300 text-mosaic-black-300 hover:text-mosaic-cyan hover:border-mosaic-cyan transition-colors cursor-pointer shrink-0"
              aria-label={t('common.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="mosaic-label text-mosaic-black-300 mb-2">{labels.challenge}</p>
              <p className="mosaic-body text-sm">{caseStudy.challenge}</p>
            </div>
            <div>
              <p className="mosaic-label text-mosaic-black-300 mb-2">{labels.solution}</p>
              <p className="mosaic-body text-sm">{caseStudy.solution}</p>
            </div>
          </div>

          <div>
            <p className="mosaic-label text-mosaic-green mb-4">{labels.results}</p>
            <ul className="space-y-3">
              {caseStudy.results.map((result) => (
                <li key={result} className="flex items-start gap-2 mosaic-body text-sm">
                  <CheckCircle2 className="w-4 h-4 text-mosaic-green shrink-0 mt-0.5" />
                  <strong>{result}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
