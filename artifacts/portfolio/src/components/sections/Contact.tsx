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

  const handleSubmit = (e: React.FormEvent) => {
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

    const subject = `Portfolio inquiry from ${formData.name}`;
    const body = `${formData.message}\n\n—\n${formData.name}\n${formData.email}`;
    const mailtoUrl = `mailto:mhonbastasa@yahoo.com.ph?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Opens the visitor's own email client with the message pre-filled,
    // since this static site has no backend to deliver the message itself.
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      toast({
        title: "Almost there!",
        description: "Your email app should now be open with the message pre-filled — just hit send.",
        className: "bg-card border-primary text-card-foreground"
      });
    }, 600);
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
            
            <h3 className="text-4xl md:text-5xl font-display font-semibold text-white mb-6 leading-tight">
              Let's Build Something <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Amazing Together</span>
            </h3>
            
            <p className="text-muted-foreground text-lg mb-10 font-light leading-relaxed">
              Whether you're looking to develop a scalable web application, integrate AI into your business, or collaborate on an innovative project, I'd love to hear from you. Let's transform your ideas into impactful digital solutions.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:mhonbastasa@yahoo.com.ph" className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors group">
                <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-mono text-white/50 mb-1">Email</span>
                  <span className="font-medium text-lg">mhonbastasa@yahoo.com.ph</span>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/in/raymond-bastasa-59804a116/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors group">
                <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-mono text-white/50 mb-1">LinkedIn</span>
                  <span className="font-medium text-lg">Raymond Bastasa</span>
                </div>
              </a>
              
              <a href="https://github.com/mhon" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors group">
                <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all">
                  <Github className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-mono text-white/50 mb-1">GitHub</span>
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
                  <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className="bg-white/5 border-white/10 focus-visible:ring-primary h-12 text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    className="bg-white/5 border-white/10 focus-visible:ring-primary h-12 text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..." 
                    className="bg-white/5 border-white/10 focus-visible:ring-primary min-h-[150px] resize-none text-base p-4"
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
