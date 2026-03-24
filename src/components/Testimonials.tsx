import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Kristina Rose",
    role: "Co-Founder, Argonauts",
    text: "Brandestiny has an amazing customer support! plays a vital role after/in service, the people are very really supportive, and also respond back quickly with the fixes.",
    avatar: "KR",
  },
  {
    name: "Kristina Rose",
    role: "Co-Founder, Argonauts",
    text: "Brandestiny has an amazing customer support! plays a vital role after/in service, the people are very really supportive, and also respond back quickly with the fixes.",
    avatar: "KR",
    featured: true,
  },
  {
    name: "Kristina Rose",
    role: "Co-Founder, Argonauts",
    text: "Brandestiny has an amazing customer support! plays a vital role after/in service, the people are very really supportive, and also respond back quickly with the fixes.",
    avatar: "KR",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full bg-background px-6 md:px-12 py-20 md:py-32">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-cream text-sm font-grotesk tracking-wider">✦ What they say about us</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className={`border rounded-lg p-6 flex flex-col ${
              t.featured ? "bg-surface-card" : "bg-background"
            }`}
            style={{ borderColor: "hsl(0 0% 100% / 0.15)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <span key={j} className="text-cream text-sm">★</span>
              ))}
            </div>

            {t.featured && (
              <div className="mb-4 w-full aspect-[4/3] bg-surface-dark rounded overflow-hidden flex items-center justify-center">
                <span className="text-cream text-2xl">✦</span>
              </div>
            )}

            {t.featured && (
              <a href="#contact" className="inline-flex items-center gap-2 border border-cream/40 text-cream text-xs font-medium tracking-wider uppercase px-4 py-2 rounded-full hover:bg-cream hover:text-background transition-all duration-300 w-fit mb-4">
                Book A Call
              </a>
            )}

            <p className="text-foreground/80 text-sm leading-relaxed mb-6 flex-1">{t.text}</p>

            <div className="flex items-center gap-3 mt-auto">
              <div className="w-8 h-8 rounded-full bg-surface-card border border-white-15 flex items-center justify-center" style={{ borderColor: "hsl(0 0% 100% / 0.15)" }}>
                <span className="text-foreground text-xs font-medium">{t.avatar}</span>
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
