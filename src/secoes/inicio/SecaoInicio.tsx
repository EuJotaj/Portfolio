import { useRef, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Botao } from '@/componentes/ui/Botao'
import { FaixaAnimada } from '@/componentes/ui/FaixaAnimada'
import { SITE, HERO_LOGO } from '@/constantes/site'
import { MAILTO } from '@/constantes/recursos'
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma'
import { useModalCurriculo } from '@/aplicativo/provedores/ProvedorModalCurriculo'
import { rolarParaSecao } from '@/biblioteca/rolarParaSecao'
import { cn } from '@/biblioteca/cn'
import styles from './SecaoInicio.module.css'

const SUAVIZACAO_POS = 0.14
const SUAVIZACAO_RAIO = 0.1

function raioAnel(largura: number, altura: number) {
  return Math.min(largura, altura) * 0.26 + 32
}

export function SecaoInicio() {
  const { t } = useIdioma()
  const { abrirCurriculo } = useModalCurriculo()
  const refLogo = useRef<HTMLDivElement>(null)
  const refImagem = useRef<HTMLImageElement>(null)
  const refAnel = useRef<HTMLSpanElement>(null)
  const animando = useRef(false)
  const hoverAtivo = useRef(false)
  const posAtual = useRef({ x: 0, y: 0 })
  const posAlvo = useRef({ x: 0, y: 0 })
  const raioAtual = useRef(0)
  const raioAlvo = useRef(0)
  const [logoAtiva, setLogoAtiva] = useState(false)
  const [firstName, ...lastNameParts] = SITE.name.split(' ')
  const lastName = lastNameParts.join(' ')

  const aplicarBolha = useCallback(() => {
    const anel = refAnel.current
    const imagem = refImagem.current
    if (!anel || !imagem) return

    const { x, y } = posAtual.current
    const raio = raioAtual.current

    anel.style.left = `${x}px`
    anel.style.top = `${y}px`
    anel.style.width = `${raio * 2}px`
    anel.style.height = `${raio * 2}px`
    anel.style.opacity = raio > 2 ? `${Math.min(1, raio / Math.max(raioAlvo.current, 1))}` : '0'
    imagem.style.transformOrigin = `${x}px ${y}px`
  }, [])

  const loopBolha = useCallback(() => {
    posAtual.current.x += (posAlvo.current.x - posAtual.current.x) * SUAVIZACAO_POS
    posAtual.current.y += (posAlvo.current.y - posAtual.current.y) * SUAVIZACAO_POS
    raioAtual.current += (raioAlvo.current - raioAtual.current) * SUAVIZACAO_RAIO

    aplicarBolha()

    const dx = Math.abs(posAlvo.current.x - posAtual.current.x)
    const dy = Math.abs(posAlvo.current.y - posAtual.current.y)
    const dr = Math.abs(raioAlvo.current - raioAtual.current)

    if (hoverAtivo.current || dx > 0.3 || dy > 0.3 || dr > 0.3) {
      requestAnimationFrame(loopBolha)
    } else {
      animando.current = false
    }
  }, [aplicarBolha])

  const iniciarAnimacao = useCallback(() => {
    if (!animando.current) {
      animando.current = true
      requestAnimationFrame(loopBolha)
    }
  }, [loopBolha])

  const posicionarBolha = (clientX: number, clientY: number) => {
    const el = refLogo.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    posAlvo.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  const aoEntrarMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    hoverAtivo.current = true
    setLogoAtiva(true)

    const el = refLogo.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    raioAlvo.current = raioAnel(rect.width, rect.height)
    posicionarBolha(e.clientX, e.clientY)
    iniciarAnimacao()
  }

  const aoMoverMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    posicionarBolha(e.clientX, e.clientY)
    iniciarAnimacao()
  }

  const aoSairMouse = () => {
    hoverAtivo.current = false
    setLogoAtiva(false)
    raioAlvo.current = 0
    refImagem.current?.style.setProperty('transform-origin', 'center center')
    iniciarAnimacao()
  }

  return (
    <section className={styles.inicio} id="hero">
      <div className={styles.inicioInterno}>
        <motion.div
          ref={refLogo}
          className={cn(styles.logoInicio, logoAtiva && styles.ativo)}
          onMouseEnter={aoEntrarMouse}
          onMouseMove={aoMoverMouse}
          onMouseLeave={aoSairMouse}
          initial={{ opacity: 0, scale: 0.82, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            ref={refImagem}
            src={HERO_LOGO}
            alt={SITE.brand}
            className={styles.imagemLogo}
          />
          <span ref={refAnel} className={styles.anelBolha} aria-hidden="true" />
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
