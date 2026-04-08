import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    name: "Kristina Kosa",
    role: "Co-Founder, Yoginess",
    text: "Brandestiny has an amazing customer support! plays a vital role aftersale service, the people are very really supportive, and also respond back quickly with the fixes.",
    avatar: "https://i.pravatar.cc/150?u=kristina",
  },
  {
    name: "Kristina Kosa",
    role: "Co-Founder, Yoginess",
    text: "Brandestiny has an amazing customer support! plays a vital role aftersale service, the people are very really supportive, and also respond back quickly with the fixes.",
    avatar: "https://i.pravatar.cc/150?u=kristina",
    featured: true,
  },
  {
    name: "Kristina Kosa",
    role: "Co-Founder, Yoginess",
    text: "Brandestiny has an amazing customer support! plays a vital role aftersale service, the people are very really supportive, and also respond back quickly with the fixes.",
    avatar: "https://i.pravatar.cc/150?u=kristina",
  },
  {
    name: "Kristina Kosa",
    role: "Co-Founder, Yoginess",
    text: "Brandestiny has an amazing customer support! plays a vital role aftersale service, the people are very really supportive, and also respond back quickly with the fixes.",
    avatar: "https://i.pravatar.cc/150?u=kristina",
  },
];

const Testimonials = () => {
  const navigate = useNavigate();
  // Double the testimonials for infinite marquee effect
  const doubledTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="w-full py-24 md:py-36 overflow-hidden" style={{ background: "var(--black-2)" }}>
      {/* Heading with Circle Icon */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="w-3 h-3 rounded-full border border-white/40" />
        <h2 className="text-white text-xl md:text-2xl font-display font-medium tracking-tight">
          What they say about us
        </h2>
      </motion.div>

      {/* Auto Scroll Marquee with Pause on Hover */}
      <div className="relative flex overflow-hidden group/marquee">
        <motion.div 
          className="flex gap-8"
          animate={{
            x: [0, -1712], // Exactly 4 cards (400px each) + 4 gaps (28px/7rem each)
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          // This allows stopping the animation on hover
          whileHover={{ animationPlayState: "paused" }}
        >
          {doubledTestimonials.map((t, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[300px] md:w-[400px] p-8 md:p-10 rounded-[32px] flex flex-col min-h-[450px] transition-all duration-500 bg-[#1a1a1a] text-white hover:bg-white hover:text-black group/card border border-white/5"
              whileHover={{ scale: 1.01, y: -5 }}
            >
              {/* Large Quote Icon */}
              <div className="mb-8">
                <svg width="40" height="30" viewBox="0 0 40 30" fill="currentColor" className="text-[#d4b499]">
                  <path d="M11.4 0C5.1 0 0 5.1 0 11.4V30H15.2V11.4H7.6C7.6 9.3 9.3 7.6 11.4 7.6V0ZM36.2 0C29.9 0 24.8 5.1 24.8 11.4V30H40V11.4H32.4C32.4 9.3 34.1 7.6 36.2 7.6V0Z" />
                </svg>
              </div>

              {/* Testimonial Text */}
              <p className="text-lg md:text-xl leading-relaxed mb-8 flex-1 font-display text-white/80 group-hover/card:text-black">
                {t.text}
              </p>

              {/* Featured Call to Action - Now only shows on hover or if needed */}
              <div className="mb-10 text-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                <button 
                  onClick={() => navigate("/lets-connect")}
                  className="text-black font-bold text-lg border-b-2 border-black/10 hover:border-black transition-all pb-1"
                >
                  Book A Call
                </button>
              </div>

              {/* Footer: Avatar + Info */}
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-bold text-sm text-white group-hover/card:text-black">{t.name}</p>
                  <p className="text-xs text-white/40 group-hover/card:text-black/60">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
