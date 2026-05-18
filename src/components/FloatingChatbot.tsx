import { useEffect, useState } from "react";
import { CalendarDays, Mail, MessageCircle, Phone, X } from "lucide-react";

const GBP_TO_USD_RATE = 1.27;

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const convertedNodes = new WeakSet<Text>();
    let isCancelled = false;

    const convertTextNode = (node: Text) => {
      if (convertedNodes.has(node) || !node.nodeValue?.includes("£")) return;

      node.nodeValue = node.nodeValue.replace(/£\s?(\d+(?:\.\d+)?)/g, (_, amount: string) => {
        const usd = Math.round(parseFloat(amount) * GBP_TO_USD_RATE);
        return `$${usd}`;
      });
      convertedNodes.add(node);
    };

    const convertNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        convertTextNode(node as Text);
        return;
      }

      if (!(node instanceof HTMLElement)) return;
      if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(node.tagName)) return;

      node.childNodes.forEach(convertNode);
    };

    const convertHeadingPrices = () => {
      document.querySelectorAll("h2").forEach((h2) => {
        const sup = h2.querySelector("sup");
        const nextNode = sup?.nextSibling;

        if (sup?.innerText.trim() !== "£" || nextNode?.nodeType !== Node.TEXT_NODE) return;

        const gbp = parseFloat(nextNode.nodeValue?.trim() || "");
        if (Number.isNaN(gbp)) return;

        sup.innerText = "$";
        nextNode.nodeValue = String(Math.round(gbp * GBP_TO_USD_RATE));
        convertedNodes.add(nextNode as Text);
      });
    };

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (isCancelled || data.country !== "US") return;

        convertNode(document.body);
        convertHeadingPrices();
      })
      .catch(() => {
        // Keep the site unchanged if geo lookup is blocked or unavailable.
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[120] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {isOpen && (
        <div className="w-[min(calc(100vw-2.5rem),340px)] border border-white/15 bg-[#060606]/95 p-4 text-white shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="font-grotesk text-[11px] uppercase tracking-[0.18em] text-[#fde3c6]">Brandestiny</p>
              <h2 className="mt-1 text-xl font-semibold leading-tight">How can we help?</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="interactive flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-white/70 transition-colors hover:border-white/30 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-2">
            <a
              href="https://wa.me/447380313065"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive flex items-center gap-3 border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-medium transition-colors hover:border-[#fde3c6]/50 hover:text-[#fde3c6]"
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp us
            </a>
            <a
              href="mailto:info@brandestiny.co"
              className="interactive flex items-center gap-3 border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-medium transition-colors hover:border-[#fde3c6]/50 hover:text-[#fde3c6]"
            >
              <Mail size={18} aria-hidden="true" />
              Email the team
            </a>
            <a
              href="tel:+12139930155"
              className="interactive flex items-center gap-3 border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-medium transition-colors hover:border-[#fde3c6]/50 hover:text-[#fde3c6]"
            >
              <Phone size={18} aria-hidden="true" />
              Call US office
            </a>
            <a
              href="/lets-connect"
              className="interactive flex items-center gap-3 border border-white/10 bg-[#fde3c6] px-3 py-3 text-sm font-semibold text-[#020202] transition-opacity hover:opacity-90"
            >
              <CalendarDays size={18} aria-hidden="true" />
              Book a call
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="interactive flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-[#fde3c6] text-[#020202] shadow-2xl shadow-black/40 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fde3c6]/60 focus:ring-offset-2 focus:ring-offset-black"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={26} aria-hidden="true" /> : <MessageCircle size={27} aria-hidden="true" />}
      </button>
    </div>
  );
};

export default FloatingChatbot;
