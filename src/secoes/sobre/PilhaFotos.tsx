import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma'
import { PHOTO_STACK_PROJECT_IDS } from '@/constantes/projetos'
import { useConsultaMidia } from '@/ganchos/useConsultaMidia'
import styles from './PilhaFotos.module.css'

const STACK_LAYOUT = [
  { rotation: -6, offsetX: 0, offsetY: 0, zIndex: 3 },
  { rotation: 4, offsetX: 60, offsetY: 40, zIndex: 2 },
  { rotation: -3, offsetX: -50, offsetY: 80, zIndex: 1 },
  { rotation: 7, offsetX: 30, offsetY: 120, zIndex: 4 },
] as const

export function PilhaFotos() {
  const { projects } = useIdioma()
  const [activeId, setActiveId] = useState<string | null>(null)
  const isMobile = useConsultaMidia('(max-width: 600px)')

  const stackItems = PHOTO_STACK_PROJECT_IDS.map((id, index) => {
    const project = projects.find((p) => p.id === id)
    const layout = STACK_LAYOUT[index]
    if (!project || !layout) return null
    return { project, ...layout }
  }).filter((item): item is NonNullable<typeof item> => item !== null)

  return (
    <div className={isMobile ? styles.gradePilha : styles.pilha}>
      {stackItems.map(({ project, rotation, offsetX, offsetY, zIndex }) => {
        const isActive = activeId === project.id
        const isDimmed = !isMobile && activeId !== null && !isActive
        const displayImage =
          isActive && project.images.length > 1 ? project.images[1] : project.images[0]

        const desktopAnimate = {
          x: offsetX,
          y: offsetY + (isActive ? -20 : 0),
          scale: isActive ? 1.12 : isDimmed ? 0.88 : 1,
          opacity: isDimmed ? 0.4 : 1,
          rotate: isActive ? 0 : rotation,
        }

        const mobileAnimate = {
          x: 0,
          y: 0,
          scale: isActive ? 1.02 : 1,
          opacity: 1,
          rotate: 0,
        }

        return (
          <motion.figure
            key={project.id}
            className={styles.foto}
            style={{ zIndex: isActive ? 20 : zIndex }}
            animate={isMobile ? mobileAnimate : desktopAnimate}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setActiveId(project.id)}
            onMouseLeave={() => setActiveId(null)}
            onTouchStart={() => setActiveId(project.id)}
          >
            <div className={styles.envoltorioImagem}>
              <motion.img
                key={displayImage}
                src={displayImage}
                alt={project.title}
                className={styles.imagem}
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
              <motion.div
                className={styles.brilho}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.figcaption
              className={styles.legenda}
              animate={
                isMobile
                  ? { opacity: 1, y: 0 }
                  : { opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }
              }
              transition={{ duration: 0.3 }}
            >
              {project.title}, {project.year}
            </motion.figcaption>
          </motion.figure>
        )
      })}
    </div>
  )
}
