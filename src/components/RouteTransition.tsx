import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import brandestinyLogo from "@/assets/brandestiny-footer-logo.png";

const RouteTransition = () => {
  const location = useLocation();
  const firstRunRef = useRef(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textMaskRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }

    setVisible(true);
  }, [location.pathname]);

  useEffect(() => {
    if (!visible || !overlayRef.current || !logoRef.current || !textMaskRef.current) return;

    const timeline = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    timeline
      .fromTo(overlayRef.current, { autoAlpha: 1 }, { autoAlpha: 1, duration: 0.05 })
      .set(textMaskRef.current, {
        color: "#ffffff",
        clipPath: "inset(0 100% 0 0)",
        willChange: "clip-path,color,opacity,transform",
      })
      .fromTo(
        logoRef.current,
        { autoAlpha: 0, rotate: 0, scale: 0.18 },
        {
          autoAlpha: 1,
          rotate: 720,
          scale: 1.25,
          duration: 1.8,
          ease: "power3.out",
        },
        0.05,
      )
      .to(
        textMaskRef.current,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.4,
          ease: "power2.out",
        },
        0.45,
      )
      .to(
        textMaskRef.current,
        {
          color: "#fde3c6",
          duration: 2.2,
          ease: "power2.inOut",
        },
        2.5,
      )
      .to(
        logoRef.current,
        {
          autoAlpha: 0,
          scale: 5,
          duration: 1.4,
          ease: "power3.in",
        },
        4.4,
      )
      .to(
        textMaskRef.current,
        {
          autoAlpha: 0,
          scale: 1.12,
          duration: 0.9,
          ease: "power2.in",
        },
        4.6,
      )
      .to(overlayRef.current, { autoAlpha: 0, duration: 0.45, ease: "power2.out" }, 5.55);

    return () => {
      timeline.kill();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <img
          ref={logoRef}
          src={brandestinyLogo}
          alt=""
          className="w-28 md:w-40 select-none"
        />
        <span
          className="relative flex min-w-[18rem] md:min-w-[28rem] items-center justify-center overflow-hidden font-display text-3xl md:text-5xl font-bold uppercase tracking-[0.24em] text-white"
        >
          <span ref={textMaskRef} className="inline-block overflow-hidden whitespace-nowrap text-center">
            BRANDESTINY
          </span>
        </span>
      </div>
    </div>
  );
};

export default RouteTransition;
