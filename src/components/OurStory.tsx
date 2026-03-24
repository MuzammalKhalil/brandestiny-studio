import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const OurStory = () => {
  return (
    <section id="story" className="w-full bg-background px-6 md:px-12 py-20 md:py-32">
      <div className="max-w-3xl mx-auto">
        <motion.span
          className="text-cream text-sm font-grotesk tracking-wider uppercase mb-6 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ✦ Our Story
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-foreground text-base md:text-lg leading-relaxed mb-6">
            Established in 2014, Brandestiny was created with a simple purpose – to offer the kind of service our founders wished they had for their own ventures. Built on values that truly matter, we have grown by staying true to that ethos.
          </p>
          <p className="text-foreground text-base md:text-lg leading-relaxed mb-10">
            Our independence allows us to carve our own path, free from corporate red tape or the need to follow trends dictated by big tech. Instead, we offer advice and strategies tailored specifically to your business, always focused on your goals.
          </p>
        </motion.div>

        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 border border-cream/40 text-cream text-xs font-medium tracking-wider uppercase px-5 py-3 rounded-full hover:bg-cream hover:text-background transition-all duration-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
        >
          Book a Call
          <ArrowRight size={14} />
        </motion.a>
      </div>
    </section>
  );
};

export default OurStory;
