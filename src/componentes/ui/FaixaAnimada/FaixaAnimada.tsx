import { motion } from 'framer-motion'
import styles from './FaixaAnimada.module.css'

interface FaixaAnimadaProps {
  text: string
  speed?: number
  reverse?: boolean
}

export function FaixaAnimada({ text, speed = 65, reverse = false }: FaixaAnimadaProps) {
  const repeated = Array(6).fill(text).join(' — ')

  return (
    <div className={styles.envoltorio} aria-hidden="true">
      <motion.div
        className={styles.trilha}
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        <span className={styles.texto}>{repeated}</span>
        <span className={styles.texto}>{repeated}</span>
      </motion.div>
    </div>
  )
}
