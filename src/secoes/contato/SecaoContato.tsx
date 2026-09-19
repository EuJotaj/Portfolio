import { motion } from 'framer-motion';
import { Secao } from '@/componentes/layout/Secao';
import { Botao } from '@/componentes/ui/Botao';
import { GlassSurface } from '@/componentes/ui/GlassSurface/GlassSurface';
import { SpecularButton } from '@/componentes/ui/SpecularButton/SpecularButton';
import { SITE } from '@/constantes/site';
import { SOCIAL_LINKS } from '@/constantes/conteudo';
import { MAILTO } from '@/constantes/recursos';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import { useModalCurriculo } from '@/aplicativo/provedores/ProvedorModalCurriculo';
import styles from './SecaoContato.module.css';

export function SecaoContato() {
  const { t } = useIdioma();
  const { abrirCurriculo } = useModalCurriculo();

  return (
    <Secao id="contact">
      <GlassSurface
        className={styles.envoltorio}
        variant="soft"
        borderRadius={28}
        backgroundOpacity={0.08}
        blur={10}
      >
        <motion.div
          className={styles.conteudo}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sobrancelha}>{t.contact.eyebrow}</span>
          
          <div className={styles.corpoContato}>
            <div className={styles.blocoTexto}>
              <h2 className={styles.titulo}>
                <span className={styles.linhaTitulo}>{t.contact.titleLine1}</span>
                <span className={styles.linhaTitulo}>{t.contact.titleLine2}</span>
                <span className={`${styles.linhaTitulo} ${styles.destaque}`}>
                  {t.contact.titleLine3}
                </span>
              </h2>

              <p className={styles.descricao}>{t.contact.description}</p>
            </div>

            <div className={styles.blocoAcoes}>
              <div className={styles.acoes}>
                <Botao href={MAILTO}>{t.contact.cta}</Botao>
                <Botao href="#projects" variant="outline">
                  {t.contact.viewProjects}
                </Botao>
                <Botao variant="ghost" onClick={abrirCurriculo}>
                  {t.contact.downloadCv}
                </Botao>
              </div>

              <p className={styles.linhaEmail}>
                <span className={styles.rotuloEmail}>{t.contact.directEmail || 'E-mail direto:'}</span>{' '}
                <a href={MAILTO} className={styles.email}>
                  {SITE.email}
                </a>
              </p>
            </div>

            <motion.div
              className={styles.blocoSocial}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className={styles.tituloSocial}>{t.contact.socialTitle}</span>
              <div className={styles.listaSocial}>
                {SOCIAL_LINKS.filter(link => link.id !== 'email').map(link => (
                  <SpecularButton
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="md"
                    radius={10}
                    tint="#ffffff"
                    tintOpacity={0.04}
                    baseColor="#6f4db8"
                    lineColor="#d4b8ff"
                    textColor="#f4f0ff"
                    autoAnimate
                    className={styles.itemSocial}
                  >
                    <span className={styles.rotuloSocial}>{link.label}</span>
                    <span className={styles.handleSocial}>{link.handle}</span>
                    <span className={styles.seta}>↗</span>
                  </SpecularButton>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </GlassSurface>
    </Secao>
  );
}
