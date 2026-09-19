import { motion } from 'framer-motion';
import { Secao } from '@/componentes/layout/Secao';
import { TextoDividido } from '@/componentes/ui/TextoDividido';
import { GlassSurface } from '@/componentes/ui/GlassSurface/GlassSurface';
import { LogoLoop, type LogoItem } from '@/componentes/ui/LogoLoop/LogoLoop';
import {
  SiAngular,
  SiCss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { SKILLS } from '@/constantes/conteudo';
import { useIdioma } from '@/aplicativo/provedores/ProvedorIdioma';
import styles from './SecaoHabilidades.module.css';

const TECH_LOGOS: LogoItem[] = [
  { node: <SiJavascript />, title: 'JavaScript' },
  { node: <SiReact />, title: 'React' },
  { node: <SiAngular />, title: 'Angular' },
  { node: <SiTypescript />, title: 'TypeScript' },
  { node: <SiHtml5 />, title: 'HTML5' },
  { node: <SiCss />, title: 'CSS3' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS' },
  { node: <SiPython />, title: 'Python' },
  { node: <SiGit />, title: 'Git' },
  { node: <SiGithub />, title: 'GitHub' },
];

const ICONE_POR_HABILIDADE: Record<string, typeof SiJavascript> = {
  JavaScript: SiJavascript,
  React: SiReact,
  Angular: SiAngular,
  TypeScript: SiTypescript,
  'HTML5 / CSS3': SiHtml5,
  Python: SiPython,
  'Tailwind CSS': SiTailwindcss,
  'Git / GitHub': SiGit,
};

export function SecaoHabilidades() {
  const { t } = useIdioma();

  return (
    <Secao id="stack" className={styles.secaoHabilidades}>
      <div className={styles.cabecalho}>
        <div className={styles.eyebrow}>Matriz de capacidades</div>
        <TextoDividido
          lines={[t.skills.titleLine1, t.skills.titleLine2]}
          className={styles.tituloDividido}
        />
      </div>

      <div className={styles.gradeHabilidades}>
        {SKILLS.map((skill, i) => {
          const topicos = t.skills.tags[skill.tagKey as keyof typeof t.skills.tags] ?? [
            t.skills.categories[skill.category],
          ];
          const Icone = ICONE_POR_HABILIDADE[skill.name];

          return (
            <GlassSurface
              key={skill.id}
              className={styles.cartaoHabilidade}
              borderRadius={18}
              backgroundOpacity={0.04}
              variant="soft"
            >
              <motion.div
                className={styles.conteudoHabilidade}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <div className={styles.cabecalhoHabilidade}>
                  <span className={styles.etiqueta}>{t.skills.categories[skill.category]}</span>
                  <span className={styles.nivelHabilidade}>{skill.experience} anos</span>
                </div>

                <div className={styles.nomeLinha}>
                  <div className={styles.nomeBloco}>
                    <span className={styles.nomeHabilidade}>{skill.name}</span>
                  </div>

                  {Icone && (
                    <span className={styles.iconeHabilidade} aria-label={skill.name} title={skill.name}>
                      <Icone />
                    </span>
                  )}

                  <span className={styles.statusHabilidade}>
                    <span className={styles.pontoStatus} />
                    {t.contact.active}
                  </span>
                </div>

                <div className={styles.tagsHabilidade}>
                  {topicos.map((topico) => (
                    <span key={`${skill.id}-${topico}`} className={styles.tagItem}>
                      {topico}
                    </span>
                  ))}
                </div>
              </motion.div>
            </GlassSurface>
          );
        })}
      </div>

      <motion.div
        className={styles.techFaixaAnimada}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <LogoLoop
          logos={TECH_LOGOS}
          speed={55}
          direction="right"
          logoHeight={34}
          gap={38}
          hoverSpeed={12}
          scaleOnHover
          ariaLabel="Tecnologias utilizadas no portfólio"
        />
      </motion.div>
    </Secao>
  );
}
