import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="w-full bg-background py-20 md:py-32 px-6 md:px-12">
      <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
        {/* Left: Award copy + CTAs */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-cream text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.1] mb-8">
            Award Winning<br />Design Studio
          </h2>

          <div className="flex flex-col gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-cream/40 text-cream text-xs font-medium tracking-wider uppercase px-5 py-3 rounded-full hover:bg-cream hover:text-background transition-all duration-300 w-fit"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Book a free strategy session
              <ArrowRight size={14} />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-white-45 text-foreground text-xs font-medium tracking-wider uppercase px-5 py-3 rounded-full hover:bg-foreground hover:text-background transition-all duration-300 w-fit"
              style={{ borderColor: "hsl(0 0% 100% / 0.45)" }}
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Explore case studies
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>

        {/* Right: Big tagline */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.05] tracking-tight">
            THE FUSION<br />
            OF BRAND<br />
            IDENTITY<br />
            AND FUTURE<br />
            POTENTIAL
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
