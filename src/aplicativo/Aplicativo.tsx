import { FundoAnimado } from '@/componentes/animacoes/FundoAnimado'
import { Cabecalho } from '@/componentes/layout/Cabecalho'
import { Rodape } from '@/componentes/layout/Rodape'
import { EnvoltorioTelaCarregamento } from '@/componentes/layout/TelaCarregamento'
import { SecaoInicio } from '@/secoes/inicio'
import { SecaoSobre } from '@/secoes/sobre'
import { SecaoGaleria } from '@/secoes/galeria'
import { SecaoVitrine } from '@/secoes/vitrine'
import { SecaoHabilidades } from '@/secoes/habilidades'
import { SecaoContato } from '@/secoes/contato'
import { ProvedorAplicacao } from '@/aplicativo/provedores/ProvedorAplicacao'
import { ProvedorIdioma } from '@/aplicativo/provedores/ProvedorIdioma'
import { ProvedorModalProjeto } from '@/aplicativo/provedores/ProvedorModalProjeto'
import { ProvedorModalCurriculo } from '@/aplicativo/provedores/ProvedorModalCurriculo'
import styles from './Aplicativo.module.css'

export function Aplicativo() {
  return (
    <ProvedorIdioma>
      <ProvedorModalProjeto>
        <ProvedorModalCurriculo>
          <ProvedorAplicacao>
            <EnvoltorioTelaCarregamento>
              <div className={styles.aplicativo}>
                <FundoAnimado />
                <Cabecalho />
                <main>
                  <SecaoInicio />
                  <SecaoSobre />
                  <SecaoGaleria />
                  <SecaoVitrine />
                  <SecaoHabilidades />
                  <SecaoContato />
                </main>
                <Rodape />
              </div>
            </EnvoltorioTelaCarregamento>
          </ProvedorAplicacao>
        </ProvedorModalCurriculo>
      </ProvedorModalProjeto>
    </ProvedorIdioma>
  )
}
