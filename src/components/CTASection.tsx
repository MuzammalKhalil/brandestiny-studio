import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = ["WEBSITE", "MOBILE APP", "WEB APP", "BRAND", "SOCIAL MEDIA"];

const CTASection = () => {
  return (
    <section id="contact" className="w-full bg-background px-6 md:px-12 py-20 md:py-32">
      <div className="text-center max-w-4xl mx-auto">
        <motion.p
          className="text-muted-foreground text-lg mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Let's talk about your
        </motion.p>

        <div className="flex flex-col items-center mb-12">
          {services.map((service, i) => (
            <motion.span
              key={service}
              className="font-display text-foreground text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {service}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="mailto:info@brandestiny.co"
            className="inline-flex items-center gap-2 bg-cream text-background text-xs font-medium tracking-wider uppercase px-6 py-3 rounded-full hover:bg-cream-light transition-all duration-300"
          >
            Let's Connect
            <ArrowRight size={14} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border text-foreground text-xs font-medium tracking-wider uppercase px-6 py-3 rounded-full hover:bg-foreground hover:text-background transition-all duration-300"
            style={{ borderColor: "hsl(0 0% 100% / 0.45)" }}
          >
            Book a Call
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>

      {/* Spinning logo */}
      <motion.div
        className="mt-20 md:mt-32 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="relative flex items-center gap-6">
          <span className="font-display text-foreground text-5xl md:text-7xl lg:text-8xl font-normal whitespace-nowrap opacity-20 tracking-tight">
            BRANDESTINY
          </span>
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-foreground/20 flex items-center justify-center animate-spin-slow">
            <span className="text-[8px] md:text-[10px] font-grotesk text-foreground/50 uppercase tracking-[0.2em]">
              Brandestiny Co
            </span>
          </div>
          <span className="font-display text-foreground text-5xl md:text-7xl lg:text-8xl font-normal whitespace-nowrap opacity-20 tracking-tight">
            BRANDESTINY
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
