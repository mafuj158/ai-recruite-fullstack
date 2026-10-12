"use client";

import Link from "next/link";
import { FiCheck, FiX, FiVideo, FiArrowRight } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import type {
  ApplicationTimelineStage,
  StageStatus,
} from "@/types/candidate/applied-jobs.types";

interface AppliedJobsTimelineProps {
  stages: ApplicationTimelineStage[];
  applicationId: string;
}

export function AppliedJobsTimeline({ stages }: AppliedJobsTimelineProps) {
  const renderStageIcon = (status: StageStatus, index: number) => {
    switch (status) {
      case "completed":
        return (
          <div className="size-6 sm:size-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <FiCheck className="size-3.5 sm:size-4 stroke-3" />
          </div>
        );
      case "in_progress":
        return (
          <div className="relative size-6 sm:size-7 rounded-full bg-forest text-lime flex items-center justify-center shrink-0 shadow-xs ring-4 ring-forest/15 animate-pulse">
            <LuSparkles className="size-3.5 sm:size-4" />
          </div>
        );
      case "rejected":
        return (
          <div className="size-6 sm:size-7 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <FiX className="size-3.5 sm:size-4 stroke-[3]" />
          </div>
        );
      case "pending":
      default:
        return (
          <div className="size-6 sm:size-7 rounded-full bg-zinc-100 text-zinc-400 border border-zinc-300 flex items-center justify-center shrink-0 text-[11px] font-bold">
            {index + 1}
          </div>
        );
    }
  };

  return (
    <div className="w-full py-2">
      {/* Desktop / Tablet Horizontal Timeline Flow */}
      <div className="hidden lg:grid grid-cols-5 gap-2 relative">
        {stages.map((stage, idx) => {
          const isLast = idx === stages.length - 1;
          const nextStage = stages[idx + 1];
          const isConnectorActive =
            stage.status === "completed" &&
            (nextStage?.status === "completed" || nextStage?.status === "in_progress");

          return (
            <div key={stage.key} className="flex flex-col relative group">
              {/* Connector Bar */}
              {!isLast && (
                <div
                  className={`absolute top-3.5 left-7 right-[-8px] h-0.5 z-0 transition-colors ${
                    isConnectorActive
                      ? "bg-emerald-500"
                      : stage.status === "completed"
                      ? "bg-emerald-200"
                      : "bg-zinc-200"
                  }`}
                />
              )}

              {/* Node Icon & Stage Title */}
              <div className="flex items-center gap-2 relative z-10 mb-2">
                {renderStageIcon(stage.status, idx)}
                <span
                  className={`text-xs font-bold leading-tight ${
                    stage.status === "in_progress"
                      ? "text-forest font-extrabold"
                      : stage.status === "completed"
                      ? "text-zinc-900"
                      : stage.status === "rejected"
                      ? "text-rose-700"
                      : "text-zinc-400"
                  }`}
                >
                  {stage.title}
                </span>
              </div>

              {/* Subtitle / Metadata Card */}
              <div className="pl-8 space-y-1">
                <p className="text-[11px] text-zinc-500 leading-tight">
                  {stage.subtitle}
                </p>

                {stage.date && (
                  <p className="text-[10px] font-medium text-zinc-400">
                    {stage.date}
                  </p>
                )}

                {/* AI Score Badge */}
                {stage.score !== undefined && (
                  <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                    <LuSparkles className="size-2.5 text-emerald-600" />
                    <span>{stage.score}% Score</span>
                  </div>
                )}

                {/* Meeting Link Pill */}
                {stage.meetingLink && (
                  <a
                    href={stage.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-forest text-lime text-[11px] font-semibold hover:bg-forest/90 transition-colors shadow-2xs mt-1"
                  >
                    <FiVideo className="size-3" />
                    <span>Join Meeting</span>
                  </a>
                )}

                {/* Action Required Button (e.g. Start AI Pre-Screening) */}
                {stage.actionRequired && stage.actionHref && (
                  <Link
                    href={stage.actionHref}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-forest text-white text-[11px] font-semibold hover:bg-[#1b3027] transition-colors shadow-2xs mt-1"
                  >
                    <span>{stage.actionLabel || "Action Required"}</span>
                    <FiArrowRight className="size-3" />
                  </Link>
                )}

                {/* Feedback or note preview */}
                {stage.note && (
                  <p className="text-[10px] text-zinc-500 italic bg-zinc-50 p-1.5 rounded border border-zinc-200/60 mt-1 line-clamp-2">
                    {stage.note}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile / Tablet Vertical Flow */}
      <div className="lg:hidden space-y-4 relative pl-2">
        <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-zinc-200" />

        {stages.map((stage, idx) => (
          <div key={stage.key} className="flex items-start gap-3 relative z-10">
            {renderStageIcon(stage.status, idx)}

            <div className="flex-1 min-w-0 bg-zinc-50/70 p-2.5 rounded-lg border border-zinc-200/60 space-y-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span
                  className={`text-xs font-bold ${
                    stage.status === "in_progress"
                      ? "text-forest"
                      : stage.status === "completed"
                      ? "text-zinc-900"
                      : stage.status === "rejected"
                      ? "text-rose-700"
                      : "text-zinc-500"
                  }`}
                >
                  {stage.title}
                </span>

                {stage.date && (
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {stage.date}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-zinc-600">{stage.subtitle}</p>

              {stage.score !== undefined && (
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold mt-0.5">
                  <LuSparkles className="size-2.5 text-emerald-600" />
                  <span>{stage.score}% Score</span>
                </div>
              )}

              {stage.meetingLink && (
                <div className="pt-1">
                  <a
                    href={stage.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-forest text-lime text-xs font-semibold"
                  >
                    <FiVideo className="size-3" />
                    <span>Join Scheduled Meeting</span>
                  </a>
                </div>
              )}

              {stage.actionRequired && stage.actionHref && (
                <div className="pt-1">
                  <Link
                    href={stage.actionHref}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-forest text-white text-xs font-semibold"
                  >
                    <span>{stage.actionLabel}</span>
                    <FiArrowRight className="size-3" />
                  </Link>
                </div>
              )}

              {stage.note && (
                <p className="text-[11px] text-zinc-600 italic bg-white p-2 rounded border border-zinc-200 mt-1">
                  {stage.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppliedJobsTimeline;
