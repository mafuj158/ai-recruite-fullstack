"use client";

import { useEffect, useState } from "react";
import { LuSparkles } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";

interface StepAIProcessingProps {
  onComplete: () => void;
}

export default function StepAIProcessing({ onComplete }: StepAIProcessingProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const stages = [
    "Transcribing interview responses...",
    "Evaluating communication and delivery...",
    "Assessing confidence and response composure...",
    "Analyzing problem solving and teamwork...",
    "Preparing interview insights and overall score report...",
  ];

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    const completionTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearInterval(stageInterval);
      clearTimeout(completionTimer);
    };
  }, [onComplete, stages.length]);

  return (
    <div className="bg-white border border-zinc-200/80 rounded p-8 sm:p-14 text-center shadow-2xs space-y-6">
      {/* Animated Pulsing Radar Icon */}
      <div className="relative size-20 mx-auto">
        <div className="absolute inset-0 rounded-full bg-forest/10 animate-ping" />
        <div className="relative size-20 rounded-full bg-[#F0F7F4] border-2 border-[#D5E6DC] text-forest flex items-center justify-center shadow-md">
          <LuSparkles className="size-8 animate-spin text-forest" />
        </div>
      </div>

      {/* Main Status Text */}
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold bg-[#F0F7F4] text-forest border border-[#D5E6DC]">
          <span className="size-2 rounded-full bg-forest animate-pulse" />
          <span>Processing Responses</span>
        </span>
        <h2 className="text-base sm:text-xl font-bold text-zinc-900">
          Analyzing Responses & Preparing Interview Insights
        </h2>
        <p className="text-xs text-zinc-500 max-w-md mx-auto">
          Evaluating communication, confidence, problem solving, and teamwork for the hiring team.
        </p>
      </div>

      {/* Dynamic Processing Stages */}
      <div className="max-w-md mx-auto bg-zinc-50/70 border border-zinc-200/80 rounded p-4 text-left space-y-2.5">
        {stages.map((stage, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2 text-xs transition-colors ${
                isDone
                  ? "text-emerald-700 font-medium"
                  : isCurrent
                  ? "text-forest font-bold"
                  : "text-zinc-400"
              }`}
            >
              {isDone ? (
                <FiCheckCircle className="size-3.5 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <span className="size-2 rounded-full bg-forest animate-pulse shrink-0 ml-0.5 mr-1" />
              ) : (
                <span className="size-2 rounded-full bg-zinc-300 shrink-0 ml-0.5 mr-1" />
              )}
              <span className="truncate">{stage}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
