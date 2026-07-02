import { pt } from './locales/pt';
import { en } from './locales/en';
import type { Locale, Translations } from './types';

export type { Locale, Translations, ProjectTranslation, ExperienceTranslation } from './types';

export const locales: Record<Locale, Translations> = { pt, en };

export const LOCALE_STORAGE_KEY = 'jota-locale';

export function getDefaultLocale(): Locale {
  if (typeof window === 'undefined') return 'pt';
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === 'pt' || stored === 'en') return stored;
  return navigator.language.startsWith('en') ? 'en' : 'pt';
}
