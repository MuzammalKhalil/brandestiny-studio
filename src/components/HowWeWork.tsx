import { motion } from "framer-motion";
import heroAbstract from "@/assets/hero-abstract.jpg";

const steps = [
  {
    number: "1",
    title: "Align on your key product goal",
    description: "Start with what matters: your core product objective. We build solutions around real user needs to set a strong foundation for growth.",
  },
  {
    number: "2",
    title: "Design with precision",
    description: "Every pixel matters. We craft interfaces that are both beautiful and functional, ensuring your users have a seamless experience.",
  },
  {
    number: "3",
    title: "Build & iterate rapidly",
    description: "Using modern tech stacks and agile processes, we deliver working products fast — then refine based on real user feedback.",
  },
];

const HowWeWork = () => {
  return (
    <section className="w-full bg-background px-6 md:px-12 py-20 md:py-32 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <img src={heroAbstract} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-foreground text-3xl md:text-5xl lg:text-6xl font-normal leading-tight">
            How we turn startup<br />
            <span className="italic text-cream">goals into results</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <span className="font-display text-foreground text-6xl md:text-7xl font-light opacity-20 mb-4">
                {step.number}
              </span>
              <h3 className="text-foreground text-lg font-medium mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
