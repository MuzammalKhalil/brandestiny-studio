const navLinks = [
  { label: "About Us", href: "#story" },
  { label: "Case Studies", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Threads", href: "#" },
  { label: "X", href: "#" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t px-6 md:px-12 pt-12 pb-6" style={{ borderColor: "hsl(0 0% 100% / 0.15)" }}>
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-12">
        {/* Contact */}
        <div className="md:w-1/3">
          <h4 className="text-muted-foreground text-xs font-grotesk uppercase tracking-wider mb-4">Connect With Us</h4>
          <a href="tel:+442036219086" className="text-foreground text-sm block mb-1 hover:opacity-60 transition-opacity">
            +44 203 621 9086
          </a>
          <a href="mailto:info@brandestiny.co" className="text-foreground text-sm block hover:opacity-60 transition-opacity">
            info@brandestiny.co
          </a>
        </div>

        {/* Navigation */}
        <div className="md:w-1/3">
          <h4 className="text-muted-foreground text-xs font-grotesk uppercase tracking-wider mb-4">Navigation</h4>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground text-sm hover:opacity-60 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Social */}
        <div className="md:w-1/3">
          <h4 className="text-muted-foreground text-xs font-grotesk uppercase tracking-wider mb-4">Social</h4>
          <div className="flex flex-col gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground text-sm hover:opacity-60 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "hsl(0 0% 100% / 0.15)" }}>
        <p className="text-muted-foreground text-xs">© 2025. All rights reserved.</p>
        <span className="font-grotesk text-muted-foreground text-xs tracking-widest uppercase">
          <span className="text-cream">BR</span>ANDESTINY
        </span>
      </div>
    </footer>
  );
};

export default Footer;
