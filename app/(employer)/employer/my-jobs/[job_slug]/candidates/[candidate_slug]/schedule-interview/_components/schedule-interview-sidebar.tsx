import { LuInfo, LuCircleCheck } from "react-icons/lu";
import { Candidate } from "@/types/employer/candidates.types";

interface ScheduleInterviewSidebarProps {
  candidate: Candidate;
  jobTitle: string;
}

export default function ScheduleInterviewSidebar({
  candidate,
  jobTitle,
}: ScheduleInterviewSidebarProps) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="space-y-5">
      {/* 1. Candidate Summary Card */}
      <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
        <h2 className="text-xs sm:text-sm font-bold text-zinc-900">
          Candidate
        </h2>

        <div className="flex items-center gap-3">
          <div className="size-11 rounded bg-forest text-lime font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-zinc-900 truncate">
              {candidate.name}
            </h3>
            <p className="text-xs text-zinc-500 truncate">
              {candidate.headline || jobTitle}
            </p>
          </div>
        </div>

        {/* Match Score Box */}
        <div className="bg-blue-50/70 border border-blue-100 rounded p-4 text-center space-y-0.5">
          <p className="text-xs font-semibold text-zinc-500">Match Score</p>
          <p className="text-3xl font-extrabold text-blue-600 tracking-tight">
            {candidate.matchScore}%
          </p>
        </div>
      </div>

      {/* 2. Interview Tips Card (Purple Accent) */}
      <div className="bg-[#FAF8FF] border border-purple-200/80 rounded p-5 sm:p-6 shadow-2xs space-y-3.5">
        <div className="flex items-center gap-2 text-purple-700">
          <div className="size-5 rounded bg-purple-100 flex items-center justify-center shrink-0">
            <LuInfo className="size-3.5 text-purple-700" />
          </div>
          <h2 className="text-xs sm:text-sm font-bold text-zinc-900">
            Interview Tips
          </h2>
        </div>

        <ul className="space-y-3 text-xs text-zinc-600">
          <li className="flex items-start gap-2.5">
            <LuCircleCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Send calendar invite at least 24 hours in advance
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <LuCircleCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Include clear instructions for joining the call
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <LuCircleCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Review candidate&apos;s AI interview before the call
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <LuCircleCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Prepare questions based on their profile
            </span>
          </li>
        </ul>
      </div>

      {/* 3. What Happens Next Card */}
      <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
        <h2 className="text-xs sm:text-sm font-bold text-zinc-900">
          What Happens Next
        </h2>

        <div className="space-y-3 text-xs text-zinc-600">
          <div className="flex items-start gap-3">
            <span className="size-5 rounded bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <span className="leading-relaxed">
              Candidate receives interview invitation
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="size-5 rounded bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <span className="leading-relaxed">
              Calendar invite sent to all parties
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="size-5 rounded bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <span className="leading-relaxed">
              Reminder sent 24 hours before interview
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
