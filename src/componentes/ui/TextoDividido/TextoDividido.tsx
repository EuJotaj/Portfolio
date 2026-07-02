import { motion } from 'framer-motion';
import { useVisivel } from '@/ganchos';
import styles from './TextoDividido.module.css';

interface TextoDivididoProps {
  lines: string[];
  className?: string;
}

export function TextoDividido({ lines, className }: TextoDivididoProps) {
  const [ref, isInView] = useVisivel<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div ref={ref} className={`${styles.container} ${className ?? ''}`}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className={styles.linha}>
          {line.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className={styles.caractere}
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: lineIndex * 0.1 + charIndex * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}
