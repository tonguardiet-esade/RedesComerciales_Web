import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const PIPELINE_ITEMS = [
  { icon: 'B2', name: 'Partner B2B', statusKey: 'hero.pipeline.status.close', tagKey: 'hero.pipeline.tag.close', color: 'green' as const, progress: 85 },
  { icon: 'Lo', name: 'Logistics Pro', statusKey: 'hero.pipeline.status.validation', tagKey: 'hero.pipeline.tag.validation', color: 'blue' as const, progress: 40 },
  { icon: 'Gl', name: 'Global Retail', statusKey: 'hero.pipeline.status.proposal', tagKey: 'hero.pipeline.tag.proposal', color: 'red' as const, progress: 20 },
];

const colorMap = {
  green: {
    avatar: 'bg-green-400 text-white',
    bar: 'bg-green-500',
    tag: 'bg-green-50 text-green-600 border border-green-200/80',
  },
  blue: {
    avatar: 'bg-blue-400 text-white',
    bar: 'bg-blue-500',
    tag: 'bg-blue-50 text-blue-600 border border-blue-200/80',
  },
  red: {
    avatar: 'bg-red-400 text-white',
    bar: 'bg-red-400',
    tag: 'bg-red-50 text-red-500 border border-red-200/80',
  },
};

const HeroPipelineCard = () => {
  const { t } = useSettings();

  return (
    <div className="hero-pipeline-card relative">
      <div className="hero-pipeline-glow pointer-events-none" aria-hidden="true" />
      <div className="hero-pipeline-frame">
        <div className="hero-pipeline-inner p-6 md:p-7 space-y-5 flex flex-col h-full overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-mosaic-cyan/10 rounded-2xl flex items-center justify-center text-mosaic-cyan shrink-0">
              <TrendingUp className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] font-black text-mosaic-black-200 tracking-widest">
                {t('hero.pipeline.label')}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-2xl md:text-3xl font-black text-mosaic-black-500 tracking-tighter">
                  {t('hero.pipeline.growth')}
                </span>
                <svg className="w-11 h-5 text-mosaic-green shrink-0" viewBox="0 0 50 20" aria-hidden="true">
                  <path
                    d="M2 15 C 10 15, 15 2, 25 10 C 35 18, 40 5, 48 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {PIPELINE_ITEMS.map((item) => {
              const colors = colorMap[item.color];
              return (
                <div
                  key={item.name}
                  className="hero-pipeline-row p-4 rounded-2xl flex items-center justify-between gap-3 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs uppercase shrink-0 ${colors.avatar}`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-mosaic-black-500 leading-tight tracking-tight truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-bold text-mosaic-black-300 shrink-0">{t(item.statusKey)}</span>
                        <div className="w-16 h-1 bg-mosaic-white-300 rounded-full overflow-hidden">
                          <div className={`h-full ${colors.bar}`} style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-[8px] font-black px-3 py-1.5 rounded-full tracking-widest shrink-0 ${colors.tag}`}
                  >
                    {t(item.tagKey)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-around items-center mt-auto pt-5 border-t border-mosaic-cyan/15">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-black text-red-500">{t('hero.pipeline.activation.val')}</p>
              <p className="text-[10px] font-black text-mosaic-black-200 tracking-widest">
                {t('hero.pipeline.activation.label')}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-black text-mosaic-cyan">{t('hero.pipeline.response.val')}</p>
              <p className="text-[10px] font-black text-mosaic-black-200 tracking-widest">
                {t('hero.pipeline.response.label')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPipelineCard;
