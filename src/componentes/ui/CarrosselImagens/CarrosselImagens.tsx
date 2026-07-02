import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/biblioteca/cn';
import styles from './CarrosselImagens.module.css';

interface CarrosselImagensProps {
  images: string[];
  alt: string;
  className?: string;
  resetKey?: string;
  ajustarImagem?: boolean;
  labels?: {
    prev: string;
    next: string;
    slideOf: string;
  };
}

export function CarrosselImagens({
  images,
  alt,
  className,
  resetKey,
  ajustarImagem = false,
  labels = { prev: 'Anterior', next: 'Próxima', slideOf: 'de' },
}: CarrosselImagensProps) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    setIndex(0);
  }, [resetKey]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex(i => (i + dir + images.length) % images.length);
    },
    [images.length]
  );

  return (
    <div className={cn(styles.carrossel, ajustarImagem && styles.carrosselAjustado, className)}>
      <AnimatePresence mode="wait">
        <motion.img
          key={`${resetKey}-${index}`}
          src={images[index]}
          alt={`${alt} — ${index + 1}`}
          className={cn(styles.imagem, ajustarImagem && styles.imagemAjustada)}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            type="button"
            className={`${styles.botaoNav} ${styles.anterior}`}
            onClick={() => go(-1)}
            aria-label={labels.prev}
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.botaoNav} ${styles.proximo}`}
            onClick={() => go(1)}
            aria-label={labels.next}
          >
            ›
          </button>
          <div className={styles.pontos}>
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.ponto} ${i === index ? styles.pontoAtivo : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`${i + 1} ${labels.slideOf} ${images.length}`}
              />
            ))}
          </div>
          <span className={styles.contador}>
            {index + 1} {labels.slideOf} {images.length}
          </span>
        </>
      )}
    </div>
  );
}
