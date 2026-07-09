import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiTailwindcss, SiAngular, SiBootstrap, SiJquery,
  SiPhp, SiLaravel, SiDotnet, SiNodedotjs, SiExpress, SiPython, SiFastapi, SiDjango,
  SiMysql, SiPostgresql, SiSupabase,
  SiGoogle, SiLangchain,
  SiGit, SiGithub, SiVercel, SiDocker, SiPostman, SiNpm, SiPnpm
} from 'react-icons/si';
import { DiCss3, DiMsqlServer } from 'react-icons/di';
import { TbBrandCSharp, TbBrandOpenai, TbBrandVisualStudio, TbBrandVscode } from 'react-icons/tb';
import { Code2, Server, Database, BrainCircuit, Wrench } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    fullTitle: 'Frontend Development',
    icon: Code2,
    skills: [
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: DiCss3, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'Angular', icon: SiAngular, color: '#DD0031' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
      { name: 'jQuery', icon: SiJquery, color: '#0769AD' },
    ]
  },
  {
    title: 'Backend',
    fullTitle: 'Backend Development',
    icon: Server,
    skills: [
      { name: 'PHP', icon: SiPhp, color: '#777BB4' },
      { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
      { name: 'C#', icon: TbBrandCSharp, color: '#239120' },
      { name: 'ASP.NET', icon: SiDotnet, color: '#512BD4' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'Django', icon: SiDjango, color: '#092E20' },
    ]
  },
  {
    title: 'Database',
    fullTitle: 'Database Architecture',
    icon: Database,
    skills: [
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'SQL Server', icon: DiMsqlServer, color: '#CC2927' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
    ]
  },
  {
    title: 'AI & Automation',
    fullTitle: 'AI & Automation',
    icon: BrainCircuit,
    skills: [
      { name: 'OpenAI API', icon: TbBrandOpenai, color: '#412991' },
      { name: 'Gemini API', icon: SiGoogle, color: '#4285F4' },
      { name: 'LangChain', icon: SiLangchain, color: '#121212' },
      { name: 'RAG Architecture', icon: SiReact, color: '#61DAFB' },
      { name: 'AI Agents', icon: SiPython, color: '#3776AB' },
      { name: 'Prompt Eng', icon: TbBrandOpenai, color: '#412991' },
    ]
  },
  {
    title: 'Tools & DevOps',
    fullTitle: 'Tools & DevOps',
    icon: Wrench,
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'VS Code', icon: TbBrandVscode, color: '#007ACC' },
      { name: 'Visual Studio', icon: TbBrandVisualStudio, color: '#5C2D91' },
      { name: 'npm', icon: SiNpm, color: '#CB3837' },
      { name: 'pnpm', icon: SiPnpm, color: '#F69220' },
    ]
  }
];

// Graph geometry: category "nodes" orbit a central core node, connected by lines.
const GRAPH_SIZE = 480;
const CENTER = GRAPH_SIZE / 2;
const RADIUS = 180;

function nodePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const x = CENTER + RADIUS * Math.cos(angle);
  const y = CENTER + RADIUS * Math.sin(angle);
  // Percentages so HTML-positioned nodes scale with the container instead of
  // relying on the fixed 480px coordinate space (which broke on narrow screens).
  return {
    x,
    y,
    xPct: (x / GRAPH_SIZE) * 100,
    yPct: (y / GRAPH_SIZE) * 100,
  };
}

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const positions = useMemo(
    () => SKILL_CATEGORIES.map((_, i) => nodePosition(i, SKILL_CATEGORIES.length)),
    []
  );
  const activeCategory = SKILL_CATEGORIES[activeIndex];
  const panelId = 'skills-active-panel';

  return (
    <section id="skills" className="pt-10 pb-24 relative overflow-hidden bg-white/[0.02]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-primary/50" />
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest">Technical Arsenal</h2>
            <div className="h-[1px] w-8 bg-primary/50" />
          </div>
          <h3 className="text-3xl md:text-4xl font-display font-semibold text-white">
            A Growing Knowledge Network
          </h3>
          <p className="text-muted-foreground mt-4 font-light">
            Select a node to explore the technologies connected to it.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
          {/* Graph */}
          <div className="relative w-full max-w-[480px] mx-auto lg:mx-0 lg:w-[480px] shrink-0 aspect-square">
            <svg
              viewBox={`0 0 ${GRAPH_SIZE} ${GRAPH_SIZE}`}
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </radialGradient>
              </defs>

              <circle cx={CENTER} cy={CENTER} r={90} fill="url(#core-glow)" />

              {positions.map((pos, i) => (
                <motion.line
                  key={`line-${SKILL_CATEGORIES[i].title}`}
                  x1={CENTER}
                  y1={CENTER}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={i === activeIndex ? 'hsl(var(--primary))' : 'hsla(210, 20%, 80%, 0.15)'}
                  strokeWidth={i === activeIndex ? 1.5 : 1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15, ease: 'easeInOut' }}
                />
              ))}

              {/* Traveling pulse along the active connection */}
              {!prefersReducedMotion && (
                <motion.circle
                  key={`pulse-${activeIndex}`}
                  r={4}
                  fill="hsl(var(--primary))"
                  initial={{
                    cx: CENTER,
                    cy: CENTER,
                    opacity: 0,
                  }}
                  animate={{
                    cx: [CENTER, positions[activeIndex].x],
                    cy: [CENTER, positions[activeIndex].y],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </svg>

            {/* Core node */}
            <motion.div
              className="absolute flex items-center justify-center h-16 w-16 sm:h-24 sm:w-24 rounded-full glass-panel border-primary/40 text-center"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div>
                <div className="text-sm sm:text-lg font-display font-bold text-white leading-none">RB</div>
                <div className="hidden sm:block text-[10px] text-primary font-mono mt-1 uppercase tracking-wide">Core</div>
              </div>
            </motion.div>

            {/* Category nodes */}
            {SKILL_CATEGORIES.map((category, i) => {
              const pos = positions[i];
              const isActive = i === activeIndex;
              return (
                <motion.button
                  key={category.title}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-pressed={isActive}
                  aria-label={`Show ${category.fullTitle} skills`}
                  aria-controls={panelId}
                  className="absolute flex flex-col items-center gap-1.5 group focus-visible:outline-none touch-manipulation"
                  style={{ left: `${pos.xPct}%`, top: `${pos.yPct}%`, transform: 'translate(-50%, -50%)' }}
                  animate={prefersReducedMotion ? undefined : { y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span
                    className={`flex items-center justify-center h-11 w-11 sm:h-16 sm:w-16 rounded-full border transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background ${
                      isActive
                        ? 'bg-primary/20 border-primary text-primary shadow-[0_0_25px_rgba(33,212,185,0.35)]'
                        : 'bg-white/5 border-white/10 text-muted-foreground group-hover:border-white/30 group-hover:text-white'
                    }`}
                  >
                    <category.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </span>
                  <span
                    className={`text-[10px] sm:text-xs font-medium whitespace-nowrap px-1.5 sm:px-2 py-0.5 rounded-full transition-colors ${
                      isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-white'
                    }`}
                  >
                    {category.title}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Skill list for active category */}
          <div
            id={panelId}
            role="region"
            aria-live="polite"
            aria-label={`${activeCategory.fullTitle} skills`}
            className="w-full lg:flex-1 glass-panel rounded-3xl p-6 md:p-8 min-h-[280px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.title}
                initial={prefersReducedMotion ? undefined : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -16 }}
                transition={{ duration: 0.35 }}
              >
                <h4 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  {activeCategory.fullTitle}
                </h4>

                <div className="flex flex-wrap gap-3">
                  {activeCategory.skills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : idx * 0.05 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-colors group cursor-default"
                    >
                      <skill.icon className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                      <span className="text-sm text-muted-foreground group-hover:text-white font-medium transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
