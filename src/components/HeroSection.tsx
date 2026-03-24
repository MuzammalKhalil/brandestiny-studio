import { motion } from "framer-motion";
import astronautImg from "@/assets/astronaut-hero.png";

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-background">
      {/* Astronaut */}
      <div className="absolute inset-0 flex items-start justify-center pt-16">
        <motion.img
          src={astronautImg}
          alt="Astronaut floating in space"
          className="w-[320px] md:w-[400px] lg:w-[480px] object-contain"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
      </div>

      {/* Large nav labels */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-between items-end px-6 md:px-12">
        <motion.a
          href="#projects"
          className="font-display text-foreground text-5xl md:text-7xl lg:text-[5em] font-normal leading-none no-underline hover:opacity-50 hover:blur-[2px] transition-all duration-[450ms]"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
        >
          Work
        </motion.a>

        <motion.a
          href="#services"
          className="font-display text-foreground text-5xl md:text-7xl lg:text-[5em] font-normal leading-none no-underline hover:opacity-50 hover:blur-[2px] transition-all duration-[450ms]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
        >
          Services
        </motion.a>
      </div>

      {/* Announcement card */}
      <motion.div
        className="absolute bottom-20 right-6 md:right-12 bg-card border border-white-15 p-2 flex gap-3 max-w-[260px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{ borderColor: "hsl(0 0% 100% / 0.15)" }}
      >
        <div className="w-20 h-16 bg-surface-card rounded-sm overflow-hidden flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-cream/20 to-cream/5" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-grotesk text-muted-foreground uppercase tracking-wider">New Project</span>
            <span className="text-cream text-xs">↗</span>
          </div>
          <p className="text-foreground text-xs mt-1 leading-tight">Furniture & woodwork</p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
