import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  getDefaultLocale,
  locales,
  LOCALE_STORAGE_KEY,
  type Locale,
  type Translations,
} from '@/i18n';
import type { GalleryItem } from '@/tipos';
import { PROJECTS, getLocalizedProject } from '@/constantes/projetos';

interface ValorContextoIdioma {
  locale: Locale;
  definirIdioma: (locale: Locale) => void;
  t: Translations;
  projects: GalleryItem[];
}

const ContextoIdioma = createContext<ValorContextoIdioma | null>(null);

export function ProvedorIdioma({ children }: { children: ReactNode }) {
  const [locale, definirLocale] = useState<Locale>(getDefaultLocale);

  const definirIdioma = useCallback((proximo: Locale) => {
    definirLocale(proximo);
    localStorage.setItem(LOCALE_STORAGE_KEY, proximo);
    document.documentElement.lang = proximo === 'pt' ? 'pt-BR' : 'en';
    document.title = locales[proximo].meta.title;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
    document.title = locales[locale].meta.title;
  }, [locale]);

  const valor = useMemo<ValorContextoIdioma>(() => {
    const t = locales[locale];
    const projects = PROJECTS.map(p => getLocalizedProject(p, t));
    return { locale, definirIdioma, t, projects };
  }, [locale, definirIdioma]);

  return <ContextoIdioma.Provider value={valor}>{children}</ContextoIdioma.Provider>;
}

export function useIdioma() {
  const ctx = useContext(ContextoIdioma);
  if (!ctx) throw new Error('useIdioma deve ser usado dentro de ProvedorIdioma');
  return ctx;
}
