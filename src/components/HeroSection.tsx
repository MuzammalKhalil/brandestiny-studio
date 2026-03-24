import { motion } from "framer-motion";
import astronautImg from "@/assets/astronaut-hero.png";

const HeroSection = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/60 z-[1]" />

      {/* Hero visual — astronaut */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img
          src={astronautImg}
          alt="Astronaut floating in space"
          className="w-[280px] md:w-[380px] lg:w-[460px] xl:w-[520px] object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Bottom nav labels — editorial style */}
      <div className="absolute bottom-12 md:bottom-16 left-0 right-0 z-[2] px-6 md:px-12 flex justify-between items-end">
        <motion.button
          onClick={() => scrollTo("#projects")}
          className="font-display text-white text-[clamp(2.5rem,5vw,5em)] font-normal leading-none hover-blur interactive"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Work
        </motion.button>

        <motion.button
          onClick={() => scrollTo("#services")}
          className="font-display text-white text-[clamp(2.5rem,5vw,5em)] font-normal leading-none hover-blur interactive"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Services
        </motion.button>
      </div>

      {/* Announcement card */}
      <motion.div
        className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-[3] bg-white text-[#020202] flex items-start gap-3 p-[6px] max-w-[260px] interactive"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <div className="w-16 h-14 bg-[#090909] flex-shrink-0 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-[hsl(32,38%,64%)] to-[hsl(220,80%,55%)] opacity-60" />
        </div>
        <div className="flex flex-col justify-center py-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-grotesk font-medium uppercase tracking-wider text-[#090909]/60">
              New Case Study
            </span>
            <span className="text-[12px]">↗</span>
          </div>
          <p className="text-[12px] font-medium leading-tight mt-0.5">
            Take a look and show it some love!
          </p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-[1px] h-8 bg-white/50"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
