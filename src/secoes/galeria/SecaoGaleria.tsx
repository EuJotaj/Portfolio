import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Secao } from '@/componentes/layout/Secao';
import { TextoDividido } from '@/componentes/ui/TextoDividido';
import { GrupoFocoHover } from '@/componentes/ui/GrupoFocoHover';
import { CartaoImagem } from '@/componentes/ui/CartaoImagem';
import { FaixaAnimada } from '@/componentes/ui/FaixaAnimada';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import type { GalleryItem } from '@/tipos';
import styles from './SecaoGaleria.module.css';

type Filter = 'all' | GalleryItem['category'];

export function SecaoGaleria() {
  const { projects, t } = useIdioma();
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t.gallery.filters.all },
    { id: 'projects', label: t.gallery.filters.projects },
    { id: 'creative', label: t.gallery.filters.creative },
    { id: 'tools', label: t.gallery.filters.tools },
  ];

  const filtered = filter === 'all' ? projects : projects.filter(item => item.category === filter);

  return (
    <>
      <div className={styles.faixaSuperior}>
        <FaixaAnimada text={t.gallery.marquee} reverse speed={70} />
      </div>

      <Secao id="projects">
        <div className={styles.cabecalho}>
          <TextoDividido
            lines={[t.gallery.titleLine1, t.gallery.titleLine2]}
            className={styles.tituloDividido}
          />
          <p className={styles.descCabecalho}>{t.gallery.description}</p>
        </div>

        <div className={styles.filtros}>
          {filters.map(f => (
            <button
              key={f.id}
              type="button"
              className={`${styles.botaoFiltro} ${filter === f.id ? styles.ativo : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <GrupoFocoHover>
          <motion.div layout className={styles.grade}>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <CartaoImagem item={item} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </GrupoFocoHover>
      </Secao>
    </>
  );
}
