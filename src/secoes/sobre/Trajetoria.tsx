import { memo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FiArrowDown, FiPlus } from 'react-icons/fi';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import { EXPERIENCE_IDS } from '@/constantes/conteudo';
import styles from './Trajetoria.module.css';

type EtapaId = (typeof EXPERIENCE_IDS)[number];
const ETAPAS = {
  exp0: { type: 'work', year: '2026', status: 'current' },
  exp1: { type: 'work', year: '2025', status: 'completed' },
  exp2: { type: 'work', year: '2024', status: 'completed' },
  exp3: { type: 'learning', year: '2028', status: 'ongoing' },
  exp4: { type: 'learning', year: '2026', status: 'ongoing' },
} as const;

const FichaTrajetoria = memo(function FichaTrajetoria({ id }: { id: EtapaId }) {
  const { t } = useIdioma();
  const [aberta, setAberta] = useState(id === 'exp0');
  const ref = useRef<HTMLLIElement>(null);
  const visivel = useInView(ref, { margin: '120px 0px' });
  const reduzirMovimento = useReducedMotion();
  const item = t.experience[id];
  const meta = ETAPAS[id];
  const filtro = visivel ? 'blur(var(--career-glass-blur, 8px)) saturate(1.1)' : undefined;

  return (
    <li ref={ref} className={`${styles.etapa} ${aberta ? styles.etapaAberta : ''}`}>
      <div className={styles.data}>
        <span className={styles.ano}>{meta.year}</span>
        <span className={styles.ponto} aria-hidden="true" />
      </div>
      <div
        className={styles.vidro}
        style={{ backdropFilter: filtro, WebkitBackdropFilter: filtro }}
      >
        <article className={styles.ficha} aria-labelledby={`career-${id}-title`}>
          <div className={styles.topo}>
            <div className={styles.identidade}>
              <p className={styles.periodo}>{item.period}</p>
              <h4 id={`career-${id}-title`} className={styles.empresa}>
                {item.company}
              </h4>
              <p className={styles.cargo}>{item.role}</p>
            </div>
            <button
              type="button"
              className={styles.abrir}
              aria-expanded={aberta}
              aria-controls={`career-${id}-details`}
              aria-label={`${aberta ? t.trajectory.hideDetails : t.trajectory.details}: ${item.shortCompany}`}
              onClick={() => setAberta(valor => !valor)}
            >
              <FiPlus aria-hidden="true" />
            </button>
          </div>
          <div className={styles.metadados}>
            <span className={styles.status}>
              <span aria-hidden="true" />
              {t.trajectory[meta.status]}
            </span>
            <span className={styles.resumoTecnologias}>{item.skills.slice(0, 3).join(' · ')}</span>
          </div>
          <div id={`career-${id}-details`} hidden={!aberta}>
            {aberta && (
              <motion.div
                className={styles.detalhes}
                initial={{ opacity: 0, y: reduzirMovimento ? 0 : 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduzirMovimento ? 0 : 0.16 }}
              >
                <div className={styles.texto}>
                  <p>{item.description}</p>
                  <p className={styles.tecnologias}>
                    <span>{t.trajectory.skills}</span>
                    {item.skills.join(' · ')}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </article>
      </div>
    </li>
  );
});

export function Trajetoria() {
  const { t } = useIdioma();
  return (
    <section id="career" className={styles.trajetoria} aria-labelledby="trajectory-title">
      <div className={styles.ambiente} aria-hidden="true">
        <span className={styles.luzVioleta} />
        <span className={styles.luzAzul} />
        <span className={styles.arco} />
      </div>
      <header className={styles.cabecalho}>
        <h2 id="trajectory-title" className={styles.titulo}>
          {t.trajectory.title}
        </h2>
        <nav className={styles.atalhos} aria-label={t.trajectory.stages}>
          {(['work', 'learning'] as const).map(grupo => (
            <a key={grupo} href={`#career-${grupo}`}>
              {t.trajectory[grupo]}
              <FiArrowDown aria-hidden="true" />
            </a>
          ))}
        </nav>
      </header>
      {(['work', 'learning'] as const).map(grupo => (
        <section
          key={grupo}
          id={`career-${grupo}`}
          className={styles.grupo}
          aria-labelledby={`career-${grupo}-title`}
        >
          <div className={styles.tituloGrupo}>
            <h3 id={`career-${grupo}-title`}>{t.trajectory[grupo]}</h3>
            <span aria-hidden="true" />
          </div>
          <ol className={styles.sequencia}>
            {EXPERIENCE_IDS.filter(id => ETAPAS[id].type === grupo).map(id => (
              <FichaTrajetoria key={id} id={id} />
            ))}
          </ol>
        </section>
      ))}
    </section>
  );
}
