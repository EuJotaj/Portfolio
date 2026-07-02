export type Locale = 'pt' | 'en';

export interface ProjectTranslation {
  title: string;
  description: string;
  shortDescription: string;
  aviso?: string;
}

export interface ExperienceTranslation {
  period: string;
  company: string;
  role: string;
  description: string;
}

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    experience: string;
    projects: string;
    stack: string;
    contact: string;
  };
  preloader: {
    loading: string;
  };
  hero: {
    role: string;
    viewProjects: string;
    contactMe: string;
    viewCv: string;
    hoverHint: string;
    scroll: string;
    marquee: string;
  };
  about: {
    titleLine1: string;
    titleLine2: string;
    description: string;
    quote: string;
    tags: string[];
    stats: {
      projects: string;
      experience: string;
      stack: string;
      degree: string;
    };
  };
  gallery: {
    marquee: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    filters: {
      all: string;
      projects: string;
      creative: string;
      tools: string;
    };
    clickToExplore: string;
  };
  showcase: {
    titleLine1: string;
    titleLine2: string;
    description: string;
  };
  skills: {
    titleLine1: string;
    titleLine2: string;
    categories: {
      frontend: string;
      backend: string;
      tools: string;
    };
  };
  contact: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    description: string;
    cta: string;
    viewProjects: string;
    downloadCv: string;
    socialTitle: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  modal: {
    close: string;
    viewGithub: string;
    privateRepo: string;
    viewWeb: string;
    playProject: string;
    openNewTab: string;
    carouselPrev: string;
    carouselNext: string;
    slideOf: string;
    securityNote: string;
  };
  cvModal: {
    title: string;
    download: string;
    close: string;
    openInNewTab: string;
  };
  projects: Record<string, ProjectTranslation>;
  experience: Record<string, ExperienceTranslation>;
}
