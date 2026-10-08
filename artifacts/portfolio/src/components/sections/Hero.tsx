import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

const UniverseScene = lazy(() =>
  import('./hero-universe/UniverseScene').then(({ UniverseScene: Scene }) => ({ default: Scene })),
);

function UniverseLoading() {
  return (
    <div
      className="relative mx-auto aspect-square min-h-[320px] w-full overflow-hidden rounded-full md:aspect-[1.13/1] md:min-h-[400px]"
      role="img"
      aria-label="Loading the 3D skills universe."
    >
      <span className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rotate-[-24deg] scale-y-[0.55] rounded-full border border-primary/20" />
      <span className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rotate-[32deg] scale-y-[0.48] rounded-full border border-secondary/20" />
      <span className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 shadow-[0_0_60px_rgba(33,212,185,0.35)] md:h-28 md:w-28" />
      <span className="absolute left-[34%] top-[14%] rounded-md border border-white/10 bg-card/80 px-2 py-1 font-mono text-[9px] text-muted-foreground">Frontend · Angular</span>
      <span className="absolute left-[2%] top-[32%] rounded-md border border-white/10 bg-card/80 px-2 py-1 font-mono text-[9px] text-muted-foreground">Tools &amp; DevOps</span>
      <span className="absolute right-[2%] top-[44%] rounded-md border border-white/10 bg-card/80 px-2 py-1 font-mono text-[9px] text-muted-foreground">AI &amp; Automation</span>
      <span className="absolute bottom-[25%] left-[2%] rounded-md border border-white/10 bg-card/80 px-2 py-1 font-mono text-[9px] text-muted-foreground">Database · PostgreSQL</span>
      <span className="absolute bottom-[8%] left-[33%] rounded-md border border-white/10 bg-card/80 px-2 py-1 font-mono text-[9px] text-muted-foreground">Backend · PHP · C#</span>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden pb-16 pt-28 md:pt-32"
    >
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid items-center gap-5 md:gap-8 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="relative z-10 mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Available for new projects
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 text-5xl font-display font-bold leading-tight tracking-tight text-white md:text-6xl xl:text-7xl"
            >
              Hi, I&apos;m <span className="text-white">Raymond Bastasa</span>
              <br />
              <span className="bg-gradient-to-r from-white via-muted-foreground to-white/20 bg-clip-text text-transparent">
                AI-Driven Full Stack Development
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg xl:text-xl"
            >
              Crafting intelligent digital ecosystems where human creativity meets artificial intelligence.
              Building scalable, secure, and high-performance web applications enhanced by intelligent automation.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative mx-auto w-full max-w-[680px] lg:max-w-none"
          >
            <Suspense fallback={<UniverseLoading />}>
              <UniverseScene />
            </Suspense>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
