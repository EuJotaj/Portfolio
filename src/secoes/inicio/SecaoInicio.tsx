import { motion } from 'framer-motion'
import { Botao } from '@/componentes/ui/Botao'
import { FaixaAnimada } from '@/componentes/ui/FaixaAnimada'
import { SITE } from '@/constantes/site'
import { MAILTO } from '@/constantes/recursos'
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma'
import { useModalCurriculo } from '@/aplicativo/provedores/ProvedorModalCurriculo'
import { rolarParaSecao } from '@/biblioteca/rolarParaSecao'
import LogoJotaAnimado from './LogoJotaAnimadoAnimated'
import styles from './SecaoInicio.module.css'

export function SecaoInicio() {
  const { t } = useIdioma()
  const { abrirCurriculo } = useModalCurriculo()
  const [firstName, ...lastNameParts] = SITE.name.split(' ')
  const lastName = lastNameParts.join(' ')

  return (
    <section className={styles.inicio} id="hero">
      <div className={styles.inicioInterno}>
        <motion.div
          className={styles.logoInicio}
          initial={{ opacity: 0, scale: 0.82, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <LogoJotaAnimado className={styles.imagemLogo} />
        </motion.div>

        <motion.div
          className={styles.conteudo}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.65 }}
        >
          <h1 className={styles.titulo}>
            <span className={styles.linhaTitulo}>{firstName}</span>
            <span className={styles.linhaTitulo}>{lastName}</span>
          </h1>

          <p className={styles.subtitulo}>{t.hero.role}</p>

          <div className={styles.acoes}>
            <Botao href="#projects">{t.hero.viewProjects}</Botao>
            <Botao href={MAILTO} variant="outline">
              {t.hero.contactMe}
            </Botao>
            <Botao variant="outline" onClick={abrirCurriculo}>
              {t.hero.viewCv}
            </Botao>
          </div>
        </motion.div>
      </div>

      <div className={styles.envoltorioFaixa}>
        <FaixaAnimada text={`${SITE.brand} ${t.hero.marquee}`} speed={70} />
      </div>

      <a
        href="#experience"
        className={styles.dicaScroll}
        onClick={(e) => {
          e.preventDefault()
          rolarParaSecao('#experience')
        }}
      >
        <span>{t.hero.scroll}</span>
        <motion.div
          className={styles.linhaScroll}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </a>
    </section>
  )
}
