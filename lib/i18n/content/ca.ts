import type { PageContent } from '../types';

export const caContent: PageContent = {
  nav: {
    solutions: 'Solucions',
    methodology: 'Metodologia',
    successCases: 'Casos d\'èxit',
    contact: 'Contacte',
    platform: 'Plataforma',
    access: 'Accedir',
    menu: 'Menú',
    close: 'Tancar',
    openMenu: 'Obrir menú',
  },
  footer: {
    tagline: 'Transforma col·laboradors en una xarxa de vendes activa mitjançant tecnologia i gestió experta.',
    address: 'Avda Diagonal, 523, 1er 2. Barcelona',
    explore: 'Explorar',
    legal: 'Legal',
    legalNotice: 'Avís legal',
    cookies: 'Cookies',
    privacy: 'Privacitat',
    newsletter: 'Newsletter',
    newsletterLink: 'Accedir a la nostra newsletter',
  },
  solutions: {
    hero: {
      label: '/ Solucions',
      title: 'Ja tens els contactes.',
      titleHighlight: 'El que et falta és el sistema',
      titleSuffix: 'per convertir-los en vendes.',
      subtitle: 'Ajudem CEOs i Directors Comercials d\'empreses B2B a activar la seva xarxa infrautilitzada i escalar sense augmentar costos fixos.',
      ctaSuccessCases: 'Veure casos d\'èxit',
      ctaDiagnosis: 'Sol·licitar diagnòstic',
    },
    personas: {
      sectionTitle: 'Perfils que',
      sectionTitleHighlight: 'transformem',
      sectionSubtitle: 'Diferents realitats, un mateix objectiu: monetitzar el capital relacional.',
      labels: {
        company: 'Empresa:',
        responsibility: 'Responsabilitat:',
        keyMessage: 'Missatge clau',
        professionalContext: 'Context professional',
        situation: 'Situació:',
        maturity: 'Maduresa:',
        network: 'Xarxa:',
        problemsWeSolve: 'Problemes que resolem',
        essentialNeeds: 'Necessitats imprescindibles',
        buyingMotivations: 'Motivacions de compra',
        commonObjections: 'Objeccions habituals',
        solutionValues: 'Què valora en la solució',
        tech: 'Tecnològic:',
        strategic: 'Estratègic:',
        operational: 'Operatiu:',
      },
      items: [
        {
          id: 0,
          role: 'Director Comercial / CEO',
          segment: 'Empresa B2B Consolidada',
          company: 'Serveis Industrials / Consultoria',
          responsibility: 'Decisor final, visió i ROI',
          context: {
            situation: 'Creixement estancat amb facturació estable.',
            maturity: 'Mitjana. CRM usat només com base de dades.',
            network: "Extensa però contactes 'dormits'.",
          },
          pains: [
            'Eliminem la dependència de l\'equip comercial intern.',
            'Sistematitzem l\'activació de partners.',
            'Recuperem vendes perdides per falta de seguiment.',
          ],
          needs: 'Activar xarxa de contactes i generar canal addicional sense augmentar plantilla.',
          motivations: 'Escalabilitat sense incrementar costos fixos.',
          objections: 'Quant esforç real implica activar-ho?',
          values: {
            tech: 'Dashboard en temps real i traçabilitat.',
            strat: 'Metodologia provada d\'implementació.',
            ops: 'Rols definits i automatització.',
          },
          message: 'Ja tens els contactes. Et donem el sistema per convertir-los en vendes.',
        },
        {
          id: 1,
          role: 'Consultor Sènior Independent',
          segment: 'Consultor Sènior',
          company: 'Boutique d\'Estratègia',
          responsibility: 'Gestió de marca personal i cartera C-level',
          context: {
            situation: 'Treballa per projectes d\'alt valor.',
            maturity: 'Baixa en eines, Alta en relacions.',
            network: 'Coneix decisors clau del sector.',
          },
          pains: [
            'Estabilitzem ingressos trencant la barrera hores/home.',
            'Protegem la teva reputació amb execució impecable.',
            'Facilitem la monetització elegant de les teves introduccions.',
          ],
          needs: 'Monetitzar capital relacional de forma recurrent i segura.',
          motivations: 'Generar ingressos passius aprofitant la seva xarxa.',
          objections: 'Com garanteixo el tracte excelent al meu contacte?',
          values: {
            tech: 'Plataforma senzilla per registre i seguiment.',
            strat: 'Alineació amb el seu prestigi professional.',
            ops: 'Suport estratègic que validi candidats.',
          },
          message: 'Monetitza el teu capital relacional sense comprometre la teva marca personal.',
        },
        {
          id: 2,
          role: 'Fundador de Comunitat',
          segment: 'Emprenedor de Xarxes',
          company: 'Club de Negocis / Networking',
          responsibility: 'Creixement i valor per membres',
          context: {
            situation: 'Xarxa extensa difícil d\'escalar econòmicament.',
            maturity: 'Mitjana. Usa Discord/Slack però no vendes.',
            network: 'Molt activa. Perfils dinàmics.',
          },
          pains: [
            'Organitzem el caos en la gestió d\'oportunitats.',
            'Aportem traçabilitat total sobre el tancament de leads.',
            'Assegurem el cobrament de comissions de forma transparent.',
          ],
          needs: 'Convertir la capacitat de connectar persones en un model de negoci.',
          motivations: 'Escalar la seva comunitat a un hub de negoci real.',
          objections: 'Els meus membres se sentiran còmodes?',
          values: {
            tech: 'IA per assignar rols i optimitzar relacions.',
            strat: 'Model basat en l\'èxit de la xarxa.',
            ops: 'Facilitat d\'ús i onboarding ràpid.',
          },
          message: 'Transforma la teva capacitat de connectar persones en ingressos previsibles.',
        },
        {
          id: 3,
          role: 'Head of Partnerships',
          segment: 'Perfil Estratègic Tech/SaaS',
          company: 'Scale-up Tecnològica',
          responsibility: 'Expansió a través de canals indirects',
          context: {
            situation: 'Programa de partners manual i opac.',
            maturity: 'Alta. Tenen eines però canal opac.',
            network: 'Partners tecnològics i agències.',
          },
          pains: [
            'Aportem visibilitat total del pipeline indirect.',
            'Digitalitzem l\'onboarding eliminant fricció manual.',
            'Convertim el canal partner en font previsible.',
          ],
          needs: 'Automatitzar cicle de vida del partner i visibilitat pipeline.',
          motivations: 'Demostrar la predictibilitat del canal indirect.',
          objections: 'S\'integrarà amb el nostre CRM?',
          values: {
            tech: 'Integració via API i automatització.',
            strat: 'Escalabilitat territorial ràpida.',
            ops: 'Visibilitat en temps real per ambdues parts.',
          },
          message: 'Escala el teu programa de partners amb traçabilitat i zero fricció.',
        },
        {
          id: 4,
          role: 'Managing Partner',
          segment: 'Inversor / Business Angel',
          company: 'Venture Capital / Family Office',
          responsibility: 'Maximitzar el valor de participades',
          context: {
            situation: 'Portfolio amb creixement comercial desigual.',
            maturity: 'Alta. Orientat a mètriques i exit.',
            network: 'Inversors i directius C-level.',
          },
          pains: [
            'Accelerem el cicle de vendes de les participades.',
            'Creem sinergies comercials automàtiques en el portfolio.',
            'Optimitzem la gestió de contactes d\'alt nivell.',
          ],
          needs: 'Accelerar les vendes de participades usant xarxa compartida.',
          motivations: 'Augment de valoració del portfolio (ROI).',
          objections: 'És aplicable a sectors tan diferents?',
          values: {
            tech: 'Consolidació de dades comercials de l\'ecosistema.',
            strat: 'Estructura d\'incentius per al portfolio.',
            ops: 'Govern comercial centralitzat.',
          },
          message: 'Multiplica el valor del teu portfolio activant les seves sinergies comercials.',
        },
      ],
    },
    coreValues: [
      {
        title: 'Control Total',
        desc: 'Saber quines oportunitats existeixen, en quin estat estan i qui les gestiona en temps real.',
      },
      {
        title: 'Escalabilitat Real',
        desc: 'Créixer sense incrementar costos estructurals ni augmentar la plantilla interna.',
      },
      {
        title: 'Monetització d\'Actius',
        desc: "Convertir relacions passives i contactes 'dormits' en ingressos previsibles.",
      },
    ],
    painPoints: {
      sectionTitle: 'Et resulta',
      sectionTitleHighlight: 'familiar',
      sectionSubtitle: 'Identifiquem i resolem els colls de botella que frenen el teu creixement.',
      groups: [
        {
          title: 'Problemes Estratègics',
          items: [
            'Xarxa de contactes infrautilitzada (xarxa dormida)',
            'Falta d\'un sistema estructurat per activar partners',
            'Dependència excessiva de l\'equip intern per generar vendes',
          ],
        },
        {
          title: 'Problemes Operatius',
          items: [
            'Falta de visibilitat sobre oportunitats externes',
            'Sense traçabilitat ni control del pipeline indirect',
            'Coordinació ineficient de col·laboradors externs',
          ],
        },
        {
          title: 'Problemes de Creixement',
          items: [
            'Costos fixos disparats en intentar créixer',
            'Baixa escalabilitat del model comercial actual',
            'Pèrdua d\'oportunitats per falta de seguiment',
          ],
        },
      ],
    },
    benefits: {
      sectionTitle: 'Beneficis que impulsen la teva rendibilitat',
      categories: [
        {
          category: 'Estratègics',
          items: [
            'Escalat internacional mitjançant xarxes',
            'Creació d\'ecosistemes comercials propis',
            'Posicionament com hub de negoci',
          ],
        },
        {
          category: 'Tecnològics',
          items: [
            'IA que assigna rols i optimitza relacions',
            'Automatització de fluxos comercials complexos',
          ],
        },
      ],
      quote: 'Passar d\'una xarxa passiva a un canal actiu és la diferència entre tenir contactes i tenir vendes.',
      quoteAuthor: '— Directiu comercial B2B',
    },
    contactBanner: {
      title: 'Preparat per activar la teva xarxa comercial?',
      text: 'Converteix contactes dormits en un canal de vendes previsible i escalable.',
      ctaLabel: 'Sol·licitar diagnòstic gratuït',
    },
  },
  successCases: {
    hero: {
      label: '/ Casos d\'èxit',
      title: 'Projectes que',
      titleHighlight: 'transformen',
      subtitle: 'Resultats reals de la implementació del sistema Redescomerciales.ai en diferents ecosistemes comercials.',
    },
    labels: {
      challenge: 'Repte',
      solution: 'Solució',
      results: 'Resultats',
    },
    items: [
      {
        title: 'Consultoria Estratègica B2B',
        challenge: "Xarxa de 2.000 contactes 'dormida' i dependència total del CEO per captació.",
        solution: 'Activació del sistema de Xarxa Comercial Online i gestió automatitzada de referits.',
        results: [
          '+35% de Leads qualificat en el primer trimestre',
          'Obertura de 2 mercats internacionals sense delegacions físiques',
          'Retorn d\'inversió (ROI) del 400% en 6 mesos',
        ],
        tags: ['B2B', 'ROI 400%'],
      },
      {
        title: 'Software SaaS (Scale-up)',
        challenge: 'Programa de partners opac amb falta de predictibilitat en el pipeline.',
        solution: 'Digitalització de l\'onboarding i traçabilitat total d\'introduccions comercials.',
        results: [
          'Reducció del 50% en el temps de tancament de vendes indirectes',
          'Increment del 20% en el MRR provinent de canal',
          'Visibilitat 100% sobre les gestions de cada partner',
        ],
        tags: ['SaaS', 'Partners'],
      },
      {
        title: 'Fons d\'Inversió (Portfolio)',
        challenge: 'Nul·la sinergia comercial entre les 12 participades del fons.',
        solution: 'Creació d\'un HUB comercial compartit basat en la metodologia Redescomerciales.ai.',
        results: [
          '8 vendes creuades generades de forma orgànica en un any',
          'Reducció del cost d\'adquisició (CAC) en un 15%',
          'Acceleració del creixement en empreses estancades',
        ],
        tags: ['Portfolio', 'HUB'],
      },
    ],
    metrics: {
      sectionTitle: 'Mètriques que',
      sectionTitleHighlight: 'parlen',
      items: [
        { val: '+40%', label: 'Activació de partners' },
        { val: '+250', label: 'Leads generats' },
        { val: '400%', label: 'ROI mitjà' },
      ],
    },
    contactBanner: {
      title: 'Vols ser el proper cas d\'èxit?',
      text: 'Activa avui mateix la teva xarxa comercial i comença a veure resultats mesurables en menys de 90 dies.',
      ctaLabel: 'Sol·licitar auditoria de xarxa',
    },
  },
  methodology: {
    hero: {
      label: '/ Metodologia',
      title: 'La nostra',
      titleHighlight: 'metodologia',
      subtitle: 'Un sistema provat per transformar xarxes comercials passives en canals de venda actius i escalables.',
    },
    intro: 'Un enfocament',
    introHighlight: 'sistemàtic',
    introSuffix: 'aplicat a un ampli ventall de possibilitats.',
    labels: {
      example: 'Exemple',
      visualization: 'Visualització',
    },
    phases: [
      {
        id: 1,
        title: 'Fase 1 – Diagnòstic estratègic',
        desc: 'En aquesta primera fase duem a terme una anàlisi exhaustiva de l\'ecosistema relacional actual, amb l\'objectiu de comprendre no només qui forma part de la xarxa, sinó com interactua, quin valor aporta i quin potencial roman sense activar.',
        longDesc:
          'Aquest diagnòstic combina una lectura estructural (mapa de contactes, tipologies, sectors) amb una lectura dinàmica (nivell d\'activitat, qualitat de les relacions, capacitat de generació d\'oportunitats). D\'aquesta manera, identifiquem tres grans àrees:\n\n• Xarxa activa: aquells perfils que ja estan generant valor de forma tangible.\n• Xarxa potencial: contactes existents que encara no estan activats, però tenen capacitat d\'aportar.\n• Gaps d\'activació: espais on falten perfils clau o on la relació no està ben estructurada.',
        items: [
          {
            name: 'Prescriptor',
            desc: 'Figura clau per la seva capacitat d\'influència. No necessàriament executa accions directes, però sí que té un impacte rellevant en la percepció i expansió del projecte.',
            example:
              'Un directiu del sector que recomana Redescomerciales.ai en una reunió amb altres stakeholders, facilitant noves oportunitats de col·laboració.',
          },
          {
            name: 'Col·laborador',
            desc: 'Participa de forma més directa, contribuint a iniciatives concretes. La seva implicació pot ser puntual o recurrent, però sempre està vinculada a l\'execució.',
            example: 'Un expert que participa en el disseny o desenvolupament d\'un projecte específic.',
          },
          {
            name: 'Delegat territorial',
            desc: 'Rol més estratègic i territorial. Actua com dinamitzador de la xarxa en un àmbit concret (geogràfic, sectorial o comunitari), sent clau per escalar el model.',
            example:
              'Una persona responsable d\'activar la xarxa Redescomerciales.ai en una ciutat, connectant actors locals i generant oportunitats.',
          },
          {
            name: 'Oficina de coordinació',
            desc: 'Nucli de coordinació i suport. Des d\'aquí s\'estructura l\'estratègia, s\'articulen les relacions i es dóna coherència al conjunt del sistema.',
            example: 'Coordinació d\'iniciatives entre diferents col·laboradors per evitar duplicitats i maximitzar impacte.',
          },
        ],
      },
      {
        id: 2,
        title: 'Fase 2 – Adaptació tecnològica',
        desc: 'Digitalitzem i estructurem tot el teu procés de captació i validació amb l\'objectiu de garantir la qualitat, traçabilitat i eficiència en la incorporació de cada nou col·laborador.',
        longDesc:
          'Implementem una infraestructura tecnològica a mida que automatitza tant l\'onboarding com la gestió operativa, reduint errors manuals i millorant l\'experiència de l\'usuari.\n\nAquesta solució inclou eines avançades com:\n\n• Qüestionaris de validació dinàmics i intel·ligents, dissenyats per filtrar perfils de forma automatitzada segons criteris prèviament definits.\n• Dashboards de control en temps real, que permeten visualitzar i analitzar l\'activitat, el rendiment i el progrés de cada col·laborador.\n• Sistemes de simulació i modelatge, que permeten preveure escenaris, estats i fluxos de treball abans de la seva implementació.\n\nEl resultat és un ecosistema digital sòlid, escalable i preparat per créixer juntament amb la teva xarxa.',
        visualTitle: 'Aquest és un exemple de totes les funcionalitats i rols que podem tenir en la nostra plataforma:',
        videoSources: [
          { title: 'Vídeo d\'Administrador' },
          { title: 'Vídeo de Col·laborador' },
          { title: 'Vídeo de Prescriptor' },
        ],
      },
      {
        id: 3,
        title: 'Fase 3 – Captació de Col·laboradors',
        desc: 'Desenvolupem i implementem estratègies de màrqueting altament segmentades amb l\'objectiu d\'atreure perfils qualificats i alineats amb la teva proposta de valor.',
        longDesc:
          'Ens enfoquem en fer créixer la teva xarxa de forma sostenible, prioritzant la qualitat dels col·laboradors sobre la quantitat.\n\nPer això:\n\n• Dissenyem campanyes de captació personalitzades basades en els perfils definits a la Fase 1, assegurant que el missatge arribi al públic adequat.\n• Utilitzem creativitats d\'alt impacte visual i comunicatiu, capaces de transmetre de forma clara i directa els beneficis i oportunitats que ofereix la teva xarxa.\n• Optimitzem contínuament els anuncis mitjançant anàlisi de rendiment, ajustant segmentacions, missatges i formats per maximitzar la conversió.\n\nD\'aquesta manera, no només atreiem volum, sinó que construïm una base sòlida de col·laboradors compromesos i alineats amb els teus objectius.',
        visualTitle: 'Aquí podem veure exemples d\'anuncis enfocats en la captació de nous col·laboradors i nous clients:',
        imagesCount: 2,
      },
      {
        id: 4,
        title: 'Fase 4 – Seguiment i Optimització',
        desc: 'Implementem un sistema d\'anàlisi continu que ens permet mesurar de forma precisa l\'efectivitat de la xarxa i optimitzar cadascun dels seus processos. Aquesta fase és clau per assegurar el creixement sostingut i la millora constant del rendiment.',
        longDesc:
          'A través d\'eines d\'analítica avançada:\n\n• Monitoritzem en temps real el comportament dels col·laboradors, identificant patrons, colls de botella i oportunitats de millora.\n• Avaluem el rendiment de cada etapa del flux de treball per detectar ineficiències i aplicar ajustos estratègics.\n• Prendem decisions basades en dades reals, el que ens permet adaptar ràpidament les estratègies davant canvis de l\'entorn o del mercat.\n\nAquest enfocament dinàmic garanteix que la teva xarxa no només funcioni correctament, sinó que evolucioni de forma contínua, assolint nivells cada vegada més alts d\'eficiència i rendibilitat.',
        visualTitle:
          'Aquí podem veure exemples d\'anuncis que realitzaríem per tenir un seguiment dels nostres clients, recolzant-los i acompanyant-los en tot el procés:',
        imagesCount: 2,
      },
    ],
    contactBanner: {
      title: 'Preparat per activar la teva xarxa?',
      text: 'La nostra metodologia s\'adapta a les necessitats específiques del teu sector i tipus de producte.',
      ctaLabel: 'Sol·licitar auditoria de xarxa',
    },
  },
  contact: {
    hero: {
      location: 'Barcelona',
      label: '/ Contacte',
      title: 'Parlem de la teva xarxa comercial',
      subtitle:
        'Explica\'ns el teu context i et respondrem en menys de 24 hores amb una proposta adaptada a la teva empresa.',
    },
    paths: {
      sectionTitle: 'Tens alguna pregunta?',
      sectionSubtitle: 'Cada empresa arriba amb un repte diferent. Indica per on vols començar.',
      items: [
        {
          title: 'Vull activar la meva xarxa comercial',
          description:
            'Per empreses B2B amb contactes, prescriptors o col·laboradors que encara no generen vendes recurrents.',
          cta: 'Veure solucions',
        },
        {
          title: 'Necessito escalar el meu canal de partners',
          description:
            'Per equips que ja tenen tracció i busquen metodologia, tecnologia i operació per créixer amb control.',
          cta: 'Veure casos d\'èxit',
        },
      ],
    },
    info: {
      sectionTitle: 'Informació de contacte',
      companyName: 'Redescomerciales.ai',
      locationLabel: 'Ubicació',
      addressLabel: 'Adreça',
      emailLabel: 'Correu electrònic',
      phoneLabel: 'Telèfon',
      hoursLabel: 'Horari d\'atenció',
      mapTitle: 'On som',
      whatsappLabel: 'WhatsApp',
      socialLabel: 'Xarxes socials',
    },
    form: {
      sectionTitle: 'Envia\'ns un missatge',
      sectionSubtitle: 'Completa el formulari i el nostre equip es posarà en contacte amb tu.',
    },
    faq: {
      sectionTitle: 'Preguntes freqüents',
    },
  },
};
