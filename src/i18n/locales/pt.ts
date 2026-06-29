import type { Translations } from '../types'

export const pt: Translations = {
  meta: {
    title: 'JOTA | Janildo Júnior - Desenvolvedor Front-End',
    description:
      'Portfólio de Janildo Júnior — Desenvolvedor Front-End com React, Angular e JavaScript.',
  },
  nav: {
    experience: 'Experiência',
    projects: 'Projetos',
    stack: 'Tecnologias',
    contact: 'Contato',
  },
  preloader: {
    loading: 'Carregando',
  },
  hero: {
    role: 'Desenvolvedor Front-End',
    viewProjects: 'Ver Projetos',
    contactMe: 'Falar Comigo',
    viewCv: 'Ver CV',
    hoverHint: 'Passe o mouse',
    scroll: 'Scroll',
    marquee: 'Desenvolvedor Front-End — React · Angular · JavaScript',
  },
  about: {
    titleLine1: 'TRANSFORMANDO',
    titleLine2: 'DESIGNS',
    description:
      'Transformando designs complexos em interfaces funcionais. Especialista em criar ecossistemas digitais de alta performance com React, Angular e JavaScript.',
    quote:
      'Minha abordagem combina rigor técnico e disciplina, garantindo que cada linha de código contribua para uma experiência de usuário impecável.',
    tags: ['#FrontendDevelopment', '#ReactJS', '#SystemArchitecture'],
    stats: {
      projects: 'Projetos em destaque',
      experience: 'Anos de experiência',
      stack: 'Tecnologias dominadas',
      degree: 'Sistemas de Informação',
    },
  },
  gallery: {
    marquee: 'PROJETOS EM DESTAQUE — CLIQUE PARA EXPLORAR',
    titleLine1: 'PROJETOS',
    titleLine2: 'DESTAQUE',
    description:
      'Clique em um projeto para ver detalhes, carrossel de imagens e links. Passe o mouse para destacar.',
    filters: {
      all: 'Todos',
      projects: 'Projetos',
      creative: 'Criativo',
      tools: 'Ferramentas',
    },
    clickToExplore: 'Clique para explorar',
  },
  showcase: {
    titleLine1: 'PROJETOS',
    titleLine2: 'SHOWCASE',
    description:
      'Passe o mouse nos thumbnails. A foto principal exibe carrossel quando há mais de uma imagem.',
  },
  skills: {
    titleLine1: 'TECNO',
    titleLine2: 'LOGIAS',
    categories: {
      frontend: 'front-end',
      backend: 'back-end',
      tools: 'ferramentas',
    },
  },
  contact: {
    eyebrow: 'Contato',
    titleLine1: 'Vamos criar',
    titleLine2: 'algo',
    titleLine3: 'extraordinário?',
    description:
      'Estou sempre aberto a novos desafios e colaborações que buscam elevar o padrão do desenvolvimento front-end.',
    cta: 'Entrar em contato',
    viewProjects: 'Ver projetos',
    downloadCv: 'Baixar CV',
    socialTitle: 'Redes & links',
  },
  footer: {
    tagline: 'Sempre entregando o melhor código.',
    copyright: 'Todos os direitos reservados.',
  },
  modal: {
    close: 'Fechar',
    viewGithub: 'Ver no GitHub',
    privateRepo: 'Repositório privado',
    viewWeb: 'Visualizar na web',
    playProject: 'Executar projeto',
    openNewTab: 'Abrir em nova aba',
    carouselPrev: 'Anterior',
    carouselNext: 'Próxima',
    slideOf: 'de',
    securityNote: 'Aviso de segurança:',
  },
  cvModal: {
    title: 'Currículo',
    download: 'Baixar PDF',
    close: 'Fechar',
    openInNewTab: 'Abrir em nova aba',
  },
  projects: {
    fincontrol: {
      title: 'FinControl',
      description:
        'Ecossistema financeiro SaaS e multi-tenant focado em gestão de transações, faturamento corporativo e controle de workspaces. Fui responsável pela concepção da arquitetura ponta a ponta, implementando um backend robusto em Spring Boot integrado a um banco de dados MySQL com isolamento dinâmico de dados por inquilino (TenantResolver). No ecossistema front-end, desenhei uma SPA de alta performance utilizando Angular 21 e Tailwind CSS, aplicando conceitos avançados de Lazy Loading, otimização de rotas protegidas por Guards e interceptores HTTP para injeção e validação automatizada de segurança baseada em tokens JWT. Implementei módulos críticos de fluxo de caixa, cartões de crédito e faturas automatizadas, incluindo a integração completa com o ecossistema de pagamentos e cobranças do MercadoPago SDK. Desenvolvi funcionalidades de comunicação em tempo real via WebSockets (STOMP/SockJS) para disparos instantâneos de notificações e atualizações de dashboards analíticos. Traduzi regras de negócios financeiras complexas em componentes reutilizáveis (Reactive Forms estruturados em arquitetura Core/Shared/Features), entregando uma plataforma modular de alta escalabilidade preparada para suportar operações multi-empresas com foco em performance e concisão de dados.',
      shortDescription:
        'Ecossistema financeiro SaaS multi-tenant com Angular, Spring Boot e integração MercadoPago.',
    },
    seakalm: {
      title: 'SeaKalm',
      description:
        'Plataforma de histórias infantis para crianças com necessidades especiais e dificuldade de concentração, com experiência visual acolhedora.',
      shortDescription:
        'Histórias infantis para crianças com necessidades especiais e dificuldade de concentração.',
    },
    sonorus: {
      title: 'Sonorus',
      description:
        'Gerador de áudio Text to Speech com múltiplas vozes e idiomas, sem restrição prática de caracteres.',
      shortDescription: 'Gerador de áudio Text to Speech com várias vozes e idiomas.',
    },
    mario: {
      title: 'Mario Jump',
      description:
        'Projeto acadêmico inspirado no jogo offline do navegador, recriado com Mario para praticar lógica de colisão e animações.',
      shortDescription: 'Jogo estilo dinossauro do Chrome com o personagem Mario.',
    },
    omsys: {
      title: 'ERP B2B PROFISSIONAL',
      description:
        'ERP B2B profissional de alta complexidade para comércio internacional, controllership e logística aduaneira. Fui responsável pela arquitetura front-end, evolução e manutenção da plataforma, com foco em fluxos operacionais críticos e conformidade documental em processos de importação e exportação. Padronizei interfaces dinâmicas com Angular e React, integração de APIs REST via Services e Dependency Injection, tipagem forte e dashboards de gestão. Implementei módulos de fluxo de caixa e automação de faturamento, incluindo integração de propostas comerciais com geração de CT-es, manipulação de XML e PDFs dinâmicos. Traduzi regras de negócio complexas em interfaces responsivas com jQuery e JavaScript moderno, priorizando performance de carregamento e UX. Entreguei mais de 40 módulos funcionais que sustentam operações logísticas, jurídicas e de controle financeiro.',
      shortDescription:
        'ERP B2B para comércio exterior: dashboards, automação fiscal e mais de 40 módulos operacionais.',
      aviso:
        'Os dados exibidos nas imagens após o login foram alterados por questões de segurança.',
    },
    imip: {
      title: 'AVENTURA DAS LETRAS (IMIP)',
      description:
        'Plataforma web educacional e gamificada de alta usabilidade voltada para a alfabetização infantil de crianças em contexto hospitalar no IMIP. Desenvolvida em um formato colaborativo em grupo, participei ativamente da arquitetura full-stack, design de experiência (UX) e engenharia do ecossistema, combinando uma interface lúdica em React com um backend estruturado em Flask e persistência de dados em MySQL. Colaborei no desenho e na implementação de uma estrutura modular dividida em duas personas críticas: o portal do Explorador (aluno), com trilhas de aprendizagem dinâmicas, quizzes visuais, sistemas de vidas, recompensas por moedas e loja de itens; e o Painel do Educador (professor), com gestão de missões, criação de perguntas, acompanhamento de progresso e suporte via assistente virtual integrado com Inteligência Artificial. Priorizamos navegação fluida, acessível e otimizada para dispositivos móveis, garantindo um ambiente de aprendizagem escalável, seguro e altamente motivador durante internações.',
      shortDescription:
        'Plataforma gamificada para alfabetização infantil no hospital, com React, Flask e MySQL.',
    },
  },
  experience: {
    exp1: {
      period: 'JULHO 2025 — MAIO 2026',
      company: 'Ômega Comércio Exterior',
      role: 'Desenvolvedor Front-End',
      description:
        'Desenvolvimento de interfaces modernas para sistemas logísticos robustos, integração de APIs e automação de documentos críticos como PDFs e XMLs.',
    },
    exp2: {
      period: '2024 — 2025',
      company: 'Exército Brasileiro',
      role: 'Soldado de Comunicações & Redes',
      description:
        'Atuação técnica em manutenção de redes e suporte em ambientes de comunicação crítica. Reconhecido com Honra ao Mérito por disciplina e desempenho técnico.',
    },
    exp3: {
      period: 'FORMAÇÃO',
      company: 'UNINASSAU',
      role: 'Sistemas de Informação',
      description:
        'Graduando focado em evolução contínua para engenharia de software e performance web.',
    },
  },
}
