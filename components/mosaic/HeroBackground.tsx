import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BLOCKS = 10;

interface HeroBackgroundProps {
  scrollRef?: React.RefObject<HTMLElement | null>;
}

const HeroBackground = ({ scrollRef }: HeroBackgroundProps) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const trigger = scrollRef?.current;
    const layer = layerRef.current;
    const grid = gridRef.current;
    if (!trigger || !layer || !grid) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(layer, {
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        opacity: 0.15,
        ease: 'none',
      });

      gsap.to(grid, {
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        rotateX: 42,
        rotateZ: -38,
        y: 180,
        scale: 1.55,
        ease: 'none',
      });

      blocksRef.current.forEach((block, i) => {
        if (!block) return;
        const row = Math.floor(i / BLOCKS);
        const col = i % BLOCKS;
        const depth = 8 + ((row + col) % 6) * 14;

        gsap.fromTo(
          block,
          { z: 0 },
          {
            z: depth,
            scrollTrigger: {
              trigger,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.4,
            },
            ease: 'none',
          }
        );

        gsap.to(block, {
          scrollTrigger: {
            trigger,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.6,
          },
          y: -((row % 3) * 6 + col % 2 * 4),
          ease: 'none',
        });
      });
    }, layer);

    return () => ctx.revert();
  }, [scrollRef]);

  return (
    <div ref={layerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 mosaic-grid-lines opacity-50" />

      <div className="absolute inset-0 flex items-center justify-center hero-blocks">
        <div
          ref={gridRef}
          className="grid gap-[3px] opacity-95 will-change-transform"
          style={{
            gridTemplateColumns: `repeat(${BLOCKS}, 1fr)`,
            width: '150%',
            maxWidth: '960px',
            transform: 'rotateX(58deg) rotateZ(-42deg) scale(1.15)',
            transformStyle: 'preserve-3d',
          }}
        >
          {Array.from({ length: BLOCKS * BLOCKS }).map((_, i) => {
            const row = Math.floor(i / BLOCKS);
            const col = i % BLOCKS;
            const height = 10 + ((row + col) % 5) * 7;
            const tint = (row + col) % 3 === 0 ? 'hero-block-cyan' : (row + col) % 3 === 1 ? 'hero-block-green' : 'hero-block';

            return (
              <div
                key={i}
                ref={(el) => {
                  if (el) blocksRef.current[i] = el;
                }}
                className={`${tint} will-change-transform`}
                style={{
                  height: `${height}px`,
                  transformStyle: 'preserve-3d',
                }}
              />
            );
          })}
        </div>
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, transparent 0%, var(--color-mosaic-white-200) 72%)',
        }}
      />
    </div>
  );
};

export default HeroBackground;
