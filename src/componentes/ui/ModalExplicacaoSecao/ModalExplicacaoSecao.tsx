import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconeCategoria } from '@/componentes/ui/IconeCategoria';
import type { CategoryExplanation } from '@/i18n/types';
import type { ProjectCategory } from '@/tipos';
import styles from './ModalExplicacaoSecao.module.css';

interface ModalExplicacaoSecaoProps {
  categoria: ProjectCategory;
  dados: CategoryExplanation;
  rotuloAria?: string;
  rotuloOQueInclui?: string;
  className?: string;
}

export function ModalExplicacaoSecao({
  categoria,
  dados,
  rotuloAria = 'Informações sobre a seção',
  rotuloOQueInclui = 'O que você encontra aqui:',
  className = '',
}: ModalExplicacaoSecaoProps) {
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fecharTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const cancelarFechamento = useCallback(() => {
    if (fecharTimeoutRef.current) {
      clearTimeout(fecharTimeoutRef.current);
      fecharTimeoutRef.current = null;
    }
  }, []);

  const agendarFechamento = useCallback(() => {
    cancelarFechamento();
    fecharTimeoutRef.current = setTimeout(() => {
      setAberto(false);
    }, 220);
  }, [cancelarFechamento]);

  const handleMouseEnter = () => {
    cancelarFechamento();
    setAberto(true);
  };

  const handleMouseLeave = () => {
    agendarFechamento();
  };

  const alternarClique = () => {
    cancelarFechamento();
    setAberto(prev => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && aberto) {
        setAberto(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setAberto(false);
      }
    };

    if (aberto) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [aberto]);

  useEffect(() => {
    return () => cancelarFechamento();
  }, [cancelarFechamento]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`${styles.botaoAjuda} ${styles[categoria]} ${aberto ? styles.ativo : ''}`}
        onClick={alternarClique}
        aria-expanded={aberto}
        aria-controls={tooltipId}
        aria-label={`${rotuloAria}: ${dados.title}`}
      >
        <span className={styles.simbolo}>?</span>
      </button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            id={tooltipId}
            role="dialog"
            aria-label={dados.title}
            className={`${styles.miniModal} ${styles[categoria]}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={cancelarFechamento}
            onMouseLeave={agendarFechamento}
          >
            <div className={styles.cabecalho}>
              <div className={styles.emblema}>
                <span className={styles.icone}>
                  <IconeCategoria categoria={categoria} size={16} />
                </span>
                <span className={styles.badge}>{dados.badge}</span>
              </div>
              <button
                type="button"
                className={styles.botaoFechar}
                onClick={() => setAberto(false)}
                aria-label="Fechar"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <h4 className={styles.titulo}>{dados.title}</h4>
            <p className={styles.descricao}>{dados.description}</p>

            {dados.scope && dados.scope.length > 0 && (
              <div className={styles.secaoEscopo}>
                <span className={styles.rotuloEscopo}>{rotuloOQueInclui}</span>
                <ul className={styles.listaEscopo}>
                  {dados.scope.map((item, idx) => (
                    <li key={idx} className={styles.itemEscopo}>
                      <span className={styles.marcador}>
                        <svg
                          width="6"
                          height="6"
                          viewBox="0 0 10 10"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <circle cx="5" cy="5" r="4" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.indicadorSeta} aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
