"use client";

import { FiMessageSquare, FiShield, FiClock } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import { useChatRole } from "./use-chat-role";

export default function ChatEmptyState() {
  const { role } = useChatRole();

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-5 bg-zinc-50/40">
      <div className="relative">
        <div className="size-16 sm:size-20 rounded-2xl bg-forest/10 text-forest flex items-center justify-center shadow-xs">
          <FiMessageSquare className="size-8 sm:size-10" />
        </div>
        <span className="absolute -top-1 -right-1 size-6 rounded-full bg-forest text-white flex items-center justify-center shadow-2xs">
          <LuSparkles className="size-3.5" />
        </span>
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h2 className="text-base sm:text-lg font-bold text-zinc-900">
          {role === "employer"
            ? "Candidate Messaging Portal"
            : "Recruitment Messaging Hub"}
        </h2>
        <p className="text-xs text-zinc-500 leading-relaxed">
          {role === "employer"
            ? "Select an applicant conversation on the left to discuss roles, send pre-screening links, and schedule final interviews."
            : "Select a conversation from the left to communicate directly with hiring teams and track interview updates."}
        </p>
      </div>

      {/* Feature Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-md w-full pt-2 text-left">
        <div className="p-3 rounded bg-white border border-zinc-200/80 shadow-2xs space-y-1">
          <div className="flex items-center gap-1.5 text-forest text-xs font-bold">
            <LuSparkles className="size-3.5" />
            <span>AI Polish</span>
          </div>
          <p className="text-[10px] text-zinc-500 leading-tight">
            Refine message tone to be professional, friendly, or concise.
          </p>
        </div>

        <div className="p-3 rounded bg-white border border-zinc-200/80 shadow-2xs space-y-1">
          <div className="flex items-center gap-1.5 text-forest text-xs font-bold">
            <FiShield className="size-3.5" />
            <span>Verified Roles</span>
          </div>
          <p className="text-[10px] text-zinc-500 leading-tight">
            Directly linked to active job postings and candidate ATS match scores.
          </p>
        </div>

        <div className="p-3 rounded bg-white border border-zinc-200/80 shadow-2xs space-y-1">
          <div className="flex items-center gap-1.5 text-forest text-xs font-bold">
            <FiClock className="size-3.5" />
            <span>Real-time</span>
          </div>
          <p className="text-[10px] text-zinc-500 leading-tight">
            Instant delivery receipts with automated interview schedule sync.
          </p>
        </div>
      </div>
    </div>
  );
}
