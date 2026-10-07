import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarrosselImagens } from '@/componentes/ui/CarrosselImagens';
import { useModalProjeto } from '@/aplicativo/provedores/ProvedorModalProjeto';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import { getProjectById } from '@/constantes/projetos';
import { cn } from '@/biblioteca/cn';
import type { GalleryItem } from '@/tipos';
import type { Translations } from '@/i18n';
import styles from './ModalProjeto.module.css';

function MidiaProjeto({ project, labels }: { project: GalleryItem; labels: Translations['modal'] }) {
  const [exibirVideo, setExibirVideo] = useState(Boolean(project.video));

  return (
    <div className={styles.midia}>
      {project.video && (
        <div className={styles.seletorMidia} aria-label={project.title}>
          <button
            type="button"
            className={cn(styles.opcaoMidia, exibirVideo && styles.opcaoMidiaAtiva)}
            onClick={() => setExibirVideo(true)}
            aria-pressed={exibirVideo}
          >
            {labels.viewVideo}
          </button>
          <button
            type="button"
            className={cn(styles.opcaoMidia, !exibirVideo && styles.opcaoMidiaAtiva)}
            onClick={() => setExibirVideo(false)}
            aria-pressed={!exibirVideo}
          >
            {labels.viewImages}
          </button>
        </div>
      )}
      {exibirVideo && project.video ? (
        <video
          className={styles.video}
          src={project.video}
          poster={project.image}
          controls
          playsInline
          preload="none"
          aria-label={`${labels.videoLabel}: ${project.title}`}
        />
      ) : (
        <CarrosselImagens
          images={project.images}
          alt={project.title}
          resetKey={project.id}
          labels={{
            prev: labels.carouselPrev,
            next: labels.carouselNext,
            slideOf: labels.slideOf,
          }}
        />
      )}
    </div>
  );
}

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

            <MidiaProjeto key={project.id} project={project} labels={t.modal} />

            <div className={styles.corpo}>
              <div className={styles.meta}>
                <span className={cn(styles.tagCategoria, styles[project.category])}>
                  {t.gallery.categories[project.category]?.tag ?? project.category}
                </span>
                <span className={styles.separadorMeta}>•</span>
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
