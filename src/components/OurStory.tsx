import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OurStory = () => {
  const navigate = useNavigate();
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="story" className="w-full min-h-screen relative flex items-center justify-center overflow-hidden py-24 md:py-36" style={{ background: "var(--black-2)" }}>
      {/* Background Video/Overlay — Matching the moody hands visual */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark overlay */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          src="/0318.mp4" 
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        {/* Central glow effect from video */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2d5af1]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-4xl md:ml-20 lg:ml-40">
          <motion.span
            className="text-[#fde3c6] text-sm md:text-base font-display tracking-widest mb-12 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Story
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-white text-[40px] font-medium leading-[1.3] mb-10" style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
              Established in 2014, Brandestiny was created with a simple purpose – to offer the kind of service our founders wished they had for their own ventures. Built on values that truly matter, we have grown by staying true to that ethos.
            </h3>
            
            <p className="text-white/70 text-[40px] font-medium leading-[1.4] mb-16 max-w-3xl" style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
              Our independence allows us to carve our own path, free from corporate red tape or the need to follow trends dictated by big tech. Instead, we offer advice and strategies tailored specifically to your business, always focused on your goals.
            </p>
          </motion.div>

          <motion.button
            onClick={() => navigate("/lets-connect")}
            className="group inline-flex items-center gap-3 bg-[#ffeddc] text-[#020202] text-[13px] font-bold tracking-[0.2em] uppercase px-10 py-5 rounded-xl transition-all duration-500 hover:scale-105 shadow-2xl interactive"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            BOOK A CALL
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
