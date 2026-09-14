import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/mosaic/PageHero';
import AnimatedText from '../components/mosaic/AnimatedText';
import ProjectCard from '../components/mosaic/ProjectCard';
import ContactBanner from '../components/mosaic/ContactBanner';
import CaseStudyModal, { type CaseStudy } from '../components/mosaic/CaseStudyModal';
import { useLandingScrollEffects } from '../hooks/useLandingScrollEffects';
import Breadcrumbs from '../components/mosaic/Breadcrumbs';
import AnimatedLink from '../components/mosaic/AnimatedLink';
import { usePageContent } from '../hooks/usePageContent';
import { useSettings } from '../context/SettingsContext';
import { caseB2b, caseSaas, casePortfolio } from '../assets/images';

const CASE_IMAGES = [caseB2b, caseSaas, casePortfolio];

const SuccessCasesPage = () => {
  const navigate = useNavigate();
  const content = usePageContent();
  const { successCases, nav } = content;
  const { t } = useSettings();
  const pageRef = React.useRef<HTMLDivElement>(null);
  const [selectedCase, setSelectedCase] = React.useState<CaseStudy | null>(null);

  const casesWithImages: CaseStudy[] = successCases.items.map((item, i) => ({
    ...item,
    image: CASE_IMAGES[i],
  }));

  useLandingScrollEffects(pageRef);

  return (
    <div ref={pageRef} className="overflow-x-hidden">
      <div className="mosaic-container pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: t('breadcrumb.home'), path: '/' },
            { label: nav.successCases },
          ]}
        />
      </div>
      <PageHero
        label={successCases.hero.label}
        title={
          <>
            {successCases.hero.title} <span className="text-mosaic-cyan">{successCases.hero.titleHighlight}</span>
          </>
        }
        subtitle={successCases.hero.subtitle}
      />

      <section
        data-scroll-scene="projects"
        data-scroll-zone="projects"
        className="mosaic-container py-var-spacer-xl"
        style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {casesWithImages.map((caseItem, i) => (
            <div key={caseItem.title}>
              <ProjectCard
                title={caseItem.title}
                image={caseItem.image}
                tags={caseItem.tags}
                index={i}
                onClick={() => setSelectedCase(caseItem)}
              />
            </div>
          ))}
        </div>

        <div className="space-y-16" data-scroll-scene="methodology" data-scroll-zone="methodology">
          {casesWithImages.map((caseItem, i) => (
            <article
              key={caseItem.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-mosaic-white-300 pt-12"
            >
              <div className="lg:col-span-3">
                <span className="mosaic-label text-mosaic-cyan">0{i + 1}</span>
                <h2 className="mosaic-h3 mt-4">{caseItem.title}</h2>
              </div>
              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="mosaic-label text-mosaic-black-300 mb-3">{successCases.labels.challenge}</p>
                  <p className="mosaic-body text-sm">{caseItem.challenge}</p>
                </div>
                <div>
                  <p className="mosaic-label text-mosaic-black-300 mb-3">{successCases.labels.solution}</p>
                  <p className="mosaic-body text-sm">{caseItem.solution}</p>
                </div>
                <div>
                  <p className="mosaic-label text-mosaic-green mb-3">{successCases.labels.results}</p>
                  <ul className="space-y-3">
                    {caseItem.results.map((result, j) => (
                      <li key={j} className="flex items-start gap-2 mosaic-body text-sm">
                        <CheckCircle2 className="w-4 h-4 text-mosaic-green shrink-0 mt-0.5" />
                        <strong>{result}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        data-scroll-scene="metrics"
        data-scroll-zone="metrics"
        className="section-glass-light border-y border-mosaic-cyan/10 py-var-spacer-xl"
        style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
      >
        <div className="mosaic-container text-center">
          <AnimatedText as="h2" className="mosaic-h2 mb-6">
            {successCases.metrics.sectionTitle}{' '}
            <span className="text-mosaic-cyan">{successCases.metrics.sectionTitleHighlight}</span>
          </AnimatedText>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {successCases.metrics.items.map((m) => (
              <div key={m.label} className="scroll-metric">
                <p className="mosaic-metric-val scroll-metric-val text-mosaic-cyan mb-2">{m.val}</p>
                <p className="mosaic-label text-mosaic-black-300">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mosaic-container pb-8 flex flex-wrap gap-6">
        <AnimatedLink to="/soluciones">{nav.solutions}</AnimatedLink>
        <AnimatedLink to="/metodologia">{nav.methodology}</AnimatedLink>
      </div>

      <ContactBanner
        title={successCases.contactBanner.title}
        text={successCases.contactBanner.text}
        ctaLabel={successCases.contactBanner.ctaLabel}
        onCta={() => navigate('/contacto')}
      />

      <CaseStudyModal caseStudy={selectedCase} onClose={() => setSelectedCase(null)} />
    </div>
  );
};

export default SuccessCasesPage;
