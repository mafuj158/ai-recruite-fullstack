"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  /**
   * If true, wraps children in the bordered container with divider lines.
   * Defaults to true.
   */
  cardContainer?: boolean;
  className?: string;
}

export const SettingsSection = ({
  title,
  description,
  children,
  cardContainer = true,
  className,
}: SettingsSectionProps) => {
  return (
    <div className={cn("space-y-2.5 sm:space-y-3.5", className)}>
      <div>
        <h2 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
          {title}
        </h2>
        {description && (
          <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
            {description}
          </p>
        )}
      </div>

      {cardContainer ? (
        <div className="divide-y divide-zinc-100 border border-zinc-200/80 rounded px-3.5 sm:px-5 bg-white shadow-2xs">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default SettingsSection;
