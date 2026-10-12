import Link from "next/link";
import { FiSearch, FiVideo, FiCheckCircle, FiAward, FiArrowRight } from "react-icons/fi";

interface CandidateGreetingBannerProps {
  candidateName: string;
  atsScore: number;
  profileCompletion: number;
}

export default function CandidateGreetingBanner({
  candidateName,
  atsScore,
  profileCompletion,
}: CandidateGreetingBannerProps) {
  return (
    <div className="relative overflow-hidden rounded bg-gradient-to-br from-white via-zinc-50/50 to-emerald-50/20 border border-zinc-200/80 p-4 sm:p-5 lg:p-6 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5 relative z-10">
        {/* Left: Greeting & Status Info */}
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-zinc-900 tracking-tight">
              Welcome back, {candidateName.split(" ")[0]} <span className="inline-block animate-wave">👋</span>
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Job Seeker
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-relaxed">
            Here are your AI-curated job recommendations, live recruiter status updates, and upcoming interview prep tasks for today.
          </p>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 text-xs">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-zinc-200/80 text-zinc-700 shadow-2xs font-medium">
              <FiAward className="size-3.5 text-forest" />
              <span>ATS Resume Score:</span>
              <strong className="text-forest font-bold">{atsScore}/100</strong>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-zinc-200/80 text-zinc-700 shadow-2xs font-medium">
              <FiCheckCircle className="size-3.5 text-emerald-600" />
              <span>Profile Completion:</span>
              <strong className="text-zinc-900 font-bold">{profileCompletion}%</strong>
            </div>
          </div>
        </div>

        {/* Right: Quick Launch CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-zinc-100">
          <Link
            href="/candidate/find-jobs"
            className="h-9 sm:h-10 inline-flex items-center justify-center gap-1.5 px-4 rounded bg-forest text-white hover:bg-[#1b3027] text-xs sm:text-sm font-semibold transition-colors shadow-2xs group"
          >
            <FiSearch className="size-3.5 sm:size-4" />
            <span>Find Jobs</span>
            <FiArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/candidate/ai-interview"
            className="h-9 sm:h-10 inline-flex items-center justify-center gap-1.5 px-3.5 rounded border border-[#DFE1E7] bg-white text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
          >
            <FiVideo className="size-3.5 text-forest" />
            <span>AI Interview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
