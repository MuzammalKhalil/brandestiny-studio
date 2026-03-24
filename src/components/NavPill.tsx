import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "HOME", number: "01", href: "#hero" },
  { label: "SERVICES", number: "02", href: "#services" },
  { label: "PROJECTS", number: "03", href: "#projects" },
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
        className="pointer-events-auto relative flex flex-col overflow-clip cursor-pointer"
        style={{ borderRadius: 20 }}
        initial={false}
        animate={{
          width: isOpen ? 360 : 358,
          height: isOpen ? 600 : 54,
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
        <div
          className="absolute top-[6px] left-[1.5%] w-[97%] z-[2] overflow-hidden glass-header"
          style={{
            height: isOpen ? 50 : 44,
            borderRadius: 16,
            transition: "height 0.3s ease",
          }}
        />

        {/* Header row */}
        <div
          className="relative z-[3] flex items-center justify-between w-full px-4"
          style={{ height: isOpen ? 50 : 44, minHeight: isOpen ? 50 : 44 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <span className="font-grotesk text-foreground text-sm font-semibold tracking-widest uppercase">
            <span className="text-cream">BR</span>ANDESTINY
          </span>

          {/* Dots toggle */}
          <div className="relative w-[22px] h-[22px] flex-shrink-0">
            {["top-left", "bottom-left", "top-right", "bottom-right", "center-left", "center-right"].map((pos) => {
              const getPosition = () => {
                if (isOpen) {
                  if (pos === "center-left") return { top: "50%", left: "20%", transform: "translate(-50%, -50%)" };
                  if (pos === "center-right") return { top: "50%", right: "20%", left: "auto", transform: "translate(50%, -50%)" };
                  return { top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0 };
                }
                const map: Record<string, React.CSSProperties> = {
                  "top-left": { top: 0, left: 0 },
                  "bottom-left": { bottom: 0, left: 0 },
                  "top-right": { top: 0, right: 0 },
                  "bottom-right": { bottom: 0, right: 0 },
                  "center-left": { top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0 },
                  "center-right": { top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0 },
                };
                return map[pos];
              };

              return (
                <div
                  key={pos}
                  className="absolute w-[7px] h-[7px] rounded-full bg-foreground"
                  style={{
                    transition: "all 0.3s ease",
                    ...getPosition(),
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Nav links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="relative z-[1] flex flex-col flex-1 justify-between px-4 pb-5 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollTo(item.href)}
                    className="group flex items-center gap-3 relative cursor-pointer text-left"
                  >
                    <span className="font-sans text-[36px] font-medium text-foreground leading-tight">
                      {item.label}
                    </span>
                    <span className="font-grotesk text-[20px] text-muted-foreground self-start mt-1">
                      {item.number}
                    </span>
                    <span className="absolute bottom-0 left-0 h-[1px] bg-foreground w-0 group-hover:w-full transition-all duration-300" />
                  </button>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollTo("#contact")}
                className="group flex items-center gap-3 relative cursor-pointer text-left mt-auto"
              >
                <span className="font-sans text-[36px] font-medium text-foreground leading-tight">
                  GET IN TOUCH
                </span>
                <span className="absolute bottom-0 left-0 h-[1px] bg-foreground w-0 group-hover:w-full transition-all duration-300" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default NavPill;
