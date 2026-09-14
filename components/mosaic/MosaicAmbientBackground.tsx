import { useEffect, useMemo, useRef } from 'react';
import { mosaicScrollState } from '../../lib/mosaicScrollState';

type ShapeType = 'ring' | 'diamond' | 'node' | 'arc';

type FieldShape = {
  type: ShapeType;
  x: number;
  y: number;
  size: number;
  depth: number;
  rotation: number;
  phase: number;
  drift: number;
  accent: boolean;
};

const BASE = '#f1f1f4';
const CYAN = [52, 177, 213];
const GRAY = [129, 129, 152];
const GRAY_LIGHT = [181, 185, 198];

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const buildShapes = (count: number): FieldShape[] => {
  const types: ShapeType[] = ['ring', 'diamond', 'node', 'arc'];
  return Array.from({ length: count }, (_, i) => ({
    type: types[i % types.length],
    x: seededRandom(i * 3.17) * 1.08 - 0.04,
    y: seededRandom(i * 5.91) * 1.15 - 0.05,
    size: 10 + seededRandom(i * 7.33) * 38,
    depth: 0.25 + seededRandom(i * 11.2) * 0.75,
    rotation: seededRandom(i * 13.7) * Math.PI * 2,
    phase: seededRandom(i * 17.3) * Math.PI * 2,
    drift: 0.6 + seededRandom(i * 19.1) * 1.6,
    accent: i % 6 === 0,
  }));
};

const wrap = (value: number, min: number, max: number) => {
  const range = max - min;
  return min + ((((value - min) % range) + range) % range);
};

const MosaicAmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const shapeCount = useMemo(
    () => (typeof window !== 'undefined' && window.innerWidth < 768 ? 18 : 32),
    []
  );
  const shapes = useMemo(() => buildShapes(shapeCount), [shapeCount]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawSoftWash = (progress: number, tech: number) => {
      const washes = [
        { x: 0.2, y: 0.25, r: 0.45, rgb: [214, 230, 238], a: 0.14 },
        { x: 0.8, y: 0.55, r: 0.5, rgb: [220, 218, 228], a: 0.12 },
        { x: 0.5, y: 0.85, r: 0.4, rgb: [210, 224, 232], a: 0.1 + tech * 0.05 },
      ];

      washes.forEach((wash, i) => {
        const x = (wash.x + Math.sin(progress * Math.PI * 2 + i) * 0.04) * width;
        const y = (wash.y + progress * 0.08) * height;
        const radius = wash.r * Math.min(width, height);
        const [r, g, b] = wash.rgb;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${r},${g},${b},${wash.a})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });
    };

    const getShapePosition = (shape: FieldShape, elapsed: number, progress: number, velocity: number) => {
      const parallaxY = progress * height * shape.depth * 0.55;
      const swayX = Math.sin(elapsed * shape.drift + shape.phase) * (18 + shape.depth * 22);
      const scrollSway = Math.sin(progress * Math.PI * 2 + shape.phase) * 36 * shape.depth;
      const lift = velocity * 40 * shape.depth;

      const x = shape.x * width + swayX + scrollSway;
      const y = wrap(shape.y * height - parallaxY + lift, -height * 0.12, height * 1.12);
      const rotation = shape.rotation + progress * Math.PI * shape.depth * 0.9 + elapsed * 0.08 * shape.drift;
      const scale = 1 + progress * 0.06 * shape.depth + Math.sin(elapsed + shape.phase) * 0.03;

      return { x, y, rotation, scale };
    };

    const strokeColor = (accent: boolean, alpha: number, tech: number) => {
      if (accent) return `rgba(${CYAN[0]},${CYAN[1]},${CYAN[2]},${alpha + tech * 0.08})`;
      return `rgba(${GRAY[0]},${GRAY[1]},${GRAY[2]},${alpha})`;
    };

    const drawShape = (
      shape: FieldShape,
      x: number,
      y: number,
      rotation: number,
      scale: number,
      tech: number
    ) => {
      const size = shape.size * scale;
      const lineWidth = shape.accent ? 1.2 : 0.9;
      const alpha = 0.14 + shape.depth * 0.12 + (shape.accent ? 0.08 : 0);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = strokeColor(shape.accent, alpha, tech);
      ctx.fillStyle = shape.accent
        ? `rgba(${CYAN[0]},${CYAN[1]},${CYAN[2]},${0.06 + tech * 0.04})`
        : `rgba(${GRAY_LIGHT[0]},${GRAY_LIGHT[1]},${GRAY_LIGHT[2]},${0.08})`;

      switch (shape.type) {
        case 'ring':
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
          ctx.stroke();
          if (shape.accent) {
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.18, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(0, -size * 0.55);
          ctx.lineTo(size * 0.42, 0);
          ctx.lineTo(0, size * 0.55);
          ctx.lineTo(-size * 0.42, 0);
          ctx.closePath();
          ctx.stroke();
          break;
        case 'node':
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.14, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.34, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case 'arc':
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.48, 0.15, Math.PI * 1.35);
          ctx.stroke();
          break;
      }

      ctx.restore();
    };

    const drawConnections = (
      points: { x: number; y: number; depth: number; accent: boolean }[],
      tech: number
    ) => {
      const maxDist = Math.min(width, height) * 0.16;

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > maxDist) continue;
          if (Math.abs(a.depth - b.depth) > 0.35) continue;

          const fade = 1 - dist / maxDist;
          const alpha = 0.03 + fade * 0.07 + tech * 0.03;
          const useAccent = a.accent || b.accent;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = useAccent
            ? `rgba(${CYAN[0]},${CYAN[1]},${CYAN[2]},${alpha + 0.03})`
            : `rgba(${GRAY_LIGHT[0]},${GRAY_LIGHT[1]},${GRAY_LIGHT[2]},${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    };

    const draw = (now: number) => {
      const elapsed = (now - start) * 0.001;
      const { progress, velocity } = mosaicScrollState;
      const tech = mosaicScrollState.zones.tech ?? 0;
      const hero = mosaicScrollState.zones.hero ?? Math.max(0, 1 - progress * 2);

      ctx.fillStyle = BASE;
      ctx.fillRect(0, 0, width, height);
      drawSoftWash(progress, tech);

      const positions = shapes.map((shape) => {
        const pos = getShapePosition(shape, elapsed, progress, velocity);
        return { shape, ...pos };
      });

      const connectionPoints = positions
        .filter((p) => p.shape.type === 'node' || p.shape.type === 'ring')
        .map((p) => ({
          x: p.x,
          y: p.y,
          depth: p.shape.depth,
          accent: p.shape.accent,
        }));

      drawConnections(connectionPoints, tech);

      positions
        .sort((a, b) => a.shape.depth - b.shape.depth)
        .forEach(({ shape, x, y, rotation, scale }) => {
          const heroFade = 0.85 + hero * 0.15;
          ctx.globalAlpha = heroFade;
          drawShape(shape, x, y, rotation, scale, tech);
          ctx.globalAlpha = 1;
        });

      if (!reduced) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    if (reduced) {
      draw(performance.now());
    } else {
      const loop = (now: number) => {
        draw(now);
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [shapes]);

  return (
    <div className="mosaic-ambient-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="mosaic-ambient-canvas" />
      <div className="mosaic-ambient-grain" />
      <div className="mosaic-ambient-vignette" />
    </div>
  );
};

export default MosaicAmbientBackground;
