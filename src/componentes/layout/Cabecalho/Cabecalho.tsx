import { useCallback, useEffect, useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { NAV_ITEMS } from '@/constantes/navegacao'
import { SITE } from '@/constantes/site'
import { MAILTO } from '@/constantes/recursos'
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma'
import { SeletorIdioma } from '@/componentes/ui/SeletorIdioma'
import { useProgressoScroll } from '@/ganchos'
import { bloquearScrollCorpo, resetarScrollCorpo, desbloquearScrollCorpo } from '@/biblioteca/bloqueioScrollCorpo'
import { rolarParaSecao } from '@/biblioteca/rolarParaSecao'
import styles from './Cabecalho.module.css'

export function Cabecalho() {
  const { t } = useIdioma()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollProgress = useProgressoScroll()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      bloquearScrollCorpo()
      return () => desbloquearScrollCorpo()
    }
  }, [menuOpen])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 901px)')
    const handleResize = () => {
      if (media.matches) {
        setMenuOpen(false)
        resetarScrollCorpo()
      }
    }
    media.addEventListener('change', handleResize)
    return () => media.removeEventListener('change', handleResize)
  }, [])

  const handleNavClick = useCallback((event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false)
    resetarScrollCorpo()

    if (!href.startsWith('#')) return

    event.preventDefault()
    rolarParaSecao(href)
  }, [])

  return (
    <>
      <header className={`${styles.cabecalho} ${scrolled ? styles.rolado : ''}`}>
        <div className={styles.interno}>
          <a
            href="#hero"
            className={styles.logo}
            onClick={(e) => handleNavClick(e, '#hero')}
          >
            {SITE.brand}
          </a>

          <nav className={styles.navegacao} aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={styles.linkNav}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {t.nav[item.labelKey]}
              </a>
            ))}
          </nav>

          <div className={styles.acoes}>
            <SeletorIdioma />
            <a href={MAILTO} className={styles.botaoEmail} aria-label="Email">
              ✉
            </a>
            <button
              type="button"
              className={`${styles.botaoMenu} ${menuOpen ? styles.aberto : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={styles.barraProgresso}>
          <div className={styles.preenchimentoProgresso} style={{ width: `${scrollProgress * 100}%` }} />
        </div>
      </header>

      <motion.div
        className={`${styles.menuMobile} ${menuOpen ? styles.menuMobileAberto : ''}`}
        initial={false}
        animate={menuOpen ? { x: 0 } : { x: '100%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.navMobile}>
          <SeletorIdioma />
          {NAV_ITEMS.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.href}
              className={styles.linkMobile}
              onClick={(e) => handleNavClick(e, item.href)}
              initial={{ opacity: 0, x: 40 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: menuOpen ? i * 0.08 : 0 }}
            >
              {t.nav[item.labelKey]}
            </motion.a>
          ))}
          <a
            href={MAILTO}
            className={styles.emailMobile}
            onClick={() => {
              setMenuOpen(false)
              resetarScrollCorpo()
            }}
          >
            ✉ {SITE.email}
          </a>
        </nav>
      </motion.div>
    </>
  )
}
