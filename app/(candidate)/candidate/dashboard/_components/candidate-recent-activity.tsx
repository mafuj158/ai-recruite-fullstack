"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { CandidateActivityItem } from "@/types/candidate/dashboard.types";
import ActivityItem from "./activity-item";
import RecentActivitySkeleton from "./recent-activity-skeleton";
import RecentActivityError from "./recent-activity-error";
import RecentActivityEmpty from "./recent-activity-empty";

interface CandidateRecentActivityProps {
  activities: CandidateActivityItem[];
}

export default function CandidateRecentActivity({
  activities,
}: CandidateRecentActivityProps) {
  // demo for design the ui and checking
  const isLoading = false;
  const isError = false;
  const isEmpty = false;

  return (
    <section className="w-full bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-zinc-900">
            Recent Application Activity
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Latest status changes, recruiter views, and interview invites
          </p>
        </div>

        <Link
          href="/candidate/applied-jobs"
          className="text-xs text-zinc-500 hover:text-forest transition-colors font-medium flex items-center gap-1 shrink-0 whitespace-nowrap group"
        >
          <span>All History</span>
          <FiArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Timeline List or States */}
      <div>
        {isLoading ? (
          <RecentActivitySkeleton count={4} />
        ) : isError ? (
          <RecentActivityError />
        ) : isEmpty || activities.length === 0 ? (
          <RecentActivityEmpty />
        ) : (
          <div className="divide-y divide-zinc-100">
            {activities.map((item) => (
              <ActivityItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
