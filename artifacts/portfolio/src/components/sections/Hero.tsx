import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollTo = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      
      {/* Abstract geometric shapes in background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full border border-primary/20 mix-blend-overlay blur-[1px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full border border-secondary/20 mix-blend-overlay blur-[1px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Available for new projects
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6 leading-tight"
          >
            Hi, I'm <span className="text-white">Raymond Bastasa</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-muted-foreground to-white/20">
              AI-Driven Full Stack Development
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl font-light leading-relaxed"
          >
            Crafting intelligent digital ecosystems where human creativity meets artificial intelligence. 
            Building scalable, secure, and high-performance web applications enhanced by intelligent automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wide shadow-[0_0_20px_rgba(33,212,185,0.3)] h-12 px-8"
              onClick={(e) => scrollTo(e, '#portfolio')}
            >
              <Terminal className="mr-2 h-4 w-4" />
              View Portfolio
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 h-12 px-8 text-white"
              onClick={(e) => scrollTo(e, '#contact')}
            >
              Contact Me
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

        </div>
      </div>

      {/* Decorative tech grid */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      <div 
        className="absolute bottom-0 inset-x-0 h-[40vh] z-0 opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black)]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </section>
  );
}
