import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CustomCursor from "@/components/CustomCursor";
import NavPill from "@/components/NavPill";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.png";
import project4 from "@/assets/project-4.png";
import project5 from "@/assets/project-5.png";
import project6 from "@/assets/project-6.png";

const caseStudies = [
  {
    id: 1,
    title: "Google Website",
    image: project1,
    category: "Development",
    nda: true,
  },
  {
    id: 2,
    title: "Sable App",
    image: project2,
    category: "Mobile App",
    nda: false,
  },
  {
    id: 3,
    title: "Seen Brand",
    image: project3,
    category: "Branding",
    nda: false,
  },
  {
    id: 4,
    title: "Airbnb App",
    image: project4,
    category: "UI/UX Design",
    nda: true,
  },
  {
    id: 5,
    title: "Seen Website",
    image: project5,
    category: "Web Design",
    nda: false,
  },
  {
    id: 6,
    title: "Creative Studio",
    image: project6,
    category: "Art Direction",
    nda: false,
  },
  {
    id: 7,
    title: "Eco Packaging",
    image: project1,
    category: "Product Design",
    nda: true,
  },
  {
    id: 8,
    title: "HealthTech App",
    image: project2,
    category: "Mobile UI",
    nda: false,
  },
  {
    id: 9,
    title: "Modern Furniture",
    image: project3,
    category: "3D Rendering",
    nda: false,
  },
];

const CaseStudies = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !triggerRef.current) return;

    const totalWidth = sectionRef.current.scrollWidth - window.innerWidth;

    gsap.to(sectionRef.current, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: triggerRef });

  return (
    <SmoothScroll>
      <div className="bg-black text-white min-h-screen">
        <CustomCursor />
        <NavPill />
        
        <main ref={triggerRef} className="overflow-x-hidden pt-20 md:pt-32 pb-5 md:pb-5">
          <div 
            ref={sectionRef}
            className="flex flex-col md:flex-row md:items-center h-auto md:h-[80vh] w-full md:w-fit px-6 md:px-20 gap-8 md:gap-12"
          >
            {/* Header / Heading - Now the first item in the horizontal track */}
            <div className="w-fit md:min-w-[500px] flex flex-col justify-center flex-shrink-0 pt-10 md:pt-0 h-auto md:h-full">
              <div className="flex flex-col gap-6 md:gap-8">
                <h1 
                  className="font-display font-bold tracking-tight leading-[0.9]"
                  style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)" }}
                >
                  Case <br /> Studies
                </h1>
                <div className="max-w-[280px] md:max-w-xs text-gray-500 font-grotesk text-xs md:text-sm uppercase tracking-widest leading-relaxed">
                  Explorations of digital <br className="hidden md:block" />
                  products and brand <br className="hidden md:block" />
                  identities that push boundaries.
                </div>
                <div className="mt-8 md:mt-12 flex items-center gap-4 text-white/30 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                  <span className="md:block hidden">Scroll to explore</span>
                  <span className="md:hidden block">Scroll down to explore</span>
                  <div className="w-8 md:w-12 h-[1px] bg-white/10" />
                </div>
              </div>
            </div>

            {/* Cards section */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center w-full md:h-full py-10 md:py-0">
              {caseStudies.map((study) => (
                <motion.div
                  key={study.id}
                  className="relative w-full sm:w-[85vw] md:w-[380px] aspect-[4/5] md:aspect-[3/4] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group flex-shrink-0 max-h-[70vh]"
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* NDA Badge */}
                  {study.nda && (
                    <div className="absolute top-6 left-6 md:top-10 md:left-10">
                      <div className="bg-white text-black px-3 py-1 md:px-5 md:py-2 rounded-full shadow-2xl">
                        <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase">NDA</span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 md:mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      {study.title}
                    </h3>
                    <div className="h-[1px] w-0 group-hover:w-full bg-white/30 transition-all duration-700 mb-3 md:mb-4" />
                    <p className="text-gray-400 text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.2em] font-medium">
                      {study.category}
                    </p>
                  </div>

                  <Link 
                    to={`/case-studies/${study.id}`}
                    className="absolute inset-0 z-10"
                  />
                </motion.div>
              ))}
            </div>
            
            {/* End spacer for padding */}
            <div className="w-2 md:w-4 flex-shrink-0 h-1" />
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default CaseStudies;
