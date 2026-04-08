import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full py-28 md:py-44" style={{ background: "var(--black-2)" }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left: Tagline + CTAs */}
        <motion.div
          className="lg:w-[40%] flex flex-col justify-between"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="text-[#a0a0a0] font-grotesk text-xs uppercase tracking-[0.15em] mb-6 block">
              About the Studio
            </span>
            <h2
              className="font-display text-white font-bold leading-[1.1] mb-12"
              style={{ fontSize: "clamp(2.2rem, 4vw, 4.2rem)" }}
            >
              Award Winning
              <br />
              Design Studio
            </h2>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <motion.button
              onClick={() => navigate("/lets-connect")}
              className="group inline-flex items-center justify-between w-full max-w-[300px] text-[#020202] text-[13px] font-semibold tracking-wider uppercase px-6 py-4 transition-all duration-[450ms] interactive"
              style={{ background: "#fde3c6", borderRadius: 10 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a free strategy session
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
            <motion.button
              onClick={() => navigate("/case-studies")}
              className="group inline-flex items-center justify-between w-full max-w-[300px] border text-white text-[13px] font-medium tracking-wider uppercase px-6 py-4 hover:bg-white hover:text-[#020202] transition-all duration-[450ms] interactive"
              style={{ borderColor: "rgba(255,255,255,0.25)", borderRadius: 10 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore case studies
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Big editorial tagline */}
        <motion.div
          className="lg:w-[60%]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-display text-white font-bold leading-[1.15] tracking-tight"
            style={{ fontSize: "clamp(3rem, 6.5vw, 6.5rem)" }}
          >
            THE FUSION
            <br />
            OF BRAND
            <br />
            IDENTITY
            <br />
            AND FUTURE
            <br />
            <span className="text-[#a0a0a0]">POTENTIAL</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
