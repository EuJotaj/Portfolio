import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '@/constantes/site';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import styles from './TelaCarregamento.module.css';

interface PreloaderProps {
  onComplete: () => void;
}

export function TelaCarregamento({ onComplete }: PreloaderProps) {
  const { t } = useIdioma();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(next);

      if (next < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <motion.div
      className={styles.carregamento}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.conteudo}>
        <motion.span
          className={styles.rotulo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t.preloader.loading}
        </motion.span>
        <motion.h1
          className={styles.nome}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {SITE.brand}
        </motion.h1>
        <div className={styles.barraProgresso}>
          <motion.div className={styles.preenchimentoProgresso} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.porcentagem}>{progress}%</span>
      </div>
    </motion.div>
  );
}

export function EnvoltorioTelaCarregamento({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && <TelaCarregamento key="preloader" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      {loaded && children}
    </>
  );
}
