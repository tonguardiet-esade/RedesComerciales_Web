import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PageHeroProps {
  label?: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageHero = ({ label, title, subtitle, children }: PageHeroProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  return (
    <section
      ref={ref}
      data-scroll-scene="hero"
      data-scroll-zone="hero"
      className="pt-28 md:pt-36 pb-16 md:pb-24 mosaic-container border-b border-mosaic-white-300"
    >
      {label && <p className="mosaic-label text-mosaic-cyan mb-6">{label}</p>}
      <h1 className="mosaic-h1 max-w-4xl mb-6">{title}</h1>
      {subtitle && <p className="mosaic-body max-w-2xl mb-8">{subtitle}</p>}
      {children}
    </section>
  );
};

export default PageHero;
