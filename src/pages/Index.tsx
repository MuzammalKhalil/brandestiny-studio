import NavPill from "@/components/NavPill";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import OurStory from "@/components/OurStory";
import HowWeWork from "@/components/HowWeWork";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <NavPill />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturedProjects />
      <OurStory />
      <HowWeWork />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
