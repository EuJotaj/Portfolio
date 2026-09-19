import type { SkillItem, SocialLink } from '@/tipos';
import { LINKS } from './recursos';

export const SKILLS: SkillItem[] = [
  { id: 's1', name: 'JavaScript', level: 89, experience: '3+', tagKey: 'javascript', category: 'frontend' },
  { id: 's2', name: 'React', level: 78, experience: '3+', tagKey: 'react', category: 'frontend' },
  { id: 's3', name: 'Angular', level: 80, experience: '2+', tagKey: 'angular', category: 'frontend' },
  { id: 's4', name: 'TypeScript', level: 79, experience: '3+', tagKey: 'typescript', category: 'frontend' },
  { id: 's5', name: 'HTML5 / CSS3', level: 97, experience: '3+', tagKey: 'htmlCss', category: 'frontend' },
  { id: 's6', name: 'Python', level: 57, experience: '2+', tagKey: 'python', category: 'backend' },
  { id: 's7', name: 'Tailwind CSS', level: 55, experience: '1+', tagKey: 'tailwind', category: 'frontend' },
  { id: 's8', name: 'Git / GitHub', level: 85, experience: '3+', tagKey: 'git', category: 'tools' },
];

export const TECH_MARQUEE = [
  'JavaScript',
  'React',
  'Angular',
  'HTML5',
  'CSS3',
  'Tailwind',
  'Python',
  'GitHub',
] as const;

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: LINKS.github, handle: '@EuJotaj' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: LINKS.linkedin,
    handle: 'Janildo Júnior',
  },
  { id: 'email', label: 'Email', href: 'mailto:jjcalluete@gmail.com', handle: LINKS.email },
];

export const EXPERIENCE_IDS = ['exp1', 'exp2', 'exp3'] as const;

export const STATS_VALUES = [
  { id: 'projects', value: '5+' },
  { id: 'experience', value: '1+' },
  { id: 'stack', value: '8+' },
  { id: 'degree', value: 'SI' },
] as const;
