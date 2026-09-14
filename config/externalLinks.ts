/**
 * URLs de las otras aplicaciones del ecosistema RedesComerciales.
 * Configurables vía .env.local (desarrollo) o variables en Hostinger (producción).
 *
 * Puertos locales por defecto:
 * - Sales (botón "Plataforma"):   http://localhost:3001
 * - Plataforma (botón "Acceder"): http://localhost:5174
 */
export const EXTERNAL_LINKS = {
  /** Botón "Plataforma" → RedesComerciales_Sales */
  sales:
    import.meta.env.VITE_SALES_URL?.trim() || 'http://localhost:3001',
  /** Botón "Acceder" → RedesComerciales_Plataforma */
  plataforma:
    import.meta.env.VITE_PLATAFORMA_URL?.trim() ||
    import.meta.env.VITE_PLATFORM_URL?.trim() ||
    'http://localhost:5174',
} as const;
