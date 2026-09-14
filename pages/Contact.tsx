import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mail, Phone, Clock, MessageCircle } from 'lucide-react';
import PageHero from '../components/mosaic/PageHero';
import ContactForm from '../components/mosaic/ContactForm';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/mosaic/Breadcrumbs';
import { getScrollBehavior, usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLandingScrollEffects } from '../hooks/useLandingScrollEffects';
import { usePageContent } from '../hooks/usePageContent';
import { useSettings } from '../context/SettingsContext';
import { CONTACT_INFO, CONTACT_MAP_EMBED_URL } from '../config/contactInfo';

const PATH_LINKS = ['/soluciones', '/casos-de-exito'] as const;

const ContactPage = () => {
  const navigate = useNavigate();
  const { t } = useSettings();
  const { contact, nav } = usePageContent();
  const pageRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLandingScrollEffects(pageRef);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: getScrollBehavior(reducedMotion),
      block: 'start',
    });
  };

  const infoItems = [
    {
      icon: MapPin,
      label: contact.info.addressLabel,
      value: CONTACT_INFO.address,
      href: undefined,
    },
    {
      icon: Mail,
      label: contact.info.emailLabel,
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
    },
    ...(CONTACT_INFO.phone
      ? [{
          icon: Phone,
          label: contact.info.phoneLabel,
          value: CONTACT_INFO.phone,
          href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`,
        }]
      : []),
    ...(CONTACT_INFO.hours
      ? [{
          icon: Clock,
          label: contact.info.hoursLabel,
          value: CONTACT_INFO.hours,
          href: undefined,
        }]
      : []),
    ...(CONTACT_INFO.whatsapp
      ? [{
          icon: MessageCircle,
          label: contact.info.whatsappLabel,
          value: CONTACT_INFO.whatsapp,
          href: CONTACT_INFO.whatsapp,
        }]
      : []),
  ];

  return (
    <div ref={pageRef} className="overflow-x-hidden">
      <div className="mosaic-container pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: t('breadcrumb.home'), path: '/' },
            { label: nav.contact },
          ]}
        />
      </div>
      <PageHero
        label={contact.hero.label}
        title={
          <>
            {contact.hero.title}
            <span className="block mosaic-label text-mosaic-black-300 mt-4 normal-case tracking-normal">
              {contact.hero.location}
            </span>
          </>
        }
        subtitle={contact.hero.subtitle}
      />

      {/* Rutas de audiencia — estructura Topa: cards + CTA */}
      <section
        data-scroll-scene="contact-paths"
        data-scroll-zone="content"
        className="mosaic-container py-var-spacer-lg"
        style={{ paddingTop: 'var(--spacer-lg)', paddingBottom: 'var(--spacer-lg)' }}
      >
        <div className="max-w-3xl mb-12 scroll-reveal-body">
          <h2 className="mosaic-h2-editorial mb-4">{contact.paths.sectionTitle}</h2>
          <p className="mosaic-body">{contact.paths.sectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {contact.paths.items.map((item, i) => (
            <article
              key={item.title}
              className="scroll-tech-card section-glass-card p-8 md:p-10 flex flex-col group hover:border-mosaic-cyan/30 transition-colors"
            >
              <h3 className="mosaic-h4 mb-4 group-hover:text-mosaic-cyan transition-colors">{item.title}</h3>
              <p className="mosaic-body text-sm flex-1 mb-8">{item.description}</p>
              <button
                type="button"
                data-cursor="button"
                onClick={() => navigate(PATH_LINKS[i] ?? '/soluciones')}
                className="mosaic-link text-mosaic-cyan text-left w-fit cursor-pointer"
              >
                <span>{item.cta}</span>
                <span className="mosaic-link-icon">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2"/></svg>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2"/></svg>
                </span>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Información + mapa */}
      <section
        data-scroll-scene="contact-info"
        data-scroll-zone="content"
        className="section-blue-wash border-y border-mosaic-white-300"
      >
        <div
          className="mosaic-container py-var-spacer-xl"
          style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
        >
          <h2 className="mosaic-h2-editorial mb-12 scroll-reveal-heading">{contact.info.sectionTitle}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-8">
              <div className="scroll-reveal-body">
                <p className="mosaic-label text-mosaic-cyan mb-2">{contact.info.locationLabel}</p>
                <p className="mosaic-h4">{contact.info.companyName}</p>
                <p className="mosaic-body text-sm mt-2 text-mosaic-black-300">{CONTACT_INFO.city}</p>
              </div>

              <ul className="space-y-6">
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="scroll-tech-card flex gap-4 group">
                      <span className="w-10 h-10 shrink-0 flex items-center justify-center border border-mosaic-white-300 text-mosaic-cyan group-hover:border-mosaic-cyan transition-colors">
                        <Icon className="w-4 h-4" strokeWidth={1.5} />
                      </span>
                      <div>
                        <p className="mosaic-label text-mosaic-black-300 mb-1">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mosaic-body text-sm hover:text-mosaic-cyan transition-colors break-all"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mosaic-body text-sm">{item.value}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                data-cursor="button"
                onClick={scrollToForm}
                className="mosaic-link text-mosaic-cyan cursor-pointer scroll-reveal-body"
              >
                <span>{t('contact.submit')}</span>
                <span className="mosaic-link-icon">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2"/></svg>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2"/></svg>
                </span>
              </button>
            </div>

            <div className="scroll-reveal-body">
              <p className="mosaic-label text-mosaic-black-300 mb-4">{contact.info.mapTitle}</p>
              <div className="aspect-[4/3] w-full overflow-hidden border border-mosaic-white-300 bg-mosaic-white-100">
                <iframe
                  title={contact.info.mapTitle}
                  src={CONTACT_MAP_EMBED_URL}
                  className="w-full h-full border-0 grayscale-[20%] contrast-[1.02]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section
        data-scroll-scene="contact-form"
        data-scroll-zone="content"
        className="mosaic-container py-var-spacer-xl"
        style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 scroll-reveal-body">
            <h2 className="mosaic-h2-editorial mb-4">{contact.form.sectionTitle}</h2>
            <p className="mosaic-body">{contact.form.sectionSubtitle}</p>
          </div>
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <section
        className="mosaic-editorial-section py-var-spacer-lg border-t border-mosaic-white-300"
        style={{ paddingTop: 'var(--spacer-lg)', paddingBottom: 'var(--spacer-lg)' }}
      >
        <div className="mosaic-container max-w-4xl text-center">
          <h2 className="mosaic-h2-editorial mb-8 scroll-reveal-heading">{contact.faq.sectionTitle}</h2>
          <Link to="/#faq" className="mosaic-link text-mosaic-cyan mosaic-focus-ring rounded-sm">
            <span>{t('contact.faqLink')}</span>
            <span className="mosaic-link-icon">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2"/></svg>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2"/></svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
