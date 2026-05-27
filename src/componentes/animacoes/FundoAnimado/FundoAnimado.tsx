import { useEffect, useRef } from 'react'
import { usePosicaoMouse } from '@/ganchos'
import styles from './FundoAnimado.module.css'

export function FundoAnimado() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { x, y } = usePosicaoMouse()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const orbs = container.querySelectorAll<HTMLElement>(`.${styles.orbe}`)
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const offsetX = (x - centerX) / centerX
    const offsetY = (y - centerY) / centerY

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 15
      orb.style.transform = `translate(${offsetX * factor}px, ${offsetY * factor}px)`
    })
  }, [x, y])

  return (
    <div ref={containerRef} className={styles.fundo} aria-hidden="true">
      <div className={`${styles.orbe} ${styles.orbe1}`} />
      <div className={`${styles.orbe} ${styles.orbe2}`} />
      <div className={`${styles.orbe} ${styles.orbe3}`} />
      <div className={styles.grade} />
      <div className={styles.ruido} />
    </div>
  )
}
