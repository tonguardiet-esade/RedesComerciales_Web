export type AppLanguage = 'es' | 'en' | 'ca';

export interface Persona {
  id: number;
  role: string;
  segment: string;
  company: string;
  responsibility: string;
  context: {
    situation: string;
    maturity: string;
    network: string;
  };
  pains: string[];
  needs: string;
  motivations: string;
  objections: string;
  values: {
    tech: string;
    strat: string;
    ops: string;
  };
  message: string;
}

export interface SuccessCase {
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
}

export interface MethodologyRoleItem {
  name: string;
  desc: string;
  example?: string;
}

export interface MethodologyPhase {
  id: number;
  title: string;
  desc: string;
  longDesc: string;
  visualTitle?: string;
  videoSources?: { title: string }[];
  items?: MethodologyRoleItem[];
  imagesCount?: number;
}

export interface ContactBannerContent {
  title: string;
  text: string;
  ctaLabel: string;
}

export interface HeroContent {
  label: string;
  title: string;
  titleHighlight: string;
  titleSuffix?: string;
  subtitle: string;
}

export interface ContactPathCard {
  title: string;
  description: string;
  cta: string;
}

export interface ContactPageContent {
  hero: {
    location: string;
    label: string;
    title: string;
    subtitle: string;
  };
  paths: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: ContactPathCard[];
  };
  info: {
    sectionTitle: string;
    companyName: string;
    locationLabel: string;
    addressLabel: string;
    emailLabel: string;
    phoneLabel: string;
    hoursLabel: string;
    mapTitle: string;
    whatsappLabel: string;
    socialLabel: string;
  };
  form: {
    sectionTitle: string;
    sectionSubtitle: string;
  };
  faq: {
    sectionTitle: string;
  };
}

export interface PageContent {
  nav: {
    solutions: string;
    methodology: string;
    successCases: string;
    contact: string;
    platform: string;
    access: string;
    menu: string;
    close: string;
    openMenu: string;
  };
  footer: {
    tagline: string;
    address: string;
    explore: string;
    legal: string;
    legalNotice: string;
    cookies: string;
    privacy: string;
    newsletter: string;
    newsletterLink: string;
  };
  solutions: {
    hero: HeroContent & {
      ctaSuccessCases: string;
      ctaDiagnosis: string;
    };
    personas: {
      sectionTitle: string;
      sectionTitleHighlight: string;
      sectionSubtitle: string;
      labels: {
        company: string;
        responsibility: string;
        keyMessage: string;
        professionalContext: string;
        situation: string;
        maturity: string;
        network: string;
        problemsWeSolve: string;
        essentialNeeds: string;
        buyingMotivations: string;
        commonObjections: string;
        solutionValues: string;
        tech: string;
        strategic: string;
        operational: string;
      };
      items: Persona[];
    };
    coreValues: Array<{ title: string; desc: string }>;
    painPoints: {
      sectionTitle: string;
      sectionTitleHighlight: string;
      sectionSubtitle: string;
      groups: Array<{ title: string; items: string[] }>;
    };
    benefits: {
      sectionTitle: string;
      categories: Array<{ category: string; items: string[] }>;
      quote: string;
      quoteAuthor: string;
    };
    contactBanner: ContactBannerContent;
  };
  successCases: {
    hero: HeroContent;
    labels: {
      challenge: string;
      solution: string;
      results: string;
    };
    items: SuccessCase[];
    metrics: {
      sectionTitle: string;
      sectionTitleHighlight: string;
      items: Array<{ val: string; label: string }>;
    };
    contactBanner: ContactBannerContent;
  };
  methodology: {
    hero: HeroContent;
    intro: string;
    introHighlight: string;
    introSuffix: string;
    labels: {
      example: string;
      visualization: string;
    };
    phases: MethodologyPhase[];
    contactBanner: ContactBannerContent;
  };
  contact: ContactPageContent;
}
