import React from 'react';
import { AppPage, AppCard, AppSectionTitle } from '../components/mosaic/AppShell';

const Interview = () => {
  return (
    <AppPage maxWidth="2xl" className="min-h-[70vh] flex items-center">
      <AppCard className="w-full text-center">
        <AppSectionTitle
          label="Proceso completado"
          title="¡Felicidades!"
          subtitle="Has completado con éxito la formación y has sido validado por nuestra IA. Ahora puedes reservar tu entrevista final con nuestro equipo de Talento."
        />
        <div className="w-full h-80 bg-mosaic-white-200 border border-dashed border-mosaic-white-300 flex items-center justify-center">
          <p className="mosaic-label text-mosaic-black-300">Embed de Calendly aquí</p>
        </div>
      </AppCard>
    </AppPage>
  );
};

export default Interview;
