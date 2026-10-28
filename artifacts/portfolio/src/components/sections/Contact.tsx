import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Mail, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill out all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const base = import.meta.env.BASE_URL.replace(/\/$/, '');
      const res = await fetch(`${base}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json() as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? 'Unknown error');
      }

      setFormData({ name: '', email: '', message: '' });
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out — I'll get back to you soon.",
        className: "bg-card border-primary text-card-foreground"
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      toast({
        title: "Failed to send",
        description: msg,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-10 pb-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-5/12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary/50" />
              <h2 className="text-sm font-mono text-primary uppercase tracking-widest">Get In Touch</h2>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6 leading-tight">
              Let's Build Something <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Amazing Together</span>
            </h3>
            
            <p className="text-muted-foreground text-lg mb-10 font-light leading-relaxed">
              Whether you're looking to develop a scalable web application, integrate AI into your business, or collaborate on an innovative project, I'd love to hear from you. Let's transform your ideas into impactful digital solutions.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:mhonbastasa@yahoo.com.ph" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="h-12 w-12 rounded-full bg-muted/60 border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-mono text-muted-foreground mb-1">Email</span>
                  <span className="font-medium text-lg">mhonbastasa@yahoo.com.ph</span>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/in/raymond-bastasa-59804a116/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="h-12 w-12 rounded-full bg-muted/60 border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-mono text-muted-foreground mb-1">LinkedIn</span>
                  <span className="font-medium text-lg">Raymond Bastasa</span>
                </div>
              </a>
              
              <a href="https://github.com/mhon" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="h-12 w-12 rounded-full bg-muted/60 border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all">
                  <Github className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-mono text-muted-foreground mb-1">GitHub</span>
                  <span className="font-medium text-lg">@mhon</span>
                </div>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-7/12"
          >
            <div className="glass-panel p-8 md:p-10 rounded-3xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/80">Name</label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className="bg-muted/55 border-border focus-visible:ring-primary h-12 text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    className="bg-muted/55 border-border focus-visible:ring-primary h-12 text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..." 
                    className="bg-muted/55 border-border focus-visible:ring-primary min-h-[150px] resize-none text-base p-4"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-lg mt-4 shadow-[0_0_20px_rgba(33,212,185,0.2)] transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
                
              </form>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
