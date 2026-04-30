import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const Welcome = () => {
  const { t } = useSettings();

  return (
    <div className="min-h-screen bg-white dark:bg-brand-dark-bg flex flex-col items-center justify-center p-8 text-center transition-colors">
      <div className="max-w-3xl animate-fade-in-up">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-brand-dark dark:text-white mb-6">
          {t('welcome.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {t('welcome.desc')}
          <br /><br />
          {t('welcome.warning')}
          <br />
          Solo los candidatos más preparados pasan a la siguiente fase.
        </p>
        <Link 
          to="/portal"
          className="inline-flex items-center justify-center px-12 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-brand-primary shadow-xl transition-all hover:scale-105"
        >
          {t('welcome.btn')}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;