"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiArrowLeft, FiShield } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import type {
  AIInterviewAnswerMode,
  AIInterviewJobContext,
} from "@/types/candidate/ai-interview.types";
import InterviewContextCard from "./interview-context-card";
import AnswerModeSelector from "./answer-mode-selector";
import DevicePreviewCard from "./device-preview-card";

interface StepWelcomeAndDeviceProps {
  job: AIInterviewJobContext;
  onStartInterview: (mode: AIInterviewAnswerMode) => void;
}

export default function StepWelcomeAndDevice({
  job,
  onStartInterview,
}: StepWelcomeAndDeviceProps) {
  const [answerMode, setAnswerMode] = useState<AIInterviewAnswerMode>("video");
  const [hasConfirmedGuidelines, setHasConfirmedGuidelines] = useState(true);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Job & Interview Overview */}
      <InterviewContextCard job={job} />

      {/* 2. Choose Response Mode */}
      <AnswerModeSelector
        value={answerMode}
        onChange={(mode) => setAnswerMode(mode)}
      />

      {/* 3. Device & Audio Diagnostic Preview */}
      <DevicePreviewCard answerMode={answerMode} />

      {/* 4. Confirmation & Start Actions */}
      <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-700 select-none">
          <input
            type="checkbox"
            checked={hasConfirmedGuidelines}
            onChange={(e) => setHasConfirmedGuidelines(e.target.checked)}
            className="size-4 rounded border-zinc-300 text-forest focus:ring-forest cursor-pointer accent-forest"
          />
          <span className="flex items-center gap-1.5">
            <FiShield className="size-3.5 text-forest shrink-0" />
            <span>I am in a quiet environment and ready to begin.</span>
          </span>
        </label>

        <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
          <Link
            href="/candidate/ai-interview"
            className="h-9 px-4 rounded border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <FiArrowLeft className="size-3.5" />
            <span>Pre-Screenings</span>
          </Link>

          <button
            type="button"
            disabled={!hasConfirmedGuidelines}
            onClick={() => onStartInterview(answerMode)}
            className="h-9 px-5 rounded bg-forest hover:bg-[#1b3027] disabled:opacity-50 disabled:pointer-events-none text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <LuSparkles className="size-3.5" />
            <span>Begin Pre-Screening</span>
            <FiArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
