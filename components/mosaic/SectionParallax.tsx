import React from 'react';

interface SectionParallaxProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

const SectionParallax = ({ children, className = '', style, id, dark = false, ...rest }: SectionParallaxProps) => (
  <section id={id} className={`scroll-parallax-bg relative overflow-hidden ${className}`} style={style} {...rest}>
    <div
      className="parallax-bg-inner absolute inset-0 pointer-events-none opacity-20"
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 ${dark ? 'mosaic-grid-lines opacity-15' : 'mosaic-grid-lines opacity-25'}`}
        style={{
          transform: 'rotateX(58deg) rotateZ(-42deg) scale(1.8) translateY(-20%)',
          transformOrigin: 'center center',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(52,177,213,0.06) 0%, transparent 55%)',
        }}
      />
    </div>
    <div className="relative z-10">{children}</div>
  </section>
);

export default SectionParallax;
