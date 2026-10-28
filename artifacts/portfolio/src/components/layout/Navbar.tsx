import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeModePicker } from '@/components/theme/ThemeModePicker';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About Me', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

const MENU_ID = 'mobile-nav-menu';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape and return focus to toggle button
  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
    toggleButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, closeMenu]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border py-3 shadow-lg shadow-foreground/10'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => scrollTo(e, '#home')}
         className="text-xl font-display font-bold tracking-tight text-foreground flex items-center gap-2 group"
        >
          <span className="h-8 w-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            R
          </span>
          <span className="hidden sm:inline-block">Bastasa</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-card/75 rounded-full px-2 py-1 border border-border/80 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative',
                activeSection === link.href.substring(1)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {activeSection === link.href.substring(1) && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute inset-0 bg-primary/20 rounded-full border border-primary/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Let's Talk Button */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeModePicker />
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, '#contact')}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-card/75 border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
          >
            Let's Talk
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeModePicker />
          <button
            ref={toggleButtonRef}
            className="text-muted-foreground hover:text-foreground p-2"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls={MENU_ID}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id={MENU_ID}
            role="dialog"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border relative z-50"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-base font-medium transition-colors touch-manipulation',
                    activeSection === link.href.substring(1)
                      ? 'bg-primary/20 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:bg-accent active:bg-accent'
                  )}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
