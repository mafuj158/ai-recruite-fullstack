"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function MarketingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-999 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-[#1f382d]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.12)] py-2.5 sm:py-3"
          : "bg-transparent border-b border-transparent py-3 sm:py-5"
      )}
    >
      <div className="container flex justify-between items-center transition-all duration-300">
        <Link href="/" className="transition-transform duration-300 hover:opacity-90 active:scale-95">
          <Logo />
        </Link>
        <Button
          isLink
          path="/login"
          className={cn(
            "rounded-full transition-all duration-300 shadow-sm",
            isScrolled ? "px-4 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm" : "px-4 py-2 text-xs sm:px-6 sm:py-2.5 sm:text-base"
          )}
          variant="secondary"
        >
          Login
        </Button>
      </div>
    </header>
  );
}
