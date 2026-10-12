"use client";

import { useState } from "react";
import {
  LuCalendar,
  LuClock,
  LuTimer,
  LuGlobe,
  LuVideo,
  LuCopy,
  LuCheck,
  LuExternalLink,
  LuLink,
} from "react-icons/lu";
import toast from "react-hot-toast";
import type { InterviewItem } from "@/types/employer/interviews.types";

interface InterviewMeetingCardProps {
  interview: InterviewItem;
}

export default function InterviewMeetingCard({
  interview,
}: InterviewMeetingCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(interview.meetingLink);
      setCopied(true);
      toast.success("Meeting link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(
      `Interview: ${interview.candidateName} - ${interview.jobTitle}`
    );
    const details = encodeURIComponent(
      `Candidate: ${interview.candidateName}\nRole: ${interview.jobTitle}\nMeeting Link: ${
        interview.meetingLink || "TBA"
      }\nNotes: ${interview.notes || "None"}`
    );
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded border border-zinc-200/80 p-4 sm:p-6 shadow-2xs space-y-4">
      {/* Header with Interview Title and Platform */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Session Details
          </span>
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug mt-0.5">
            {interview.title}
          </h3>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-100 text-zinc-700 text-xs font-semibold capitalize self-start sm:self-center shrink-0">
          <LuVideo className="size-3.5 text-forest" />
          <span>{interview.platform.replace("_", " ")}</span>
        </span>
      </div>

      {/* Compact 4-Item Schedule Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="p-2.5 sm:p-3 rounded bg-zinc-50 border border-zinc-200/60 space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium">
            <LuCalendar className="size-3.5 text-zinc-500 shrink-0" />
            <span>Date</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
            {interview.date}
          </p>
        </div>

        <div className="p-2.5 sm:p-3 rounded bg-zinc-50 border border-zinc-200/60 space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium">
            <LuClock className="size-3.5 text-zinc-500 shrink-0" />
            <span>Time</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
            {interview.time}
          </p>
        </div>

        <div className="p-2.5 sm:p-3 rounded bg-zinc-50 border border-zinc-200/60 space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium">
            <LuTimer className="size-3.5 text-zinc-500 shrink-0" />
            <span>Duration</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
            {interview.duration}
          </p>
        </div>

        <div className="p-2.5 sm:p-3 rounded bg-zinc-50 border border-zinc-200/60 space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium">
            <LuGlobe className="size-3.5 text-zinc-500 shrink-0" />
            <span>Timezone</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
            {interview.timezone}
          </p>
        </div>
      </div>

      {/* Meeting Access Link Bar */}
      <div className="p-3 sm:p-3.5 rounded bg-[#F8FAF9] border border-[#DCEBE0] flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-stretch xl:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="size-9 rounded bg-forest/10 text-forest flex items-center justify-center shrink-0">
            <LuLink className="size-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-forest block">
              Meeting Join Link
            </span>
            <a
              href={interview.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="text-xs sm:text-sm font-semibold text-zinc-800 hover:text-forest transition-colors truncate block"
              title={interview.meetingLink}
            >
              {interview.meetingLink}
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto xl:w-auto shrink-0 pt-2 sm:pt-0 lg:pt-0 border-t sm:border-t-0 lg:border-t-0 border-zinc-200/60">
          <button
            type="button"
            onClick={handleAddToCalendar}
            className="flex-1 sm:flex-initial lg:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded border border-zinc-200/90 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold transition-colors shadow-2xs cursor-pointer text-center whitespace-nowrap"
          >
            <LuCalendar className="size-3.5 text-forest shrink-0" />
            <span>Add to Calendar</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 sm:flex-initial lg:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded border border-zinc-200/90 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold transition-colors shadow-2xs cursor-pointer text-center whitespace-nowrap"
          >
            {copied ? (
              <>
                <LuCheck className="size-3.5 text-forest shrink-0" />
                <span className="text-forest">Copied</span>
              </>
            ) : (
              <>
                <LuCopy className="size-3.5 text-zinc-500 shrink-0" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <a
            href={interview.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-initial lg:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded bg-forest text-lime text-xs font-bold hover:bg-forest/90 transition-all shadow-xs text-center whitespace-nowrap"
          >
            <LuExternalLink className="size-3.5 shrink-0" />
            <span>Launch Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
