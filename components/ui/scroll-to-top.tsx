"use client";

import { useEffect, useState, useCallback } from "react";
import { FaArrowUp } from "react-icons/fa6";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const checkScroll = useCallback(() => {
    // Hide if a modal, drawer, or scroll lock is active
    if (document.body.style.overflow === "hidden") {
      setIsVisible(false);
      return;
    }

    // Check window scroll
    if (window.scrollY > 200) {
      setIsVisible(true);
      return;
    }

    // Check dashboard and nested overflow-y-auto containers (ignoring dialogs/drawers)
    const containers = document.querySelectorAll(".overflow-y-auto");
    for (let i = 0; i < containers.length; i++) {
      if (containers[i].closest('[role="dialog"], .fixed.inset-0')) continue;
      if (containers[i].scrollTop > 200) {
        setIsVisible(true);
        return;
      }
    }

    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Use capturing scroll listener to catch scroll on window AND nested scroll containers
    window.addEventListener("scroll", checkScroll, {
      capture: true,
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", checkScroll, { capture: true });
    };
  }, [checkScroll]);

  const scrollToTop = () => {
    // Scroll window to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Scroll any scrollable containers to top
    const containers = document.querySelectorAll(".overflow-y-auto");
    containers.forEach((container) => {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`group fixed bottom-6 right-6 z-50 size-8 sm:size-11 rounded bg-forest hover:bg-forest/90 text-white hover:text-lime shadow-md hover:shadow-lg border border-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer ${isVisible
        ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
        : "opacity-0 translate-y-4 pointer-events-none scale-90"
        }`}
    >
      <FaArrowUp />
    </button>
  );
}
