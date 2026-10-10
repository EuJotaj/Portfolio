# JOTA — Portfólio React

Landing page em React inspirada no [landonorris.com](https://landonorris.com), com identidade visual e conteúdo do portfólio [eujotaj.github.io/Portfolio](https://eujotaj.github.io/Portfolio/).

## Stack

- React 19 + TypeScript
- Vite
- Framer Motion
- CSS Modules

## Conteúdo

Dados reais de **Janildo Júnior (JOTA)**:

- Projetos: Motion Studio, FinControl, SeaKalm, Sonorus, Mario Jump, ERP B2B PROFISSIONAL e Aventura das Letras (IMIP)
- Trajetória: Prefeitura da Cidade do Paulista, Ômega Comércio Exterior & Logística, Exército Brasileiro, UNINASSAU e formação AWS no Projeto Start / Rede Cidadã
- Contato: jjcalluete@gmail.com
- Links: [GitHub](https://github.com/EuJotaj) · [LinkedIn](https://www.linkedin.com/in/janildocfariasjunior/)

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Personalização

| Arquivo | Conteúdo |
|---------|----------|
| `src/constantes/site.ts` | Nome e dados do site |
| `src/constantes/conteudo.ts` | Skills, redes sociais e ordem da trajetória |
| `src/i18n/locales/pt.ts` e `en.ts` | Conteúdo e trajetória em português e inglês |
| `src/constantes/recursos.ts` | Caminhos dos currículos e links |
| `public/assets/img/` | Fotos dos projetos e logo |

## Currículos

O painel aberto pelos botões de currículo permite escolher Front-end ou Full-stack e o idioma do PDF, independentemente do idioma do site. Em telas grandes, o documento é exibido no painel; no celular, ficam disponíveis as opções de baixar ou abrir em nova aba.

| Perfil | Português (original fornecido) | Inglês (tradução) |
|--------|-------------------------------|------------------|
| Front-end | `public/CVJota.pdf` | `public/CVJota-en.pdf` |
| Full-stack | `public/CVJota-fullstack.pdf` | `public/CVJota-fullstack-en.pdf` |

Os PDFs em inglês preservam o conteúdo dos originais, incluindo o estágio iniciado em setembro de 2026, a graduação prevista para novembro de 2028 e a formação AWS em andamento com conclusão prevista para janeiro de 2027.

## Carregamento e cache

O preloader acompanha a conclusão do documento, das fontes e das imagens sem `loading="lazy"`, incluindo sua decodificação. Vídeos, PDFs e imagens lazy não bloqueiam a abertura. O percentual representa recursos concluídos, não bytes transferidos, e não há espera mínima artificial.

Após concluir a primeira carga, a chave `jota:initial-load-complete` no `localStorage` evita o preloader nas visitas seguintes e em novas abas do mesmo navegador. Limpar os dados do site ou usar outro navegador inicia uma nova primeira visita. Se o armazenamento estiver bloqueado, o conteúdo continua acessível. Uma espera máxima de 12 segundos libera o site em caso de falha de rede, sem registrar essa carga incompleta como concluída.

Na Vercel, o HTML pode ser armazenado, mas é revalidado em cada acesso. Os arquivos em `/assets/` têm cache de um dia e revalidação em segundo plano. O navegador administra e pode descartar esse cache. As regras de cache entram em vigor no próximo deploy; o servidor de desenvolvimento não aplica `vercel.json`.

## Repositório original

Portfólio estático: [github.com/EuJotaj/Portfolio](https://github.com/EuJotaj/Portfolio)
