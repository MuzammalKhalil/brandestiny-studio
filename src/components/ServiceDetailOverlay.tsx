import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import footerLogo from "@/assets/brandestiny-footer-logo.png";
import brandestinyLogo from "@/assets/brandestiny.png";
import { type ServiceItem } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

type ServiceDetailOverlayProps = {
  service: ServiceItem;
  onClose: () => void;
};

const ServiceDetailOverlay = ({ service, onClose }: ServiceDetailOverlayProps) => {
  const detailRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLetsConnect = () => {
    onClose();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    navigate("/lets-connect");
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (!detailRef.current) return undefined;

    detailRef.current.scrollTop = 0;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(
      new CustomEvent("brandestiny:nav-scroll-source", {
        detail: { source: detailRef.current },
      }),
    );

    return () => {
      document.body.style.overflow = originalOverflow;
      window.dispatchEvent(
        new CustomEvent("brandestiny:nav-scroll-source", {
          detail: { source: null },
        }),
      );
    };
  }, []);

  useGSAP(
    () => {
      if (!detailRef.current) return;
      const scroller = detailRef.current;
      const logoIntro = scroller.querySelector(".service-open-logo");
      const detailShell = scroller.querySelector(".service-detail-shell");

      gsap
        .timeline()
        .fromTo(scroller, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 })
        .fromTo(
          logoIntro,
          { autoAlpha: 1, rotate: 0, scale: 1.25 },
          {
            autoAlpha: 0,
            rotate: 720,
            scale: 0.18,
            duration: 1,
            ease: "power3.inOut",
          },
          0.05,
        )
        .fromTo(
          detailShell,
          {
            autoAlpha: 0,
            scale: 0.82,
            clipPath: "inset(45% 45% 45% 45% round 28px)",
          },
          {
            autoAlpha: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            duration: 0.95,
            ease: "power3.out",
          },
          0.22,
        );

      const panels = gsap.utils.toArray<HTMLElement>(".service-panel");
      panels.forEach((panel) => {
        const media = panel.querySelector(".service-panel-media");
        const copy = panel.querySelector(".service-panel-copy");

        gsap.fromTo(
          copy,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              scroller,
              start: "top 65%",
              end: "center center",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          media,
          { yPercent: 12, scale: 1.08 },
          {
            yPercent: -8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              scroller,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    },
    { dependencies: [service], scope: detailRef },
  );

  return (
    <div
      ref={detailRef}
      className="fixed inset-0 z-[45] overflow-y-auto bg-black text-white no-scrollbar"
      data-lenis-prevent
    >
      <div className="service-open-logo pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-black">
        <img
          src={brandestinyLogo}
          alt=""
          className="w-28 md:w-40 select-none"
          style={{ filter: "invert(1) brightness(2.4) contrast(1.15)" }}
          aria-hidden="true"
        />
      </div>

      <button
        type="button"
        onClick={onClose}
        className="fixed right-5 top-24 md:right-8 md:top-28 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/70 backdrop-blur-md transition-colors hover:border-white/50 hover:text-white"
        aria-label="Close service"
      >
        <X className="h-5 w-5" />
      </button>

      <main className="service-detail-shell">
        <section className="min-h-screen px-6 md:px-12 lg:px-20 flex flex-col justify-end pb-12 md:pb-20 relative overflow-hidden">
          <video
            src={service.videoSrc}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30" />
          <button
            type="button"
            onClick={onClose}
            className="relative z-10 self-start mb-12 inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            All services
          </button>
          <div className="relative z-10 max-w-5xl">
            <p className="text-white/45 text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-5">
              {service.eyebrow}
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8">
              {service.cardTitle}
            </h1>
            <p className="max-w-2xl text-white/70 text-lg md:text-2xl leading-relaxed">
              {service.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {service.outcomes.map((outcome) => (
                <span
                  key={outcome}
                  className="rounded-full border border-white/15 px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.16em] text-white/65"
                >
                  {outcome}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28">
          <div className="flex flex-col gap-16 md:gap-28">
            {service.panels.map((panel, index) => {
              const reversed = index % 2 === 1;

              return (
                <article
                  key={panel.title}
                  className={`service-panel grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen ${
                    reversed ? "lg:[&_.service-panel-copy]:order-2" : ""
                  }`}
                >
                  <div className="service-panel-copy flex flex-col gap-6">
                    <span className="text-white/30 text-xs uppercase tracking-[0.3em] font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold leading-none">
                      {panel.title}
                    </h2>
                    <p className="max-w-md text-white/55 text-base md:text-lg leading-relaxed">
                      {panel.body}
                    </p>
                  </div>

                  <div className="relative min-h-[360px] md:min-h-[560px] overflow-hidden rounded-[1.25rem] bg-white/5">
                    <video
                      src={panel.videoSrc}
                      className="service-panel-media absolute inset-0 w-full h-[120%] object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="overflow-hidden px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
          <div className="border-t border-white/10 pt-10 md:pt-14">
            <div className="marquee-track mb-14 md:mb-20">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 mx-8 flex-shrink-0">
                  <span
                    className="font-display text-white/70 font-bold whitespace-nowrap tracking-tight"
                    style={{ fontSize: "clamp(4rem, 8vw, 8rem)" }}
                  >
                    BRANDESTINY
                  </span>
                  <img
                    src={footerLogo}
                    alt="Brandestiny mark"
                    className="w-16 h-16 md:w-20 md:h-20 object-contain flex-shrink-0 opacity-80"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="mx-auto flex min-h-[260px] max-w-5xl flex-col items-center justify-center gap-8 text-center">
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-none text-white">
                Let's Go Beyond the Stars
              </h2>
              <button
                type="button"
                onClick={handleLetsConnect}
                className="inline-flex items-center gap-3 rounded-full bg-[#fde3c6] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-black transition-transform duration-300 hover:scale-105"
              >
                Let's Connect
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServiceDetailOverlay;
