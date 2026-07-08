import { motion } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiTailwindcss, SiAngular, SiBootstrap, SiJquery,
  SiPhp, SiLaravel, SiDotnet, SiNodedotjs, SiExpress, SiPython, SiFastapi, SiDjango,
  SiMysql, SiPostgresql, SiSupabase,
  SiGoogle, SiLangchain,
  SiGit, SiGithub, SiVercel, SiDocker, SiPostman, SiNpm, SiPnpm
} from 'react-icons/si';
import { DiCss3, DiMsqlServer } from 'react-icons/di';
import { TbBrandCSharp, TbBrandOpenai, TbBrandVisualStudio, TbBrandVscode } from 'react-icons/tb';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
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
    title: 'Backend Development',
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
    title: 'Database Architecture',
    skills: [
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'SQL Server', icon: DiMsqlServer, color: '#CC2927' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
    ]
  },
  {
    title: 'AI & Automation',
    skills: [
      { name: 'OpenAI API', icon: TbBrandOpenai, color: '#412991' },
      { name: 'Gemini API', icon: SiGoogle, color: '#4285F4' },
      { name: 'LangChain', icon: SiLangchain, color: '#121212' },
      { name: 'RAG Architecture', icon: SiReact, color: '#61DAFB' }, // Fallback icon
      { name: 'AI Agents', icon: SiPython, color: '#3776AB' }, // Fallback icon
      { name: 'Prompt Eng', icon: TbBrandOpenai, color: '#412991' },
    ]
  },
  {
    title: 'Tools & DevOps',
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

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-white/[0.02]">
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
            Tools of the Trade
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className={`glass-panel p-6 rounded-2xl ${idx === 3 || idx === 4 ? 'lg:col-span-1' : ''}`}
            >
              <h4 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {category.title}
              </h4>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-colors group cursor-default"
                  >
                    <skill.icon 
                      className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" 
                      style={{ transition: 'color 0.3s ease' }} 
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-white font-medium transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
