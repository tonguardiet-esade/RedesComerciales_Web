
import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MarketingSupportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useSettings();
  const [subject, setSubject] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSending(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSubject('');
      setInquiry('');
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-white dark:bg-brand-darkCard rounded-[3rem] shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden animate-fade-in-up">
        <div className="p-8 md:p-10 border-b dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-brand-darkBg/50">
          <div>
            <h2 className="text-2xl font-black text-brand-dark dark:text-white uppercase tracking-tighter">{t('support.marketing')}</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Canal de atención directa</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors">✕</button>
        </div>

        <div className="p-8 md:p-10">
          {success ? (
            <div className="text-center py-10 animate-fade-in">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
              <p className="text-brand-dark dark:text-white font-bold leading-relaxed">{t('support.success')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t('support.subject')}</label>
                <input 
                  type="text" 
                  required 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={t('support.placeholder_subject')}
                  className="w-full p-4 bg-gray-50 dark:bg-brand-darkBg border border-gray-100 dark:border-white/5 rounded-2xl outline-none focus:border-brand-primary dark:text-white transition-all font-medium text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t('support.inquiry')}</label>
                <textarea 
                  required 
                  rows={5}
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  placeholder={t('support.placeholder_inquiry')}
                  className="w-full p-4 bg-gray-50 dark:bg-brand-darkBg border border-gray-100 dark:border-white/5 rounded-2xl outline-none focus:border-brand-primary dark:text-white transition-all font-medium text-sm resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={sending}
                className="w-full py-5 bg-brand-primary text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-brand-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                {sending ? '...' : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {t('support.send')}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketingSupportModal;
