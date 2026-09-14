import React from 'react';
import { useSettings } from '../../context/SettingsContext';

const TrustBar = () => {
  const { t } = useSettings();
  const sectors = [1, 2, 3, 4, 5].map((i) => t(`trust.sector${i}`));

  return (
    <section className="trust-bar border-y border-mosaic-cyan/10" aria-label={t('trust.label')}>
      <div className="mosaic-container py-8 md:py-10">
        <p className="mosaic-label text-mosaic-black-200 text-center mb-6">{t('trust.label')}</p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 md:gap-x-14">
          {sectors.map((sector) => (
            <span
              key={sector}
              className="text-sm md:text-base font-medium text-mosaic-black-300 tracking-tight opacity-70"
            >
              {sector}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
