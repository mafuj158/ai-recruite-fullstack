"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { CandidateRecommendedJob } from "@/types/candidate/dashboard.types";
import AiRecomendedJobCard from "./job-card";
import JobCardSkeleton from "./job-card-skeleton";
import RecommendedJobsError from "./recommended-jobs-error";
import RecommendedJobsEmpty from "./recommended-jobs-empty";

interface CandidateRecommendedJobsProps {
  jobs: CandidateRecommendedJob[];
}

export default function CandidateRecommendedJobs({ jobs }: CandidateRecommendedJobsProps) {

  // demo for design the ui and checking
  const isLoading = false;
  const isError = false;
  const isEmpty = true;

  return (
    <section className="w-full space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <h2 className="text-sm sm:text-base lg:text-lg font-bold text-zinc-900 truncate">
            Top AI Recommended Jobs
          </h2>
          <span className="text-[10px] sm:text-xs font-semibold text-forest bg-forest/10 px-2 py-0.5 rounded border border-forest/15 shrink-0 whitespace-nowrap">
            {jobs.length} Matches Today
          </span>
        </div>

        <Link
          href="/candidate/find-jobs"
          className="text-xs sm:text-sm text-zinc-500 hover:text-forest transition-colors font-medium flex items-center gap-1 shrink-0 whitespace-nowrap group"
        >
          <span>Explore All</span>
          <span className="hidden sm:inline">Jobs</span>
          <FiArrowRight className="size-3 sm:size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5">
        {isLoading ? (
          <JobCardSkeleton count={3} />
        ) : isError ? (
          <RecommendedJobsError />
        ) : isEmpty || jobs.length === 0 ? (
          <RecommendedJobsEmpty />
        ) : (
          jobs.map((job) => (
            <AiRecomendedJobCard key={job.slug} job={job} />
          ))
        )}
      </div>
    </section>
  );
}
