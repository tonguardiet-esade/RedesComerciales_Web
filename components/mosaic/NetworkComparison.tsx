import React from 'react';
import { X, Ghost, EyeOff, Target, Zap, BarChart3, Users } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const PASSIVE_ITEMS = [
  { icon: Ghost, titleKey: 'problem.passive.item1.title', descKey: 'problem.passive.item1.desc' },
  { icon: EyeOff, titleKey: 'problem.passive.item2.title', descKey: 'problem.passive.item2.desc' },
  { icon: Target, titleKey: 'problem.passive.item3.title', descKey: 'problem.passive.item3.desc' },
];

const ACTIVE_ITEMS = [
  { icon: Zap, titleKey: 'problem.active.item1.title', descKey: 'problem.active.item1.desc' },
  { icon: BarChart3, titleKey: 'problem.active.item2.title', descKey: 'problem.active.item2.desc' },
  { icon: Users, titleKey: 'problem.active.item3.title', descKey: 'problem.active.item3.desc' },
];

const NetworkComparison = () => {
  const { t } = useSettings();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
      {/* Red pasiva */}
      <div className="scroll-comparison-passive network-comparison-card network-comparison-passive">
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 shrink-0">
            <X className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-mosaic-black-500">{t('problem.passive.title')}</h3>
        </div>

        <div className="space-y-4 md:space-y-5 network-comparison-passive-items">
          {PASSIVE_ITEMS.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="scroll-comparison-item network-comparison-item network-comparison-item-passive"
            >
              <div className="w-11 h-11 bg-mosaic-white-200 rounded-xl shrink-0 flex items-center justify-center">
                <Icon className="w-5 h-5 text-mosaic-black-200" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-mosaic-black-400 leading-tight">{t(titleKey)}</h4>
                <p className="text-sm text-mosaic-black-200 leading-snug mt-1">{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Red activa */}
      <div className="scroll-comparison-active network-comparison-card network-comparison-active">
        <div className="network-comparison-active-glow pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <div className="w-10 h-10 bg-mosaic-cyan/15 rounded-full flex items-center justify-center text-mosaic-cyan shrink-0">
              <Zap className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-mosaic-black-500">{t('problem.active.title')}</h3>
          </div>

          <div className="space-y-4 md:space-y-5">
            {ACTIVE_ITEMS.map(({ icon: Icon, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="scroll-comparison-item network-comparison-item network-comparison-item-active"
              >
                <div className="w-11 h-11 bg-mosaic-cyan/10 rounded-xl shrink-0 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-mosaic-cyan" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-mosaic-black-500 leading-tight">{t(titleKey)}</h4>
                  <p className="text-sm text-mosaic-black-300 leading-snug mt-1">{t(descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkComparison;
