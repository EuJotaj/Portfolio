import type { Translations } from '../types';

export const en: Translations = {
  meta: {
    title: 'JOTA | Janildo Júnior - Front-End Developer',
    description:
      'Janildo Júnior’s portfolio — professional front-end experience with JavaScript and jQuery, and projects with React, Angular, Java and Spring Boot.',
  },
  nav: {
    experience: 'Experience',
    projects: 'Projects',
    stack: 'Technologies',
    contact: 'Contact',
  },
  preloader: { loading: 'Loading' },
  hero: {
    role: 'Front-End Developer',
    viewProjects: 'View Projects',
    contactMe: 'Contact Me',
    viewCv: 'View Resume',
    hoverHint: 'Hover me',
    scroll: 'Scroll',
    marquee: 'Front-End Developer — React · Angular · JavaScript',
  },
  about: {
    titleLine1: 'TURNING',
    titleLine2: 'DESIGNS',
    description:
      'I am a developer with professional experience in JavaScript and jQuery and hands-on project experience with React, Angular, TypeScript, Java and Spring Boot. I contributed to the development of more than 40 B2B ERP modules, connecting interfaces, REST APIs and document generation. I currently work as a MAKER Support Intern at the City of Paulista, supporting educational software, programming and testing. I am studying Information Systems and continuing my training in cloud computing with AWS.',
    quote:
      'My approach combines technical rigor and discipline, ensuring every line of code contributes to a flawless user experience.',
    tags: ['#FrontendDevelopment', '#FullStackProjects', '#ContinuousLearning'],
    stats: {
      projects: 'Featured projects',
      experience: 'Years of experience',
      stack: 'Technologies mastered',
      degree: 'Information Systems',
    },
  },
  gallery: {
    marquee: 'FEATURED PROJECTS — CLICK TO EXPLORE',
    titleLine1: 'FEATURED',
    titleLine2: 'PROJECTS',
    description:
      'Explore projects categorized into enterprise corporate work, personal deep-dives, and academic research. Hover over the ? icon to understand each section.',
    allProjectsTitle: 'All Projects',
    allProjectsSubtitle:
      'Unified showcase bringing together corporate production systems, portfolio platforms, and academic studies.',
    tooltipAriaLabel: 'Information about this section',
    whatIsIncluded: 'What you will find here:',
    projectCountSingular: 'project',
    projectCountPlural: 'projects',
    categories: {
      profissionais: {
        title: 'Professional Projects',
        tag: 'Professional',
        badge: 'Career & Market',
        description:
          'Projects developed in corporate settings, large-scale production systems, enterprise solutions, and client freelancing contracts.',
        scope: [
          'ERP systems and B2B platforms',
          'Production applications with complex business rules',
          'Client and corporate delivery work',
        ],
      },
      portfolio: {
        title: 'Portfolio Projects',
        tag: 'Portfolio',
        badge: 'Robust Personal Projects',
        description:
          'Larger personal projects with architectural maturity, crafted to explore new technology stacks and solve real-world problems without immediate commercial intent.',
        scope: [
          'Full-scale multi-tenant SaaS platforms',
          'Modern full-stack architectures',
          'Non-trivial interactive applications',
        ],
      },
      estudos: {
        title: 'Studies & Academic',
        tag: 'Study',
        badge: 'College & Learning',
        description:
          'Basic programming projects and introductions to new languages, along with academic projects and coursework developed at university.',
        scope: [
          'Basic programming projects and algorithms',
          'Introductions and practice with new languages',
          'College projects and academic assignments',
          'Minigames and practical logic exercises',
        ],
      },
    },
    filters: {
      all: 'All',
      profissionais: 'Professional',
      portfolio: 'Portfolio',
      estudos: 'Studies',
    },
    clickToExplore: 'Click to explore',
  },
  showcase: {
    titleLine1: 'PROJECT',
    titleLine2: 'SHOWCASE',
    description:
      'Hover the thumbnails. The main preview shows a carousel when multiple images exist.',
  },
  skills: {
    titleLine1: 'TECH',
    titleLine2: 'STACK',
    categories: { frontend: 'front-end', backend: 'back-end', tools: 'tools' },
    tags: {
      javascript: ['DOM', 'Events', 'ES Modules'],
      react: ['Hooks', 'Render', 'Components'],
      angular: ['Signals', 'RxJS', 'Dependency Injection'],
      typescript: ['Typing', 'Interfaces', 'Scalability'],
      htmlCss: ['Semantics', 'Layouts', 'Accessibility'],
      python: ['APIs', 'Automation', 'Scripts'],
      tailwind: ['Tokens', 'Design', 'Responsiveness'],
      git: ['Branches', 'CI', 'Versioning'],
    },
  },
  contact: {
    eyebrow: 'CONTACT & PARTNERSHIPS',
    titleLine1: "LET'S BUILD",
    titleLine2: 'SOMETHING',
    titleLine3: 'EXTRAORDINARY?',
    description:
      'I am always open to new challenges and collaborations that raise the bar for front-end development.',
    cta: 'GET IN TOUCH',
    viewProjects: 'VIEW PROJECTS',
    downloadCv: 'DOWNLOAD CV',
    socialTitle: 'SOCIAL & LINKS',
    active: 'Active',
    directEmail: 'Direct email:',
  },
  footer: {
    tagline: 'Always delivering the best code.',
    copyright: 'All rights reserved.',
  },
  modal: {
    close: 'Close',
    viewGithub: 'View on GitHub',
    privateRepo: 'Private repository',
    viewWeb: 'View on web',
    playProject: 'Run project',
    openNewTab: 'Open in new tab',
    carouselPrev: 'Previous',
    carouselNext: 'Next',
    slideOf: 'of',
    viewVideo: 'Video',
    viewImages: 'Images',
    videoLabel: 'Project video demonstration',
    securityNote: 'Security note:',
  },
  cvModal: {
    title: 'Resume',
    description: 'Choose the professional focus and PDF language.',
    profile: 'Professional focus',
    language: 'PDF language',
    profiles: { frontend: 'Front-end', fullstack: 'Full-stack' },
    languages: { pt: 'Portuguese', en: 'English' },
    download: 'Download PDF',
    close: 'Close',
    openInNewTab: 'Open in new tab',
  },
  projects: {
    motionstudio: {
      title: 'Motion Studio',
      description:
        'A browser-based visual editor for creating websites and animations, designed to make the path from design to implementation simpler. I structured the experience around editable pages, sections and layers, with a motion preset library, keyframe timeline, synchronized animations and a React Bits component catalog. The project lets creators preview motion as they work and export both an editable project document and a complete website as a ZIP, along with static captures in several formats.',
      shortDescription:
        'Visual site editor with layers, an animation timeline, React Bits and project export.',
    },
    fincontrol: {
      title: 'FinControl',
      description:
        'SaaS, multi-tenant financial ecosystem focused on transaction management, corporate billing and workspace control. I designed the end-to-end architecture, implementing a robust Spring Boot backend integrated with a MySQL database and dynamic per-tenant data isolation (TenantResolver). On the front-end, I built a high-performance SPA with Angular 21 and Tailwind CSS, applying advanced Lazy Loading, route optimization protected by Guards and HTTP interceptors for automated JWT-based security injection and validation. I implemented critical cash-flow, credit card and automated invoice modules, including full integration with the MercadoPago SDK payment and billing ecosystem. I developed real-time communication via WebSockets (STOMP/SockJS) for instant notifications and analytical dashboard updates. I translated complex financial business rules into reusable components (Reactive Forms structured in a Core/Shared/Features architecture), delivering a highly scalable modular platform ready to support multi-company operations with a focus on performance and data conciseness.',
      shortDescription:
        'Multi-tenant SaaS financial ecosystem with Angular, Spring Boot and MercadoPago integration.',
    },
    seakalm: {
      title: 'SeaKalm',
      description:
        "Children's story platform supporting kids with special needs and concentration difficulties, with a calming visual experience.",
      shortDescription: 'Calming story platform for children with special needs.',
    },
    sonorus: {
      title: 'Sonorus',
      description:
        'Text-to-speech generator with multiple voices and languages, with no practical character limit.',
      shortDescription: 'Text-to-speech tool with multiple voices and languages.',
    },
    mario: {
      title: 'Mario Jump',
      description:
        'Academic project inspired by the browser offline game, rebuilt with Mario to practice collision logic and animations.',
      shortDescription: 'Chrome dino-style game featuring Mario.',
    },
    omsys: {
      title: 'ERP B2B PROFISSIONAL',
      description:
        'A B2B ERP for foreign trade and logistics, developed as part of my work at Ômega Comércio Exterior & Logística. I contributed to the development and enhancement of more than 40 modules supporting financial, legal and controlling processes. I built interfaces, dashboards and reusable components with JavaScript and jQuery to standardize modules. I integrated the interfaces with REST APIs and JSON data and worked on commercial proposal, billing and XML/PDF document generation workflows.',
      shortDescription:
        'B2B ERP for foreign trade: JavaScript, jQuery, REST APIs and 40+ operational modules.',
      aviso: 'Data shown in post-login screenshots has been replaced for security reasons.',
    },
    imip: {
      title: 'AVENTURA DAS LETRAS (IMIP)',
      description:
        'Educational gamified web platform for literacy aimed at hospitalized children at IMIP. Built collaboratively with a playful React front-end, Flask backend and MySQL persistence, I helped architect the full-stack ecosystem, UX design and product engineering. The system supports two critical personas: the Explorer portal for students, with dynamic learning paths, visual quizzes, lives, coin rewards and item shop; and the Educator dashboard for mission control, question creation, progress tracking and an AI-powered virtual assistant. We prioritized fluid, accessible mobile-first navigation and secure authenticated routes to deliver a scalable, motivating learning environment during hospitalization.',
      shortDescription:
        'Gamified literacy platform for hospitalized children, built with React, Flask and MySQL.',
    },
  },
  trajectory: {
    details: 'View details',
    hideDetails: 'Close details',
    title: 'Professional journey',
    description: 'Select a stage to explore my work and education.',
    work: 'Experience',
    learning: 'Education',
    current: 'Current role',
    ongoing: 'In progress',
    completed: 'Past experience',
    previous: 'Previous stage',
    next: 'Next stage',
    stages: 'Career stages',
    skills: 'Technologies and skills',
  },
  experience: {
    exp0: {
      shortCompany: 'City of Paulista',
      periodShort: 'SEP 2026 — PRESENT',
      highlights: [
        'Supporting educational software development, programming and testing.',
        'User support, equipment maintenance and configuration.',
        'Assistance with network infrastructure and cabling.',
      ],
      skills: ['Educational software', 'Programming', 'Testing', 'Technical support', 'Networks'],
      period: 'SEP 2026 — PRESENT',
      company: 'Prefeitura da Cidade do Paulista',
      role: 'MAKER Support Intern',
      description:
        'I support educational software development, programming and testing in the Expanded Learning Spaces unit. I provide technical support to users, maintain and configure equipment, and assist with network infrastructure and cabling in Paulista, Pernambuco, Brazil.',
    },
    exp1: {
      shortCompany: 'Ômega',
      periodShort: '2025 — 2026',
      highlights: [
        'Contributed to more than 40 B2B ERP modules for financial, legal and controlling processes.',
        'Interfaces, dashboards and reusable components with JavaScript and jQuery.',
        'REST and JSON integrations, commercial proposals, billing and XML/PDF documents.',
      ],
      skills: ['JavaScript', 'jQuery', 'REST APIs', 'JSON', 'XML / PDF'],
      period: 'JUL 2025 — JUN 2026',
      company: 'Ômega Comércio Exterior & Logística',
      role: 'Front-End Developer',
      description:
        'Contributed to the development and enhancement of more than 40 B2B ERP modules for financial, legal and controlling processes. Built interfaces, dashboards and reusable components with JavaScript and jQuery, integrated REST APIs and JSON data, and developed workflows for commercial proposals, billing and XML/PDF document generation in Recife, Pernambuco, Brazil.',
    },
    exp2: {
      shortCompany: 'Brazilian Army',
      periodShort: '2024 — 2025',
      highlights: [
        'Network maintenance and support in critical communication environments.',
        'Technical work in communications and support operations.',
        'Recognized with Merit Honor for technical performance and discipline.',
      ],
      skills: ['Networks', 'Technical support', 'Communications'],
      period: '2024 — 2025',
      company: 'Brazilian Army',
      role: 'Communications & Networks Soldier',
      description:
        'Technical work maintaining networks and supporting critical communication environments. Recognized with Merit Honor for discipline and performance.',
    },
    exp3: {
      shortCompany: 'UNINASSAU',
      periodShort: 'GRADUATION: 2028',
      highlights: [
        'Bachelor’s degree in Information Systems in progress.',
        'Hands-on experience with web applications, interface and API integration, and data persistence.',
        'Expected graduation in November 2028.',
      ],
      skills: ['Information Systems', 'Web applications', 'APIs', 'Data persistence'],
      period: 'IN PROGRESS — EXPECTED GRADUATION: NOVEMBER 2028',
      company: 'UNINASSAU',
      role: 'Bachelor’s Degree in Information Systems (in progress)',
      description:
        'Undergraduate studies with hands-on experience in web application development, interface and API integration, and data persistence. Expected graduation in November 2028.',
    },
    exp4: {
      shortCompany: 'Projeto Start',
      periodShort: '2026 — 2027',
      highlights: [
        'AWS cloud computing training through Projeto Start / Rede Cidadã.',
        'Training in progress, with completion expected in January 2027.',
      ],
      skills: ['Cloud Computing', 'AWS', 'Python'],
      period: 'AUG 2026 — JAN 2027 (EXPECTED)',
      company: 'Projeto Start · Rede Cidadã',
      role: 'Cloud Computing with AWS',
      description:
        'Training in Cloud Computing with AWS through Projeto Start / Rede Cidadã. The course is in progress, with completion expected in January 2027.',
    },

  },
};
