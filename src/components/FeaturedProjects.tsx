import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroAbstract from "@/assets/hero-abstract.jpg";
import projectFurniture from "@/assets/project-furniture.jpg";

const projects = [
  { id: 1, image: heroAbstract, category: "SMART", year: "2025" },
  { id: 2, image: projectFurniture, category: "MONOLITH", year: "2024" },
  { id: 3, image: heroAbstract, category: "ART DIRECTION", year: "2024" },
  { id: 4, image: projectFurniture, category: "BRAND DESIGN", year: "2023" },
  { id: 5, image: heroAbstract, category: "CAMPAIGN", year: "2023" },
  { id: 6, image: projectFurniture, category: "CREATIVE", year: "2023" },
];

const FeaturedProjects = () => {
  return (
    <section id="projects" className="w-full bg-background px-6 md:px-12 py-20 md:py-32">
      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left: project grid */}
        <motion.div
          className="md:w-[55%] grid grid-cols-2 gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.category}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <div className="flex justify-between w-full">
                  <span className="text-foreground text-xs font-grotesk">{project.category}</span>
                  <span className="text-muted-foreground text-xs">{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right: heading + CTA */}
        <motion.div
          className="md:w-[45%] md:sticky md:top-24 md:self-start"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-baseline gap-4 mb-6">
            <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl font-normal leading-none">
              Featured<br />Projects
            </h2>
            <span className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl font-light opacity-30">
              11
            </span>
          </div>

          <a
            href="#projects"
            className="inline-flex items-center justify-between gap-4 border text-foreground text-xs font-medium tracking-wider uppercase px-5 py-3 hover:bg-foreground hover:text-background transition-all duration-300 w-full max-w-[200px]"
            style={{ borderColor: "hsl(0 0% 100% / 0.45)" }}
          >
            View All
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
