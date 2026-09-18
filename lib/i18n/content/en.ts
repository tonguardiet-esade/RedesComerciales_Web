import type { PageContent } from '../types';

export const enContent: PageContent = {
  nav: {
    solutions: 'Solutions',
    methodology: 'Methodology',
    successCases: 'Success Stories',
    contact: 'Contact',
    platform: 'Platform',
    access: 'Log in',
    menu: 'Menu',
    close: 'Close',
    openMenu: 'Open menu',
  },
  footer: {
    tagline: 'Activate, follow and scale your indirect commercial network with methodology, technology and expert operations.',
    address: 'Avda Diagonal, 523, 1st 2. Barcelona',
    explore: 'Explore',
    legal: 'Legal',
    legalNotice: 'Legal notice',
    cookies: 'Cookies',
    privacy: 'Privacy',
    newsletter: 'Newsletter',
    newsletterLink: 'Access our newsletter',
  },
  solutions: {
    hero: {
      label: '/ Solutions',
      title: 'You already have the contacts.',
      titleHighlight: 'What you lack is the system',
      titleSuffix: 'to turn them into business opportunities.',
      subtitle: 'We help B2B CEOs and Sales Directors activate their underutilized network and scale without increasing fixed costs.',
      ctaSuccessCases: 'View success stories',
      ctaDiagnosis: 'Request commercial network diagnosis',
    },
    personas: {
      sectionTitle: 'Profiles we',
      sectionTitleHighlight: 'work with',
      sectionSubtitle: 'Same need: activate the network and turn relationships into opportunities with follow-up.',
      labels: {
        company: 'Company:',
        responsibility: 'Responsibility:',
        keyMessage: 'Key message',
        professionalContext: 'Professional context',
        situation: 'Situation:',
        maturity: 'Maturity:',
        network: 'Network:',
        problemsWeSolve: 'Problems we solve',
        essentialNeeds: 'Essential needs',
        buyingMotivations: 'Buying motivations',
        commonObjections: 'Common objections',
        solutionValues: 'What they value in the solution',
        tech: 'Technology:',
        strategic: 'Strategic:',
        operational: 'Operational:',
      },
      items: [
        {
          id: 0,
          role: 'Sales Director / CEO',
          segment: 'Established B2B Company',
          company: 'Industrial Services / Consulting',
          responsibility: 'Final decision-maker, vision and ROI',
          context: {
            situation: 'Stagnant growth with stable revenue.',
            maturity: 'Medium. CRM used only as a database.',
            network: "Extensive but with 'dormant' contacts.",
          },
          pains: [
            'Extensive network with dormant contacts.',
            'Partners without systematic activation.',
            'Opportunities lost due to lack of follow-up.',
          ],
          needs: 'Activate contact network and generate an additional channel without increasing headcount.',
          motivations: 'Scalability without increasing fixed costs.',
          objections: 'How much real effort does it take to activate it?',
          values: {
            tech: 'Real-time dashboard and traceability.',
            strat: 'Proven implementation methodology.',
            ops: 'Defined roles and automation.',
          },
          message: 'You already have the contacts. We give you the system to turn them into sales.',
        },
        {
          id: 1,
          role: 'Independent Senior Consultant',
          segment: 'Senior Consultant',
          company: 'Strategy Boutique',
          responsibility: 'Personal brand management and C-level portfolio',
          context: {
            situation: 'Works on high-value projects.',
            maturity: 'Low in tools, high in relationships.',
            network: 'Knows key decision-makers in the sector.',
          },
          pains: [
            'We stabilize income by breaking the hours/man barrier.',
            'We protect your reputation with flawless execution.',
            'We facilitate elegant monetization of your introductions.',
          ],
          needs: 'Monetize relational capital in a recurring and secure way.',
          motivations: 'Generate passive income leveraging their network.',
          objections: 'How do I guarantee excellent treatment for my contact?',
          values: {
            tech: 'Simple platform for registration and tracking.',
            strat: 'Alignment with their professional prestige.',
            ops: 'Strategic support that validates candidates.',
          },
          message: 'Monetize your relational capital without compromising your personal brand.',
        },
        {
          id: 2,
          role: 'Community Founder',
          segment: 'Network Entrepreneur',
          company: 'Business Club / Networking',
          responsibility: 'Growth and value for members',
          context: {
            situation: 'Extensive network difficult to scale economically.',
            maturity: 'Medium. Uses Discord/Slack but not for sales.',
            network: 'Very active. Dynamic profiles.',
          },
          pains: [
            'We organize chaos in opportunity management.',
            'Lack of structured follow-up on network opportunities.',
            'We ensure transparent commission collection.',
          ],
          needs: 'Turn the ability to connect people into a business model.',
          motivations: 'Scale their community into a real business hub.',
          objections: 'Will my members feel comfortable?',
          values: {
            tech: 'Structured tracking of opportunities within the network.',
            strat: 'Model based on network success.',
            ops: 'Ease of use and fast onboarding.',
          },
          message: 'Organise your community opportunities with systematic activation and follow-up.',
        },
        {
          id: 3,
          role: 'Head of Partnerships',
          segment: 'Strategic Tech/SaaS Profile',
          company: 'Tech Scale-up',
          responsibility: 'Expansion through indirect channels',
          context: {
            situation: 'Manual and opaque partner program.',
            maturity: 'High. They have tools but an opaque channel.',
            network: 'Technology partners and agencies.',
          },
          pains: [
            'Little control over the partner channel indirect pipeline.',
            'Manual onboarding and inconsistent processes.',
            'Difficulty demonstrating indirect channel traction.',
          ],
          needs: 'Automate partner lifecycle and pipeline visibility.',
          motivations: 'Demonstrate predictability of the indirect channel.',
          objections: 'Will it integrate with our CRM?',
          values: {
            tech: 'API integration and automation.',
            strat: 'Rapid territorial scalability.',
            ops: 'Real-time visibility for both parties.',
          },
          message: 'Scale your partner program with traceability and zero friction.',
        },
        {
          id: 4,
          role: 'Managing Partner',
          segment: 'Investor / Business Angel',
          company: 'Venture Capital / Family Office',
          responsibility: 'Maximize portfolio company value',
          context: {
            situation: 'Portfolio with uneven commercial growth.',
            maturity: 'High. Metrics and exit oriented.',
            network: 'Investors and C-level executives.',
          },
          pains: [
            'We accelerate the sales cycle of portfolio companies.',
            'We create automatic commercial synergies across the portfolio.',
            'We optimize high-level contact management.',
          ],
          needs: 'Accelerate portfolio company sales using a shared network.',
          motivations: 'Increase portfolio valuation (ROI).',
          objections: 'Is it applicable to such different sectors?',
          values: {
            tech: 'Consolidation of ecosystem commercial data.',
            strat: 'Incentive structure for the portfolio.',
            ops: 'Centralized commercial governance.',
          },
          message: 'Multiply your portfolio value by activating its commercial synergies.',
        },
      ],
    },
    coreValues: [
      {
        title: 'Indirect channel visibility',
        desc: 'Know what is happening in the network, the status of opportunities, and who manages them.',
      },
      {
        title: 'Real Scalability',
        desc: 'Grow without increasing structural costs or expanding internal headcount.',
      },
      {
        title: 'Asset Monetization',
        desc: "Turn passive relationships and 'dormant' contacts into predictable revenue.",
      },
    ],
    painPoints: {
      sectionTitle: 'Does this sound',
      sectionTitleHighlight: 'familiar',
      sectionSubtitle:
        'If you recognise any of these problems, the next step is to structure activation, follow-up and visibility for your network.',
      groups: [
        {
          title: 'Strategic Problems',
          items: [
            'Underutilized contact network (dormant network)',
            'Lack of a structured system to activate partners',
            'Excessive dependence on internal team to generate sales',
          ],
        },
        {
          title: 'Operational Problems',
          items: [
            'Lack of visibility on external opportunities',
            'No traceability or control of the indirect pipeline',
            'Inefficient coordination of external collaborators',
          ],
        },
        {
          title: 'Growth Problems',
          items: [
            'Fixed costs skyrocketing when trying to grow',
            'Low scalability of the current commercial model',
            'Lost opportunities due to lack of follow-up',
          ],
        },
      ],
    },
    benefits: {
      sectionTitle: 'Benefits that drive your profitability',
      categories: [
        {
          category: 'Strategic',
          items: [
            'International scaling through networks',
            'Creation of proprietary commercial ecosystems',
            'Positioning as a business hub',
          ],
        },
        {
          category: 'Technological',
          items: [
            'Systematic follow-up of partners and collaborators',
            'Consistent activation and opportunity reporting processes',
          ],
        },
      ],
      quote: 'Moving from a passive network to an active channel is the difference between having contacts and having sales.',
      quoteAuthor: '— B2B Sales Executive',
    },
    contactBanner: {
      title: 'Ready to activate your commercial network?',
      text: 'Turn dormant contacts into a channel with activation, visibility and systematic follow-up.',
      ctaLabel: 'Request commercial network diagnosis',
    },
  },
  successCases: {
    hero: {
      label: '/ Success Stories',
      title: 'Projects that',
      titleHighlight: 'transform',
      subtitle: 'Real results from implementing the Redescomerciales.ai system across different commercial ecosystems.',
    },
    labels: {
      challenge: 'Challenge',
      solution: 'Solution',
      results: 'Results',
    },
    items: [
      {
        title: 'Strategic B2B Consulting',
        challenge: "Network of 2,000 'dormant' contacts and total dependence on the CEO for lead generation.",
        solution: 'Activation of the Online Commercial Network system and automated referral management.',
        results: [
          'More qualified leads from the network in the first quarter',
          'Entry into new international markets without physical offices',
          'Positive return on investment in the indirect channel',
        ],
        tags: ['B2B', 'Indirect channel'],
      },
      {
        title: 'SaaS Software (Scale-up)',
        challenge: 'Opaque partner program with lack of pipeline predictability.',
        solution: 'Digitized onboarding and structured tracking of commercial introductions.',
        results: [
          'Notable reduction in indirect sales closing time',
          'Greater channel contribution to recurring revenue',
          'Visibility over each partner\'s activities',
        ],
        tags: ['SaaS', 'Partners'],
      },
      {
        title: 'Investment Fund (Portfolio)',
        challenge: 'No commercial synergy among the fund\'s 12 portfolio companies.',
        solution: 'Creation of a shared commercial HUB based on the Redescomerciales.ai methodology.',
        results: [
          'Cross-sales generated organically among portfolio companies',
          'Reduction in acquisition cost in the indirect channel',
          'Accelerated growth in stagnant companies',
        ],
        tags: ['Portfolio', 'HUB'],
      },
    ],
    metrics: {
      sectionTitle: 'Metrics that',
      sectionTitleHighlight: 'speak',
      items: [
        { val: 'Activation', label: 'Systematic for partners and collaborators' },
        { val: 'Visibility', label: 'Of the indirect pipeline' },
        { val: 'Opportunities', label: 'Generated from the commercial network' },
      ],
    },
    contactBanner: {
      title: 'Want to be the next success story?',
      text: 'Activate your indirect commercial network and start seeing early activation indicators.',
      ctaLabel: 'Request commercial network diagnosis',
    },
  },
  methodology: {
    hero: {
      label: '/ Methodology',
      title: 'Our',
      titleHighlight: 'methodology',
      subtitle: 'Four phases to activate passive commercial networks and turn them into channels with follow-up and visibility.',
    },
    intro: 'A',
    introHighlight: 'systematic',
    introSuffix: 'approach applied to a wide range of possibilities.',
    labels: {
      example: 'Example',
      visualization: 'Visualization',
    },
    phases: [
      {
        id: 1,
        title: 'Phase 1 – Strategic Diagnosis',
        desc: 'In this first phase, we conduct a comprehensive analysis of the current relational ecosystem, aiming to understand not only who is part of the network, but how they interact, what value they bring, and what potential remains unactivated.',
        longDesc:
          'This diagnosis combines a structural reading (contact map, typologies, sectors) with a dynamic reading (activity level, relationship quality, opportunity generation capacity). In this way, we identify three major areas:\n\n• Active network: profiles already generating tangible value.\n• Potential network: existing contacts not yet activated but capable of contributing.\n• Activation gaps: areas where key profiles are missing or relationships are poorly structured.',
        items: [
          {
            name: 'Prescriber',
            desc: 'A key figure due to their influence. They do not necessarily execute direct actions, but have a relevant impact on perception and project expansion.',
            example:
              'An industry executive who recommends Redescomerciales.ai in a meeting with other stakeholders, facilitating new collaboration opportunities.',
          },
          {
            name: 'Collaborator',
            desc: 'Participates more directly, contributing to specific initiatives. Their involvement may be occasional or recurring, but always linked to execution.',
            example: 'An expert who participates in the design or development of a specific project.',
          },
          {
            name: 'Territorial Delegate',
            desc: 'A more strategic and territorial role. Acts as a network catalyst in a specific area (geographic, sectoral, or community), key to scaling the model.',
            example:
              'A person responsible for activating the Redescomerciales.ai network in a city, connecting local actors and generating opportunities.',
          },
          {
            name: 'Coordination Office',
            desc: 'Coordination and support hub. From here, strategy is structured, relationships are articulated, and coherence is given to the entire system.',
            example: 'Coordination of initiatives among different collaborators to avoid duplication and maximize impact.',
          },
        ],
      },
      {
        id: 2,
        title: 'Phase 2 – Technological Adaptation',
        desc: 'We digitize and structure your entire acquisition and validation process to ensure quality, traceability, and efficiency in onboarding each new collaborator.',
        longDesc:
          'We implement a tailored technological infrastructure that automates both onboarding and operational management, reducing manual errors and improving user experience.\n\nThis solution includes advanced tools such as:\n\n• Dynamic and intelligent validation questionnaires, designed to filter profiles automatically based on predefined criteria.\n• Real-time control dashboards that visualize and analyze activity, performance, and progress of each collaborator.\n• Simulation and modeling systems that forecast scenarios, states, and workflows before implementation.\n\nThe result is a solid, scalable digital ecosystem ready to grow alongside your network.',
        visualTitle: 'This is an example of all the functionalities and roles we can have on our platform:',
        videoSources: [
          { title: 'Administrator Video' },
          { title: 'Collaborator Video' },
          { title: 'Prescriber Video' },
        ],
      },
      {
        id: 3,
        title: 'Phase 3 – Collaborator Recruitment',
        desc: 'We develop and implement highly segmented marketing strategies to attract qualified profiles aligned with your value proposition.',
        longDesc:
          'We focus on growing your network sustainably, prioritizing collaborator quality over quantity.\n\nTo achieve this:\n\n• We design personalized recruitment campaigns based on profiles defined in Phase 1, ensuring the message reaches the right audience.\n• We use high-impact visual and communicative creatives that clearly convey the benefits and opportunities your network offers.\n• We continuously optimize ads through performance analysis, adjusting targeting, messages, and formats to maximize conversion.\n\nThis way, we not only attract volume but build a solid base of committed collaborators aligned with your goals.',
        visualTitle: 'Here we can see examples of ads focused on recruiting new collaborators and new clients:',
        imagesCount: 2,
      },
      {
        id: 4,
        title: 'Phase 4 – Monitoring and Optimization',
        desc: 'We implement a continuous analysis system that allows us to precisely measure network effectiveness and optimize each of its processes. This phase is key to ensuring sustained growth and constant performance improvement.',
        longDesc:
          'Through advanced analytics tools:\n\n• We monitor collaborator behavior in real time, identifying patterns, bottlenecks, and improvement opportunities.\n• We evaluate performance at each workflow stage to detect inefficiencies and apply strategic adjustments.\n• We make decisions based on real data, allowing us to quickly adapt strategies to environmental or market changes.\n\nThis approach lets you review what works in the network, adjust execution, and improve follow-up of the indirect channel.',
        visualTitle:
          'Here we can see examples of ads we would run to track our clients, supporting and accompanying them throughout the process:',
        imagesCount: 2,
      },
    ],
    contactBanner: {
      title: 'Ready to activate your network?',
      text: 'Our methodology adapts to the specific needs of your sector and product type.',
      ctaLabel: 'Request commercial network diagnosis',
    },
  },
  contact: {
    hero: {
      location: 'Barcelona',
      label: '/ Contact',
      title: "Let's talk about your commercial network",
      subtitle:
        'Tell us about your context. We will contact you within 24 business hours to understand your network and assess an initial diagnosis.',
    },
    paths: {
      sectionTitle: 'Do you have a question?',
      sectionSubtitle: 'Every company arrives with a different challenge. Choose where you want to start.',
      items: [
        {
          title: 'I want to activate my commercial network',
          description:
            'For B2B companies with contacts, prescribers or collaborators that are not yet generating recurring sales.',
          cta: 'View solutions',
        },
        {
          title: 'I need to scale my partner channel',
          description:
            'For teams that already have traction and need methodology, technology and operations to grow with control.',
          cta: 'View success cases',
        },
      ],
    },
    info: {
      sectionTitle: 'Contact information',
      companyName: 'Redescomerciales.ai',
      locationLabel: 'Location',
      addressLabel: 'Address',
      emailLabel: 'Email',
      phoneLabel: 'Phone / WhatsApp',
      hoursLabel: 'Business hours',
      mapTitle: 'Where we are',
      whatsappLabel: 'WhatsApp',
      socialLabel: 'Social media',
    },
    form: {
      sectionTitle: 'Send us a message',
      sectionSubtitle:
        'Describe your situation with partners or collaborators. We will respond to understand your context and assess an initial diagnosis with no commitment.',
    },
    faq: {
      sectionTitle: 'Frequently asked questions',
    },
  },
};
