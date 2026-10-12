"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiChevronLeft,
  FiInfo,
  FiExternalLink,
} from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import type { ChatConversation } from "@/types/chat/chat.types";
import { useChatRole } from "./use-chat-role";
import { useAppStore } from "@/store";

interface ChatHeaderProps {
  conversation: ChatConversation;
}

export default function ChatHeader({ conversation }: ChatHeaderProps) {
  const { role, basePath } = useChatRole();
  const toggleChatSidebar = useAppStore((state) => state.toggleChatSidebar);
  const isContextOpen = useAppStore((state) => state.isChatContextPanelOpen);
  const toggleChatContextPanel = useAppStore((state) => state.toggleChatContextPanel);

  const { participant, job } = conversation;

  return (
    <div className="h-15 sm:h-16 px-3 sm:px-5 border-b border-zinc-200/80 bg-white flex items-center justify-between gap-2 shrink-0 z-10">
      {/* Left: Mobile Back Button + Participant Info */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {/* Back / Mobile Menu Toggle */}
        <Link
          href={basePath}
          onClick={() => toggleChatSidebar(true)}
          className="md:hidden p-1.5 -ml-1 rounded text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer"
          aria-label="Back to conversations"
        >
          <FiChevronLeft className="size-5" />
        </Link>

        {/* Participant Avatar */}
        <div className="relative shrink-0">
          <div className="size-9 sm:size-10 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200 relative">
            <Image
              src={participant.avatar}
              alt={participant.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          {participant.isOnline && (
            <span
              className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
              title="Online"
            />
          )}
        </div>

        {/* Name & Subtitle */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
              {participant.name}
            </h2>
            {role === "employer" && participant.atsScore && (
              <span className="hidden xs:inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#EDF6F1] text-forest border border-[#C2E4D2]">
                <LuSparkles className="size-2.5" />
                {participant.atsScore}% Fit
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 truncate">
            {role === "employer" ? (
              <span>{participant.role}</span>
            ) : (
              <span>{participant.role} • {participant.companyName}</span>
            )}
            <span className="text-zinc-300">•</span>
            <span className={participant.isOnline ? "text-emerald-600 font-medium" : "text-zinc-400"}>
              {participant.isOnline ? "Active now" : participant.lastSeen || "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* Middle/Right: Job Pill & Action Icons */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Linked Job Context Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-50 border border-zinc-200/80 text-[11px] text-zinc-700">
          <span className="font-semibold truncate max-w-[140px] xl:max-w-[180px]">
            {job.title}
          </span>
          {job.applicationStatus && (
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
              {job.applicationStatus}
            </span>
          )}
        </div>

        {/* Context Panel Drawer Toggle */}
        <button
          type="button"
          onClick={() => toggleChatContextPanel()}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-semibold border transition-all cursor-pointer ${isContextOpen
              ? "bg-forest/10 border-forest/30 text-forest"
              : "bg-white border-zinc-200/80 text-zinc-700 hover:bg-zinc-50"
            }`}
          aria-label="Toggle details panel"
          title={role === "employer" ? "View Candidate Evaluation" : "View Job & Company Details"}
        >
          <FiInfo className="size-3.5" />
          <span className="hidden sm:inline">
            {role === "employer" ? "Candidate Info" : "Job Details"}
          </span>
        </button>
      </div>
    </div>
  );
}
