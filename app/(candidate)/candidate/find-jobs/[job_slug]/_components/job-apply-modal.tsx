"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import {
  FiFileText,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { LuSparkles, LuX } from "react-icons/lu";
import toast from "react-hot-toast";
import { CandidateJobDetail } from "@/types/candidate/job-details.types";

interface JobApplyModalProps {
  job: CandidateJobDetail;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobApplyModal({
  job,
  isOpen,
  onClose,
}: JobApplyModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "success">("form");
  const [selectedResume] = useState("Alex_Morgan_Senior_Engineer_CV.pdf");
  const [coverLetter, setCoverLetter] = useState(
    `Dear Hiring Team at ${job.company},\n\nI am excited to apply for the ${job.title} position. With over 4 years of engineering experience architecting scalable web applications with ${job.skills.slice(0, 3).join(", ")}, my background strongly aligns with your team's mission.\n\nI look forward to discussing how my experience can contribute to your goals.\n\nBest regards,\nAlex Morgan`
  );
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerateAiCoverLetter = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setCoverLetter(
        `Dear Hiring Manager at ${job.company},\n\nI am writing to express my strong enthusiasm for the ${job.title} opening within the ${job.department} team. Having reviewed the job requirements, I was particularly energized by your emphasis on ${job.skills[0]} and ${job.skills[1] || "modern architecture"}.\n\nThroughout my career, I have specialized in building robust software solutions, optimizing client performance, and collaborating in distributed agile squads. I am confident that my hands-on background and verified skill compatibility (96%) make me an immediate value-add for ${job.company}.\n\nThank you for your time and consideration. I welcome the opportunity to speak further.\n\nSincerely,\nAlex Morgan`
      );
      setIsAiGenerating(false);
      toast.success("AI Cover Letter generated and tailored to this job!");
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
      toast.success(`Application submitted to ${job.company}!`);
    }, 600);
  };

  const handleStartAiInterview = () => {
    onClose();
    router.push("/candidate/interviews");
  };

  const handleGoToApplications = () => {
    onClose();
    router.push("/candidate/applied-jobs");
  };

  const handleModalClose = () => {
    setStep("form");
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleModalClose}
      footer={null}
      centered
      width={600}
      destroyOnHidden
      closeIcon={<LuX className="size-4.5 text-zinc-400 hover:text-zinc-700 transition-colors" />}
      className="[&_.ant-modal-content]:rounded! [&_.ant-modal-content]:p-0! overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-zinc-100 bg-white">
        <div>
          <h3 className="text-base font-bold text-zinc-900">
            {step === "form"
              ? `Apply for ${job.title}`
              : "Application Submitted!"}
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            {job.company} • {job.location}
          </p>
        </div>
      </div>

      {/* Modal Body */}
      {step === "form" ? (
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
          {/* 1. Resume Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
              Resume / CV
            </label>

            <div className="p-3 rounded bg-zinc-50/70 border border-zinc-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-8 rounded bg-forest/10 text-forest flex items-center justify-center shrink-0">
                  <FiFileText className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-800 truncate">
                    {selectedResume}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    Active profile resume • ATS Score: 94%
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 shrink-0">
                Attached
              </span>
            </div>
          </div>

          {/* 2. Cover Letter with AI Generator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                Cover Letter (Optional)
              </label>

              <button
                type="button"
                onClick={handleGenerateAiCoverLetter}
                disabled={isAiGenerating}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-[#EDF6F1] text-forest hover:bg-[#d8eedf] transition-colors cursor-pointer border border-[#C2E4D2]/60"
              >
                <LuSparkles className="size-3 text-forest" />
                <span>
                  {isAiGenerating ? "Generating..." : "Generate with AI"}
                </span>
              </button>
            </div>

            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={5}
              className="w-full p-3 rounded text-xs leading-relaxed text-zinc-800 bg-zinc-50/70 border border-zinc-200/80 focus:bg-white focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all resize-none"
              placeholder="Write a brief cover note to the hiring manager..."
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 rounded border border-zinc-200 hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-forest hover:bg-[#1b3027] rounded transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
              <FiArrowRight className="size-3.5" />
            </button>
          </div>
        </form>
      ) : (
        /* Success Dialog Step */
        <div className="p-6 sm:p-8 text-center space-y-4">
          <div className="size-14 rounded-full bg-[#EDF6F1] text-forest flex items-center justify-center mx-auto border border-[#C2E4D2]">
            <FiCheckCircle className="size-7 text-forest" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h4 className="text-base sm:text-lg font-bold text-zinc-900">
              Application Successfully Submitted!
            </h4>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Your resume and tailored profile have been transmitted to the recruiting team at{" "}
              <strong className="text-zinc-800 font-semibold">{job.company}</strong>.
            </p>
          </div>

          {/* AI Pre-Screening Prompt Card */}
          <div className="p-4 rounded-lg bg-[#F6FBF8] border border-[#C2E4D2] text-left space-y-2 mt-4">
            <div className="flex items-center gap-2">
              <LuSparkles className="size-4 text-forest" />
              <span className="text-xs font-bold text-zinc-900">
                Accelerate Your Application with AI Screening
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Complete a 5-minute interactive AI technical assessment to stand out and fast-track to the hiring manager round.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={handleStartAiInterview}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-forest hover:bg-[#1b3027] rounded transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LuSparkles className="size-3.5 text-lime" />
              <span>Start AI Pre-Screening (Recommended)</span>
            </button>

            <button
              type="button"
              onClick={handleGoToApplications}
              className="px-4 py-2.5 text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50 rounded border border-zinc-200/80 transition-colors cursor-pointer"
            >
              View in My Applications
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
