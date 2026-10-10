import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalCurriculo } from '@/aplicativo/provedores/ProvedorModalCurriculo';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import { useConsultaMidia } from '@/ganchos/useConsultaMidia';
import { ASSETS } from '@/constantes/recursos';
import type { Locale } from '@/i18n';
import styles from './ModalCurriculo.module.css';

export function ModalCurriculo() {
  const { estaAberto, fecharCurriculo } = useModalCurriculo();
  const { t, locale } = useIdioma();
  const [perfil, setPerfil] = useState<keyof typeof ASSETS.cv>('frontend');
  const [idiomaPdf, setIdiomaPdf] = useState<Locale>(locale);
  const modalRef = useRef<HTMLDivElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const isMobile = useConsultaMidia('(max-width: 600px)');

  useEffect(() => {
    if (estaAberto) setIdiomaPdf(locale);
  }, [estaAberto, locale]);

  useEffect(() => {
    if (!estaAberto) return;
    const focoAnterior =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    fecharRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fecharCurriculo();
      if (e.key !== 'Tab') return;
      const controles = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], select, iframe'
      );
      if (!controles?.length) return;
      const primeiro = controles[0];
      const ultimo = controles[controles.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      focoAnterior?.focus();
    };
  }, [estaAberto, fecharCurriculo]);

  const cvPath = ASSETS.cv[perfil][idiomaPdf];
  const tituloPdf = `${t.cvModal.title} · ${t.cvModal.profiles[perfil]} · ${t.cvModal.languages[idiomaPdf]}`;
  const downloadName = `${idiomaPdf === 'en' ? 'Resume' : 'Curriculo'}-Janildo-Junior-${perfil}-${idiomaPdf}.pdf`;

  return (
    <AnimatePresence>
      {estaAberto && (
        <motion.div
          className={styles.sobreposicao}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={fecharCurriculo}
        >
          <motion.div
            ref={modalRef}
            className={styles.modal}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={t.cvModal.title}
          >
            <header className={styles.cabecalho}>
              <h2 className={styles.titulo}>{t.cvModal.title}</h2>
              <div className={styles.acoesCabecalho}>
                {!isMobile && (
                  <a href={cvPath} download={downloadName} className={styles.botaoDownload}>
                    {t.cvModal.download}
                  </a>
                )}
                <button
                  ref={fecharRef}
                  type="button"
                  className={styles.botaoFechar}
                  onClick={fecharCurriculo}
                  aria-label={t.cvModal.close}
                >
                  ×
                </button>
              </div>
            </header>

            <div className={styles.selecao}>
              <p className={styles.descricao}>{t.cvModal.description}</p>
              <div className={styles.campos}>
                <label className={styles.campo}>
                  <span>{t.cvModal.profile}</span>
                  <select
                    value={perfil}
                    onChange={e => setPerfil(e.target.value as keyof typeof ASSETS.cv)}
                  >
                    <option value="frontend">{t.cvModal.profiles.frontend}</option>
                    <option value="fullstack">{t.cvModal.profiles.fullstack}</option>
                  </select>
                </label>
                <label className={styles.campo}>
                  <span>{t.cvModal.language}</span>
                  <select value={idiomaPdf} onChange={e => setIdiomaPdf(e.target.value as Locale)}>
                    <option value="pt">{t.cvModal.languages.pt}</option>
                    <option value="en">{t.cvModal.languages.en}</option>
                  </select>
                </label>
              </div>
            </div>

            {isMobile ? (
              <div className={styles.fallbackMobile}>
                <div className={styles.iconeMobile} aria-hidden="true">
                  ⤓
                </div>
                <p className={styles.textoMobile}>{tituloPdf}</p>
                <a href={cvPath} download={downloadName} className={styles.botaoMobile}>
                  ⤓ {t.cvModal.download}
                </a>
                <a
                  href={cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.botaoAbrirMobile}
                >
                  {t.cvModal.openInNewTab}
                </a>
              </div>
            ) : (
              <iframe
                key={cvPath}
                src={`${cvPath}#toolbar=0`}
                title={tituloPdf}
                className={styles.quadro}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
