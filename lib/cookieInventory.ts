export type CookieEntry = {
  name: string;
  duration: string;
  description: string;
};

export type CookieCategory = {
  id: 'necessary' | 'functional' | 'analytics' | 'advertising';
  title: string;
  description: string;
  items: CookieEntry[];
};

/** Inventario de cookies utilizadas en redescomerciales.ai */
export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'necessary',
    title: 'Necesarias',
    description:
      'Las cookies necesarias son cruciales para las funciones básicas del sitio web y el sitio web no funcionará de la forma prevista sin ellas. Estas cookies no almacenan ningún dato de identificación personal.',
    items: [
      {
        name: 'sb-zukgpdveyexggaibhfxs-auth-token',
        duration: 'sesión / persistente',
        description:
          'Supabase establece esta cookie para mantener la sesión de autenticación del usuario cuando accede a la plataforma.',
      },
      {
        name: 'sb-zukgpdveyexggaibhfxs-auth-token-code-verifier',
        duration: 'sesión',
        description:
          'Supabase utiliza esta cookie para completar de forma segura el flujo de inicio de sesión (PKCE).',
      },
    ],
  },
  {
    id: 'functional',
    title: 'Funcionales',
    description:
      'Las cookies funcionales ayudan a realizar ciertas funciones, como compartir el contenido del sitio web en plataformas de redes sociales, recopilar comentarios y otras funciones de terceros.',
    items: [],
  },
  {
    id: 'analytics',
    title: 'Analíticas',
    description:
      'Las cookies analíticas se utilizan para comprender cómo interactúan los visitantes con el sitio web. Estas cookies ayudan a proporcionar información sobre métricas, el número de visitantes, la tasa de rebote, la fuente de tráfico, etc.',
    items: [],
  },
  {
    id: 'advertising',
    title: 'Publicitarias',
    description:
      'Las cookies publicitarias se utilizan para entregar anuncios personalizados a los visitantes en función de las páginas que visitaron antes y analizar la efectividad de la campaña publicitaria.',
    items: [
      {
        name: 'NID',
        duration: '6 meses',
        description:
          'Google establece esta cookie cuando se carga el mapa embebido en la página de contacto, con el fin de recordar preferencias y personalizar anuncios en propiedades de Google.',
      },
      {
        name: 'CONSENT',
        duration: '2 años',
        description:
          'Google utiliza esta cookie para almacenar el estado de consentimiento de cookies del usuario en servicios de Google vinculados al mapa embebido.',
      },
    ],
  },
];

export const COOKIE_TABLE_HEADERS = {
  name: 'Cookie',
  duration: 'Duración',
  description: 'Descripción',
} as const;

export const COOKIE_EMPTY_CATEGORY_MESSAGE =
  'Actualmente este sitio web no utiliza cookies de este tipo.';
