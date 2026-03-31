import CustomCursor from "@/components/CustomCursor";
import NavPill from "@/components/NavPill";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CalendarWidget } from "@/components/CalendarWidget";

const LetsConnect = () => {
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
