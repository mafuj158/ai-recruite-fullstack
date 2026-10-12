"use client";

import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

export interface ToggleRowProps {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (val: boolean) => void;
  icon?: ComponentType<{ className?: string }>;
}

export const ToggleRow = ({
  id,
  title,
  description,
  enabled,
  onChange,
  icon: Icon,
}: ToggleRowProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 py-2.5 sm:py-3.5 transition-colors">
      <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3.5">
        {Icon && (
          <div className="size-8 sm:size-9 rounded bg-zinc-100/80 text-zinc-600 flex items-center justify-center shrink-0 mt-0.5">
            <Icon className="size-3.5 sm:size-4 text-forest" />
          </div>
        )}
        <div className="space-y-0.5">
          <label
            htmlFor={id}
            className="text-xs sm:text-sm font-semibold text-zinc-900 cursor-pointer select-none"
          >
            {title}
          </label>
          <p className="text-[11px] sm:text-xs text-zinc-500 max-w-xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Modern Switch */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto pt-1 sm:pt-0">
        <span
          onClick={() => onChange(!enabled)}
          className="text-[11px] font-medium text-zinc-400 sm:hidden cursor-pointer select-none hover:text-zinc-600 transition-colors"
        >
          {enabled ? "Active" : "Inactive"}
        </span>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => onChange(!enabled)}
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 shadow-2xs sm:mt-0.5",
            enabled ? "bg-forest" : "bg-zinc-200"
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
              enabled ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default ToggleRow;
