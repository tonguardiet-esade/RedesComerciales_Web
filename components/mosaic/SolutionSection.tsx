import React from 'react';
import { Compass, Cpu, Users } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const PILLARS = [
  { icon: Compass, titleKey: 'solution.pillar1.title', descKey: 'solution.pillar1.desc' },
  { icon: Cpu, titleKey: 'solution.pillar2.title', descKey: 'solution.pillar2.desc' },
  { icon: Users, titleKey: 'solution.pillar3.title', descKey: 'solution.pillar3.desc' },
];

const SolutionSection = () => {
  const { t } = useSettings();

  return (
    <div className="solution-section-block relative overflow-hidden">
      <div className="solution-section-glow pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 px-8 py-16 md:px-14 md:py-20 lg:px-20 lg:py-24">
        <div className="max-w-4xl mb-12 md:mb-16">
          <p className="mosaic-label text-mosaic-cyan mb-6">{t('solution.label')}</p>
          <h2 className="scroll-reveal-heading mosaic-h2-editorial text-mosaic-on-dark-100 mb-6 md:mb-8 leading-tight">
            {t('solution.headline')}
          </h2>
          <p className="scroll-reveal-body mosaic-body-lg text-mosaic-on-dark-400 max-w-2xl leading-relaxed">
            {t('solution.copy')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {PILLARS.map(({ icon: Icon, titleKey, descKey }, i) => (
            <div key={titleKey} className="scroll-solution-pillar solution-pillar-card">
              <div className="solution-pillar-icon">
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <span className="mosaic-label text-mosaic-cyan/70 mb-4 block">0{i + 1}</span>
              <h3 className="text-xl md:text-2xl font-medium text-mosaic-on-dark-100 mb-3 leading-tight">
                {t(titleKey)}
              </h3>
              <p className="mosaic-body text-sm text-mosaic-on-dark-400 leading-relaxed">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionSection;
