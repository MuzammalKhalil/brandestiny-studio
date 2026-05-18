import { useEffect } from "react";

const GBP_TO_USD_RATE = 1.27;
const TAWK_PROPERTY_ID = "6a0b5fc23507531c343e01c8";
const TAWK_WIDGET_ID = "1jou6s4le";
const TAWK_SCRIPT_ID = "tawk-to-widget";

const FloatingChatbot = () => {
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

  useEffect(() => {
    if (document.getElementById(TAWK_SCRIPT_ID)) return;

    const windowWithTawk = window as typeof window & {
      Tawk_API?: Record<string, unknown>;
      Tawk_LoadStart?: Date;
    };

    windowWithTawk.Tawk_API = windowWithTawk.Tawk_API || {};
    windowWithTawk.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.id = TAWK_SCRIPT_ID;
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
  }, []);

  return null;
};

export default FloatingChatbot;
