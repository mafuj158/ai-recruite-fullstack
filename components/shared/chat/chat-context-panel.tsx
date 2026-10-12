"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiX,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiExternalLink,
  FiCheckCircle,
  FiUserCheck,
} from "react-icons/fi";
import { LuSparkles, LuBuilding2, LuAward } from "react-icons/lu";
import toast from "react-hot-toast";
import type { ChatConversation } from "@/types/chat/chat.types";
import { useChatRole } from "./use-chat-role";
import { useAppStore } from "@/store";

interface ChatContextPanelProps {
  conversation: ChatConversation;
}

export default function ChatContextPanel({
  conversation,
}: ChatContextPanelProps) {
  const { role } = useChatRole();
  const setChatContextPanelOpen = useAppStore(
    (state) => state.setChatContextPanelOpen
  );

  const { job, participant } = conversation;

  return (
    <div className="w-80 lg:w-88 h-full bg-white border-l border-zinc-200/80 flex flex-col min-w-0 shrink-0 overflow-y-auto">
      {/* Top Header */}
      <div className="p-3.5 sm:p-4 border-b border-zinc-100 flex items-center justify-between shrink-0 bg-zinc-50/50">
        <div className="flex items-center gap-1.5">
          <h3 className="text-xs sm:text-sm font-bold text-zinc-900">
            {role === "employer" ? "Candidate Evaluation" : "Job & Organization"}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setChatContextPanelOpen(false)}
          className="p-1 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
          title="Close details"
        >
          <FiX className="size-4" />
        </button>
      </div>

      <div className="p-4 sm:p-5 space-y-5 flex-1 min-h-0">
        {/* ======================================= */}
        {/* EMPLOYER VIEWING CANDIDATE CONTEXT */}
        {/* ======================================= */}
        {role === "employer" ? (
          <>
            {/* 1. Candidate Identity & Match Score Card */}
            <div className="p-4 rounded border border-zinc-200/80 bg-zinc-50/60 text-center space-y-3">
              <div className="size-16 rounded-full overflow-hidden bg-zinc-200 mx-auto relative border-2 border-white shadow-2xs">
                <Image
                  src={participant.avatar}
                  alt={participant.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-zinc-900">
                  {participant.name}
                </h4>
                <p className="text-xs text-zinc-600">
                  {participant.candidateTitle || participant.role}
                </p>
                {participant.location && (
                  <p className="text-[11px] text-zinc-400 flex items-center justify-center gap-1 pt-0.5">
                    <FiMapPin className="size-3" />
                    {participant.location}
                  </p>
                )}
              </div>

              {/* AI Match Score Badge */}
              {participant.atsScore && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EDF6F1] text-forest border border-[#C2E4D2]">
                  <LuSparkles className="size-3.5" />
                  <span>{participant.atsScore}% AI Compatibility</span>
                </div>
              )}
            </div>

            {/* 2. Key Verified Skills */}
            {participant.skills && participant.skills.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                  <LuAward className="size-3.5 text-forest" />
                  <span>Verified Skills & Competencies</span>
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {participant.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Applied Job Details */}
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <h5 className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                <FiBriefcase className="size-3.5 text-forest" />
                <span>Application Reference</span>
              </h5>
              <div className="p-3 rounded border border-zinc-200/80 bg-white space-y-1.5 text-xs">
                <p className="font-bold text-zinc-900">{job.title}</p>
                <p className="text-zinc-500">{job.department} • {job.employmentType}</p>
                {job.applicationStatus && (
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    Stage: {job.applicationStatus}
                  </span>
                )}
              </div>
            </div>

            {/* 4. Quick Hiring Actions */}
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <h5 className="text-xs font-semibold text-zinc-900">
                Candidate Management Actions
              </h5>
              <div className="space-y-2">
                <Link
                  href="/employer/interviews"
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-bold bg-forest text-white hover:bg-forest-dark transition-colors shadow-2xs cursor-pointer"
                >
                  <FiCalendar className="size-3.5" />
                  <span>Schedule Final Interview</span>
                </Link>

                <Link
                  href="/employer/candidates"
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-zinc-100 text-zinc-700 hover:bg-zinc-200/70 transition-colors border border-zinc-200 cursor-pointer"
                >
                  <FiUserCheck className="size-3.5" />
                  <span>View Full Candidate Evaluation</span>
                </Link>

                <button
                  type="button"
                  onClick={() => toast.success("Candidate moved to Shortlisted stage!")}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors border border-emerald-200 cursor-pointer"
                >
                  <FiCheckCircle className="size-3.5" />
                  <span>Mark as Shortlisted</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          /* ======================================= */
          /* CANDIDATE VIEWING EMPLOYER/JOB CONTEXT  */
          /* ======================================= */
          <>
            {/* 1. Company Overview Card */}
            <div className="p-4 rounded border border-zinc-200/80 bg-zinc-50/60 text-center space-y-3">
              <div className="size-14 rounded bg-white p-2 mx-auto border border-zinc-200 shadow-2xs flex items-center justify-center">
                <LuBuilding2 className="size-7 text-forest" />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-zinc-900">
                  {job.companyName}
                </h4>
                <p className="text-xs text-zinc-600">{participant.name}</p>
                <p className="text-[11px] text-zinc-400">{participant.role}</p>
              </div>

              {job.matchScore && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EDF6F1] text-forest border border-[#C2E4D2]">
                  <LuSparkles className="size-3.5" />
                  <span>{job.matchScore}% Match for your Profile</span>
                </div>
              )}
            </div>

            {/* 2. Target Job Specifications */}
            <div className="space-y-2.5">
              <h5 className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                <FiBriefcase className="size-3.5 text-forest" />
                <span>Job Details</span>
              </h5>

              <div className="p-3.5 rounded border border-zinc-200/80 bg-white space-y-2 text-xs">
                <p className="font-bold text-zinc-900 text-sm">{job.title}</p>

                <div className="space-y-1.5 text-zinc-600 pt-1 border-t border-zinc-100">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="size-3.5 text-zinc-400 shrink-0" />
                    <span>{job.location}</span>
                  </div>

                  {job.salaryRange && (
                    <div className="flex items-center gap-2">
                      <FiDollarSign className="size-3.5 text-zinc-400 shrink-0" />
                      <span className="font-semibold text-zinc-900">
                        {job.salaryRange}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-forest" />
                    <span>{job.department} • {job.employmentType}</span>
                  </div>
                </div>

                {job.jobSlug && (
                  <Link
                    href={`/candidate/find-jobs/${job.jobSlug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-forest hover:underline pt-2"
                  >
                    <span>View Full Job Posting</span>
                    <FiExternalLink className="size-3" />
                  </Link>
                )}
              </div>
            </div>

            {/* 3. Candidate Next Actions */}
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <h5 className="text-xs font-semibold text-zinc-900">
                Application Tools
              </h5>
              <div className="space-y-2">
                <Link
                  href="/candidate/applied-jobs"
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-zinc-100 text-zinc-700 hover:bg-zinc-200/70 transition-colors border border-zinc-200 cursor-pointer"
                >
                  <FiCheckCircle className="size-3.5" />
                  <span>View Application Timeline</span>
                </Link>

                <Link
                  href="/candidate/ai-interview"
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors border border-emerald-200 cursor-pointer"
                >
                  <LuSparkles className="size-3.5" />
                  <span>Practice AI Interview Simulation</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
