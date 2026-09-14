import React from 'react';
import { AppPage, AppCard } from '../components/mosaic/AppShell';
import MosaicButton from '../components/mosaic/MosaicButton';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <AppPage maxWidth="lg" className="min-h-[60vh] flex items-center">
      <AppCard className="text-center w-full">
        <p className="mosaic-label text-red-500 mb-4">403</p>
        <h1 className="mosaic-h3 mb-4">Acceso denegado</h1>
        <p className="mosaic-body text-sm mb-8">
          No has completado los requisitos necesarios para acceder a esta sección.
        </p>
        <MosaicButton fullWidth={false} className="px-10" onClick={() => navigate('/portal')}>
          Volver al portal
        </MosaicButton>
      </AppCard>
    </AppPage>
  );
};

export default AccessDenied;
