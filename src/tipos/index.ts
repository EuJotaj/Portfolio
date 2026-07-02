export interface NavItem {
  id: string;
  labelKey: keyof import('@/i18n/types').Translations['nav'];
  href: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  handle: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'projects' | 'creative' | 'tools';
  images: string[];
  image: string;
  hoverImage: string;
  year: string;
  description: string;
  shortDescription: string;
  aviso?: string;
  tags: string[];
  github?: string;
  web?: string;
  githubPrivate?: boolean;
  playableUrl?: string;
  maskShape?: 'ellipse' | 'hexagon' | 'diamond' | 'blob';
}

export interface PilhaFotosItem {
  projectId: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
  zIndex: number;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
}

export interface StatItem {
  id: string;
  value: string;
  labelKey: keyof import('@/i18n/types').Translations['about']['stats'];
}

export interface SectionProps {
  id?: string;
  className?: string;
}
