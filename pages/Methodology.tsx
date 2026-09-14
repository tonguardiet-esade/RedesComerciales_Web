import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { Users, Monitor, Megaphone, BarChart3 } from 'lucide-react';
import PageHero from '../components/mosaic/PageHero';
import AnimatedText from '../components/mosaic/AnimatedText';
import ContactBanner from '../components/mosaic/ContactBanner';
import Breadcrumbs from '../components/mosaic/Breadcrumbs';
import AnimatedLink from '../components/mosaic/AnimatedLink';
import { usePageContent } from '../hooks/usePageContent';
import { useSettings } from '../context/SettingsContext';
import type { MethodologyPhase } from '../lib/i18n/types';
import vAdmin from '../video/Administrador.mp4';
import vColab from '../video/Colaborador.mp4';
import vPresc from '../video/Prescriptor.mp4';
import imgFase3 from '../img/Fase3.png';
import imgFase3_1 from '../img/Fase3.1.png';
import imgFase4 from '../img/Fase4.png';
import imgFase4_1 from '../img/Fase4.1.png';

const PHASE_ICONS = [Users, Monitor, Megaphone, BarChart3];
const PHASE_VIDEOS = [undefined, [vAdmin, vColab, vPresc], undefined, undefined] as const;
const PHASE_IMAGES = [undefined, undefined, [imgFase3, imgFase3_1], [imgFase4, imgFase4_1]] as const;

type PhaseWithMedia = MethodologyPhase & {
  icon: typeof Users;
  videoSources?: Array<{ title: string; src: string }>;
  images?: string[];
};

const PhaseBlock = ({
  phase,
  index,
  exampleLabel,
  visualizationLabel,
  videoUnsupported,
}: {
  phase: PhaseWithMedia;
  index: number;
  exampleLabel: string;
  visualizationLabel: string;
  videoUnsupported: string;
}) => {
  const ref = useRef<HTMLElement>(null);
  const Icon = phase.icon;
  const hasVisual = phase.videoSources || phase.images;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-12');
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="opacity-0 translate-y-12 transition-all duration-700 border-t border-mosaic-white-300 pt-16 md:pt-20"
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className={hasVisual ? 'lg:col-span-5' : 'lg:col-span-12'}>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 border border-mosaic-white-300 flex items-center justify-center text-mosaic-cyan shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="mosaic-label text-mosaic-cyan block mb-2">0{phase.id}</span>
              <h2 className="mosaic-h3">{phase.title}</h2>
            </div>
          </div>

          <p className="mosaic-body mb-8"><strong>{phase.desc}</strong></p>

          {phase.longDesc && (
            <div className="mosaic-body prose prose-sm max-w-none mb-8 p-6 md:p-8 bg-mosaic-white-100 border border-mosaic-white-300">
              <Markdown>{phase.longDesc}</Markdown>
            </div>
          )}

          {phase.items && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {phase.items.map((item) => (
                <div key={item.name} className="p-6 border border-mosaic-white-300 bg-mosaic-white-100">
                  <h4 className="text-lg text-mosaic-black-500 mb-2">{item.name}</h4>
                  <p className="mosaic-body text-sm mb-4">{item.desc}</p>
                  {item.example && (
                    <div className="pt-4 border-t border-mosaic-white-300">
                      <p className="mosaic-label text-mosaic-cyan text-[10px] mb-1">{exampleLabel}</p>
                      <p className="mosaic-body text-xs italic">{item.example}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {hasVisual && (
          <div className="lg:col-span-7 space-y-8">
            {phase.visualTitle && (
              <p className="mosaic-body text-center lg:text-left">{phase.visualTitle}</p>
            )}

            {phase.videoSources?.map((video) => (
              <div key={video.title} className="space-y-3">
                <h3 className="mosaic-label text-mosaic-black-300">{video.title}</h3>
                <div className="aspect-video bg-mosaic-black-500 overflow-hidden border border-mosaic-white-300">
                  <video controls playsInline preload="metadata" className="w-full h-full object-contain">
                    <source src={video.src} type="video/mp4" />
                    {videoUnsupported}
                  </video>
                </div>
              </div>
            ))}

            {phase.images && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {phase.images.map((img, i) => (
                  <div key={i} className="border border-mosaic-white-300 bg-mosaic-white-100 overflow-hidden">
                    <div className="px-4 py-2 border-b border-mosaic-white-300 flex justify-between items-center">
                      <span className="mosaic-label text-mosaic-black-300 text-[10px]">
                        {visualizationLabel} {i + 1}
                      </span>
                    </div>
                    <img
                      src={img}
                      alt={`${phase.title} — ${visualizationLabel} ${i + 1}`}
                      loading="lazy"
                      className="w-full h-auto block"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

const MethodologyPage = () => {
  const navigate = useNavigate();
  const { methodology, nav } = usePageContent();
  const { t } = useSettings();

  const phases: PhaseWithMedia[] = methodology.phases.map((phase, i) => {
    const videos = PHASE_VIDEOS[i];
    const images = PHASE_IMAGES[i];
    return {
      ...phase,
      icon: PHASE_ICONS[i],
      videoSources: phase.videoSources?.map((video, vi) => ({
        title: video.title,
        src: videos?.[vi] ?? '',
      })),
      images: images ? [...images] : undefined,
    };
  });

  return (
    <div className="overflow-x-hidden">
      <div className="mosaic-container pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: t('breadcrumb.home'), path: '/' },
            { label: nav.methodology },
          ]}
        />
      </div>
      <PageHero
        label={methodology.hero.label}
        title={
          <>
            {methodology.hero.title} <span className="text-mosaic-cyan">{methodology.hero.titleHighlight}</span>
          </>
        }
        subtitle={methodology.hero.subtitle}
      />

      <section
        data-scroll-scene="manifesto"
        data-scroll-zone="manifesto"
        className="mosaic-container py-var-spacer-xl"
        style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
      >
        <AnimatedText as="h2" className="mosaic-h2 max-w-3xl mb-20">
          {methodology.intro} <strong>{methodology.introHighlight}</strong> {methodology.introSuffix}
        </AnimatedText>

        <div className="space-y-4" data-scroll-scene="methodology" data-scroll-zone="methodology">
          {phases.map((phase, i) => (
            <PhaseBlock
              key={phase.id}
              phase={phase}
              index={i}
              exampleLabel={methodology.labels.example}
              visualizationLabel={methodology.labels.visualization}
              videoUnsupported={t('common.videoUnsupported')}
            />
          ))}
        </div>
      </section>

      <div className="mosaic-container pb-8 flex flex-wrap gap-6">
        <AnimatedLink to="/soluciones">{nav.solutions}</AnimatedLink>
        <AnimatedLink to="/casos-de-exito">{nav.successCases}</AnimatedLink>
      </div>

      <ContactBanner
        title={methodology.contactBanner.title}
        text={methodology.contactBanner.text}
        ctaLabel={methodology.contactBanner.ctaLabel}
        onCta={() => navigate('/contacto')}
      />
    </div>
  );
};

export default MethodologyPage;
