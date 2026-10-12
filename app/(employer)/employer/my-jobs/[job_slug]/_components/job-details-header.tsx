"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuBriefcase, LuSlidersHorizontal } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { EmployerJob } from "@/types/employer/my-jobs.types";
import { JobFlowBreadcrumb } from "@/components/shared/job-flow-breadcrumb";
import DeleteJobModal from "./delete-job-modal";
import ChangeJobStatusModal, { type JobStatusAction } from "./change-job-status-modal";

interface JobDetailsHeaderProps {
  job: EmployerJob;
}

export default function JobDetailsHeader({ job }: JobDetailsHeaderProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<EmployerJob["status"]>(job.status);
  const [statusModalAction, setStatusModalAction] = useState<JobStatusAction | null>(null);

  const isActive = currentStatus === "active";
  const isDraft = currentStatus === "draft";
  const isClosed = currentStatus === "closed";

  return (
    <>
      <div className="space-y-4">
        {/* Breadcrumbs */}
        <JobFlowBreadcrumb job={job} step="job" />

        {/* Main Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight">
                {job.jobTitle}
              </h1>

              {/* Status Badge */}
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded border",
                  isActive && "bg-emerald-50 text-emerald-700 border-emerald-200/80",
                  isDraft && "bg-amber-50 text-amber-700 border-amber-200/80",
                  isClosed && "bg-zinc-100 text-zinc-600 border-zinc-200"
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    isActive && "bg-emerald-500 animate-pulse",
                    isDraft && "bg-amber-500",
                    isClosed && "bg-zinc-400"
                  )}
                />
                <span className="capitalize">{currentStatus}</span>
              </span>
            </div>

            {/* Metadata details line */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-zinc-500">
              <span className="font-medium text-zinc-800">{job.department}</span>
              <span className="text-zinc-300">•</span>
              <span>{job.location}</span>
              <span className="text-zinc-300">•</span>
              <span>{job.employmentType}</span>
              <span className="text-zinc-300">•</span>
              <span className="inline-flex items-center gap-1 text-zinc-600">
                <LuBriefcase className="size-3.5 text-zinc-400" />
                {job.experienceLevel}
              </span>
              <span className="text-zinc-300">•</span>
              <span className="font-semibold text-forest">{job.salaryRange}</span>
            </div>
          </div>

          {/* Manage Job Action Select Dropdown (Matching filter bar select design) */}
          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-50 border border-zinc-200/80 text-xs font-medium text-zinc-700 shadow-2xs">
              <LuSlidersHorizontal className="size-3.5 text-zinc-400 shrink-0" />
              <span className="text-zinc-400 hidden sm:inline">Action:</span>
              <select
                value=""
                onChange={(e) => {
                  const action = e.target.value;
                  if (action === "candidates") {
                    router.push(`/employer/my-jobs/${job.slug}/candidates`);
                  }
                  if (action === "draft") setStatusModalAction("draft");
                  if (action === "closed") setStatusModalAction("closed");
                  if (action === "active") setStatusModalAction("active");
                  if (action === "delete") setIsDeleteModalOpen(true);
                }}
                className="bg-transparent text-zinc-800 font-semibold focus:outline-none cursor-pointer pr-1 text-xs"
                aria-label="Manage Job options"
              >
                <option value="" disabled>
                  Manage Job
                </option>
                <option value="candidates">
                  View Candidates ({job.applicantsCount})
                </option>
                {isActive && (
                  <>
                    <option value="draft">Make Draft</option>
                    <option value="closed">Close Job</option>
                  </>
                )}
                {isDraft && (
                  <option value="active">Publish Job</option>
                )}
                {isClosed && (
                  <>
                    <option value="active">Reopen Job</option>
                    <option value="draft">Move to Draft</option>
                  </>
                )}
                <option value="delete" className="text-red-600">
                  Delete Job
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Job Modal */}
      <DeleteJobModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        job={{ ...job, status: currentStatus }}
      />

      {/* Change Status Modal (Draft, Close, Active) */}
      {statusModalAction && (
        <ChangeJobStatusModal
          open={!!statusModalAction}
          onClose={() => setStatusModalAction(null)}
          onStatusChange={(newStatus) => {
            setCurrentStatus(newStatus);
          }}
          job={{ ...job, status: currentStatus }}
          action={statusModalAction}
        />
      )}
    </>
  );
}
