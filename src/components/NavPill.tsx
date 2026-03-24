import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "HOME", number: "01", href: "#hero" },
  { label: "WORK", number: "02", href: "#projects" },
  { label: "SERVICES", number: "03", href: "#services" },
  { label: "ABOUT", number: "04", href: "#story" },
];

const NavPill = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none">
      <motion.nav
        ref={pillRef}
        className="pointer-events-auto relative flex flex-col items-start overflow-clip"
        style={{ borderRadius: 20, padding: 20 }}
        initial={false}
        animate={{
          width: isOpen ? 360 : 358,
          height: isOpen ? "min(680px, 85vh)" : 54,
        }}
        transition={{
          height: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
          width: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Glass background */}
        <div className="absolute inset-0 glass-dark" style={{ borderRadius: "inherit" }} />

        {/* Inner header strip */}
        <motion.div
          className="absolute top-[6px] left-[1.5%] w-[97%] z-[2] overflow-hidden glass-header"
          style={{ borderRadius: 16 }}
          initial={false}
          animate={{ height: isOpen ? 50 : 44 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Header row: Logo + Dots toggle */}
        <div
          className="relative z-[3] flex items-center justify-between w-full cursor-pointer interactive"
          style={{ height: 44, minHeight: 44 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <span className="font-grotesk text-white text-[13px] font-semibold tracking-[0.15em] uppercase select-none">
            <span className="text-cream">BR</span>ANDESTINY
          </span>

          {/* Animated dots toggle */}
          <div className="relative w-[22px] h-[22px] flex-shrink-0">
            {/* 4 corner dots + 2 center dots */}
            {[
              { id: "tl", closed: { top: 0, left: 0 }, open: { top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0 } },
              { id: "bl", closed: { bottom: 0, left: 0 }, open: { top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0 } },
              { id: "tr", closed: { top: 0, right: 0 }, open: { top: "50%", right: "50%", x: "50%", y: "-50%", opacity: 0 } },
              { id: "br", closed: { bottom: 0, right: 0 }, open: { top: "50%", right: "50%", x: "50%", y: "-50%", opacity: 0 } },
              { id: "cl", closed: { top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0 }, open: { top: "50%", left: "15%", x: "-50%", y: "-50%", opacity: 1 } },
              { id: "cr", closed: { top: "50%", right: "50%", x: "50%", y: "-50%", opacity: 0 }, open: { top: "50%", right: "15%", x: "50%", y: "-50%", opacity: 1 } },
            ].map((dot) => (
              <motion.div
                key={dot.id}
                className="absolute w-[7px] h-[7px] rounded-full bg-white"
                initial={false}
                animate={isOpen ? dot.open : dot.closed}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="relative z-[1] flex flex-col flex-1 justify-between w-full pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              {/* Nav links */}
              <div className="flex flex-col gap-[8px]">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollTo(item.href)}
                    className="group flex items-center gap-[10px] relative cursor-pointer text-left w-fit interactive"
                  >
                    <span className="font-sans text-[36px] font-medium text-white leading-[1.05] tracking-normal">
                      {item.label}
                    </span>
                    <span className="font-grotesk text-[20px] font-light text-[#7a7a7a] self-start mt-[2px]">
                      {item.number}
                    </span>
                    {/* Animated underline */}
                    <span className="absolute bottom-0 left-0 h-[1px] bg-white w-[1%] group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                  </button>
                ))}
              </div>

              {/* CTA at bottom */}
              <div className="mt-auto pt-4">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="group flex items-center gap-[10px] relative cursor-pointer text-left w-fit interactive"
                >
                  <span className="font-sans text-[36px] font-medium text-white leading-[1.05]">
                    GET IN TOUCH
                  </span>
                  <span className="absolute bottom-0 left-0 h-[1px] bg-white w-[1%] group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default NavPill;
