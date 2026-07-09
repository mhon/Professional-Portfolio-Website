import { motion } from 'framer-motion';
import { Server, Code2, Sparkles } from 'lucide-react';

export function About() {
  const cards = [
    {
      icon: <Code2 className="h-6 w-6 text-primary" />,
      title: "Frontend & UI",
      desc: "Pixel-perfect, accessible, and highly responsive user interfaces using React, Next.js, and modern CSS."
    },
    {
      icon: <Server className="h-6 w-6 text-primary" />,
      title: "Backend & Systems",
      desc: "Robust architecture and secure RESTful APIs built with C#, Node.js, and Python."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: "AI Integration",
      desc: "Empowering applications with LLMs, RAG, AI agents, and intelligent workflow automation."
    }
  ];

  return (
    <section id="about" className="pt-10 pb-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary/50" />
              <h2 className="text-sm font-mono text-primary uppercase tracking-widest">About Me</h2>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-display font-semibold text-white mb-6 leading-tight">
              Engineering solutions built for long-term growth and intelligent automation.
            </h3>
            
            <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
              <p>
                I am a Full Stack Software Engineer specializing in <span className="text-white font-medium">AI Integration</span> and modern web technologies. My passion lies in building scalable, intelligent, and user-focused digital products that seamlessly combine clean architecture with automation.
              </p>
              <p>
                With extensive experience developing enterprise applications using PHP, C#, ASP.NET, JavaScript, TypeScript, React, Next.js, Python, and SQL, I create software solutions that are secure, maintainable, and designed to scale.
              </p>
              <p>
                My expertise spans frontend development, backend engineering, RESTful APIs, cloud-based architectures, and modern development practices. I continuously explore emerging technologies to deliver innovative solutions that improve productivity, user experience, and tangible business value.
              </p>
            </div>
          </motion.div>

          {/* Cards / Visuals */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {cards.map((card, idx) => (
              <div 
                key={idx}
                className={`glass-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 ${
                  idx === 2 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h4 className="text-xl font-medium text-white mb-2">{card.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
