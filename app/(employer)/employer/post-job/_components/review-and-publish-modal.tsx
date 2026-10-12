"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import { Button } from "@/components/ui/button";
import {
  LuSparkles,
  LuCircleCheck,
  LuX,
  LuBriefcase,
  LuMapPin,
  LuDollarSign,
  LuCalendar,
} from "react-icons/lu";
import { PostJobFormValues } from "@/types/employer/post-job.types";

interface ReviewAndPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PostJobFormValues;
}

export default function ReviewAndPublishModal({
  isOpen,
  onClose,
  data,
}: ReviewAndPublishModalProps) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
    }, 1200);
  };

  const weights = data.matchingWeights || {
    skills: 30,
    experience: 25,
    requirements: 20,
    education: 15,
    softSkills: 10,
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={680}
      destroyOnHidden
      closeIcon={<LuX className="size-4.5 text-zinc-400 hover:text-zinc-700 transition-colors" />}
      className="[&_.ant-modal-content]:rounded! [&_.ant-modal-content]:p-0! overflow-hidden"
    >
      <div className="relative w-full bg-white rounded overflow-hidden">
        {!isPublished ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded bg-[#EDF6F1] border border-[#D5E6DC] flex items-center justify-center text-forest">
                  <LuSparkles className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900">
                    Review Job & AI Optimization
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Confirm job details and AI matching weights before publishing
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* AI Optimization Score Card */}
              <div className="p-4 rounded bg-gradient-to-r from-[#EDF6F1] to-emerald-50/40 border border-[#D5E6DC]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-forest">
                      AI Job Optimization Score
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-forest text-white text-xs font-bold">
                    <LuSparkles className="size-3 text-lime" />
                    <span>94 / 100 — High Visibility</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Excellent role definition and comprehensive skill coverage. Your listing is highly optimized for semantic candidate matching and AI pre-screening.
                </p>
              </div>

              {/* Job Info Grid */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-zinc-100">
                  <h2 className="text-lg font-bold text-zinc-900">
                    {data.jobTitle || "Untitled Role"}
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 self-start sm:self-auto">
                    {data.department}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs text-zinc-600">
                  <div className="flex items-center gap-1.5">
                    <LuMapPin className="size-3.5 text-zinc-400 shrink-0" />
                    <span className="truncate">{data.location || "Remote"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <LuBriefcase className="size-3.5 text-zinc-400 shrink-0" />
                    <span>{data.employmentType}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <LuDollarSign className="size-3.5 text-zinc-400 shrink-0" />
                    <span>{data.salaryRange}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <LuCalendar className="size-3.5 text-zinc-400 shrink-0" />
                    <span>Due: {data.applicationDeadline || "Open"}</span>
                  </div>
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  Required Skills & Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded text-xs font-medium bg-[#EDF6F1] text-forest border border-[#D5E6DC]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Matching Weights Configured */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  Configured AI Matching Weights
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <div className="p-2 rounded bg-zinc-50 border border-zinc-200/70 text-center">
                    <span className="block text-[11px] text-zinc-500">Skills</span>
                    <span className="text-xs font-bold text-forest">{weights.skills}%</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-50 border border-zinc-200/70 text-center">
                    <span className="block text-[11px] text-zinc-500">Experience</span>
                    <span className="text-xs font-bold text-forest">{weights.experience}%</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-50 border border-zinc-200/70 text-center">
                    <span className="block text-[11px] text-zinc-500">Requirements</span>
                    <span className="text-xs font-bold text-forest">{weights.requirements}%</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-50 border border-zinc-200/70 text-center">
                    <span className="block text-[11px] text-zinc-500">Education</span>
                    <span className="text-xs font-bold text-forest">{weights.education}%</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-50 border border-zinc-200/70 text-center">
                    <span className="block text-[11px] text-zinc-500">Soft Skills</span>
                    <span className="text-xs font-bold text-forest">{weights.softSkills}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-zinc-50 border-t border-zinc-100">
              <button
                type="button"
                onClick={onClose}
                disabled={isPublishing}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-900 rounded hover:bg-zinc-200/60 transition-colors cursor-pointer disabled:opacity-50"
              >
                Edit Details
              </button>
              <Button
                type="button"
                variant="primary"
                isLoading={isPublishing}
                onClick={handlePublish}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold rounded shadow-xs cursor-pointer"
              >
                Publish Job Now
              </Button>
            </div>
          </>
        ) : (
          /* Success: Job Published State */
          <div className="p-8 text-center space-y-5">
            <div className="size-16 rounded-full bg-[#EDF6F1] border border-[#D5E6DC] flex items-center justify-center text-forest mx-auto">
              <LuCircleCheck className="size-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-zinc-900">
                Job Published Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1.5 max-w-md mx-auto">
                <strong className="text-zinc-800">{data.jobTitle}</strong> is now live on AI-Recruite. AI candidate matching and pre-screening workflows are active.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                type="button"
                variant="primary"
                onClick={() => router.push("/employer/my-jobs")}
                className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm rounded"
              >
                View in My Jobs
              </Button>
              <button
                type="button"
                onClick={() => {
                  setIsPublished(false);
                  onClose();
                  window.location.reload();
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-medium border border-zinc-200 rounded hover:bg-zinc-50 text-zinc-700 cursor-pointer"
              >
                Post Another Job
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
