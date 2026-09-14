import { readFileSync, writeFileSync } from 'fs';

const path = 'context/SettingsContext.tsx';
let content = readFileSync(path, 'utf8');

// Remove fr, de, it language blocks
content = content.replace(/\n  fr: \{[\s\S]*?\n  \},\n  de: \{[\s\S]*?\n  \},\n  it: \{[\s\S]*?\n  \}\n\};/, '\n};');

// Update imports and Language type
if (!content.includes("landingCa")) {
  content = content.replace(
    "import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';",
    `import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { landingCa } from '../lib/i18n/landingCa';
import { landingEs } from '../lib/i18n/landingEs';
import { landingEn } from '../lib/i18n/landingEn';`
  );
}

content = content.replace(
  "type Language = 'es' | 'en' | 'ca' | 'fr' | 'de' | 'it';",
  "type Language = 'es' | 'en' | 'ca';"
);

const mergeBlock = `
Object.assign(translations.es, landingEs);
Object.assign(translations.en, landingEn);
Object.assign(translations.ca, landingCa);
`;

if (!content.includes('Object.assign(translations.es')) {
  content = content.replace(
    'const SettingsContext = createContext',
    `${mergeBlock}\nconst SettingsContext = createContext`
  );
}

const supportedLangs = "const SUPPORTED_LANGS: Language[] = ['es', 'en', 'ca'];";

if (!content.includes('SUPPORTED_LANGS')) {
  content = content.replace(
    'export const SettingsProvider = ({ children }: { children?: ReactNode }) => {',
    `${supportedLangs}\n\nexport const SettingsProvider = ({ children }: { children?: ReactNode }) => {`
  );

  content = content.replace(
    "const [lang, setLangState] = useState<Language>(() => (localStorage.getItem('gw_lang') as Language) || 'es');",
    `const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem('gw_lang') as Language | null;
    return stored && SUPPORTED_LANGS.includes(stored) ? stored : 'es';
  });`
  );

  content = content.replace(
    `  useEffect(() => {
    localStorage.setItem('gw_lang', lang);
  }, [lang]);`,
    `  useEffect(() => {
    localStorage.setItem('gw_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);`
  );
}

writeFileSync(path, content, 'utf8');
console.log('SettingsContext patched successfully');
