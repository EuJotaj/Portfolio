import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useModalCurriculo } from '@/aplicativo/provedores/ProvedorModalCurriculo'
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma'
import { useConsultaMidia } from '@/ganchos/useConsultaMidia'
import styles from './ModalCurriculo.module.css'

export function ModalCurriculo() {
  const { estaAberto, fecharCurriculo } = useModalCurriculo()
  const { t, cvPath, locale } = useIdioma()
  const isMobile = useConsultaMidia('(max-width: 600px)')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fecharCurriculo()
    }
    if (estaAberto) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [estaAberto, fecharCurriculo])

  const downloadName = locale === 'en' ? 'Resume-Janildo-Junior.pdf' : 'CV-Janildo-Junior.pdf'

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
            className={styles.modal}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
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
                  type="button"
                  className={styles.botaoFechar}
                  onClick={fecharCurriculo}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </header>

            {isMobile ? (
              <div className={styles.fallbackMobile}>
                <div className={styles.iconeMobile} aria-hidden="true">
                  ⤓
                </div>
                <p className={styles.textoMobile}>{t.cvModal.title}</p>
                <a
                  href={cvPath}
                  download={downloadName}
                  className={styles.botaoMobile}
                >
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
                src={`${cvPath}#toolbar=0`}
                title={t.cvModal.title}
                className={styles.quadro}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
