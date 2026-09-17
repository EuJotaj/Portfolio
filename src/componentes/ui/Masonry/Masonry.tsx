import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { gsap } from 'gsap';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import type { GalleryItem } from '@/tipos';
import styles from './Masonry.module.css';

export interface MasonryItem extends GalleryItem {
  heightMultiplier?: number;
}

interface MasonryProps {
  items: MasonryItem[];
  onItemClick?: (item: MasonryItem) => void;
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const useMedia = <T,>(queries: string[], values: T[], defaultValue: T): T => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    const index = queries.findIndex(q => window.matchMedia(q).matches);
    return index !== -1 ? values[index] : defaultValue;
  };

  const [value, setValue] = useState<T>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    const mqls = queries.map(q => window.matchMedia(q));
    mqls.forEach(mql => mql.addEventListener('change', handler));
    return () => mqls.forEach(mql => mql.removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = (): [
  React.RefObject<HTMLDivElement | null>,
  { width: number; height: number },
] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls: string[]) => {
  await Promise.all(
    urls.filter(Boolean).map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export function Masonry({
  items,
  onItemClick,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 1.02,
  blurToFocus = true,
  colorShiftOnHover = true,
}: MasonryProps) {
  const { t } = useIdioma();
  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [indicesFotos, setIndicesFotos] = useState<Record<string, number>>({});

  // 2 colunas amplas para telas >= 850px, 1 coluna em telas menores para fotos grandes
  const columns = useMedia<number>(['(min-width: 850px)'], [2], 1);

  useEffect(() => {
    setImagesReady(false);
    preloadImages(items.map(i => i.image)).then(() => setImagesReady(true));
  }, [items]);

  const { grid, totalHeight } = useMemo(() => {
    if (!width || items.length === 0) return { grid: [], totalHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const gap = width * 0.018;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = Math.max(0, (width - totalGaps) / columns);

    const calculatedGrid = items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);

      // Proporção widescreen 16:10: os metadados vivem sobre a imagem.
      const imageHeight = columnWidth * 0.625;
      const multiplier = child.heightMultiplier ?? 1;
      const height = Math.round(imageHeight * multiplier);

      const y = colHeights[col];
      colHeights[col] += height + gap;

      return {
        ...child,
        x,
        y,
        w: columnWidth,
        h: height,
        imageHeight,
      };
    });

    const maxH = Math.max(...colHeights, 0);
    return { grid: calculatedGrid, totalHeight: maxH };
  }, [columns, items, width]);

  const getInitialPosition = (item: { x: number; y: number; w: number; h: number }) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -150 };
      case 'bottom':
        return { x: item.x, y: item.y + 120 };
      case 'left':
        return { x: -150, y: item.y };
      case 'right':
        return { x: item.x + 150, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useLayoutEffect(() => {
    if (!imagesReady || grid.length === 0) return;

    const elements = grid
      .map(item => document.querySelector<HTMLElement>(`[data-key="${item.id}"]`))
      .filter((element): element is HTMLElement => Boolean(element));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    elements.forEach((element, index) => {
      const item = grid[index];
      const initialPos = getInitialPosition(item);

      gsap.set(element, {
        opacity: prefersReducedMotion ? 1 : 0,
        x: prefersReducedMotion ? item.x : initialPos.x,
        y: prefersReducedMotion ? item.y : initialPos.y,
        width: item.w,
        height: item.h,
        ...(blurToFocus && { filter: prefersReducedMotion ? 'blur(0px)' : 'blur(10px)' }),
      });
    });

    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          const item = grid.find(candidate => candidate.id === element.dataset.key);
          if (!item) return;

          gsap.to(element, {
            opacity: 1,
            x: item.x,
            y: item.y,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: Math.max(duration, 0.7),
            ease,
            delay: (item.y / Math.max(item.h, 1)) * stagger * 0.35,
            overwrite: 'auto',
          });
          observer.unobserve(element);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );

    elements.forEach(element => observer.observe(element));

    return () => {
      observer.disconnect();
      elements.forEach(element => gsap.killTweensOf(element));
    };
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>, item: MasonryItem) => {
    setHoveredCardId(item.id);
    const element = e.currentTarget;

    if (scaleOnHover) {
      gsap.to(element, {
        scale: hoverScale,
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(`.${styles.colorOverlay}`);
      if (overlay) {
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.35,
        });
      }
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    setHoveredCardId(null);
    const element = e.currentTarget;

    if (scaleOnHover) {
      gsap.to(element, {
        scale: 1,
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(`.${styles.colorOverlay}`);
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.35,
        });
      }
    }
  };

  const mudarFoto = (id: string, delta: number, total: number, e: MouseEvent) => {
    e.stopPropagation();
    setIndicesFotos(prev => {
      const atual = prev[id] ?? 0;
      const proximo = (atual + delta + total) % total;
      return { ...prev, [id]: proximo };
    });
  };

  const selecionarFoto = (id: string, index: number, e: MouseEvent) => {
    e.stopPropagation();
    setIndicesFotos(prev => ({ ...prev, [id]: index }));
  };

  return (
    <div
      ref={containerRef}
      className={styles.list}
      style={{ height: totalHeight > 0 ? totalHeight : 'auto' }}
    >
      {grid.map(item => {
        const isHovered = hoveredCardId === item.id;
        const categoriaTag = t.gallery.categories[item.category]?.tag ?? item.category;
        const fotos = item.images && item.images.length > 0 ? item.images : [item.image];
        const fotoIndex = indicesFotos[item.id] ?? 0;
        const fotoAtual = fotos[fotoIndex] ?? item.image;
        const totalFotos = fotos.length;

        return (
          <div
            key={item.id}
            data-key={item.id}
            className={`${styles.itemWrapper} ${styles[item.category]}`}
            onClick={() => onItemClick?.(item)}
            onMouseEnter={e => handleMouseEnter(e, item)}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={0}
            aria-label={item.title}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onItemClick?.(item);
              }
            }}
          >
            <div className={styles.cardCorpo}>
              <div className={styles.envoltorioImagem} style={{ height: item.imageHeight }}>
                <img
                  key={`${item.id}-${fotoIndex}`}
                  src={fotoAtual}
                  alt={item.title}
                  className={`${styles.imagemBase} ${styles.imagemTrocaFoto} ${
                    isHovered && item.hoverImage && item.hoverImage !== item.image
                      ? styles.imagemOculta
                      : ''
                  }`}
                  loading="lazy"
                />

                {item.hoverImage && item.hoverImage !== item.image && (
                  <img
                    src={item.hoverImage}
                    alt={`${item.title} preview`}
                    className={`${styles.imagemHover} ${isHovered ? styles.imagemHoverVisivel : ''}`}
                    loading="lazy"
                  />
                )}

                {totalFotos > 1 && (
                  <>
                    <button
                      type="button"
                      className={`${styles.botaoNavFoto} ${styles.botaoNavEsquerda}`}
                      onClick={e => mudarFoto(item.id, -1, totalFotos, e)}
                      aria-label="Foto anterior"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className={`${styles.botaoNavFoto} ${styles.botaoNavDireita}`}
                      onClick={e => mudarFoto(item.id, 1, totalFotos, e)}
                      aria-label="Próxima foto"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>

                    <div className={styles.indicadorPontos}>
                      {fotos.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`${styles.pontoFoto} ${
                            idx === fotoIndex ? styles.pontoFotoAtivo : ''
                          }`}
                          onClick={e => selecionarFoto(item.id, idx, e)}
                          aria-label={`Ver foto ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className={styles.badgeQtdFotos}>
                      {fotoIndex + 1} / {totalFotos}
                    </div>
                  </>
                )}

                <div className={`${styles.badgeCategoria} ${styles[item.category]}`}>
                  {categoriaTag}
                </div>

                <div className={styles.badgeAno}>{item.year}</div>

                {colorShiftOnHover && (
                  <div className={`${styles.colorOverlay} ${styles[item.category]}`} />
                )}

                <div className={styles.info}>
                  <div className={styles.metaLinha}>
                    <span className={`${styles.categoriaTexto} ${styles[item.category]}`}>
                      {categoriaTag}
                    </span>
                    <span className={styles.divisorPonto}>•</span>
                    <span className={styles.anoTexto}>{item.year}</span>
                  </div>

                  <h4 className={styles.titulo}>{item.title}</h4>

                  {item.tags.length > 0 && (
                    <div className={styles.etiquetas}>
                      {item.tags.slice(0, 4).map(tag => (
                        <span key={tag} className={styles.etiqueta}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
