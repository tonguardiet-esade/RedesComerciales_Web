import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactBannerProps {
  title: string;
  text: string;
  ctaLabel: string;
  onCta: () => void;
  scrollScene?: string;
  scrollZone?: string;
}

const ContactBanner = ({ title, text, ctaLabel, onCta, scrollScene = 'footer', scrollZone = 'footer' }: ContactBannerProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      }
    );
  }, []);

  return (
    <section
      ref={ref}
      data-scroll-scene={scrollScene}
      data-scroll-zone={scrollZone}
      className="mosaic-bottom-zone py-var-spacer-xl"
      style={{ paddingTop: 'var(--spacer-xl)', paddingBottom: 'var(--spacer-xl)' }}
    >
      <div className="mosaic-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-mosaic-white-300 pt-16">
          <div className="lg:col-span-7">
            <h2 className="mosaic-h2 mb-6">{title}</h2>
            <p className="mosaic-body max-w-xl">{text}</p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <button
              type="button"
              onClick={onCta}
              className="mosaic-link text-mosaic-cyan text-base cursor-pointer"
            >
              <span>{ctaLabel}</span>
              <span className="mosaic-link-icon">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2"/></svg>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2"/></svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
