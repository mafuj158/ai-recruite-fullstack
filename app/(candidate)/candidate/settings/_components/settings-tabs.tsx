"use client";

import { useRef, useState, useEffect, useCallback, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuShield,
  LuBell,
  LuEye,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { cn } from "@/lib/utils";

export interface CandidateSettingsTabItem {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export const CANDIDATE_SETTINGS_TABS: CandidateSettingsTabItem[] = [
  {
    name: "Account & Security",
    href: "/candidate/settings/security",
    icon: LuShield,
  },
  {
    name: "Notifications",
    href: "/candidate/settings/notifications",
    icon: LuBell,
  },
  {
    name: "Privacy & Visibility",
    href: "/candidate/settings/privacy",
    icon: LuEye,
  },
];

export default function CandidateSettingsTabs() {
  const pathname = usePathname();
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    checkScrollability();

    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);

    const resizeObserver = new ResizeObserver(() => {
      checkScrollability();
    });
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
      resizeObserver.disconnect();
    };
  }, [checkScrollability]);

  // Auto-scroll active tab into view
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const activeEl = el.querySelector('[aria-current="page"]');
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [pathname]);

  const handleScroll = (direction: "left" | "right") => {
    const el = tabsRef.current;
    if (!el) return;
    const scrollAmount = 140;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const hasOverflow = canScrollLeft || canScrollRight;

  return (
    <div className="relative border-b border-zinc-200/90 flex items-center min-w-0 max-w-full">
      {/* Left Arrow Button (shown when tabs overflow) */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll tabs left"
          className={cn(
            "shrink-0 size-7 flex items-center justify-center rounded bg-zinc-50 border border-zinc-200/80 transition-all mr-1 select-none z-10",
            canScrollLeft
              ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer active:scale-95 shadow-2xs"
              : "text-zinc-300 opacity-40 cursor-not-allowed"
          )}
        >
          <LuChevronLeft className="size-3.5" />
        </button>
      )}

      {/* Tabs Scroll Area */}
      <nav
        ref={tabsRef}
        aria-label="Settings sections navigation"
        className="flex items-center gap-1 sm:gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-w-0 flex-1 -mb-px"
      >
        {CANDIDATE_SETTINGS_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            pathname === tab.href ||
            (tab.href === "/candidate/settings/security" &&
              pathname === "/candidate/settings");

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-150 rounded-t-lg shrink-0 select-none whitespace-nowrap",
                isActive
                  ? "bg-[#EDF6F1] text-forest font-semibold border-b-2 border-forest"
                  : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50/80 border-b-2 border-transparent"
              )}
            >
              <Icon
                className={cn(
                  "size-3.5 sm:size-4 transition-colors shrink-0",
                  isActive
                    ? "text-forest"
                    : "text-zinc-400 group-hover:text-zinc-600"
                )}
              />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right Arrow Button (shown when tabs overflow) */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll tabs right"
          className={cn(
            "shrink-0 size-7 flex items-center justify-center rounded bg-zinc-50 border border-zinc-200/80 transition-all ml-1 select-none z-10",
            canScrollRight
              ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer active:scale-95 shadow-2xs"
              : "text-zinc-300 opacity-40 cursor-not-allowed"
          )}
        >
          <LuChevronRight className="size-3.5" />
        </button>
      )}
    </div>
  );
}
