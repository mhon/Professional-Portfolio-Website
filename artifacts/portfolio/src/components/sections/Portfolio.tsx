import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';

const PROJECTS = [
  {
    title: 'CRM Dashboard',
    description: 'A comprehensive Client Relationship Management platform featuring real-time data visualization, contact management, and pipeline tracking. Designed for high performance and intuitive data entry.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'React Query'],
    liveUrl: 'http://client-management-suite--mhonbastasa.replit.app/',
    githubUrl: 'https://github.com/mhon/crm-dashboard',
    featured: true,
  },
  {
    title: 'Task Management System (TaskAi-Pro)',
    description: 'An intelligent task management system with AI-assisted task breakdown and priority suggestions. Includes kanban boards, role-based access control, and robust API architecture.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'OpenAI API', 'Prisma'],
    liveUrl: null,
    githubUrl: 'https://github.com/mhon/TaskAi-Pro',
    featured: false,
  },
  {
    title: 'AI Math Problem Generator',
    description: 'An educational tool that leverages Large Language Models to generate customized math problems based on difficulty level and topic, providing step-by-step solutions.',
    tech: ['React', 'Python', 'FastAPI', 'LangChain', 'Gemini API'],
    liveUrl: 'https://ai-response-math-problem-final.vercel.app/',
    githubUrl: 'https://github.com/mhon/AI-Response-Math-Problem-FINAL',
    featured: false,
  }
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-primary/50" />
              <h2 className="text-sm font-mono text-primary uppercase tracking-widest">Selected Works</h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-semibold text-white max-w-lg">
              Featured Projects
            </h3>
          </div>
          <p className="text-muted-foreground text-lg max-w-md font-light">
            A selection of applications demonstrating my capabilities across the full stack, with a focus on AI integration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`glass-panel rounded-2xl overflow-hidden flex flex-col group ${
                project.featured ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="p-8 flex-1 flex flex-col">
                
                <div className="flex justify-between items-start mb-6">
                  {project.featured && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4 w-fit">
                      <Star className="w-3 h-3 fill-primary" />
                      Featured Project
                    </div>
                  )}
                  {!project.featured && <div />} {/* Spacer */}
                  
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
                        title="View Source"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <h4 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                
                <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 text-xs font-mono text-white/70 bg-white/5 border border-white/10 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Optional: If we had images, they would go here. We'll use a stylized abstract pattern area instead to maintain the premium feel without generic stock images. */}
              <div className="h-32 bg-gradient-to-br from-white/5 to-transparent border-t border-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                <div className="font-mono text-sm text-white/20 tracking-[0.2em] uppercase mix-blend-overlay">
                  {project.title.replace(/[^a-zA-Z]/g, '').substring(0, 8)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
