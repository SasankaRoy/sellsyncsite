import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout to ensure DOM is ready and layout is stabilized
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (pathname !== "/demo") {
      // Optional: Scroll to top if no hash, but avoid doing it on Demo page if unintended
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
