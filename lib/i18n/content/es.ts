import type { PageContent } from '../types';

export const esContent: PageContent = {
  nav: {
    solutions: 'Soluciones',
    methodology: 'Metodología',
    successCases: 'Casos de éxito',
    contact: 'Contacto',
    platform: 'Plataforma',
    access: 'Acceder',
    menu: 'Menú',
    close: 'Cerrar',
    openMenu: 'Abrir menú',
  },
  footer: {
    tagline: 'Transforma colaboradores en una red de ventas activa mediante tecnología y gestión experta.',
    address: 'Avda Diagonal, 523, 1er 2. Barcelona',
    explore: 'Explorar',
    legal: 'Legal',
    legalNotice: 'Aviso legal',
    cookies: 'Cookies',
    privacy: 'Privacidad',
    newsletter: 'Newsletter',
    newsletterLink: 'Acceder a nuestra newsletter',
  },
  solutions: {
    hero: {
      label: '/ Soluciones',
      title: 'Ya tienes los contactos.',
      titleHighlight: 'Lo que te falta es el sistema',
      titleSuffix: 'para convertirlos en ventas.',
      subtitle: 'Ayudamos a CEOs y Directores Comerciales de empresas B2B a activar su red infrautilizada y escalar sin aumentar costes fijos.',
      ctaSuccessCases: 'Ver casos de éxito',
      ctaDiagnosis: 'Solicitar diagnóstico',
    },
    personas: {
      sectionTitle: 'Perfiles que',
      sectionTitleHighlight: 'transformamos',
      sectionSubtitle: 'Diferentes realidades, un mismo objetivo: monetizar el capital relacional.',
      labels: {
        company: 'Empresa:',
        responsibility: 'Responsabilidad:',
        keyMessage: 'Mensaje clave',
        professionalContext: 'Contexto profesional',
        situation: 'Situación:',
        maturity: 'Madurez:',
        network: 'Red:',
        problemsWeSolve: 'Problemas que resolvemos',
        essentialNeeds: 'Necesidades imprescindibles',
        buyingMotivations: 'Motivaciones de compra',
        commonObjections: 'Objeciones habituales',
        solutionValues: 'Qué valora en la solución',
        tech: 'Tecnológico:',
        strategic: 'Estratégico:',
        operational: 'Operativo:',
      },
      items: [
        {
          id: 0,
          role: 'Director Comercial / CEO',
          segment: 'Empresa B2B Consolidada',
          company: 'Servicios Industriales / Consultoría',
          responsibility: 'Decisor final, visión y ROI',
          context: {
            situation: 'Crecimiento estancado con facturación estable.',
            maturity: 'Media. CRM usado solo como base de datos.',
            network: "Extensa pero contactos 'dormidos'.",
          },
          pains: [
            'Eliminamos la dependencia del equipo comercial interno.',
            'Sistematizamos la activación de partners.',
            'Recuperamos ventas perdidas por falta de seguimiento.',
          ],
          needs: 'Activar red de contactos y generar canal adicional sin aumentar plantilla.',
          motivations: 'Escalabilidad sin incrementar costes fijos.',
          objections: '¿Cuánto esfuerzo real implica activarlo?',
          values: {
            tech: 'Dashboard en tiempo real y trazabilidad.',
            strat: 'Metodología probada de implementación.',
            ops: 'Roles definidos y automatización.',
          },
          message: 'Ya tienes los contactos. Te damos el sistema para convertirlos en ventas.',
        },
        {
          id: 1,
          role: 'Consultor Senior Independiente',
          segment: 'Consultor Senior',
          company: 'Boutique de Estrategia',
          responsibility: 'Gestión de marca personal y cartera C-level',
          context: {
            situation: 'Trabaja por proyectos de alto valor.',
            maturity: 'Baja en herramientas, Alta en relaciones.',
            network: 'Conoce decisores clave del sector.',
          },
          pains: [
            'Estabilizamos ingresos rompiendo la barrera horas/hombre.',
            'Protegemos tu reputación con ejecución impecable.',
            'Facilitamos la monetización elegante de tus introducciones.',
          ],
          needs: 'Monetizar capital relacional de forma recurrente y segura.',
          motivations: 'Generar ingresos pasivos aprovechando su red.',
          objections: '¿Cómo garantizo el trato excelente a mi contacto?',
          values: {
            tech: 'Plataforma sencilla para registro y seguimiento.',
            strat: 'Alineación con su prestigio profesional.',
            ops: 'Soporte estratégico que valide candidatos.',
          },
          message: 'Monetiza tu capital relacional sin comprometer tu marca personal.',
        },
        {
          id: 2,
          role: 'Fundador de Comunidad',
          segment: 'Emprendedor de Redes',
          company: 'Club de Negocios / Networking',
          responsibility: 'Crecimiento y valor para miembros',
          context: {
            situation: 'Red extensa difícil de escalar económicamente.',
            maturity: 'Media. Usa Discord/Slack pero no ventas.',
            network: 'Muy activa. Perfiles dinámicos.',
          },
          pains: [
            'Organizamos el caos en la gestión de oportunidades.',
            'Aportamos trazabilidad total sobre el cierre de leads.',
            'Aseguramos el cobro de comisiones de forma transparente.',
          ],
          needs: 'Convertir la capacidad de conectar personas en un modelo de negocio.',
          motivations: 'Escalar su comunidad a un hub de negocio real.',
          objections: '¿Mis miembros se sentirán cómodos?',
          values: {
            tech: 'IA para asignar roles y optimizar relaciones.',
            strat: 'Modelo basado en el éxito de la red.',
            ops: 'Facilidad de uso y onboarding rápido.',
          },
          message: 'Transforma tu capacidad de conectar personas en ingresos predecibles.',
        },
        {
          id: 3,
          role: 'Head of Partnerships',
          segment: 'Perfil Estratégico Tech/SaaS',
          company: 'Scale-up Tecnológica',
          responsibility: 'Expansión a través de canales indirectos',
          context: {
            situation: 'Programa de partners manual y opaco.',
            maturity: 'Alta. Tienen herramientas pero canal opaco.',
            network: 'Partners tecnológicos y agencias.',
          },
          pains: [
            'Aportamos visibilidad total del pipeline indirecto.',
            'Digitalizamos el onboarding eliminando fricción manual.',
            'Convertimos el canal partner en fuente predecible.',
          ],
          needs: 'Automatizar ciclo de vida del partner y visibilidad pipeline.',
          motivations: 'Demostrar la predictibilidad del canal indirecto.',
          objections: '¿Se integrará con nuestro CRM?',
          values: {
            tech: 'Integración vía API y automatización.',
            strat: 'Escalabilidad territorial rápida.',
            ops: 'Visibilidad en tiempo real para ambas partes.',
          },
          message: 'Escala tu programa de partners con trazabilidad y cero fricción.',
        },
        {
          id: 4,
          role: 'Managing Partner',
          segment: 'Inversor / Business Angel',
          company: 'Venture Capital / Family Office',
          responsibility: 'Maximizar el valor de participadas',
          context: {
            situation: 'Portfolio con crecimiento comercial desigual.',
            maturity: 'Alta. Orientado a métricas y exit.',
            network: 'Inversores y directivos C-level.',
          },
          pains: [
            'Aceleramos el ciclo de ventas de las participadas.',
            'Creamos sinergias comerciales automáticas en el portfolio.',
            'Optimizamos la gestión de contactos de alto nivel.',
          ],
          needs: 'Acelerar las ventas de participadas usando red compartida.',
          motivations: 'Aumento de valoración del portfolio (ROI).',
          objections: '¿Es aplicable a sectores tan diferentes?',
          values: {
            tech: 'Consolidación de datos comerciales del ecosistema.',
            strat: 'Estructura de incentivos para el portfolio.',
            ops: 'Gobierno comercial centralizado.',
          },
          message: 'Multiplica el valor de tu portfolio activando sus sinergias comerciales.',
        },
      ],
    },
    coreValues: [
      {
        title: 'Control Total',
        desc: 'Saber qué oportunidades existen, en qué estado están y quién las gestiona en tiempo real.',
      },
      {
        title: 'Escalabilidad Real',
        desc: 'Crecer sin incrementar costes estructurales ni aumentar la plantilla interna.',
      },
      {
        title: 'Monetización de Activos',
        desc: "Convertir relaciones pasivas y contactos 'dormidos' en ingresos predecibles.",
      },
    ],
    painPoints: {
      sectionTitle: '¿Te resulta',
      sectionTitleHighlight: 'familiar',
      sectionSubtitle: 'Identificamos y resolvemos los cuellos de botella que frenan tu crecimiento.',
      groups: [
        {
          title: 'Problemas Estratégicos',
          items: [
            'Red de contactos infrautilizada (red dormida)',
            'Falta de un sistema estructurado para activar partners',
            'Dependencia excesiva del equipo interno para generar ventas',
          ],
        },
        {
          title: 'Problemas Operativos',
          items: [
            'Falta de visibilidad sobre oportunidades externas',
            'Sin trazabilidad ni control del pipeline indirecto',
            'Coordinación ineficiente de colaboradores externos',
          ],
        },
        {
          title: 'Problemas de Crecimiento',
          items: [
            'Costes fijos disparados al intentar crecer',
            'Baja escalabilidad del modelo comercial actual',
            'Pérdida de oportunidades por falta de seguimiento',
          ],
        },
      ],
    },
    benefits: {
      sectionTitle: 'Beneficios que impulsan tu rentabilidad',
      categories: [
        {
          category: 'Estratégicos',
          items: [
            'Escalado internacional mediante redes',
            'Creación de ecosistemas comerciales propios',
            'Posicionamiento como hub de negocio',
          ],
        },
        {
          category: 'Tecnológicos',
          items: [
            'IA que asigna roles y optimiza relaciones',
            'Automatización de flujos comerciales complejos',
          ],
        },
      ],
      quote: 'Pasar de una red pasiva a un canal activo es la diferencia entre tener contactos y tener ventas.',
      quoteAuthor: '— Directivo comercial B2B',
    },
    contactBanner: {
      title: '¿Listo para activar tu red comercial?',
      text: 'Convierte contactos dormidos en un canal de ventas predecible y escalable.',
      ctaLabel: 'Solicitar diagnóstico gratuito',
    },
  },
  successCases: {
    hero: {
      label: '/ Casos de éxito',
      title: 'Proyectos que',
      titleHighlight: 'transforman',
      subtitle: 'Resultados reales de la implementación del sistema Redescomerciales.ai en diferentes ecosistemas comerciales.',
    },
    labels: {
      challenge: 'Desafío',
      solution: 'Solución',
      results: 'Resultados',
    },
    items: [
      {
        title: 'Consultoría Estratégica B2B',
        challenge: "Red de 2.000 contactos 'dormida' y dependencia total del CEO para captación.",
        solution: 'Activación del sistema de Red Comercial Online y gestión automatizada de referidos.',
        results: [
          '+35% de Leads cualificado en el primer trimestre',
          'Apertura de 2 mercados internacionales sin delegaciones físicas',
          'Retorno de inversión (ROI) del 400% en 6 meses',
        ],
        tags: ['B2B', 'ROI 400%'],
      },
      {
        title: 'Software SaaS (Scale-up)',
        challenge: 'Programa de partners opaco con falta de predictibilidad en el pipeline.',
        solution: 'Digitalización del onboarding y trazabilidad total de introducciones comerciales.',
        results: [
          'Reducción del 50% en el tiempo de cierre de ventas indirectas',
          'Incremento del 20% en el MRR proveniente de canal',
          'Visibilidad 100% sobre las gestiones de cada partner',
        ],
        tags: ['SaaS', 'Partners'],
      },
      {
        title: 'Fondo de Inversión (Portfolio)',
        challenge: 'Nula sinergia comercial entre las 12 participadas del fondo.',
        solution: 'Creación de un HUB comercial compartido basado en la metodología Redescomerciales.ai.',
        results: [
          '8 ventas cruzadas generadas de forma orgánica en un año',
          'Reducción del coste de adquisición (CAC) en un 15%',
          'Aceleración del crecimiento en empresas estancadas',
        ],
        tags: ['Portfolio', 'HUB'],
      },
    ],
    metrics: {
      sectionTitle: 'Métricas que',
      sectionTitleHighlight: 'hablan',
      items: [
        { val: '+40%', label: 'Activación de partners' },
        { val: '+250', label: 'Leads generados' },
        { val: '400%', label: 'ROI medio' },
      ],
    },
    contactBanner: {
      title: '¿Quieres ser el próximo caso de éxito?',
      text: 'Activa hoy mismo tu red comercial y empieza a ver resultados medibles en menos de 90 días.',
      ctaLabel: 'Solicitar auditoría de red',
    },
  },
  methodology: {
    hero: {
      label: '/ Metodología',
      title: 'Nuestra',
      titleHighlight: 'metodología',
      subtitle: 'Un sistema probado para transformar redes comerciales pasivas en canales de venta activos y escalables.',
    },
    intro: 'Un enfoque',
    introHighlight: 'sistemático',
    introSuffix: 'aplicado a un amplio abanico de posibilidades.',
    labels: {
      example: 'Ejemplo',
      visualization: 'Visualización',
    },
    phases: [
      {
        id: 1,
        title: 'Fase 1 – Diagnóstico estratégico',
        desc: 'En esta primera fase llevamos a cabo un análisis exhaustivo del ecosistema relacional actual, con el objetivo de comprender no solo quién forma parte de la red, sino cómo interactúa, qué valor aporta y qué potencial permanece sin activar.',
        longDesc:
          'Este diagnóstico combina una lectura estructural (mapa de contactos, tipologías, sectores) con una lectura dinámica (nivel de actividad, calidad de las relaciones, capacidad de generación de oportunidades). De este modo, identificamos tres grandes áreas:\n\n• Red activa: aquellos perfiles que ya están generando valor de forma tangible.\n• Red potencial: contactos existentes que aún no están activados, pero tienen capacidad de aportar.\n• Gaps de activación: espacios donde faltan perfiles clave o donde la relación no está bien estructurada.',
        items: [
          {
            name: 'Prescriptor',
            desc: 'Figura clave por su capacidad de influencia. No necesariamente ejecuta acciones directas, pero sí tiene un impacto relevante en la percepción y expansión del proyecto.',
            example:
              'Un directivo del sector que recomienda Redescomerciales.ai en una reunión con otros stakeholders, facilitando nuevas oportunidades de colaboración.',
          },
          {
            name: 'Colaborador',
            desc: 'Participa de forma más directa, contribuyendo a iniciativas concretas. Su implicación puede ser puntual o recurrente, pero siempre está vinculada a la ejecución.',
            example: 'Un experto que participa en el diseño o desarrollo de un proyecto específico.',
          },
          {
            name: 'Delegado territorial',
            desc: 'Rol más estratégico y territorial. Actúa como dinamizador de la red en un ámbito concreto (geográfico, sectorial o comunitario), siendo clave para escalar el modelo.',
            example:
              'Una persona responsable de activar la red Redescomerciales.ai en una ciudad, conectando actores locales y generando oportunidades.',
          },
          {
            name: 'Oficina de coordinación',
            desc: 'Núcleo de coordinación y soporte. Desde aquí se estructura la estrategia, se articulan las relaciones y se da coherencia al conjunto del sistema.',
            example: 'Coordinación de iniciativas entre distintos colaboradores para evitar duplicidades y maximizar impacto.',
          },
        ],
      },
      {
        id: 2,
        title: 'Fase 2 – Adaptación tecnológica',
        desc: 'Digitalizamos y estructuramos todo tu proceso de captación y validación con el objetivo de garantizar la calidad, trazabilidad y eficiencia en la incorporación de cada nuevo colaborador.',
        longDesc:
          'Implementamos una infraestructura tecnológica a medida que automatiza tanto el onboarding como la gestión operativa, reduciendo errores manuales y mejorando la experiencia del usuario.\n\nEsta solución incluye herramientas avanzadas como:\n\n• Cuestionarios de validación dinámicos e inteligentes, diseñados para filtrar perfiles de forma automatizada según criterios previamente definidos.\n• Dashboards de control en tiempo real, que permiten visualizar y analizar la actividad, el rendimiento y el progreso de cada colaborador.\n• Sistemas de simulación y modelado, que permiten prever escenarios, estados y flujos de trabajo antes de su implementación.\n\nEl resultado es un ecosistema digital sólido, escalable y preparado para crecer junto a tu red.',
        visualTitle: 'Este es un ejemplo de todas las funcionalidades y roles que podemos tener en nuestra plataforma:',
        videoSources: [
          { title: 'Vídeo de Administrador' },
          { title: 'Vídeo de Colaborador' },
          { title: 'Vídeo de Prescriptor' },
        ],
      },
      {
        id: 3,
        title: 'Fase 3 – Captación de Colaboradores',
        desc: 'Desarrollamos e implementamos estrategias de marketing altamente segmentadas con el objetivo de atraer perfiles cualificados y alineados con tu propuesta de valor.',
        longDesc:
          'Nos enfocamos en hacer crecer tu red de forma sostenible, priorizando la calidad de los colaboradores sobre la cantidad.\n\nPara ello:\n\n• Diseñamos campañas de captación personalizadas basadas en los perfiles definidos en la Fase 1, asegurando que el mensaje llegue al público adecuado.\n• Utilizamos creatividades de alto impacto visual y comunicativo, capaces de transmitir de forma clara y directa los beneficios y oportunidades que ofrece tu red.\n• Optimizamos continuamente los anuncios mediante análisis de rendimiento, ajustando segmentaciones, mensajes y formatos para maximizar la conversión.\n\nDe esta manera, no solo atraemos volumen, sino que construimos una base sólida de colaboradores comprometidos y alineados con tus objetivos.',
        visualTitle: 'Aquí podemos ver ejemplos de anuncios enfocados en la captación de nuevos colaboradores y nuevos clientes:',
        imagesCount: 2,
      },
      {
        id: 4,
        title: 'Fase 4 – Seguimiento y Optimización',
        desc: 'Implementamos un sistema de análisis continuo que nos permite medir de forma precisa la efectividad de la red y optimizar cada uno de sus procesos. Esta fase es clave para asegurar el crecimiento sostenido y la mejora constante del rendimiento.',
        longDesc:
          'A través de herramientas de analítica avanzada:\n\n• Monitorizamos en tiempo real el comportamiento de los colaboradores, identificando patrones, cuellos de botella y oportunidades de mejora.\n• Evaluamos el rendimiento de cada etapa del flujo de trabajo para detectar ineficiencias y aplicar ajustes estratégicos.\n• Tomamos decisiones basadas en datos reales, lo que nos permite adaptar rápidamente las estrategias ante cambios del entorno o del mercado.\n\nEste enfoque dinámico garantiza que tu red no solo funcione correctamente, sino que evolucione de forma continua, alcanzando niveles cada vez más altos de eficiencia y rentabilidad.',
        visualTitle:
          'Aquí podemos ver ejemplos de anuncios que realizaríamos para tener un seguimiento de nuestros clientes, respaldándolos y acompañándolos en todo el proceso:',
        imagesCount: 2,
      },
    ],
    contactBanner: {
      title: '¿Listo para activar tu red?',
      text: 'Nuestra metodología se adapta a las necesidades específicas de tu sector y tipo de producto.',
      ctaLabel: 'Solicitar auditoría de red',
    },
  },
  contact: {
    hero: {
      location: 'Barcelona',
      label: '/ Contacto',
      title: 'Hablemos de tu red comercial',
      subtitle:
        'Cuéntanos tu contexto y te responderemos en menos de 24 horas con una propuesta adaptada a tu empresa.',
    },
    paths: {
      sectionTitle: '¿Tienes alguna pregunta?',
      sectionSubtitle: 'Cada empresa llega con un reto distinto. Indica por dónde quieres empezar.',
      items: [
        {
          title: 'Quiero activar mi red comercial',
          description:
            'Para empresas B2B con contactos, prescriptores o colaboradores que aún no generan ventas recurrentes.',
          cta: 'Ver soluciones',
        },
        {
          title: 'Necesito escalar mi canal de partners',
          description:
            'Para equipos que ya tienen tracción y buscan metodología, tecnología y operación para crecer con control.',
          cta: 'Ver casos de éxito',
        },
      ],
    },
    info: {
      sectionTitle: 'Información de contacto',
      companyName: 'Redescomerciales.ai',
      locationLabel: 'Ubicación',
      addressLabel: 'Dirección',
      emailLabel: 'Correo electrónico',
      phoneLabel: 'Teléfono',
      hoursLabel: 'Horario de atención',
      mapTitle: 'Dónde estamos',
      whatsappLabel: 'WhatsApp',
      socialLabel: 'Redes sociales',
    },
    form: {
      sectionTitle: 'Envíanos un mensaje',
      sectionSubtitle: 'Completa el formulario y nuestro equipo se pondrá en contacto contigo.',
    },
    faq: {
      sectionTitle: 'Preguntas frecuentes',
    },
  },
};
