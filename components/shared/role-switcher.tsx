"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@/types/global.types";

interface RoleSwitcherProps {
  /**
   * Optional manual override for active role in navigation mode
   */
  activeRole?: UserRole;
  /**
   * Custom routes for candidate and employer in navigation mode
   */
  candidateHref?: string;
  employerHref?: string;
  /**
   * Controlled mode props (used when switching state instead of routing, e.g. in login)
   */
  value?: UserRole;
  onChange?: (role: UserRole) => void;
  className?: string;
}

export default function RoleSwitcher({
  activeRole,
  candidateHref = "/register/candidate",
  employerHref = "/register/employer",
  value,
  onChange,
  className = "",
}: RoleSwitcherProps) {
  const pathname = usePathname();

  // Controlled mode (state-driven tab switching)
  if (value && onChange) {
    return (
      <div className={`flex bg-zinc-100 p-1 sm:p-1.5 rounded mb-4 sm:mb-6 ${className}`}>
        <button
          type="button"
          onClick={() => onChange("candidate")}
          className={`flex-1 py-1.5 sm:py-2 text-xs font-semibold rounded transition-all cursor-pointer ${
            value === "candidate"
              ? "bg-forest text-white shadow-xs"
              : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          Candidate
        </button>
        <button
          type="button"
          onClick={() => onChange("employer")}
          className={`flex-1 py-1.5 sm:py-2 text-xs font-semibold rounded transition-all cursor-pointer ${
            value === "employer"
              ? "bg-forest text-white shadow-xs"
              : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          Employer
        </button>
      </div>
    );
  }

  // Navigation mode (route-driven link switching with prefetching)
  const isEmployer =
    activeRole !== undefined
      ? activeRole === "employer"
      : pathname?.includes(employerHref);

  return (
    <div className={`flex bg-zinc-100 p-1 sm:p-1.5 rounded mb-4 sm:mb-6 ${className}`}>
      <Link
        href={candidateHref}
        className={`flex-1 py-1.5 sm:py-2 text-xs font-semibold rounded transition-all text-center ${
          !isEmployer
            ? "bg-forest text-white shadow-xs cursor-default"
            : "text-zinc-500 hover:text-zinc-900"
        }`}
      >
        Candidate
      </Link>
      <Link
        href={employerHref}
        className={`flex-1 py-1.5 sm:py-2 text-xs font-semibold rounded transition-all text-center ${
          isEmployer
            ? "bg-forest text-white shadow-xs cursor-default"
            : "text-zinc-500 hover:text-zinc-900"
        }`}
      >
        Employer
      </Link>
    </div>
  );
}
