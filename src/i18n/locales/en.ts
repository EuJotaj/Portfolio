import type { Translations } from '../types'

export const en: Translations = {
  meta: {
    title: 'JOTA | Janildo Júnior - Front-End Developer',
    description:
      'Portfolio of Janildo Júnior — Front-End Developer with React, Angular and JavaScript.',
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
      'Turning complex designs into functional interfaces. Specialized in high-performance digital ecosystems with React, Angular and JavaScript.',
    quote:
      'My approach combines technical rigor and discipline, ensuring every line of code contributes to a flawless user experience.',
    tags: ['#FrontendDevelopment', '#ReactJS', '#SystemArchitecture'],
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
      'Click a project to see details, image carousel and links. Hover to highlight.',
    filters: { all: 'All', projects: 'Projects', creative: 'Creative', tools: 'Tools' },
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
  },
  contact: {
    eyebrow: 'Contact',
    titleLine1: "Let's build",
    titleLine2: 'something',
    titleLine3: 'extraordinary?',
    description:
      'I am always open to new challenges and collaborations that raise the bar for front-end development.',
    cta: 'Get in touch',
    viewProjects: 'View projects',
    downloadCv: 'Download resume',
    socialTitle: 'Social & links',
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
    securityNote: 'Security note:',
  },
  cvModal: {
    title: 'Resume',
    download: 'Download PDF',
    close: 'Close',
    openInNewTab: 'Open in new tab',
  },
  projects: {
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
        'A professional, high-complexity B2B ERP for international trade, controllership and customs logistics. I owned front-end architecture, evolution and maintenance of the platform, focusing on critical operational flows and document compliance in import/export processes. I standardized dynamic interfaces with Angular and React, REST API integration via Services and Dependency Injection, strong typing and management dashboards. I built cash-flow modules and billing automation, including commercial proposal integration with CT-e generation, XML handling and dynamic PDF output. I translated complex business rules into responsive interfaces using jQuery and modern JavaScript, prioritizing load performance and UX. I delivered 40+ functional modules supporting logistics, legal and financial operations.',
      shortDescription:
        'B2B ERP for foreign trade: dashboards, fiscal automation and 40+ operational modules.',
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
  experience: {
    exp1: {
      period: 'JUL 2025 — MAY 2026',
      company: 'Ômega Comércio Exterior',
      role: 'Front-End Developer',
      description:
        'Building modern interfaces for robust logistics systems, API integration and automation of critical documents such as PDFs and XMLs.',
    },
    exp2: {
      period: '2024 — 2025',
      company: 'Brazilian Army',
      role: 'Communications & Networks Soldier',
      description:
        'Technical work maintaining networks and supporting critical communication environments. Recognized with Merit Honor for discipline and performance.',
    },
    exp3: {
      period: 'EDUCATION',
      company: 'UNINASSAU',
      role: 'Information Systems',
      description:
        'Undergraduate focused on continuous growth toward software engineering and web performance.',
    },
  },
}
