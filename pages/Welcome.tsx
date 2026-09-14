import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { AppPage, AppCard } from '../components/mosaic/AppShell';
import MosaicButton from '../components/mosaic/MosaicButton';

const Welcome = () => {
  const { t } = useSettings();
  const navigate = useNavigate();

  return (
    <AppPage maxWidth="3xl" className="min-h-[70vh] flex items-center">
      <AppCard className="text-center w-full">
        <div className="w-14 h-14 bg-mosaic-cyan/10 text-mosaic-cyan flex items-center justify-center mx-auto mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mosaic-label text-mosaic-cyan mb-4">Registro completado</p>
        <h1 className="mosaic-h3 mb-6">{t('welcome.title')}</h1>
        <p className="mosaic-body text-sm mb-10 max-w-xl mx-auto">
          {t('welcome.desc')}
          <br /><br />
          {t('welcome.warning')}
          <br />
          Solo los candidatos más preparados pasan a la siguiente fase.
        </p>
        <MosaicButton fullWidth={false} className="px-12" onClick={() => navigate('/portal')}>
          {t('welcome.btn')} →
        </MosaicButton>
      </AppCard>
    </AppPage>
  );
};

export default Welcome;
