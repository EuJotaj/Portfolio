import { SITE } from '@/constantes/site'
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma'
import styles from './Rodape.module.css'

export function Rodape() {
  const { t } = useIdioma()
  const year = new Date().getFullYear()

  return (
    <footer className={styles.rodape}>
      <div className={styles.interno}>
        <h2 className={styles.marca}>{SITE.brand}</h2>
        <p className={styles.slogan}>{t.footer.tagline}</p>
        <p className={styles.direitos}>
          © {year} {SITE.name}. {t.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
