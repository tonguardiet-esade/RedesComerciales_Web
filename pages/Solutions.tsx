import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  Zap,
  Globe,
  CheckCircle2,
  AlertCircle,
  User,
  Lightbulb,
  XCircle,
  Star,
} from 'lucide-react';
import PageHero from '../components/mosaic/PageHero';
import AnimatedText from '../components/mosaic/AnimatedText';
import AnimatedLink from '../components/mosaic/AnimatedLink';
import ContactBanner from '../components/mosaic/ContactBanner';
import Breadcrumbs from '../components/mosaic/Breadcrumbs';
import { usePageContent } from '../hooks/usePageContent';
import { useSettings } from '../context/SettingsContext';

const CORE_VALUE_ICONS = [Target, Zap, Globe];

const SolutionsPage = () => {
  const navigate = useNavigate();
  const content = usePageContent();
  const { solutions, nav } = content;
  const { t } = useSettings();
  const [activePersona, setActivePersona] = useState(0);
  const active = solutions.personas.items[activePersona];
  const labels = solutions.personas.labels;

  return (
    <div className="overflow-x-hidden">
      <div className="mosaic-container pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: t('breadcrumb.home'), path: '/' },
            { label: nav.solutions },
          ]}
        />
      </div>
      <PageHero
        label={solutions.hero.label}
        title={
          <>
            {solutions.hero.title}
            <br />
            <span className="text-mosaic-cyan whitespace-nowrap">{solutions.hero.titleHighlight}</span>{' '}
            {solutions.hero.titleSuffix}
          </>
        }
        subtitle={solutions.hero.subtitle}
      >
        <div className="flex flex-wrap gap-4">
          <AnimatedLink onClick={() => navigate('/casos-de-exito')} accent>
            {solutions.hero.ctaSuccessCases}
          </AnimatedLink>
          <AnimatedLink onClick={() => navigate('/contacto')}>
            {solutions.hero.ctaDiagnosis}
          </AnimatedLink>
        </div>
      </PageHero>

      <section
        data-scroll-scene="manifesto"
        data-scroll-zone="manifesto"
        className="mosaic-container py-var-spacer-xl"
        style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
      >
        <AnimatedText as="h2" className="mosaic-h2 mb-4 text-center">
          {solutions.personas.sectionTitle} <strong>{solutions.personas.sectionTitleHighlight}</strong>
        </AnimatedText>
        <p className="mosaic-body text-center mb-12 max-w-xl mx-auto">
          {solutions.personas.sectionSubtitle}
        </p>

        <div
          className="persona-tabs flex flex-nowrap justify-center gap-1.5 md:gap-2 mb-12"
          role="tablist"
          aria-label={solutions.personas.sectionTitle}
        >
          {solutions.personas.items.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={activePersona === p.id}
              onClick={() => setActivePersona(p.id)}
              className={`persona-tab mosaic-label mosaic-focus-ring whitespace-nowrap px-2.5 md:px-3 py-2 border transition-all cursor-pointer ${
                activePersona === p.id
                  ? 'bg-mosaic-inverse text-mosaic-on-dark-100 border-mosaic-inverse'
                  : 'border-mosaic-white-300 text-mosaic-black-300 hover:border-mosaic-cyan hover:text-mosaic-cyan'
              }`}
            >
              {p.role}
            </button>
          ))}
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 border border-mosaic-white-300 p-8 md:p-12 bg-mosaic-white-100"
          role="tabpanel"
          aria-live="polite"
        >
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 border border-mosaic-cyan flex items-center justify-center text-mosaic-cyan">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl text-mosaic-black-500">{active.role}</h3>
                <p className="mosaic-label text-mosaic-cyan mt-1">{active.segment}</p>
              </div>
            </div>

            <div className="space-y-3 mosaic-body text-sm">
              <p><strong>{labels.company}</strong> {active.company}</p>
              <p><strong>{labels.responsibility}</strong> {active.responsibility}</p>
            </div>

            <div className="p-6 border-l-2 border-mosaic-cyan bg-mosaic-white-200">
              <p className="mosaic-label text-mosaic-cyan mb-2">{labels.keyMessage}</p>
              <p className="text-lg text-mosaic-black-500 italic">&quot;{active.message}&quot;</p>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-mosaic-cyan" />
                  <h4 className="mosaic-label">{labels.professionalContext}</h4>
                </div>
                <ul className="mosaic-body text-sm space-y-2">
                  <li><strong>{labels.situation}</strong> {active.context.situation}</li>
                  <li><strong>{labels.maturity}</strong> {active.context.maturity}</li>
                  <li><strong>{labels.network}</strong> {active.context.network}</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-mosaic-cyan" />
                  <h4 className="mosaic-label">{labels.problemsWeSolve}</h4>
                </div>
                <ul className="space-y-2">
                  {active.pains.map((pain, i) => (
                    <li key={i} className="mosaic-body text-sm flex items-start gap-2">
                      <span className="text-mosaic-cyan">+</span>
                      {pain}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-mosaic-green" />
                  <h4 className="mosaic-label">{labels.essentialNeeds}</h4>
                </div>
                <p className="mosaic-body text-sm">{active.needs}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-mosaic-cyan" />
                  <h4 className="mosaic-label">{labels.buyingMotivations}</h4>
                </div>
                <p className="mosaic-body text-sm">{active.motivations}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-4 h-4 text-mosaic-black-300" />
                  <h4 className="mosaic-label">{labels.commonObjections}</h4>
                </div>
                <p className="mosaic-body text-sm italic">&quot;{active.objections}&quot;</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-mosaic-cyan" />
                  <h4 className="mosaic-label">{labels.solutionValues}</h4>
                </div>
                <ul className="mosaic-body text-sm space-y-2">
                  <li><strong>{labels.tech}</strong> {active.values.tech}</li>
                  <li><strong>{labels.strategic}</strong> {active.values.strat}</li>
                  <li><strong>{labels.operational}</strong> {active.values.ops}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-scroll-scene="projects"
        data-scroll-zone="projects"
        className="section-glass-light border-y border-mosaic-cyan/10 py-var-spacer-xl"
        style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
      >
        <div className="mosaic-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {solutions.coreValues.map((value, i) => {
              const Icon = CORE_VALUE_ICONS[i];
              return (
                <div
                  key={value.title}
                  className="section-glass-card p-8 md:p-10"
                >
                  <div className="w-12 h-12 rounded-xl bg-mosaic-cyan/10 flex items-center justify-center text-mosaic-cyan mb-6">
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-medium text-mosaic-black-500 mb-4">{value.title}</h3>
                  <p className="mosaic-body text-sm text-mosaic-black-300 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        data-scroll-scene="methodology"
        data-scroll-zone="methodology"
        className="mosaic-container py-var-spacer-xl"
        style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
      >
        <AnimatedText as="h2" className="mosaic-h2 mb-4 text-center">
          {solutions.painPoints.sectionTitle} <strong>{solutions.painPoints.sectionTitleHighlight}</strong>
        </AnimatedText>
        <p className="mosaic-body text-center mb-16 max-w-xl mx-auto">
          {solutions.painPoints.sectionSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.painPoints.groups.map((point) => (
            <div key={point.title} className="border-t border-mosaic-white-300 pt-8">
              <h4 className="mosaic-label text-mosaic-cyan mb-6">{point.title}</h4>
              <ul className="space-y-4">
                {point.items.map((item, j) => (
                  <li key={j} className="mosaic-body text-sm flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-mosaic-cyan shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        data-scroll-scene="metrics"
        data-scroll-zone="metrics"
        className="mosaic-container pb-var-spacer-xl"
        style={{ paddingBottom: 'var(--spacer-xl)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border border-mosaic-white-300 p-10 md:p-16 bg-mosaic-white-100">
          <div>
            <h2 className="mosaic-h2 mb-10">{solutions.benefits.sectionTitle}</h2>
            <div className="space-y-10">
              {solutions.benefits.categories.map((benefit) => (
                <div key={benefit.category}>
                  <p className="mosaic-label text-mosaic-cyan mb-4">{benefit.category}</p>
                  <ul className="space-y-3">
                    {benefit.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 mosaic-body text-sm">
                        <CheckCircle2 className="w-4 h-4 text-mosaic-green shrink-0" />
                        <strong>{item}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-mosaic-white-300 p-10 md:p-14 bg-mosaic-white-200 text-center">
            <p className="mosaic-h3 mb-6 italic text-mosaic-black-500">
              &quot;{solutions.benefits.quote}&quot;
            </p>
            <p className="mosaic-label text-mosaic-black-300">{solutions.benefits.quoteAuthor}</p>
          </div>
        </div>
      </section>

      <div className="mosaic-container pb-8 flex flex-wrap gap-6">
        <AnimatedLink to="/metodologia">{nav.methodology}</AnimatedLink>
        <AnimatedLink to="/casos-de-exito">{nav.successCases}</AnimatedLink>
      </div>

      <ContactBanner
        title={solutions.contactBanner.title}
        text={solutions.contactBanner.text}
        ctaLabel={solutions.contactBanner.ctaLabel}
        onCta={() => navigate('/contacto')}
      />
    </div>
  );
};

export default SolutionsPage;
