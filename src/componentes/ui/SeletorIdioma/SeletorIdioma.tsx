import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma'
import styles from './SeletorIdioma.module.css'

export function SeletorIdioma() {
  const { locale, definirIdioma } = useIdioma()

  return (
    <div className={styles.seletor} role="group" aria-label="Language">
      <button
        type="button"
        className={`${styles.botao} ${locale === 'pt' ? styles.ativo : ''}`}
        onClick={() => definirIdioma('pt')}
      >
        PT
      </button>
      <button
        type="button"
        className={`${styles.botao} ${locale === 'en' ? styles.ativo : ''}`}
        onClick={() => definirIdioma('en')}
      >
        EN
      </button>
    </div>
  )
}
