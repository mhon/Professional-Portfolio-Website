import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#home" className="text-2xl font-display font-bold tracking-tight text-foreground flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                R
              </span>
              Bastasa
            </a>
            <p className="text-muted-foreground text-sm max-w-sm text-center md:text-left">
              Crafting intelligent digital ecosystems where human creativity meets artificial intelligence.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/mhon" 
                target="_blank" 
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-muted/60 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/raymond-bastasa-59804a116/" 
                target="_blank" 
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-muted/60 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a 
                href="mailto:mhonbastasa@yahoo.com.ph" 
                className="h-10 w-10 rounded-full bg-muted/60 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-end">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-muted/60 border-border hover:bg-accent text-muted-foreground hover:text-foreground"
              onClick={scrollToTop}
            >
              <ArrowUp size={20} />
            </Button>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Raymond Bastasa. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs">Based in the intersection of Code & AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
