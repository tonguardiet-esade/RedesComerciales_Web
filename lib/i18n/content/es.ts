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
    tagline: 'Activa, sigue y escala tu red comercial indirecta con metodología, tecnología y operación experta.',
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
      titleSuffix: 'para convertirlos en oportunidades comerciales.',
      subtitle: 'Ayudamos a CEOs y Directores Comerciales de empresas B2B a activar su red infrautilizada y escalar sin aumentar costes fijos.',
      ctaSuccessCases: 'Ver casos de éxito',
      ctaDiagnosis: 'Solicitar diagnóstico de red comercial',
    },
    personas: {
      sectionTitle: 'Perfiles con los que',
      sectionTitleHighlight: 'trabajamos',
      sectionSubtitle: 'Misma necesidad: activar la red y convertir relaciones en oportunidades con seguimiento.',
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
            'Red extensa con contactos dormidos.',
            'Partners sin activación sistemática.',
            'Oportunidades que se pierden por falta de seguimiento.',
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
            'Falta de seguimiento estructurado sobre las oportunidades de la red.',
            'Aseguramos el cobro de comisiones de forma transparente.',
          ],
          needs: 'Convertir la capacidad de conectar personas en un modelo de negocio.',
          motivations: 'Escalar su comunidad a un hub de negocio real.',
          objections: '¿Mis miembros se sentirán cómodos?',
          values: {
            tech: 'Seguimiento estructurado de oportunidades dentro de la red.',
            strat: 'Modelo basado en el éxito de la red.',
            ops: 'Facilidad de uso y onboarding rápido.',
          },
          message: 'Organiza las oportunidades de tu comunidad con activación y seguimiento sistemático.',
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
            'Poco control sobre el pipeline indirecto del canal partner.',
            'Onboarding manual y procesos poco homogéneos.',
            'Dificultad para demostrar la tracción del canal indirecto.',
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
        title: 'Visibilidad del canal indirecto',
        desc: 'Saber qué ocurre en la red, en qué estado están las oportunidades y quién las gestiona.',
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
      sectionSubtitle:
        'Si reconoces alguno de estos problemas, el siguiente paso es estructurar activación, seguimiento y visibilidad de tu red.',
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
            'Seguimiento sistemático de partners y colaboradores',
            'Procesos homogéneos de activación y reporte de oportunidades',
          ],
        },
      ],
      quote: 'Pasar de una red pasiva a un canal activo es la diferencia entre tener contactos y tener ventas.',
      quoteAuthor: '— Directivo comercial B2B',
    },
    contactBanner: {
      title: '¿Listo para activar tu red comercial?',
      text: 'Convierte contactos dormidos en un canal con activación, visibilidad y seguimiento sistemático.',
      ctaLabel: 'Solicitar diagnóstico de red comercial',
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
          'Más leads cualificados desde la red en el primer trimestre',
          'Apertura de nuevos mercados internacionales sin delegaciones físicas',
          'Retorno positivo de la inversión en canal indirecto',
        ],
        tags: ['B2B', 'Canal indirecto'],
      },
      {
        title: 'Software SaaS (Scale-up)',
        challenge: 'Programa de partners opaco con falta de predictibilidad en el pipeline.',
        solution: 'Digitalización del onboarding y seguimiento estructurado de introducciones comerciales.',
        results: [
          'Reducción notable del tiempo de cierre de ventas indirectas',
          'Mayor contribución del canal al ingreso recurrente',
          'Visibilidad sobre las gestiones de cada partner',
        ],
        tags: ['SaaS', 'Partners'],
      },
      {
        title: 'Fondo de Inversión (Portfolio)',
        challenge: 'Nula sinergia comercial entre las 12 participadas del fondo.',
        solution: 'Creación de un HUB comercial compartido basado en la metodología Redescomerciales.ai.',
        results: [
          'Ventas cruzadas generadas de forma orgánica entre participadas',
          'Reducción del coste de adquisición en el canal indirecto',
          'Aceleración del crecimiento en empresas estancadas',
        ],
        tags: ['Portfolio', 'HUB'],
      },
    ],
    metrics: {
      sectionTitle: 'Métricas que',
      sectionTitleHighlight: 'hablan',
      items: [
        { val: 'Activación', label: 'Sistemática de partners y colaboradores' },
        { val: 'Visibilidad', label: 'Del pipeline indirecto' },
        { val: 'Oportunidades', label: 'Generadas desde la red comercial' },
      ],
    },
    contactBanner: {
      title: '¿Quieres ser el próximo caso de éxito?',
      text: 'Activa tu red comercial indirecta y empieza a ver indicadores tempranos de activación.',
      ctaLabel: 'Solicitar diagnóstico de red comercial',
    },
  },
  methodology: {
    hero: {
      label: '/ Metodología',
      title: 'Nuestra',
      titleHighlight: 'metodología',
      subtitle: 'Cuatro fases para activar redes comerciales pasivas y convertirlas en canales con seguimiento y visibilidad.',
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
          'A través de herramientas de analítica avanzada:\n\n• Monitorizamos en tiempo real el comportamiento de los colaboradores, identificando patrones, cuellos de botella y oportunidades de mejora.\n• Evaluamos el rendimiento de cada etapa del flujo de trabajo para detectar ineficiencias y aplicar ajustes estratégicos.\n• Tomamos decisiones basadas en datos reales, lo que nos permite adaptar rápidamente las estrategias ante cambios del entorno o del mercado.\n\nEste enfoque permite revisar qué funciona en la red, ajustar la ejecución y mejorar el seguimiento del canal indirecto.',
        visualTitle:
          'Aquí podemos ver ejemplos de anuncios que realizaríamos para tener un seguimiento de nuestros clientes, respaldándolos y acompañándolos en todo el proceso:',
        imagesCount: 2,
      },
    ],
    contactBanner: {
      title: '¿Listo para activar tu red?',
      text: 'Nuestra metodología se adapta a las necesidades específicas de tu sector y tipo de producto.',
      ctaLabel: 'Solicitar diagnóstico de red comercial',
    },
  },
  contact: {
    hero: {
      location: 'Barcelona',
      label: '/ Contacto',
      title: 'Hablemos de tu red comercial',
      subtitle:
        'Cuéntanos tu contexto. Te contactamos en menos de 24 horas laborables para entender tu red y valorar un diagnóstico inicial.',
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
      phoneLabel: 'Teléfono / WhatsApp',
      hoursLabel: 'Horario de atención',
      mapTitle: 'Dónde estamos',
      whatsappLabel: 'WhatsApp',
      socialLabel: 'Redes sociales',
    },
    form: {
      sectionTitle: 'Envíanos un mensaje',
      sectionSubtitle:
        'Describe tu situación con partners o colaboradores. Te responderemos para entender tu contexto y valorar un diagnóstico inicial sin compromiso.',
    },
    faq: {
      sectionTitle: 'Preguntas frecuentes',
    },
  },
};
