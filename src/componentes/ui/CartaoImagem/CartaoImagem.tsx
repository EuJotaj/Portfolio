import { motion } from 'framer-motion';
import { TrocaImagem } from '@/componentes/ui/TrocaImagem';
import { useFocoHover } from '@/componentes/ui/GrupoFocoHover';
import { useModalProjeto } from '@/aplicativo/provedores/ProvedorModalProjeto';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import type { GalleryItem } from '@/tipos';
import styles from './CartaoImagem.module.css';

interface CartaoImagemProps {
  item: GalleryItem;
  index: number;
}

export function CartaoImagem({ item, index }: CartaoImagemProps) {
  const { activeId, setActiveId } = useFocoHover();
  const { abrirProjeto } = useModalProjeto();
  const { t } = useIdioma();
  const isActive = activeId === item.id;
  const isDimmed = activeId !== null && !isActive;

  const categoriaInfo = t.gallery.categories[item.category];
  const rotuloCategoria = categoriaInfo?.tag ?? item.category;

  return (
    <motion.article
      className={styles.cartao}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      animate={{
        scale: isActive ? 1.04 : isDimmed ? 0.94 : 1,
        opacity: isDimmed ? 0.45 : 1,
        y: isActive ? -12 : 0,
      }}
      onMouseEnter={() => setActiveId(item.id)}
      onMouseLeave={() => setActiveId(null)}
      style={{ zIndex: isActive ? 10 : 1 }}
    >
      <button
        type="button"
        className={styles.link}
        onClick={() => abrirProjeto(item.id)}
        aria-label={item.title}
      >
        <div className={styles.envoltorioImagem}>
          <TrocaImagem
            primary={item.image}
            secondary={item.hoverImage}
            alt={item.title}
            className={styles.troca}
          />

          <div className={`${styles.badgeCategoriaTopo} ${styles[item.category]}`}>
            {rotuloCategoria}
          </div>

          <motion.div
            className={styles.sobreposicao}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.etiquetas}>
              <span
                className={`${styles.etiqueta} ${styles.etiquetaCategoria} ${styles[item.category]}`}
              >
                {rotuloCategoria}
              </span>
              {item.tags.map(tag => (
                <span key={tag} className={styles.etiqueta}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            className={styles.bordaBrilho}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.metaCabecalho}>
            <span className={`${styles.tagCategoriaTexto} ${styles[item.category]}`}>
              {rotuloCategoria}
            </span>
            <span className={styles.separadorMeta}>•</span>
            <span className={styles.ano}>{item.year}</span>
          </div>
          <motion.h3
            className={styles.titulo}
            animate={{ color: isActive ? 'var(--color-accent)' : 'var(--color-text)' }}
            transition={{ duration: 0.3 }}
          >
            {item.title}
          </motion.h3>
          <p className={styles.descricao}>{item.shortDescription}</p>
        </div>
      </button>
    </motion.article>
  );
}
