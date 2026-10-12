import React from "react";
import { LuCheck } from "react-icons/lu";

interface StepperIndicatorProps {
  currentStep: 1 | 2;
  label: string;
}

export default function StepperIndicator({
  currentStep,
  label,
}: StepperIndicatorProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center gap-3">
        {/* Step 1 Circle */}
        <div
          className={`size-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
            currentStep >= 1
              ? "bg-forest text-white shadow-xs"
              : "bg-zinc-200 text-zinc-500"
          }`}
        >
          {currentStep === 2 ? <LuCheck className="size-4" /> : "1"}
        </div>

        {/* Connecting Line */}
        <div
          className={`w-16 sm:w-20 h-0.5 rounded-full transition-colors ${
            currentStep === 2 ? "bg-forest" : "bg-zinc-200"
          }`}
        />

        {/* Step 2 Circle */}
        <div
          className={`size-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
            currentStep === 2
              ? "bg-forest text-white shadow-xs"
              : "bg-white border border-zinc-200 text-zinc-400"
          }`}
        >
          2
        </div>
      </div>

      {/* Step Label */}
      <p className="text-xs font-medium text-zinc-500 mt-2.5">{label}</p>
    </div>
  );
}
