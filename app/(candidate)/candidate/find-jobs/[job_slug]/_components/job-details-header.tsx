"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiArrowLeft,
  FiMapPin,
  FiBriefcase,
  FiBookmark,
  FiShare2,
  FiClock,
} from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import toast from "react-hot-toast";
import { CandidateJobDetail } from "@/types/candidate/job-details.types";

interface JobDetailsHeaderProps {
  job: CandidateJobDetail;
  onApplyClick: () => void;
}

export default function JobDetailsHeader({
  job,
  onApplyClick,
}: JobDetailsHeaderProps) {
  const [isSaved, setIsSaved] = useState(job.isSaved || false);
  const isExpired = job.status === "expired";

  const handleToggleSave = () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    if (nextSaved) {
      toast.success(`Saved ${job.title} to bookmarks!`);
    } else {
      toast.success(`Removed ${job.title} from saved jobs.`);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Job link copied to clipboard!");
    }
  };

  const getMatchScoreTheme = (score: number) => {
    if (score >= 90) return "bg-[#EDF6F1] text-forest border-[#C2E4D2]";
    if (score >= 80) return "bg-emerald-50 text-emerald-800 border-emerald-200";
    return "bg-zinc-100 text-zinc-700 border-zinc-200";
  };

  return (
    <div className="space-y-4">
      {/* 1. Breadcrumb & Back Link */}
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
        <Link
          href="/candidate/find-jobs"
          className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-forest transition-colors font-medium cursor-pointer group"
        >
          <FiArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Find Jobs</span>
        </Link>

        <span className="text-xs text-zinc-400 inline-flex items-center gap-1">
          <FiClock className="size-3.5" />
          <span>Posted {job.postedAt}</span>
        </span>
      </div>

      {/* 2. Main Header Banner Card */}
      <div className="p-4 sm:p-6 rounded bg-white border border-zinc-200/80 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6">
        {/* Left: Avatar + Title + Meta Information */}
        <div className="flex items-start gap-3.5 sm:gap-4 flex-1 min-w-0">
          <div className="size-12 sm:size-14 rounded-xl bg-[#244034] text-[#D2F34C] font-bold text-base sm:text-lg flex items-center justify-center shrink-0 shadow-2xs border border-[#244034]/15">
            {job.companyInitial}
          </div>

          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-2xl font-bold text-zinc-900 tracking-tight leading-snug">
                {job.title}
              </h1>

              {/* Status Badge: Active vs Expired */}
              {isExpired ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-zinc-100 text-zinc-500 border border-zinc-200 shadow-2xs">
                  <span className="size-1.5 rounded-full bg-zinc-400" />
                  Expired
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 shadow-2xs">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              )}
            </div>

            {/* Company & Department Meta */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 flex-wrap">
              <span className="font-semibold text-zinc-800">{job.company}</span>
              <span>•</span>
              <span>{job.department}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <FiMapPin className="size-3.5 text-zinc-400" />
                <span>{job.location}</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-medium text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded text-xs">
                {job.workType}
              </span>
            </div>
          </div>
        </div>

        {/* Right: AI Match Score & Action Buttons */}
        <div className="flex flex-wrap md:flex-col items-stretch sm:items-end justify-between md:justify-start gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100">
          <div className="flex items-center gap-2">
            {/* AI Match Pill */}
            <div
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${getMatchScoreTheme(
                job.matchScore
              )}`}
            >
              <LuSparkles className="size-3 shrink-0" />
              <span>{job.matchScore}% Match Fit</span>
            </div>

            {/* Share Button */}
            <button
              type="button"
              onClick={handleShare}
              className="size-8 rounded-lg border border-zinc-200/80 bg-white hover:bg-zinc-50 text-zinc-500 hover:text-zinc-800 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              title="Share job link"
            >
              <FiShare2 className="size-3.5" />
            </button>

            {/* Bookmark Save Button */}
            <button
              type="button"
              onClick={handleToggleSave}
              className={`size-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                isSaved
                  ? "bg-forest text-lime border-forest"
                  : "bg-white text-zinc-400 border-zinc-200/80 hover:text-zinc-700 hover:border-zinc-300"
              }`}
              title={isSaved ? "Remove from bookmarks" : "Save this job"}
            >
              <FiBookmark
                className={`size-3.5 ${isSaved ? "fill-lime" : ""}`}
              />
            </button>
          </div>

          {/* Apply Now Primary CTA */}
          <button
            type="button"
            onClick={onApplyClick}
            disabled={isExpired}
            className={`w-full sm:w-auto px-5 py-2 text-xs sm:text-sm font-semibold rounded transition-all shadow-2xs cursor-pointer ${
              isExpired
                ? "bg-zinc-100 text-zinc-400 border border-zinc-200/80 cursor-not-allowed"
                : "text-white bg-forest hover:bg-[#1b3027] hover:shadow-xs active:scale-[0.99]"
            }`}
          >
            {isExpired ? "Position Expired" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
