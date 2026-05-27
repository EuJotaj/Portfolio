import { useState } from 'react'
import { motion } from 'framer-motion'
import { Secao } from '@/componentes/layout/Secao'
import { TextoDividido } from '@/componentes/ui/TextoDividido'
import { CarrosselImagens } from '@/componentes/ui/CarrosselImagens'
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma'
import styles from './SecaoVitrine.module.css'

export function SecaoVitrine() {
  const { projects, t } = useIdioma()
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredThumb, setHoveredThumb] = useState<string | null>(null)
  const active = projects[activeIndex]

  if (!active) return null

  return (
    <Secao id="showcase">
      <div className={styles.cabecalho}>
        <TextoDividido lines={[t.showcase.titleLine1, t.showcase.titleLine2]} className={styles.tituloDividido} />
        <p className={styles.descCabecalho}>{t.showcase.description}</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.visualizacao}>
          <CarrosselImagens
            images={active.images}
            alt={active.title}
            resetKey={active.id}
            ajustarImagem
            className={styles.carrosselVisualizacao}
            labels={{
              prev: t.modal.carouselPrev,
              next: t.modal.carouselNext,
              slideOf: t.modal.slideOf,
            }}
          />
          <div className={styles.sobreposicaoVisualizacao}>
            <span className={styles.rotuloVisualizacao}>{active.title}</span>
          </div>
        </div>

        <div className={styles.miniaturas}>
          {projects.map((item, i) => {
            const isHovered = hoveredThumb === item.id
            const isActive = activeIndex === i

            return (
              <motion.button
                key={item.id}
                type="button"
                className={`${styles.miniatura} ${isActive ? styles.miniaturaAtiva : ''}`}
                onMouseEnter={() => {
                  setHoveredThumb(item.id)
                  setActiveIndex(i)
                }}
                onMouseLeave={() => setHoveredThumb(null)}
                animate={{
                  scale: isHovered ? 1.05 : isActive ? 1.02 : 1,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.envoltorioMiniatura}>
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className={styles.imagemMiniatura}
                    animate={{
                      opacity: isHovered && item.images.length > 1 ? 0 : 1,
                      scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {item.images.length > 1 && (
                    <motion.img
                      src={item.hoverImage}
                      alt={`${item.title} preview`}
                      className={styles.imagemMiniaturaHover}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </div>
                <span className={styles.rotuloMiniatura}>{item.title}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </Secao>
  )
}
