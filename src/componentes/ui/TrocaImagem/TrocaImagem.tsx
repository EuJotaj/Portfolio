import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/biblioteca/cn';
import styles from './TrocaImagem.module.css';

interface TrocaImagemProps {
  primary: string;
  secondary: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  reveal?: 'clip' | 'fade' | 'both';
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain';
}

export function TrocaImagem({
  primary,
  secondary,
  alt,
  className,
  aspectRatio,
  reveal = 'both',
  loading = 'lazy',
  objectFit = 'cover',
}: TrocaImagemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(styles.envoltorio, objectFit === 'contain' && styles.conter, className)}
      style={aspectRatio ? { aspectRatio } : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.pilhaImagens}>
        <motion.img
          src={primary}
          alt={alt}
          className={cn(styles.imagem, styles.primario)}
          loading={loading}
          animate={{
            opacity: hovered && reveal !== 'clip' ? 0 : 1,
            scale: hovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.img
          src={secondary}
          alt={`${alt} — preview`}
          className={cn(styles.imagem, styles.secundaria)}
          loading={loading}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 1.08,
            clipPath:
              hovered && (reveal === 'clip' || reveal === 'both')
                ? 'ellipse(120% 120% at 50% 50%)'
                : 'ellipse(0% 0% at 50% 50%)',
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <motion.div
        className={styles.brilhoSuave}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? '100%' : '-100%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
