import { motion } from "framer-motion";
import heroImg from "@/assets/hero-astronaut.png";
import project1 from "@/assets/project-1.png";

const HeroSection = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden" style={{ background: "var(--black-2)" }}>
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(to bottom, rgba(2,2,2,0) 0%, rgba(2,2,2,0) 50%, rgba(2,2,2,0.7) 100%)"
      }} />
      <div className="absolute inset-0 z-[1]" style={{
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(2,2,2,0.6) 100%)"
      }} />

      {/* Hero visual — astronaut replaced with video */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          style={{
            filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
          }}
        >
          <source src="/Brandestiny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Main navigation labels — Centered vertically as per image */}
      <div className="absolute inset-0 z-[2] px-6 md:px-10 flex justify-between items-center pointer-events-none">
        <motion.button
          onClick={() => scrollTo("#projects")}
          className="font-pixter text-white font-normal leading-none hover-blur interactive pointer-events-auto"
          style={{ fontSize: "clamp(2.4rem, 6vw, 6.25rem)" }}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Work
        </motion.button>

        <motion.button
          onClick={() => scrollTo("#services")}
          className="font-pixter text-white font-normal leading-none hover-blur interactive pointer-events-auto"
          style={{ fontSize: "clamp(2.4rem, 6vw, 6.25rem)" }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Services
        </motion.button>
      </div>

      {/* Announcement card — matching image style */}
      <motion.div
        className="absolute bottom-10 right-6 md:right-10 z-[3] hidden lg:flex"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href="#projects"
          className="flex items-stretch bg-white p-[2px] text-[#020202] no-underline hover:scale-[1.02] transition-transform duration-300 shadow-2xl"
          style={{ width: "380px" }}
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#projects");
          }}
        >
          <div className="w-[140px] aspect-square flex-shrink-0 overflow-hidden bg-black p-1">
            <img src={project1} alt="Latest project" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="flex flex-col justify-between flex-grow p-4 bg-white">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-grotesk font-bold uppercase tracking-widest text-[#020202]">
                new project
              </span>
              <span className="text-[12px] font-bold">↗</span>
            </div>
            <div>
              <h4 className="text-[18px] font-bold leading-tight text-[#020202] capitalize">
                Furniture & woodwork
              </h4>
              <p className="text-[11px] text-[#020202]/60 mt-1 font-medium">
                Web Design & Development
              </p>
            </div>
          </div>
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <motion.div
          className="w-[1px] h-10 bg-white/40"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
