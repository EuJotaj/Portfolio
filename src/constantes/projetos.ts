import type { GalleryItem } from '@/tipos'
import type { Translations } from '@/i18n'
import { JOGOS } from './recursos'
import { IMAGENS_PROJETOS } from './imagensProjetos'

export interface ProjectBase {
  id: string
  category: GalleryItem['category']
  images: string[]
  year: string
  tags: string[]
  github?: string
  web?: string
  githubPrivate?: boolean
  playableUrl?: string
  maskShape: 'ellipse' | 'hexagon' | 'diamond' | 'blob'
  stackIndex: number
  photoStack: {
    rotation: number
    offsetX: number
    offsetY: number
    zIndex: number
  }
}

export const PROJECTS: ProjectBase[] = [
  {
    id: 'fincontrol',
    category: 'projects',
    images: [...IMAGENS_PROJETOS.fincontrol],
    year: '2026',
    tags: ['Angular', 'Java'],
    github: 'https://github.com/EuJotaj/FinControl',
    maskShape: 'ellipse',
    stackIndex: 0,
    photoStack: { rotation: -6, offsetX: 0, offsetY: 0, zIndex: 3 },
  },
  {
    id: 'seakalm',
    category: 'creative',
    images: [...IMAGENS_PROJETOS.seakalm],
    year: '2025',
    tags: ['JavaScript (jQuery)', 'HTML5', 'CSS3'],
    github: 'https://github.com/EuJotaj/SeaKalm',
    maskShape: 'hexagon',
    stackIndex: 1,
    photoStack: { rotation: 4, offsetX: 60, offsetY: 40, zIndex: 2 },
  },
  {
    id: 'sonorus',
    category: 'tools',
    images: [...IMAGENS_PROJETOS.sonorus],
    year: '2026',
    tags: ['Python', 'JavaScript (jQuery)', 'HTML5', 'CSS3'],
    github: 'https://github.com/EuJotaj/Sonorus',
    maskShape: 'diamond',
    stackIndex: 2,
    photoStack: { rotation: -3, offsetX: -50, offsetY: 80, zIndex: 1 },
  },
  {
    id: 'mario',
    category: 'projects',
    images: [...IMAGENS_PROJETOS.mario],
    year: '2026',
    tags: ['JavaScript (jQuery)', 'HTML5', 'CSS3'],
    github: 'https://github.com/EuJotaj/MarioJump',
    playableUrl: JOGOS.marioJump,
    maskShape: 'blob',
    stackIndex: 3,
    photoStack: { rotation: 7, offsetX: 30, offsetY: 120, zIndex: 4 },
  },
  {
    id: 'omsys',
    category: 'projects',
    images: [...IMAGENS_PROJETOS.omsys],
    year: '2026',
    tags: ['JavaScript (jQuery)', 'HTML5', 'CSS3'],
    githubPrivate: true,
    maskShape: 'ellipse',
    stackIndex: 4,
    photoStack: { rotation: -4, offsetX: -20, offsetY: 60, zIndex: 2 },
  },
]

export function getLocalizedProject(base: ProjectBase, t: Translations): GalleryItem {
  const copy = t.projects[base.id]
  const image = base.images[0]
  const hoverImage = base.images[1] ?? base.images[0]

  return {
    id: base.id,
    category: base.category,
    images: base.images,
    image,
    hoverImage,
    year: base.year,
    tags: base.tags,
    github: base.github,
    web: base.web,
    githubPrivate: base.githubPrivate,
    playableUrl: base.playableUrl,
    maskShape: base.maskShape,
    title: copy.title,
    description: copy.description,
    shortDescription: copy.shortDescription,
    aviso: copy.aviso,
  }
}

export function getProjectById(id: string, t: Translations): GalleryItem | undefined {
  const base = PROJECTS.find((p) => p.id === id)
  return base ? getLocalizedProject(base, t) : undefined
}

export const PHOTO_STACK_PROJECT_IDS = PROJECTS.filter((p) => p.stackIndex < 4)
  .sort((a, b) => a.stackIndex - b.stackIndex)
  .map((p) => p.id)
