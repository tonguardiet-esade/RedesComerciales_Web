import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import type { SeoRouteKey } from '../lib/i18n/seo/types';
import { buildRouteHtml } from '../lib/seo/staticPageHtml';

const ROUTE_ENTRIES: Array<{ routeKey: SeoRouteKey; outDir: string }> = [
  { routeKey: 'solutions', outDir: 'soluciones' },
  { routeKey: 'methodology', outDir: 'metodologia' },
  { routeKey: 'successCases', outDir: 'casos-de-exito' },
  { routeKey: 'contact', outDir: 'contacto' },
  { routeKey: 'legal', outDir: 'aviso-legal' },
  { routeKey: 'cookies', outDir: 'politica-cookies' },
  { routeKey: 'privacy', outDir: 'politica-privacidad' },
];

function writeRouteHtmlFiles(rootDir: string) {
  for (const { routeKey, outDir } of ROUTE_ENTRIES) {
    const dir = path.join(rootDir, outDir);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), buildRouteHtml(routeKey), 'utf-8');
  }
}

/** Genera HTML estático por ruta marketing para crawlers y Apache. */
export function seoHtmlPlugin(): Plugin {
  let rootDir = process.cwd();

  return {
    name: 'seo-html',
    configResolved(config) {
      rootDir = config.root;
    },
    buildStart() {
      writeRouteHtmlFiles(rootDir);
    },
    configureServer() {
      writeRouteHtmlFiles(rootDir);
    },
  };
}

export function getSeoHtmlInputs(rootDir: string): Record<string, string> {
  const inputs: Record<string, string> = {
    main: path.resolve(rootDir, 'index.html'),
  };

  for (const { outDir } of ROUTE_ENTRIES) {
    inputs[outDir] = path.resolve(rootDir, outDir, 'index.html');
  }

  return inputs;
}
