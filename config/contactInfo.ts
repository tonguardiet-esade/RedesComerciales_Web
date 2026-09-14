/** Datos de contacto reales del proyecto. Campos opcionales listos para completar. */
export const CONTACT_INFO = {
  companyName: 'Redescomerciales.ai',
  email: 'info@redescomerciales.ai',
  phone: '+34 623 140 545',
  /** Enlace wa.me — añadir cuando esté disponible */
  whatsapp: null as string | null,
  address: 'Avda Diagonal, 523, 1er 2. Barcelona',
  city: 'Barcelona, España',
  mapQuery: 'Avda Diagonal, 523, Barcelona',
  /** Horario — añadir cuando esté confirmado */
  hours: null as string | null,
  social: {
    linkedin: null as string | null,
    instagram: null as string | null,
  },
} as const;

export const CONTACT_MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_INFO.mapQuery)}&hl=es&z=15&output=embed`;
