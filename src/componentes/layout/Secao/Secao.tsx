import type { ReactNode } from 'react'
import { cn } from '@/biblioteca/cn'
import styles from './Secao.module.css'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

export function Secao({ id, children, className, fullWidth }: SectionProps) {
  return (
    <section id={id} className={cn(styles.secao, fullWidth && styles.larguraTotal, className)}>
      <div className={styles.container}>{children}</div>
    </section>
  )
}
