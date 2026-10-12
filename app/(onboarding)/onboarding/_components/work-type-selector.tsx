"use client";

import { LuGlobe, LuBuilding2, LuLaptop } from "react-icons/lu";
import { WorkTypePreference } from "@/types/candidate/onboarding.types";
import { cn } from "@/lib/utils";

interface WorkTypeSelectorProps {
  value?: WorkTypePreference | "";
  onChange: (val: WorkTypePreference) => void;
  error?: string;
}

const WORK_TYPE_OPTIONS: {
  id: WorkTypePreference;
  title: string;
  desc: string;
  icon: typeof LuGlobe;
}[] = [
  {
    id: "Remote",
    title: "Remote",
    desc: "Work from anywhere worldwide or in timezone",
    icon: LuGlobe,
  },
  {
    id: "Hybrid",
    title: "Hybrid",
    desc: "Mix of work from home and office visits",
    icon: LuLaptop,
  },
  {
    id: "On-site",
    title: "On-site",
    desc: "Full-time at company office or headquarters",
    icon: LuBuilding2,
  },
];

export default function WorkTypeSelector({
  value,
  onChange,
  error,
}: WorkTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-800 mb-1.5">
        Preferred Work Type <span className="text-red-500">*</span>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {WORK_TYPE_OPTIONS.map((item) => {
          const isSelected = value === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={cn(
                "flex flex-col items-start p-3 rounded border text-left transition-all cursor-pointer",
                isSelected
                  ? "bg-[#EDF6F1] border-forest text-forest shadow-xs ring-1 ring-forest"
                  : "bg-white border-zinc-200 hover:border-zinc-300 text-zinc-700"
              )}
            >
              <div
                className={cn(
                  "size-8 rounded flex items-center justify-center mb-2 shrink-0",
                  isSelected
                    ? "bg-forest text-white"
                    : "bg-zinc-100 text-zinc-500"
                )}
              >
                <Icon className="size-4" />
              </div>

              <div className="min-w-0 w-full">
                <span className="block text-xs sm:text-sm font-semibold text-zinc-900 leading-snug">
                  {item.title}
                </span>
                <span className="block text-[11px] text-zinc-500 leading-tight mt-0.5">
                  {item.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-xs font-medium text-red-500 mt-1.5">{error}</p>
      )}
    </div>
  );
}
