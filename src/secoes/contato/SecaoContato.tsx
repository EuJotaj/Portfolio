import { motion } from 'framer-motion'
import { Secao } from '@/componentes/layout/Secao'
import { Botao } from '@/componentes/ui/Botao'
import { SITE } from '@/constantes/site'
import { SOCIAL_LINKS } from '@/constantes/conteudo'
import { MAILTO } from '@/constantes/recursos'
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma'
import { useModalCurriculo } from '@/aplicativo/provedores/ProvedorModalCurriculo'
import styles from './SecaoContato.module.css'

export function SecaoContato() {
  const { t } = useIdioma()
  const { abrirCurriculo } = useModalCurriculo()

  return (
    <Secao id="contact">
      <div className={styles.envoltorio}>
        <motion.div
          className={styles.conteudo}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sobrancelha}>{t.contact.eyebrow}</span>
          <h2 className={styles.titulo}>
            <span className={styles.linhaTitulo}>{t.contact.titleLine1}</span>
            <span className={styles.linhaTitulo}>{t.contact.titleLine2}</span>
            <span className={`${styles.linhaTitulo} ${styles.destaque}`}>{t.contact.titleLine3}</span>
          </h2>
          <p className={styles.descricao}>{t.contact.description}</p>

          <div className={styles.acoes}>
            <Botao href={MAILTO}>{t.contact.cta}</Botao>
            <Botao href="#projects" variant="outline">
              {t.contact.viewProjects}
            </Botao>
            <Botao variant="outline" onClick={abrirCurriculo}>
              {t.contact.downloadCv}
            </Botao>
          </div>

          <a href={MAILTO} className={styles.email}>
            {SITE.email}
          </a>
        </motion.div>

        <motion.div
          className={styles.blocoSocial}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={styles.tituloSocial}>{t.contact.socialTitle}</span>
          <div className={styles.listaSocial}>
            {SOCIAL_LINKS.filter((link) => link.id !== 'email').map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.itemSocial}
              >
                <span>{link.label}</span>
                <span className={styles.seta}>→</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </Secao>
  )
}
