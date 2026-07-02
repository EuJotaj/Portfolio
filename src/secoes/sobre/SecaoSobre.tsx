import { motion } from 'framer-motion';
import { Secao } from '@/componentes/layout/Secao';
import { TextoDividido } from '@/componentes/ui/TextoDividido';
import { PilhaFotos } from '@/secoes/sobre/PilhaFotos';
import { STATS_VALUES, EXPERIENCE_IDS } from '@/constantes/conteudo';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import styles from './SecaoSobre.module.css';

export function SecaoSobre() {
  const { t } = useIdioma();

  return (
    <Secao id="experience">
      <div className={styles.grade}>
        <div className={styles.blocoTexto}>
          <TextoDividido
            lines={[t.about.titleLine1, t.about.titleLine2]}
            className={styles.tituloDividido}
          />

          <motion.p
            className={styles.descricao}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.about.description}
          </motion.p>

          <motion.blockquote
            className={styles.citacao}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            &ldquo;{t.about.quote}&rdquo;
          </motion.blockquote>

          <div className={styles.etiquetas}>
            {t.about.tags.map(tag => (
              <span key={tag} className={styles.etiqueta}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.colunaDireita}>
          <motion.div
            className={styles.blocoImagem}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <PilhaFotos />
          </motion.div>

          <div className={styles.linhaTempo}>
            {EXPERIENCE_IDS.map((expId, i) => {
              const exp = t.experience[expId];
              return (
                <motion.div
                  key={expId}
                  className={`${styles.itemLinhaTempo} ${i === 0 ? styles.ativo : ''}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className={styles.pontoLinhaTempo} />
                  <span className={styles.dataLinhaTempo}>{exp.period}</span>
                  <h3 className={styles.empresaLinhaTempo}>{exp.company}</h3>
                  <p className={styles.cargoLinhaTempo}>{exp.role}</p>
                  <p className={styles.descLinhaTempo}>{exp.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.estatisticas}>
        {STATS_VALUES.map((stat, i) => (
          <motion.div
            key={stat.id}
            className={styles.estatistica}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <span className={styles.valorEstatistica}>{stat.value}</span>
            <span className={styles.rotuloEstatistica}>{t.about.stats[stat.id]}</span>
          </motion.div>
        ))}
      </div>
    </Secao>
  );
}
