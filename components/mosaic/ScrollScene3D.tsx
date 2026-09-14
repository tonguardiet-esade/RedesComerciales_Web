import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollScene3DProps {
  scrollRootRef: React.RefObject<HTMLElement | null>;
}

type Disposable = {
  dispose: () => void;
};

const CYAN = 0x34b1d5;
const CYAN_LIGHT = 0x5ee0fc;
const CYAN_PALE = 0xd4eef7;
const WHITE = 0xffffff;

const seeded = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const ScrollScene3D = ({ scrollRootRef }: ScrollScene3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = scrollRootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const isMobile = window.innerWidth < 768;
    const disposables: Disposable[] = [];

    const track = (item: Disposable) => {
      disposables.push(item);
      return item;
    };

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(0xf8fafc, 0.006);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 6, 22);

    const world = new THREE.Group();
    scene.add(world);

    const heroLeft = new THREE.Group();
    const heroRight = new THREE.Group();
    const floaters = new THREE.Group();
    const wires = new THREE.Group();
    const accents = new THREE.Group();
    world.add(heroLeft, heroRight, floaters, wires, accents);

    scene.add(new THREE.AmbientLight(0xffffff, 0.92));
    const key = new THREE.DirectionalLight(0xffffff, 0.55);
    key.position.set(8, 16, 12);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x9ee8fc, 0.28);
    fill.position.set(-12, 4, -6);
    scene.add(fill);

    const addGlassCube = (
      group: THREE.Group,
      x: number,
      y: number,
      z: number,
      size: number,
      color: number,
      opacity: number,
      scrollFactor: number
    ) => {
      const geo = new THREE.BoxGeometry(size, size, size);
      const mat = new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity,
        roughness: 0.15,
        metalness: 0.04,
      });
      mat.userData = { baseOpacity: opacity };
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.userData = { baseY: y, scrollFactor, baseX: x, baseZ: z };
      group.add(mesh);
      track({ dispose: () => { geo.dispose(); mat.dispose(); } });
    };

    const addWireCube = (
      group: THREE.Group,
      x: number,
      y: number,
      z: number,
      size: number,
      opacity: number,
      scrollFactor: number
    ) => {
      const box = new THREE.BoxGeometry(size, size, size);
      const edges = new THREE.EdgesGeometry(box);
      box.dispose();
      const mat = new THREE.LineBasicMaterial({
        color: CYAN,
        transparent: true,
        opacity,
      });
      mat.userData = { baseOpacity: opacity };
      const lines = new THREE.LineSegments(edges, mat);
      lines.position.set(x, y, z);
      lines.userData = { baseY: y, scrollFactor, baseX: x };
      group.add(lines);
      track({ dispose: () => { edges.dispose(); mat.dispose(); } });
    };

    const addAccentPlane = (
      group: THREE.Group,
      x: number,
      y: number,
      z: number,
      w: number,
      h: number,
      opacity: number,
      scrollFactor: number
    ) => {
      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshBasicMaterial({
        color: CYAN_LIGHT,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      mat.userData = { baseOpacity: opacity };
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.y = x > 0 ? -0.4 : 0.4;
      mesh.userData = { baseY: y, scrollFactor, baseX: x };
      group.add(mesh);
      track({ dispose: () => { geo.dispose(); mat.dispose(); } });
    };

    const lateral = isMobile ? 9 : 14;
    const heroSpecs = isMobile ? 5 : 9;
    for (let i = 0; i < heroSpecs; i++) {
      const s = seeded(i);
      const size = 0.5 + s * 1.8;
      const y = -1 + seeded(i + 3) * 5;
      const z = -6 - seeded(i + 7) * 8;
      const opacity = 0.18 + seeded(i + 11) * 0.28;
      const factor = 0.6 + seeded(i + 13) * 0.9;
      const color = i % 3 === 0 ? CYAN : i % 3 === 1 ? CYAN_PALE : WHITE;

      addGlassCube(heroLeft, -lateral - s * 2, y, z, size, color, opacity, factor);
      addWireCube(heroLeft, -lateral - 1.5, y + 1.2, z + 2, size * 0.7, 0.22 + s * 0.15, factor * 1.1);

      addGlassCube(heroRight, lateral + s * 2, y + 0.5, z - 1, size * 0.9, color, opacity * 0.9, factor * 0.85);
      addWireCube(heroRight, lateral + 2, y - 0.8, z + 1.5, size * 0.55, 0.18 + s * 0.12, factor);
    }

    const floaterCount = isMobile ? 10 : 18;
    for (let i = 0; i < floaterCount; i++) {
      const s = seeded(i + 40);
      const side = i % 2 === 0 ? -1 : 1;
      const x = side * (lateral * 0.55 + s * 6);
      const y = seeded(i + 50) * 8 - 2;
      const z = -4 - seeded(i + 60) * 12;
      const size = 0.25 + s * 0.9;
      const opacity = 0.12 + seeded(i + 70) * 0.35;

      if (i % 4 === 0) {
        addWireCube(floaters, x, y, z, size, 0.2 + s * 0.2, 0.5 + s);
      } else {
        addGlassCube(
          floaters,
          x,
          y,
          z,
          size,
          i % 3 === 0 ? CYAN_LIGHT : WHITE,
          opacity,
          0.4 + s * 1.2
        );
      }
    }

    const wireCount = isMobile ? 4 : 7;
    for (let i = 0; i < wireCount; i++) {
      const s = seeded(i + 90);
      const x = (i % 2 === 0 ? -1 : 1) * (lateral + 3 + s * 3);
      addWireCube(wires, x, 1 + s * 3, -8 - s * 5, 1.2 + s * 1.5, 0.15 + s * 0.2, 0.7 + s * 0.5);
    }

    for (let i = 0; i < (isMobile ? 2 : 4); i++) {
      const s = seeded(i + 100);
      const side = i % 2 === 0 ? -1 : 1;
      addAccentPlane(accents, side * (lateral + 4), 2 + s * 2, -10 - s * 4, 2.5 + s, 3 + s, 0.06 + s * 0.06, 0.5 + s);
    }

    const particleCount = isMobile ? 60 : 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const s = seeded(i + 120);
      positions[i * 3] = (s - 0.5) * 36;
      positions[i * 3 + 1] = seeded(i + 130) * 14 - 3;
      positions[i * 3 + 2] = -seeded(i + 140) * 18 - 4;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: CYAN,
      size: isMobile ? 0.08 : 0.06,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      sizeAttenuation: true,
    });
    particleMat.userData = { baseOpacity: 0.45 };
    const particles = new THREE.Points(particleGeo, particleMat);
    particles.userData.scrollFactor = 0.3;
    world.add(particles);
    track({ dispose: () => { particleGeo.dispose(); particleMat.dispose(); } });

    const state = {
      camX: 0,
      camY: 6,
      camZ: 22,
      lookY: 0,
      rotY: 0,
      worldY: 0,
      lateralSpread: 1,
      heroWeight: 1,
      floaterWeight: 0.85,
      wireWeight: 0.7,
      particleWeight: 0.55,
      accentWeight: 0.5,
      masterOpacity: 0.72,
      fogDensity: 0.006,
    };

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
        },
      });

      timeline
        .to(state, {
          camY: 9,
          camZ: 18,
          rotY: Math.PI * 0.22,
          lateralSpread: 1.15,
          duration: 0.18,
          ease: 'none',
        }, 0)
        .to(state, {
          camX: -2,
          camY: 7,
          camZ: 20,
          rotY: Math.PI * 0.42,
          worldY: -1.5,
          floaterWeight: 1,
          wireWeight: 0.9,
          heroWeight: 0.75,
          duration: 0.18,
          ease: 'none',
        }, 0.18)
        .to(state, {
          camX: 3,
          camY: 8,
          camZ: 16,
          rotY: Math.PI * 0.68,
          lateralSpread: 1.35,
          particleWeight: 0.75,
          accentWeight: 0.85,
          duration: 0.18,
          ease: 'none',
        }, 0.36)
        .to(state, {
          camY: 10,
          camZ: 19,
          rotY: Math.PI * 0.92,
          worldY: -3,
          heroWeight: 0.55,
          floaterWeight: 0.7,
          masterOpacity: 0.58,
          fogDensity: 0.009,
          duration: 0.18,
          ease: 'none',
        }, 0.54)
        .to(state, {
          camX: 0,
          camY: 11,
          camZ: 21,
          rotY: Math.PI * 1.12,
          lateralSpread: 1.1,
          heroWeight: 0.35,
          wireWeight: 0.45,
          particleWeight: 0.4,
          accentWeight: 0.3,
          masterOpacity: 0.48,
          duration: 0.28,
          ease: 'none',
        }, 0.72);

      const markers = gsap.utils.toArray<HTMLElement>('[data-scroll-scene]', root);
      markers.forEach((marker) => {
        const phase = marker.dataset.scrollScene;
        if (!phase) return;

        const phaseMap: Record<string, Partial<typeof state>> = {
          hero: { heroWeight: 1, lateralSpread: 1, masterOpacity: 0.78 },
          manifesto: { rotY: Math.PI * 0.28, floaterWeight: 1, heroWeight: 0.65 },
          projects: { camX: -3, rotY: Math.PI * 0.45, lateralSpread: 1.25 },
          tech: { rotY: Math.PI * 0.62, wireWeight: 1, accentWeight: 0.9 },
          methodology: { rotY: Math.PI * 0.52, camX: 2, floaterWeight: 0.95 },
          metrics: { rotY: Math.PI * 0.88, particleWeight: 0.85, heroWeight: 0.4 },
          footer: { masterOpacity: 0.42, heroWeight: 0.25, wireWeight: 0.3 },
        };

        const target = phaseMap[phase];
        if (!target) return;

        gsap.to(state, {
          ...target,
          ease: 'none',
          scrollTrigger: {
            trigger: marker,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 1.4,
          },
        });
      });
    }, root);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const applyGroup = (group: THREE.Group, weight: number, rotMultiplier: number) => {
      group.visible = weight > 0.02;
      group.rotation.y = state.rotY * rotMultiplier;
      group.position.y = state.worldY * rotMultiplier * 0.4;

      group.children.forEach((child) => {
        const ud = child.userData as { baseY?: number; scrollFactor?: number; baseX?: number };
        const factor = ud.scrollFactor ?? 1;
        if (ud.baseY !== undefined) {
          child.position.y = ud.baseY + state.worldY * factor * 0.35;
        }
        if (ud.baseX !== undefined) {
          const spread = state.lateralSpread;
          child.position.x = ud.baseX * spread;
        }
        child.rotation.x = state.rotY * factor * 0.35;
        child.rotation.z = state.rotY * factor * 0.15;

        const obj = child as THREE.Mesh | THREE.LineSegments;
        const mat = obj.material;
        const materials = Array.isArray(mat) ? mat : mat ? [mat] : [];
        materials.forEach((m) => {
          const base = (m.userData?.baseOpacity as number) ?? m.opacity;
          m.opacity = base * weight * state.masterOpacity;
        });
      });
    };

    let frameId = 0;
    const render = () => {
      frameId = requestAnimationFrame(render);

      camera.position.set(
        state.camX + mouse.x * 0.8,
        state.camY + mouse.y * 0.5,
        state.camZ + mouse.x * 0.25
      );
      camera.lookAt(mouse.x * 0.6, state.lookY, -4);

      world.rotation.y = state.rotY * 0.08;

      applyGroup(heroLeft, state.heroWeight, 0.75);
      applyGroup(heroRight, state.heroWeight * 0.95, -0.65);
      applyGroup(floaters, state.floaterWeight, 1.1);
      applyGroup(wires, state.wireWeight, 0.9);
      applyGroup(accents, state.accentWeight, 0.5);

      particles.rotation.y = state.rotY * 0.2;
      particles.position.y = state.worldY * 0.25;
      particleMat.opacity = particleMat.userData.baseOpacity * state.particleWeight * state.masterOpacity;

      fog.density = state.fogDensity;
      renderer.domElement.style.opacity = String(Math.min(0.85, state.masterOpacity + 0.12));
      renderer.render(scene, camera);
    };
    render();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      ctx.revert();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [scrollRootRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="mosaic-scene-canvas"
        aria-hidden="true"
      />
      <div className="mosaic-scene-glow" aria-hidden="true" />
      <div className="mosaic-scene-vignette" aria-hidden="true" />
    </>
  );
};

export default ScrollScene3D;
