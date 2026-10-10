import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SITE } from '@/constantes/site';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import styles from './TelaCarregamento.module.css';

const FIRST_LOAD_KEY = 'jota:initial-load-complete';

function jaCarregou() {
  try {
    return localStorage.getItem(FIRST_LOAD_KEY) === 'true';
  } catch {
    return false;
  }
}

export function TelaCarregamento({ progress }: { progress: number }) {
  const { t } = useIdioma();
  const reduzirMovimento = useReducedMotion();

  return (
    <motion.div
      className={styles.carregamento}
      exit={{ opacity: 0 }}
      transition={{ duration: reduzirMovimento ? 0 : 0.15 }}
      role="progressbar"
      aria-label={t.preloader.loading}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div className={styles.conteudo}>
        <span className={styles.rotulo}>{t.preloader.loading}</span>
        <h1 className={styles.nome}>{SITE.brand}</h1>
        <div className={styles.barraProgresso}>
          <div className={styles.preenchimentoProgresso} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.porcentagem}>{progress}%</span>
      </div>
    </motion.div>
  );
}

export function EnvoltorioTelaCarregamento({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(jaCarregou);
  const [progress, setProgress] = useState(0);
  const conteudoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaded) return;
    let cancelled = false;
    const cleanups: (() => void)[] = [];
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const documentReady = new Promise<void>(resolve => {
      if (document.readyState === 'complete') return resolve();
      const onLoad = () => resolve();
      window.addEventListener('load', onLoad, { once: true });
      cleanups.push(() => window.removeEventListener('load', onLoad));
    });

    // Os elementos já estão montados: suas fontes e imagens podem carregar.
    // Mídias lazy, vídeos e PDFs não bloqueiam a primeira tela.
    const images = [...(conteudoRef.current?.querySelectorAll('img') ?? [])]
      .filter(image => image.loading !== 'lazy')
      .map(
        image =>
          new Promise<void>(resolve => {
            const onReady = () => {
              image.removeEventListener('load', onReady);
              image.removeEventListener('error', onReady);
              if (image.naturalWidth && image.decode) {
                void image
                  .decode()
                  .catch(() => undefined)
                  .then(() => resolve());
              } else {
                resolve();
              }
            };
            if (image.complete) return onReady();
            image.addEventListener('load', onReady, { once: true });
            image.addEventListener('error', onReady, { once: true });
            cleanups.push(() => {
              image.removeEventListener('load', onReady);
              image.removeEventListener('error', onReady);
            });
          })
      );

    const resources = [documentReady, document.fonts.ready, ...images];
    let completed = 0;
    let finished = false;
    const finish = (persist: boolean) => {
      if (cancelled || finished) return;
      finished = true;
      if (persist) {
        try {
          localStorage.setItem(FIRST_LOAD_KEY, 'true');
        } catch {
          // O conteúdo também abre quando o armazenamento está indisponível.
        }
      }
      setProgress(100);
      setLoaded(true);
    };
    // Falha de rede nunca deixa o visitante preso atrás do preloader.
    const safetyTimer = window.setTimeout(() => finish(false), 12000);
    void Promise.allSettled(
      resources.map(resource =>
        Promise.resolve(resource).finally(() => {
          completed += 1;
          if (!cancelled && !finished) {
            setProgress(Math.round((completed / resources.length) * 100));
          }
        })
      )
    ).then(() => finish(true));

    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimer);
      cleanups.forEach(cleanup => cleanup());
      document.body.style.overflow = previousOverflow;
    };
  }, [loaded]);

  return (
    <>
      <div
        ref={conteudoRef}
        style={{ display: 'contents', visibility: loaded ? undefined : 'hidden' }}
        inert={!loaded}
        aria-hidden={!loaded ? true : undefined}
        aria-busy={!loaded}
      >
        {children}
      </div>
      <AnimatePresence>
        {!loaded && <TelaCarregamento key="preloader" progress={progress} />}
      </AnimatePresence>
    </>
  );
}
