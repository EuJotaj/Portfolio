import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Secao } from '@/componentes/layout/Secao';
import { TextoDividido } from '@/componentes/ui/TextoDividido';
import { FaixaAnimada } from '@/componentes/ui/FaixaAnimada';
import { ModalExplicacaoSecao } from '@/componentes/ui/ModalExplicacaoSecao';
import { IconeCategoria } from '@/componentes/ui/IconeCategoria';
import { GlassSurface } from '@/componentes/ui/GlassSurface/GlassSurface';
import { SpecularButton } from '@/componentes/ui/SpecularButton/SpecularButton';
import { Masonry, type MasonryItem } from '@/componentes/ui/Masonry';
import { useModalProjeto } from '@/aplicativo/provedores/ProvedorModalProjeto';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import type { ProjectCategory } from '@/tipos';
import styles from './SecaoGaleria.module.css';

type Filter = 'all' | ProjectCategory;

const CATEGORIAS_ORDENADAS: ProjectCategory[] = ['profissionais', 'portfolio', 'estudos'];

const METADADOS_SUBSECOES: Record<ProjectCategory, { numero: string }> = {
  profissionais: { numero: '01' },
  portfolio: { numero: '02' },
  estudos: { numero: '03' },
};

export function SecaoGaleria() {
  const { projects, t } = useIdioma();
  const { abrirProjeto } = useModalProjeto();
  const [filter, setFilter] = useState<Filter>('all');

  const contagemPorCategoria = CATEGORIAS_ORDENADAS.reduce(
    (acc, cat) => {
      acc[cat] = projects.filter(item => item.category === cat).length;
      return acc;
    },
    {} as Record<ProjectCategory, number>
  );

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: t.gallery.filters.all, count: projects.length },
    {
      id: 'profissionais',
      label: t.gallery.filters.profissionais,
      count: contagemPorCategoria.profissionais,
    },
    {
      id: 'portfolio',
      label: t.gallery.filters.portfolio,
      count: contagemPorCategoria.portfolio,
    },
    {
      id: 'estudos',
      label: t.gallery.filters.estudos,
      count: contagemPorCategoria.estudos,
    },
  ];

  const projetosFiltrados = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter(item => item.category === filter);
  }, [filter, projects]);

  const masonryItems: MasonryItem[] = useMemo(() => {
    // Variação de altura para efeito dinâmico do Masonry React Bits
    const multiplicadores: Record<string, number> = {
      fincontrol: 1.06,
      seakalm: 0.95,
      sonorus: 1.02,
      mario: 0.97,
      omsys: 1.08,
      imip: 1.04,
    };

    return projetosFiltrados.map(item => ({
      ...item,
      heightMultiplier: multiplicadores[item.id] ?? 1,
    }));
  }, [projetosFiltrados]);

  const categoriaAtiva = filter !== 'all' ? filter : null;
  const dadosCategoriaAtiva = categoriaAtiva ? t.gallery.categories[categoriaAtiva] : null;
  const metaCategoriaAtiva = categoriaAtiva ? METADADOS_SUBSECOES[categoriaAtiva] : null;

  return (
    <>
      <div className={styles.faixaSuperior}>
        <FaixaAnimada text={t.gallery.marquee} reverse speed={70} />
      </div>

      <Secao id="projects">
        <div className={styles.cabecalhoSecao}>
          <TextoDividido
            lines={[t.gallery.titleLine1, t.gallery.titleLine2]}
            className={styles.tituloDividido}
          />
          <p className={styles.descCabecalho}>{t.gallery.description}</p>
        </div>

        <div className={styles.cardGigante}>
          <GlassSurface
            className={styles.barraFiltros}
            variant="soft"
            borderRadius={28}
            backgroundOpacity={0.08}
            blur={10}
          >
            <div className={styles.barraControle}>
              <div className={styles.filtros}>
                {filters.map(f => (
                  <SpecularButton
                    key={f.id}
                    size="sm"
                    radius={10}
                    tint="#ffffff"
                    tintOpacity={0.04}
                    baseColor={filter === f.id ? '#8e6bd1' : '#525252'}
                    lineColor={filter === f.id ? '#d4b8ff' : '#ffffff'}
                    textColor={filter === f.id ? '#0e0e0e' : 'var(--color-text-muted)'}
                    autoAnimate={filter === f.id}
                    className={`${styles.botaoFiltro} ${filter === f.id ? styles.ativo : ''} ${
                      f.id !== 'all' ? styles[f.id] : ''
                    }`}
                    onClick={() => setFilter(f.id)}
                    aria-pressed={filter === f.id}
                  >
                    <IconeCategoria categoria={f.id} size={15} className={styles.iconeFiltro} />
                    <span>{f.label}</span>
                    <span className={styles.badgeContador}>{f.count}</span>
                  </SpecularButton>
                ))}
              </div>

              {/* Atalhos de explicação com ? ao visualizar "Todos" */}
              {filter === 'all' && (
                <div className={styles.ajudaCategorias}>
                  <span className={styles.rotuloAjuda}>Categorias:</span>
                  <div className={styles.chipsAjuda}>
                    {CATEGORIAS_ORDENADAS.map(cat => (
                      <div key={cat} className={`${styles.chipItem} ${styles[cat]}`}>
                        <IconeCategoria categoria={cat} size={13} />
                        <span className={styles.chipTexto}>{t.gallery.categories[cat].tag}</span>
                        <ModalExplicacaoSecao
                          categoria={cat}
                          dados={t.gallery.categories[cat]}
                          alinhamento={cat === 'portfolio' ? 'center' : cat === 'estudos' ? 'right' : 'left'}
                          rotuloAria={t.gallery.tooltipAriaLabel}
                          rotuloOQueInclui={t.gallery.whatIsIncluded}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </GlassSurface>

          {/* Banner Contextual da Categoria Ativa ou Visão Geral */}
          <AnimatePresence mode="wait">
            {categoriaAtiva && dadosCategoriaAtiva && metaCategoriaAtiva ? (
              <motion.div
                key={categoriaAtiva}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className={`${styles.bannerCategoria} ${styles[categoriaAtiva]}`}
              >
                <div className={styles.bannerInfo}>
                  <div className={styles.bannerMeta}>
                    <span className={styles.bannerNumero}>{metaCategoriaAtiva.numero}</span>
                    <span className={styles.bannerSeparador}>/</span>
                    <span className={styles.bannerBadge}>{dadosCategoriaAtiva.badge}</span>
                  </div>
                  <div className={styles.bannerTituloLinha}>
                    <h3 className={styles.bannerTitulo}>
                      <span className={styles.bannerIconeWrapper}>
                        <IconeCategoria
                          categoria={categoriaAtiva}
                          size={20}
                          className={styles.bannerIcone}
                        />
                      </span>
                      <span>{dadosCategoriaAtiva.title}</span>
                    </h3>
                    <ModalExplicacaoSecao
                      categoria={categoriaAtiva}
                      dados={dadosCategoriaAtiva}
                      rotuloAria={t.gallery.tooltipAriaLabel}
                      rotuloOQueInclui={t.gallery.whatIsIncluded}
                    />
                  </div>
                  <p className={styles.bannerDescricao}>{dadosCategoriaAtiva.description}</p>
                </div>
                <div className={styles.bannerContador}>
                  <span className={styles.bannerContadorNumero}>{projetosFiltrados.length}</span>
                  <span className={styles.bannerContadorTexto}>
                    {projetosFiltrados.length === 1
                      ? t.gallery.projectCountSingular
                      : t.gallery.projectCountPlural}
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="todos"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className={styles.bannerTodos}
              >
                <div className={styles.bannerTodosTexto}>
                  <h3 className={styles.bannerTodosTitulo}>{t.gallery.allProjectsTitle}</h3>
                  <p className={styles.bannerTodosDescricao}>{t.gallery.allProjectsSubtitle}</p>
                </div>
                <div className={styles.bannerContador}>
                  <span className={styles.bannerContadorNumero}>{projects.length}</span>
                  <span className={styles.bannerContadorTexto}>{t.gallery.projectCountPlural}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.divisorInterno} />

          {/* Integração do Componente Masonry (React Bits) com animações GSAP */}
          <div className={styles.containerMasonry}>
            <Masonry
              items={masonryItems}
              onItemClick={item => abrirProjeto(item.id)}
              ease="power3.out"
              duration={0.65}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={1.02}
              blurToFocus={true}
              colorShiftOnHover={true}
            />
          </div>
        </div>
      </Secao>
    </>
  );
}
