import { motion } from "framer-motion";
import serviceMobile from "@/assets/service-mobile.jpg";

const services = [
  { name: "Brand Identity Creation", hasImage: false },
  { name: "Web Design & Development", hasImage: false },
  { name: "Mobile Apps", hasImage: true, image: serviceMobile },
  { name: "Web Apps", hasImage: false },
];

const bottomServices = ["SEO", "Devops", "SaaS, PaaS and IaaS"];

const ServicesSection = () => {
  return (
    <section id="services" className="w-full bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row border-t border-b" style={{ borderColor: "hsl(0 0% 100% / 0.15)" }}>
        <div className="md:w-1/2 border-r px-6 md:px-12 py-6" style={{ borderColor: "hsl(0 0% 100% / 0.15)" }}>
          <motion.h3
            className="font-display text-foreground text-lg font-normal"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Brand Identity Creation
          </motion.h3>
        </div>
        <div className="md:w-1/2 px-6 md:px-12 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-display text-foreground text-2xl md:text-3xl font-normal mb-3">Key Services</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              This is what I focus on.<br />
              Additional services are available upon request.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left tall cell */}
        <div
          className="border-r border-b min-h-[300px] md:min-h-[400px] px-6 py-8 flex flex-col justify-end relative overflow-hidden"
          style={{ borderColor: "hsl(0 0% 100% / 0.15)" }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />
          <motion.h3
            className="font-display text-foreground text-lg font-normal relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Web Design &<br />Development
          </motion.h3>
        </div>

        {/* Mobile Apps - with image */}
        <motion.div
          className="border-r border-b min-h-[300px] md:min-h-[400px] relative overflow-hidden group"
          style={{ borderColor: "hsl(0 0% 100% / 0.15)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <img
            src={serviceMobile}
            alt="Mobile Apps"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="relative z-10 flex flex-col justify-between h-full px-6 py-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-foreground/50" />
            </div>
            <h3 className="font-display text-foreground text-lg font-normal">Mobile Apps</h3>
          </div>
        </motion.div>

        {/* Web Apps */}
        <div
          className="border-b min-h-[300px] md:min-h-[400px] px-6 py-8 flex flex-col justify-end"
          style={{ borderColor: "hsl(0 0% 100% / 0.15)" }}
        >
          <motion.h3
            className="font-display text-foreground text-lg font-normal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Web Apps
          </motion.h3>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 border-b" style={{ borderColor: "hsl(0 0% 100% / 0.15)" }}>
        {bottomServices.map((service, i) => (
          <motion.div
            key={service}
            className="px-6 py-6 font-display text-foreground text-sm md:text-base font-normal"
            style={{
              borderRight: i < 2 ? "1px solid hsl(0 0% 100% / 0.15)" : "none",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {service}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
