import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/biblioteca/cn';
import styles from './Botao.module.css';

type VarianteBotao = 'primary' | 'outline' | 'ghost';

const variantes: Record<VarianteBotao, string> = {
  primary: styles.primario,
  outline: styles.contorno,
  ghost: styles.fantasma,
};

interface BotaoProps {
  children: ReactNode;
  href?: string;
  variant?: VarianteBotao;
  className?: string;
  onClick?: () => void;
}

export function Botao({ children, href, variant = 'primary', className, onClick }: BotaoProps) {
  const classes = cn(styles.botao, variantes[variant], className);

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={classes}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
