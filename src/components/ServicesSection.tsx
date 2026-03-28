import { motion } from "framer-motion";
import { useRef } from "react";
import project2 from "@/assets/project-2.png";

const ServicesSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section id="services" className="w-full bg-black">
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
        {/* Row 1, Col 1: Brand Identity Creation */}
        <div className="relative group p-8 md:p-12 aspect-square md:aspect-auto md:h-[400px] border-b border-white/10 md:border-right border-white/10 flex flex-col justify-between">
          <div className="w-5 h-5 rounded-full border border-white/30" />
          <h3 className="font-display text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
            Brand Identity <br /> Creation
          </h3>
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-white/10" />
        </div>

        {/* Row 1, Col 2-3: Key Services */}
        <div className="md:col-span-2 p-8 md:p-12 border-b border-white/10 flex flex-col justify-between h-[300px] md:h-auto">
          <h2 className="font-display text-white text-3xl md:text-4xl font-bold">
            Key Services
          </h2>
          <div className="max-w-md">
            <p className="text-white text-xl md:text-2xl font-medium leading-relaxed">
              This is what I focus on. <br />
              Additional services are available upon request.
            </p>
          </div>
        </div>

        {/* Row 2, Col 1: Web Design & Development */}
        <div className="relative p-8 md:p-12 aspect-square md:aspect-auto md:h-[400px] border-b border-white/10 flex flex-col justify-between">
          <div className="w-5 h-5 rounded-full border border-white/30" />
          <h3 className="font-display text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
            Web Design & <br /> Development
          </h3>
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-white/10" />
        </div>

        {/* Row 2, Col 2: Mobile Apps (With Video on Hover) */}
        <div 
          className="relative group p-8 md:p-12 aspect-square md:aspect-auto md:h-[400px] border-b border-white/10 overflow-hidden flex flex-col justify-between"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background Image (Fallback) */}
          <img 
            src={project2} 
            alt="Mobile Apps" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-0 transition-opacity duration-500"
          />
          
          {/* Background Video */}
          <video
            ref={videoRef}
            src="/Homepage_Sable.mp4"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-500"
            muted
            loop
            playsInline
          />

          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative z-10">
            <div className="w-5 h-5 rounded-full bg-white" />
          </div>
          
          <h3 className="relative z-10 font-display text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
            Mobile Apps
          </h3>
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-white/10" />
        </div>

        {/* Row 2, Col 3: Web Apps */}
        <div className="p-8 md:p-12 aspect-square md:aspect-auto md:h-[400px] border-b border-white/10 flex flex-col justify-between">
          <div className="w-5 h-5 rounded-full border border-white/30" />
          <h3 className="font-display text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
            Web Apps
          </h3>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
