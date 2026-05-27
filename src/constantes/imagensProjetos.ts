const BASE = '/assets/projetos'

function imagensDoProjeto(pasta: string, arquivos: string[]) {
  return arquivos.map((arquivo) => `${BASE}/${pasta}/${arquivo}`)
}

/** Imagens por projeto — adicione arquivos na pasta correspondente em public/assets/projetos/ */
export const IMAGENS_PROJETOS = {
  fincontrol: imagensDoProjeto('fincontrol', [
    '01-capa.webp',
    '02-login.webp',
    '03-dashboard.webp',
    '04-extrato-1.webp',
    '05-extrato-2.webp',
    '06-fatura.webp',
  ]),
  seakalm: imagensDoProjeto('seakalm', ['01-capa.webp']),
  sonorus: imagensDoProjeto('sonorus', ['01-capa.webp']),
  mario: imagensDoProjeto('mario', ['01-capa.webp', 'MarioGameOver.webp']),
  omsys: imagensDoProjeto('omsys', [
    '01-capa.png',
    'OmSysComercial.webp',
    'OmSysServicos.webp',
    'OmSysDocs.webp',
  ]),
} as const

export type IdProjetoComImagens = keyof typeof IMAGENS_PROJETOS
