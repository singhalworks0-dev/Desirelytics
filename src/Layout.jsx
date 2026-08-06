import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import WhatsAppButton from "./components/common/WhatsAppButton";
import { trackVisitorEvent } from "./utils/visitorTracker";

function ScrollToTopAndTrack() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackVisitorEvent("page_view", { path: pathname });
  }, [pathname]);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const targetBtn = e.target.closest("button, a");
      if (targetBtn) {
        const text = targetBtn.innerText?.trim() || targetBtn.getAttribute("aria-label") || "Interactive Element";
        const href = targetBtn.getAttribute("href") || targetBtn.getAttribute("to") || "";
        trackVisitorEvent("button_click", { buttonText: text, targetUrl: href });
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollToTopAndTrack />
      <Outlet />
      <WhatsAppButton />
    </>
  );
}