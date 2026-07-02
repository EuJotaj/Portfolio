import type { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

interface ProvedorAplicacaoProps {
  children: ReactNode;
}

export function ProvedorAplicacao({ children }: ProvedorAplicacaoProps) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
