/** URLs de los otros despliegues (Sales y Plataforma). Configurables vía Vercel / .env.local */
export const EXTERNAL_LINKS = {
  sales:
    import.meta.env.VITE_SALES_URL?.trim() ||
    'https://redes-comerciales-sales.vercel.app',
  plataforma:
    import.meta.env.VITE_PLATAFORMA_URL?.trim() ||
    'https://redescomerciales-plataforma.vercel.app',
} as const;
