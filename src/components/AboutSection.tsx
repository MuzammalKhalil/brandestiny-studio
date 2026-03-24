import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const AboutSection = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full bg-background py-24 md:py-40 px-6 md:px-12">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left: Tagline + CTAs */}
        <motion.div
          className="lg:w-[40%] flex flex-col justify-between"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <span className="text-[#a0a0a0] font-grotesk text-xs uppercase tracking-[0.15em] mb-6 block">
              About the Studio
            </span>
            <h2 className="font-display text-white text-[clamp(2rem,3.5vw,3.5em)] font-normal leading-[1] mb-10">
              Award Winning
              <br />
              Design Studio
            </h2>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => scrollTo("#contact")}
              className="group inline-flex items-center justify-between w-full max-w-[280px] border border-[hsl(0_0%_100%/0.45)] text-white text-[13px] font-medium tracking-wider uppercase px-5 py-3.5 hover:bg-white hover:text-[#020202] transition-all duration-[450ms] interactive"
            >
              Book a free strategy session
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("#projects")}
              className="group inline-flex items-center justify-between w-full max-w-[280px] border border-[hsl(0_0%_100%/0.25)] text-white text-[13px] font-medium tracking-wider uppercase px-5 py-3.5 hover:bg-white hover:text-[#020202] transition-all duration-[450ms] interactive"
            >
              Explore case studies
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Right: Big editorial tagline */}
        <motion.div
          className="lg:w-[60%]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h2 className="font-display text-white text-[clamp(2.5rem,5.5vw,5.5em)] font-normal leading-[1] tracking-tight">
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
