"use client";

import { useState } from "react";
import {
  FiCheck,
  FiEdit3,
  FiX,
  FiCheckCircle,
  FiCornerDownRight,
  FiArrowRight,
} from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import type {
  CVImprovementSuggestion,
  CVSuggestionSection,
} from "@/types/candidate/cv-manager.types";

interface AICVDiffEditorProps {
  suggestions: CVImprovementSuggestion[];
  onAccept: (id: string) => void;
  onDismiss: (id: string) => void;
  onOpenManualEdit: (suggestion: CVImprovementSuggestion) => void;
  onAcceptAll: () => void;
}

const TABS: { id: CVSuggestionSection; label: string }[] = [
  { id: "all", label: "All Optimizations" },
  { id: "experience", label: "Work Experience" },
  { id: "summary", label: "Professional Summary" },
  { id: "skills", label: "Skills & Tooling" },
];

export function AICVDiffEditor({
  suggestions,
  onAccept,
  onDismiss,
  onOpenManualEdit,
  onAcceptAll,
}: AICVDiffEditorProps) {
  const [activeTab, setActiveTab] = useState<CVSuggestionSection>("all");

  const filteredSuggestions = suggestions.filter((s) => {
    if (activeTab === "all") return true;
    return s.section === activeTab;
  });

  const pendingCount = suggestions.filter((s) => s.status === "pending").length;

  return (
    <div className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-5">
      {/* 1. Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 mr-2">
            <LuSparkles className="size-4 text-forest" />
            <span className="text-sm sm:text-base font-bold text-zinc-900">
              AI Resume Improvements
            </span>
          </div>

          <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded text-xs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-zinc-900 shadow-2xs font-semibold"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accept All Action */}
        {pendingCount > 0 && (
          <button
            type="button"
            onClick={onAcceptAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-forest text-lime hover:bg-[#1b3027] text-xs font-semibold transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
          >
            <FiCheck className="size-3.5" />
            <span>Accept All Pending ({pendingCount})</span>
          </button>
        )}
      </div>

      {/* 2. List of Side-by-Side Diff Cards */}
      <div className="space-y-4">
        {filteredSuggestions.map((item) => {
          const isAccepted = item.status === "accepted";
          const isDismissed = item.status === "dismissed";

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all p-4 sm:p-5 space-y-3.5 ${
                isAccepted
                  ? "bg-emerald-50/20 border-emerald-200"
                  : isDismissed
                  ? "bg-zinc-50/60 border-zinc-200 opacity-60"
                  : "bg-white border-zinc-200/80 shadow-2xs"
              }`}
            >
              {/* Card Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-700">
                    {item.section}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                    {item.title}
                  </h4>
                </div>

                {/* Status Indicator */}
                <div>
                  {isAccepted && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <FiCheckCircle className="size-3" />
                      <span>Accepted & Applied</span>
                    </span>
                  )}
                  {isDismissed && (
                    <span className="text-[11px] font-medium text-zinc-400">
                      Dismissed
                    </span>
                  )}
                </div>
              </div>

              {/* Side-by-Side Diff Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* Left: Original Version */}
                <div className="rounded-lg p-3 sm:p-3.5 bg-rose-50/40 border border-rose-200/50 space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                    Original Resume Bullet
                  </span>
                  <p className="text-zinc-600 leading-relaxed italic">
                    "{item.originalText}"
                  </p>
                </div>

                {/* Right: AI Enhanced Version */}
                <div className="rounded-lg p-3 sm:p-3.5 bg-emerald-50/50 border border-emerald-200/60 space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-forest uppercase tracking-wider flex items-center justify-between">
                    <span>AI Enhanced (STAR Format)</span>
                    {item.userEditedText && (
                      <span className="text-[9px] text-zinc-400 lowercase font-normal">
                        (customized)
                      </span>
                    )}
                  </span>
                  <p className="text-zinc-900 leading-relaxed font-semibold">
                    "{item.userEditedText || item.improvedText}"
                  </p>
                </div>
              </div>

              {/* AI Reasoning Pill */}
              <div className="flex items-start gap-1.5 text-[11px] text-zinc-500 bg-zinc-50/70 p-2.5 rounded border border-zinc-200/50">
                <FiCornerDownRight className="size-3.5 text-forest shrink-0 mt-0.5" />
                <span>
                  <strong className="text-zinc-700">Optimization Rationale:</strong>{" "}
                  {item.reasoning}
                </span>
              </div>

              {/* Action Buttons (if pending) */}
              {!isAccepted && !isDismissed && (
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-zinc-100">
                  <button
                    type="button"
                    onClick={() => onDismiss(item.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer"
                  >
                    <FiX className="size-3" />
                    <span>Dismiss</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenManualEdit(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-zinc-200 bg-white text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    <FiEdit3 className="size-3 text-zinc-500" />
                    <span>Edit Manually</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onAccept(item.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-forest text-lime hover:bg-[#1b3027] text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    <FiCheck className="size-3.5" />
                    <span>Accept Suggestion</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
