import { motion } from 'framer-motion';
import { Secao } from '@/componentes/layout/Secao';
import { TextoDividido } from '@/componentes/ui/TextoDividido';
import { SKILLS, TECH_MARQUEE } from '@/constantes/conteudo';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import styles from './SecaoHabilidades.module.css';

export function SecaoHabilidades() {
  const { t } = useIdioma();

  return (
    <Secao id="stack">
      <div className={styles.cabecalho}>
        <TextoDividido
          lines={[t.skills.titleLine1, t.skills.titleLine2]}
          className={styles.tituloDividido}
        />
      </div>

      <div className={styles.gradeHabilidades}>
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.id}
            className={styles.cartaoHabilidade}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className={styles.cabecalhoHabilidade}>
              <span className={styles.nomeHabilidade}>{skill.name}</span>
              <span className={styles.nivelHabilidade}>{skill.level}%</span>
            </div>
            <div className={styles.barraHabilidade}>
              <motion.div
                className={styles.preenchimentoHabilidade}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className={styles.categoriaHabilidade}>
              {t.skills.categories[skill.category]}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.techFaixaAnimada}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className={styles.trilhaTech}>
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
            <span key={`${tech}-${i}`} className={styles.itemTech}>
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </Secao>
  );
}
