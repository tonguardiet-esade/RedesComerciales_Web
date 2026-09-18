import type { SeoRouteKey } from '../i18n/seo/types';

/** Contenido estático para crawlers sin JS (noscript / HTML prerenderizado). */
export interface CrawlerSection {
  heading: string;
  paragraphs: string[];
}

export interface CrawlerFaqItem {
  question: string;
  answer: string;
}

export interface CrawlerPageContent {
  h1: string;
  intro: string;
  sections?: CrawlerSection[];
  faq?: CrawlerFaqItem[];
}

export const CRAWLER_CONTENT_ES: Record<SeoRouteKey, CrawlerPageContent> = {
  home: {
    h1: 'Convierte tu red indirecta en un canal de ventas activo y medible',
    intro:
      'Redescomerciales.ai ayuda a empresas B2B a activar y gestionar su red comercial indirecta. Combinamos diagnóstico, seguimiento, metodología y tecnología para generar oportunidades con visibilidad del pipeline.',
    sections: [
      {
        heading: '¿Qué es Redescomerciales.ai?',
        paragraphs: [
          'Somos un sistema integral para CEOs y directores comerciales que quieren convertir partners, prescriptores y colaboradores en un canal de ventas activo, con seguimiento del pipeline indirecto.',
          'No somos una agencia de leads ni un software aislado: unimos estrategia, tecnología y operación para activar la red y mantenerla en movimiento.',
        ],
      },
      {
        heading: 'Cómo activamos tu red comercial',
        paragraphs: [
          'Diagnóstico de la red actual, diseño del modelo de activación, implementación tecnológica y operación continua con seguimiento de oportunidades.',
          'El objetivo es pasar de una red pasiva —contactos dormidos sin visibilidad— a un canal indirecto medible, con indicadores de activación y pipeline.',
        ],
      },
      {
        heading: 'Sectores y perfiles con los que trabajamos',
        paragraphs: [
          'Empresas B2B con ciclo comercial estructurado: SaaS, consultoría, servicios profesionales, fondos de inversión y scale-ups.',
          'Si tienes partners o potencial de red comercial y necesitas visibilidad y ejecución sistemática, podemos valorar un diagnóstico inicial sin compromiso.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Necesito tener ya una red?',
        answer:
          'No es imprescindible. Muchas empresas tienen contactos infrautilizados y otras empiezan desde cero. En ambos casos diseñamos la estructura, los incentivos y el sistema de seguimiento.',
      },
      {
        question: '¿Cuánto tarda en verse resultados?',
        answer:
          'Los primeros indicadores de activación suelen aparecer en semanas. El impacto comercial se consolida en meses, según el tamaño de la red y el sector.',
      },
      {
        question: '¿Qué tipo de empresas encajan?',
        answer:
          'Empresas B2B con ciclo comercial estructurado: SaaS, consultoría, servicios profesionales, fondos de inversión y scale-ups.',
      },
      {
        question: '¿Por qué no basta con nuestro CRM o las herramientas actuales?',
        answer:
          'Un CRM almacena información, pero no activa ni opera la red. Añadimos el modelo de activación, el seguimiento sistemático y la visibilidad del pipeline indirecto que normalmente no cubren tus herramientas.',
      },
      {
        question: '¿Cómo puedo solicitar un diagnóstico?',
        answer:
          'Desde la página de contacto, cuéntanos tu situación. Respondemos en 24 h laborables, revisamos tu red y, si encaja, agendamos una sesión de diagnóstico.',
      },
    ],
  },
  solutions: {
    h1: 'Soluciones para activar tu red comercial',
    intro:
      'Sistema integral para CEOs y directores comerciales B2B: activación de partners, prescriptores y delegados territoriales con visibilidad del pipeline indirecto.',
    sections: [
      {
        heading: 'Estrategia de activación',
        paragraphs: [
          'Modelo de activación adaptado a tu red, sector y objetivos comerciales. Definimos roles, incentivos, cadencia de seguimiento y criterios de calificación de oportunidades.',
        ],
      },
      {
        heading: 'Tecnología y visibilidad',
        paragraphs: [
          'Centralización del pipeline indirecto en un solo lugar. Seguimiento de actividad de partners, estado de oportunidades e indicadores de rendimiento del canal.',
        ],
      },
      {
        heading: 'Operación y seguimiento continuo',
        paragraphs: [
          'Activación proactiva de colaboradores, seguimiento de oportunidades y optimización del canal. Tu equipo valida; nosotros mantenemos la red en movimiento.',
        ],
      },
    ],
  },
  methodology: {
    h1: 'Metodología de activación de red comercial',
    intro:
      'Cuatro fases para convertir contactos dormidos en pipeline real: diagnóstico, activación, seguimiento y escalado del canal indirecto.',
    sections: [
      {
        heading: 'Fase 1 — Diagnóstico estratégico',
        paragraphs: [
          'Analizamos tu red actual, potencial comercial y gaps de activación para definir el plan de acción.',
        ],
      },
      {
        heading: 'Fase 2 — Adaptación tecnológica',
        paragraphs: [
          'Implementamos una plataforma adaptada a tu red: seguimiento de actividad, incentivos y gestión de oportunidades del canal indirecto.',
        ],
      },
      {
        heading: 'Fase 3 — Captación de colaboradores',
        paragraphs: [
          'Diseñamos campañas y procesos para atraer nuevos partners cualificados y alinearlos con tu propuesta de valor.',
        ],
      },
      {
        heading: 'Fase 4 — Gestión y activación continua',
        paragraphs: [
          'Operamos la red con seguimiento, incentivación y optimización continuos para mantener la ejecución del canal a largo plazo.',
        ],
      },
    ],
  },
  successCases: {
    h1: 'Casos de éxito en activación de partners B2B',
    intro:
      'Experiencias de activación de red comercial en consultoría B2B, SaaS scale-up y portfolios de inversión.',
    sections: [
      {
        heading: 'Consultoría B2B',
        paragraphs: [
          'Activación de red de prescriptores y partners para ampliar pipeline sin incrementar plantilla comercial interna.',
        ],
      },
      {
        heading: 'SaaS scale-up',
        paragraphs: [
          'Canal indirecto estructurado con visibilidad del pipeline y seguimiento sistemático de oportunidades generadas por partners.',
        ],
      },
      {
        heading: 'Portfolio de inversión',
        paragraphs: [
          'Modelo de activación aplicado a participadas B2B para acelerar tracción comercial a través de redes existentes.',
        ],
      },
    ],
  },
  contact: {
    h1: 'Contacto y diagnóstico de red comercial',
    intro:
      'Solicita un diagnóstico de tu red comercial. Oficina en Barcelona. Respuesta en 24 horas laborables.',
    sections: [
      {
        heading: 'Cómo contactar',
        paragraphs: [
          'Puedes escribirnos por formulario, correo electrónico o WhatsApp. Cuéntanos tu situación con partners o colaboradores y valoraremos un diagnóstico inicial sin compromiso.',
          'Dirección: Avda Diagonal, 523, 1er 2. Barcelona. Email: info@redescomerciales.ai',
        ],
      },
    ],
  },
  legal: {
    h1: 'Aviso legal',
    intro: 'Información legal y condiciones de uso del sitio web Redescomerciales.ai.',
  },
  cookies: {
    h1: 'Política de cookies',
    intro: 'Información sobre el uso de cookies en redescomerciales.pro.',
  },
  privacy: {
    h1: 'Política de privacidad',
    intro: 'Tratamiento de datos personales y derechos del usuario en Redescomerciales.ai.',
  },
};

export const CRAWLER_NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/soluciones', label: 'Soluciones' },
  { href: '/metodologia', label: 'Metodología' },
  { href: '/casos-de-exito', label: 'Casos de éxito' },
  { href: '/contacto', label: 'Contacto' },
] as const;
