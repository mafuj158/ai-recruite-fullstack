"use client";

import { cn } from "@/lib/utils";

export interface RadioCardProps {
  id: string;
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}

export const RadioCard = ({
  id,
  title,
  description,
  isSelected,
  onSelect,
  className,
}: RadioCardProps) => {
  return (
    <button
      id={id}
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onSelect}
      className={cn(
        "p-2.5 sm:p-3.5 lg:p-4 rounded border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 sm:gap-2",
        isSelected
          ? "border-forest bg-[#EDF6F1] shadow-2xs"
          : "border-zinc-200/80 hover:border-zinc-300 bg-white",
        className
      )}
    >
      <div className="flex items-center justify-between w-full">
        <span
          className={cn(
            "text-xs sm:text-sm font-semibold",
            isSelected ? "text-forest" : "text-zinc-900"
          )}
        >
          {title}
        </span>
        <div
          className={cn(
            "size-4 rounded-full border flex items-center justify-center transition-colors",
            isSelected
              ? "border-forest bg-forest text-white"
              : "border-zinc-300 bg-white"
          )}
        >
          {isSelected && <span className="size-1.5 rounded-full bg-white" />}
        </div>
      </div>
      <p className="text-[11px] sm:text-xs text-zinc-500 leading-snug">
        {description}
      </p>
    </button>
  );
};

export default RadioCard;
