import Link from "next/link";
import Image from "next/image";
import {
  FiClock,
  FiHelpCircle,
  FiAlertCircle,
  FiCheckCircle,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import type { AIInterviewListItem } from "@/types/candidate/ai-interview.types";

interface AIInterviewListCardProps {
  item: AIInterviewListItem;
}

export default function AIInterviewListCard({
  item,
}: AIInterviewListCardProps) {
  const isPending = item.status === "pending";
  const isCompleted = item.status === "completed";

  return (
    <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-5 shadow-2xs hover:border-zinc-300 transition-all flex flex-col justify-between gap-4">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div className="size-11 sm:size-12 rounded bg-zinc-50 border border-zinc-200/80 overflow-hidden relative shrink-0">
            <Image
              src={item.companyLogo}
              alt={item.companyName}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-zinc-500 font-medium">
                {item.companyName}
              </span>
              <span className="text-zinc-300">•</span>
              <span className="text-xs text-zinc-500 font-medium">
                {item.department}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-zinc-900 mt-0.5">
              {item.jobTitle}
            </h3>

            <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">
              {item.experienceLevel} • Applied on {item.appliedDate}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="shrink-0">
          {isPending && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
              <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Action Required</span>
            </span>
          )}

          {isCompleted && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <FiCheckCircle className="size-3.5" />
              <span>Score: {item.score}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Middle Specs & Details */}
      <div className="pt-2 pb-1 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <FiHelpCircle className="size-3.5 text-forest" />
            <span className="font-semibold text-zinc-800">
              {item.totalQuestions}
            </span>{" "}
            Questions
          </div>

          <div className="h-3.5 w-px bg-zinc-200" />

          <div className="flex items-center gap-1.5">
            <FiClock className="size-3.5 text-forest" />
            <span>~{item.estimatedDurationMinutes} Mins</span>
          </div>

          {item.deadline && (
            <>
              <div className="h-3.5 w-px bg-zinc-200" />
              <div className="flex items-center gap-1.5 text-amber-600 font-medium">
                <FiAlertCircle className="size-3.5" />
                <span>Due {item.deadline}</span>
              </div>
            </>
          )}

          {item.completedAt && (
            <>
              <div className="h-3.5 w-px bg-zinc-200" />
              <div className="flex items-center gap-1.5 text-zinc-500">
                <span>Completed {item.completedAt}</span>
              </div>
            </>
          )}
        </div>

        {/* Evaluation Verdict Preview if Completed */}
        {item.verdict && (
          <div className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px] bg-emerald-50/70 px-2 py-0.5 rounded border border-emerald-200/50">
            <FiAward className="size-3" />
            <span>{item.verdict}</span>
          </div>
        )}
      </div>

      {/* Bottom Actions linking to Details Page */}
      <div className="pt-2 border-t border-zinc-100 flex items-center justify-end gap-2.5">
        {isPending ? (
          <Link
            href={`/candidate/ai-interview/${item.id}`}
            className="h-9 px-4 rounded bg-forest hover:bg-[#1b3027] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs group"
          >
            <LuSparkles className="size-3.5" />
            <span>Start Pre-Screening</span>
            <FiArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <Link
            href={`/candidate/ai-interview/${item.id}`}
            className="h-9 px-4 rounded bg-[#F0F7F4] hover:bg-[#e4efe9] text-forest border border-[#D5E6DC] text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <FiAward className="size-3.5" />
            <span>View AI Report</span>
          </Link>
        )}
      </div>
    </div>
  );
}
