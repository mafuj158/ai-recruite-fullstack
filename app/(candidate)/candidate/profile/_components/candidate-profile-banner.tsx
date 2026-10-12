"use client";

import { FiMapPin } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import AvatarChange from "@/components/shared/avatar-change";

interface CandidateProfileBannerProps {
  avatarUrl: string;
  onAvatarChange: (url: string) => void;
  fullName: string;
  headline: string;
  location: string;
  jobSearchStatus: string;
  atsScore: number;
}

export default function CandidateProfileBanner({
  avatarUrl,
  onAvatarChange,
  fullName,
  headline,
  location,
  jobSearchStatus,
  atsScore,
}: CandidateProfileBannerProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "actively_looking":
        return "Actively Looking";
      case "open_to_offers":
        return "Open to Offers";
      case "casually_browsing":
        return "Casually Browsing";
      default:
        return "Not Looking";
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded bg-white border border-zinc-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
      {/* Left: Avatar + Identity + Status */}
      <div className="flex items-start gap-4 sm:gap-5 min-w-0 flex-1">
        <AvatarChange />
        {/* Name, Headline, Location */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-2xl font-bold text-zinc-900 tracking-tight leading-snug">
              {fullName}
            </h1>

            {/* Status Pill */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{getStatusLabel(jobSearchStatus)}</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm font-medium text-zinc-600 truncate">
            {headline}
          </p>

          <div className="flex items-center gap-2 text-xs text-zinc-400 pt-0.5 flex-wrap">
            <span className="inline-flex items-center gap-1">
              <FiMapPin className="size-3 text-zinc-400" />
              <span>{location}</span>
            </span>
          </div>
        </div>
      </div>
      {/* Right: ATS Rating */}
      <div className="flex items-center sm:items-end justify-between sm:justify-center shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-[#EDF6F1] border border-[#C2E4D2] text-xs font-bold text-forest shadow-2xs">
          <LuSparkles className="size-4 text-forest" />
          <span>{atsScore}% ATS Profile Score</span>
        </div>
      </div>

    </div>
  );
}
