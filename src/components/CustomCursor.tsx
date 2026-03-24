import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable on touch/mobile
    if (window.innerWidth <= 991 || "ontouchstart" in window) return;

    document.body.classList.add("custom-cursor");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let isHovering = false;
    let animId: number;
    const LERP = 0.12;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cursor.x = lerp(cursor.x, mouse.x, LERP);
      cursor.y = lerp(cursor.y, mouse.y, LERP);

      const radius = isHovering ? 28 : 10;
      const alpha = isHovering ? 0.6 : 0.9;

      // Outer trailing circle
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner precise dot
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fill();

      animId = requestAnimationFrame(draw);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, label, .interactive"
      );
      isHovering = !!el;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("resize", resize);

    resize();
    draw();

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-canvas fixed top-0 left-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};

export default CustomCursor;
