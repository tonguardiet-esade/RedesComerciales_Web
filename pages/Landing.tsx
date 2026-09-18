import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useSettings } from '../context/SettingsContext';
import ScrollIndicator from '../components/mosaic/ScrollIndicator';
import AnimatedLink from '../components/mosaic/AnimatedLink';
import ContactBanner from '../components/mosaic/ContactBanner';
import HeroPipelineCard from '../components/mosaic/HeroPipelineCard';
import NetworkComparison from '../components/mosaic/NetworkComparison';
import SolutionSection from '../components/mosaic/SolutionSection';
import TrustBar from '../components/mosaic/TrustBar';
import SectionParallax from '../components/mosaic/SectionParallax';
import FaqAccordion from '../components/mosaic/FaqAccordion';
import { useLandingScrollEffects } from '../hooks/useLandingScrollEffects';
import { useFaqItems } from '../hooks/useFaqItems';
import { ANALYTICS_EVENTS, trackEvent } from '../lib/analytics';

const Landing = () => {
  const { t } = useSettings();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  useLandingScrollEffects(pageRef);

  const faqItems = useFaqItems(10);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const words = hero.querySelectorAll('.hero-word');
      const footnote = hero.querySelector('.hero-footnote');
      const subtitle = hero.querySelector('.hero-subtitle');
      const meta = hero.querySelector('.hero-meta');
      const pipeline = hero.querySelectorAll('.hero-pipeline');

      const tl = gsap.timeline({ delay: 0.6 });
      if (footnote) {
        tl.fromTo(
          footnote,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
        );
      }
      if (words.length) {
        tl.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power3.out',
            clearProps: 'transform',
          },
          footnote ? '-=0.2' : 0
        );
      }
      if (subtitle) tl.fromTo(subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');
      if (meta) tl.fromTo(meta, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5');
      if (pipeline.length) {
        tl.fromTo(
          pipeline,
          { y: 40, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
          '-=0.6'
        );
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const methodSteps = [1, 2, 3, 4].map((i) => ({
    num: `0${i}`,
    title: t(`methodology.step${i}.title`),
    desc: t(`methodology.step${i}.desc`),
  }));

  const benefits = [1, 2, 3, 4, 5].map((i) => ({
    title: t(`benefits.item${i}.title`),
    desc: t(`benefits.item${i}.desc`),
  }));

  const cases = [
    { val: t('cases.metric1.val'), label: t('cases.metric1.label') },
    { val: t('cases.metric2.val'), label: t('cases.metric2.label') },
    { val: t('cases.metric3.val'), label: t('cases.metric3.label') },
  ];

  const heroWords = t('hero.titleWords').split(' ');

  return (
    <div ref={pageRef} className="relative overflow-x-hidden">
      <div className="relative z-10">
        {/* HERO */}
        <section
          ref={heroRef}
          data-scroll-scene="hero"
          data-scroll-zone="hero"
          className="relative min-h-[100svh] flex flex-col"
        >
          <div className="mosaic-container relative flex-1 pt-28 md:pt-32 pb-28 md:pb-32 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
              <div className="lg:col-span-7 xl:col-span-6">
                <div className="hero-footnote mb-8 max-w-sm">
                  <p className="hero-footnote-label mosaic-label text-mosaic-cyan mb-3">
                    {t('hero.footnote.label')}
                  </p>
                  <p className="hero-footnote-def">
                    {t('hero.footnote.def')}
                  </p>
                </div>
                <h1 className="mosaic-h1-hero mb-10">
                  {heroWords.map((word, i) => (
                    <span key={i} className="hero-word-wrap">
                      <span className="hero-word">
                        {word.endsWith('*') ? (
                          <>
                            {word.slice(0, -1)}
                            <span className="text-mosaic-cyan">*</span>
                          </>
                        ) : (
                          word
                        )}
                      </span>
                    </span>
                  ))}
                </h1>
                <p className="hero-subtitle mosaic-body-lg max-w-xl mb-10 text-mosaic-black-300">
                  {t('hero.subtitle')}
                </p>
                <div className="hero-meta flex flex-col sm:flex-row gap-5 sm:items-center">
                  <AnimatedLink
                    to="/contacto"
                    accent
                    onClick={() => trackEvent(ANALYTICS_EVENTS.ctaClick, { location: 'hero_primary' })}
                  >
                    {t('hero.cta.primary')}
                  </AnimatedLink>
                  <AnimatedLink to="/soluciones">
                    {t('hero.cta.secondary')}
                  </AnimatedLink>
                </div>

                <div className="hero-pipeline mt-12 lg:hidden max-w-sm">
                  <HeroPipelineCard />
                </div>
              </div>

              <div className="hero-pipeline lg:col-span-5 xl:col-span-6 hidden lg:flex justify-end items-center lg:-translate-y-8 xl:-translate-y-10">
                <div className="w-full max-w-[380px]">
                  <HeroPipelineCard />
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 md:bottom-5 inset-x-0 flex justify-between items-end pointer-events-none">
              <div className="pointer-events-auto">
                <ScrollIndicator onClick={() => scrollTo('manifesto')} />
              </div>
              <span className="mosaic-label text-mosaic-black-300 hidden md:block pointer-events-auto">{t('hero.tag')}</span>
            </div>
          </div>
        </section>

        <TrustBar />

        {/* QUÉ ES — GEO / AEO */}
        <section
          className="mosaic-editorial-section py-var-spacer-lg border-b border-mosaic-white-300"
          style={{ paddingTop: 'var(--spacer-lg)', paddingBottom: 'var(--spacer-lg)' }}
          aria-labelledby="what-is-heading"
        >
          <div className="mosaic-container max-w-4xl">
            <h2 id="what-is-heading" className="mosaic-h2-editorial mb-6">
              {t('whatIs.title')}
            </h2>
            <p className="mosaic-body-lg text-mosaic-black-300 leading-relaxed">
              {t('whatIs.text')}
            </p>
          </div>
        </section>

        {/* PROBLEMA / COMPARACIÓN */}
        <SectionParallax
          id="manifesto"
          data-scroll-scene="manifesto"
          data-scroll-zone="manifesto"
          className="mosaic-editorial-section section-glass-light py-var-spacer-xxl"
          style={{ paddingTop: 'var(--spacer-xxl)', paddingBottom: 'var(--spacer-xxl)' }}
        >
          <div className="mosaic-container">
            <div className="max-w-3xl mb-16 md:mb-20">
              <div className="scroll-reveal-line w-20 h-px bg-mosaic-cyan mb-10" />
              <h2 className="scroll-reveal-heading mosaic-h2-editorial mb-8 leading-tight">
                {t('problem.headline')}
              </h2>
              <p className="scroll-reveal-body mosaic-body-lg text-mosaic-black-300 mb-6 leading-relaxed">
                {t('problem.copy')}
              </p>
              <p className="scroll-reveal-body text-xl md:text-2xl font-black text-mosaic-cyan">
                {t('problem.remate')}
              </p>
            </div>

            <NetworkComparison />
          </div>
        </SectionParallax>

        {/* SOLUCIÓN */}
        <section
          data-scroll-scene="projects"
          data-scroll-zone="projects"
          className="mosaic-editorial-section py-var-spacer-xl"
          style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
        >
          <div className="mosaic-container">
            <SolutionSection />
            <div className="mt-12 md:mt-16">
              <AnimatedLink onClick={() => navigate('/soluciones')}>{t('solution.cta')}</AnimatedLink>
            </div>
          </div>
        </section>

        {/* METODOLOGÍA */}
        <SectionParallax
          id="metodologia"
          data-scroll-scene="methodology"
          data-scroll-zone="methodology"
          className="mosaic-editorial-section py-var-spacer-xxl"
          style={{ paddingTop: 'var(--spacer-xxl)', paddingBottom: 'var(--spacer-xxl)' }}
        >
          <div className="mosaic-container">
            <h2 className="mosaic-split-heading mosaic-h2-editorial mb-24 max-w-4xl">
              {t('methodology.headline')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {methodSteps.map((step) => (
                <div key={step.num} className="scroll-method-step">
                  <span className="mosaic-label text-mosaic-cyan block mb-8">{step.num}</span>
                  <h3 className="text-xl md:text-2xl font-medium text-mosaic-black-500 mb-5 leading-tight">
                    {step.title.replace(/^Fase \d+ – /, '')}
                  </h3>
                  <p className="mosaic-body text-sm text-mosaic-black-300 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <AnimatedLink onClick={() => navigate('/metodologia')}>{t('methodology.exploreCta')}</AnimatedLink>
            </div>
          </div>
        </SectionParallax>

        {/* BENEFICIOS */}
        <section
          className="mosaic-editorial-section py-var-spacer-xl"
          style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
        >
          <div className="mosaic-container">
            <h2 className="mosaic-split-heading mosaic-h2-editorial mb-20 max-w-3xl">
              {t('benefits.headline')}
            </h2>
            <div className="space-y-0 divide-y divide-mosaic-white-300 border-t border-mosaic-white-300">
              {benefits.map((b, i) => (
                <div key={i} className="scroll-benefit-row py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <span className="mosaic-label text-mosaic-cyan md:col-span-2">0{i + 1}</span>
                  <h3 className="text-xl md:text-2xl font-medium text-mosaic-black-500 md:col-span-4">{b.title}</h3>
                  <p className="mosaic-body text-mosaic-black-300 md:col-span-6">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIFERENCIACIÓN */}
        <section
          className="mosaic-editorial-section py-var-spacer-xl"
          style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
        >
          <div className="mosaic-container">
            <h2 className="mosaic-split-heading mosaic-h2-editorial mb-20 max-w-3xl">
              {t('diff.headline')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="scroll-diff-card p-10 md:p-12 border border-mosaic-white-300">
                <p className="mosaic-label text-mosaic-black-300 mb-4">{t('diff.notLabel')}</p>
                <h3 className="text-2xl text-mosaic-black-500 mb-4">{t('diff.agencies.title')}</h3>
                <p className="mosaic-body text-sm text-mosaic-black-300">{t('diff.agencies.desc')}</p>
              </div>
              <div className="scroll-diff-card p-10 md:p-12 border border-mosaic-white-300">
                <p className="mosaic-label text-mosaic-black-300 mb-4">{t('diff.notLabel')}</p>
                <h3 className="text-2xl text-mosaic-black-500 mb-4">{t('diff.saas.title')}</h3>
                <p className="mosaic-body text-sm text-mosaic-black-300">{t('diff.saas.desc')}</p>
              </div>
              <div className="scroll-diff-card p-10 md:p-12 bg-mosaic-inverse text-mosaic-on-dark-100">
                <p className="mosaic-label text-mosaic-cyan mb-4">{t('diff.areLabel')}</p>
                <h3 className="text-2xl mb-4">{t('diff.us.title')}</h3>
                <p className="mosaic-body text-sm text-mosaic-on-dark-400">{t('diff.us.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* MÉTRICAS */}
        <section
          data-scroll-scene="metrics"
          data-scroll-zone="metrics"
          className="mosaic-editorial-section py-var-spacer-xl border-t border-mosaic-cyan/15"
          style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
        >
          <div className="mosaic-container">
            <h2 className="mosaic-split-heading mosaic-h2-editorial mb-24 max-w-2xl">
              {t('cases.headline')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {cases.map((c) => (
                <div key={c.label} className="scroll-metric">
                  <p className="mosaic-metric-val scroll-metric-val">{c.val}</p>
                  <p className="mosaic-label text-mosaic-black-300 mt-4">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MODELO */}
        <section
          className="mosaic-editorial-section py-var-spacer-xl"
          style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
        >
          <div className="mosaic-container">
            <div className="scroll-model-block relative overflow-hidden bg-mosaic-inverse p-12 md:p-24 text-mosaic-on-dark-100">
              <div className="absolute inset-0 bg-gradient-to-br from-mosaic-cyan/10 to-transparent pointer-events-none" />
              <div className="relative z-10 max-w-3xl">
                <h2 className="mosaic-h2-editorial mb-8 text-mosaic-on-dark-100">{t('model.headline')}</h2>
                <p className="mosaic-body-lg text-mosaic-on-dark-400 mb-10">{t('model.copy')}</p>
                <p className="mosaic-h4 text-mosaic-cyan">{t('model.remate')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="mosaic-editorial-section py-var-spacer-lg"
          style={{ paddingTop: 'var(--spacer-lg)', paddingBottom: 'var(--spacer-lg)' }}
        >
          <div className="mosaic-container max-w-4xl">
            <h2 className="mosaic-h2-editorial mb-16">{t('faq.title')}</h2>
            <FaqAccordion items={faqItems} />
          </div>
        </section>

        {/* CTA */}
        <section id="final-cta" data-scroll-scene="footer" data-scroll-zone="footer">
          <ContactBanner
            title={t('cta.final.title')}
            text={t('cta.final.subtitle')}
            ctaLabel={t('cta.final.btn')}
            onCta={() => navigate('/contacto')}
          />
        </section>
      </div>
    </div>
  );
};

export default Landing;
