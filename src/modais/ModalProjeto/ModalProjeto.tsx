import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarrosselImagens } from '@/componentes/ui/CarrosselImagens';
import { useModalProjeto } from '@/aplicativo/provedores/ProvedorModalProjeto';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import { getProjectById } from '@/constantes/projetos';
import { cn } from '@/biblioteca/cn';
import styles from './ModalProjeto.module.css';

export function ModalProjeto() {
  const { idProjetoAtivo, fecharProjeto } = useModalProjeto();
  const { t } = useIdioma();
  const project = idProjetoAtivo ? getProjectById(idProjetoAtivo, t) : null;
  const isWebLayout = Boolean(project?.web || project?.playableUrl);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fecharProjeto();
    };
    if (idProjetoAtivo) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idProjetoAtivo, fecharProjeto]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className={styles.sobreposicao}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={fecharProjeto}
        >
          <motion.div
            className={cn(styles.modal, isWebLayout && styles.modalWeb)}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <button type="button" className={styles.botaoFechar} onClick={fecharProjeto}>
              ×
            </button>

            <div className={styles.midia}>
              <CarrosselImagens
                images={project.images}
                alt={project.title}
                resetKey={project.id}
                labels={{
                  prev: t.modal.carouselPrev,
                  next: t.modal.carouselNext,
                  slideOf: t.modal.slideOf,
                }}
              />
            </div>

            <div className={styles.corpo}>
              <div className={styles.meta}>
                <span className={styles.ano}>{project.year}</span>
              </div>
              <h2 id="project-modal-title" className={styles.titulo}>
                {project.title}
              </h2>
              <p className={styles.descricao}>{project.description}</p>
              {project.aviso && (
                <p className={styles.aviso} role="note">
                  <span className={styles.avisoRotulo}>{t.modal.securityNote}</span>
                  {project.aviso}
                </p>
              )}
              <div className={styles.etiquetas}>
                {project.tags.map(tag => (
                  <span key={tag} className={styles.etiqueta}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.acoes}>
                {project.githubPrivate ? (
                  <span className={styles.botaoDesabilitado}>{t.modal.privateRepo}</span>
                ) : project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.botaoAcao}
                  >
                    {t.modal.viewGithub}
                  </a>
                ) : null}
                {project.web && (
                  <a
                    href={project.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.botaoAcaoContorno}
                  >
                    {t.modal.viewWeb}
                  </a>
                )}
                {project.playableUrl && (
                  <a
                    href={project.playableUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.botaoAcaoContorno}
                  >
                    {t.modal.playProject}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
