import CustomCursor from "@/components/CustomCursor";
import NavPill from "@/components/NavPill";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CalendarWidget } from "@/components/CalendarWidget";

const FlagIcon = ({ country }: { country: "uk" | "us" }) => {
  if (country === "uk") {
    return (
      <svg viewBox="0 0 60 36" className="h-6 w-10 shrink-0 rounded-sm" aria-hidden="true">
        <clipPath id="connect-uk-flag">
          <rect width="60" height="36" rx="3" />
        </clipPath>
        <g clipPath="url(#connect-uk-flag)">
          <rect width="60" height="36" fill="#012169" />
          <path d="M0 0l60 36M60 0 0 36" stroke="#fff" strokeWidth="8" />
          <path d="M0 0l60 36M60 0 0 36" stroke="#C8102E" strokeWidth="4" />
          <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="12" />
          <path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="7" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 36" className="h-6 w-10 shrink-0 rounded-sm" aria-hidden="true">
      <clipPath id="connect-us-flag">
        <rect width="60" height="36" rx="3" />
      </clipPath>
      <g clipPath="url(#connect-us-flag)">
        <rect width="60" height="36" fill="#fff" />
        {Array.from({ length: 7 }).map((_, index) => (
          <rect key={index} y={index * 5.54} width="60" height="2.77" fill="#B22234" />
        ))}
        <rect width="24" height="19.4" fill="#3C3B6E" />
        {Array.from({ length: 18 }).map((_, index) => (
          <circle
            key={index}
            cx={3.2 + (index % 6) * 3.6}
            cy={3 + Math.floor(index / 6) * 5.4}
            r="0.8"
            fill="#fff"
          />
        ))}
      </g>
    </svg>
  );
};

const LetsConnect = () => {
  const offices = [
    { flag: "uk" as const, city: "Doncaster", country: "United Kingdom" },
    { flag: "us" as const, city: "Sherman Oaks", country: "United States" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col items-center w-full" style={{ background: "var(--black-2)" }}>
      <CustomCursor />
      <NavPill />
      
      <main className="flex-1 w-full pt-44 pb-24 px-6 md:px-10 flex flex-col items-center">
        <motion.div 
          className="max-w-[1000px] w-full text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-white text-4xl md:text-5xl lg:text-[72px] leading-[1] font-display font-medium mb-12 tracking-tight">
            LET'S TALK ABOUT YOUR <br/> IDEA. <span className="text-[#fde3c6]">OR LET'S BUILD IT.</span>
          </h1>
          
          <p className="text-white/60 text-sm md:text-base font-display font-medium">
            Message me, or book a call: <a href="mailto:info@brandestiny.co" className="text-[#fde3c6] hover:brightness-110 transition-colors">info@brandestiny.co</a>.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {offices.map((office) => (
              <div
                key={office.city}
                className="flex min-w-[220px] items-center justify-center gap-3 border border-white/10 bg-white/[0.03] px-5 py-3 text-left"
              >
                <FlagIcon country={office.flag} />
                <span className="flex flex-col">
                  <span className="text-sm font-display font-semibold text-white">{office.city}</span>
                  <span className="text-xs font-grotesk uppercase tracking-wider text-white/45">{office.country}</span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="w-full max-w-[1060px] rounded-[20px] overflow-hidden border border-white/10 mx-auto shadow-2xl shadow-black/50"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <CalendarWidget />
        </motion.div>
      </main>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default LetsConnect;
