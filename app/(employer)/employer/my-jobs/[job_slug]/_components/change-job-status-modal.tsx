"use client";

import { useState } from "react";
import { Modal } from "antd";
import { Button } from "@/components/ui/button";
import { LuFileText, LuLock, LuCircleCheck, LuX } from "react-icons/lu";
import toast from "react-hot-toast";
import { EmployerJob } from "@/types/employer/my-jobs.types";

export type JobStatusAction = "draft" | "closed" | "active";

interface ChangeJobStatusModalProps {
  open: boolean;
  onClose: () => void;
  onStatusChange: (newStatus: EmployerJob["status"]) => void;
  job: EmployerJob;
  action: JobStatusAction;
}

export default function ChangeJobStatusModal({
  open,
  onClose,
  onStatusChange,
  job,
  action,
}: ChangeJobStatusModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getActionConfig = () => {
    switch (action) {
      case "draft":
        return {
          title: "Move to Draft?",
          icon: LuFileText,
          iconBg: "bg-amber-50 text-amber-600 ring-amber-50/60",
          confirmText: "Move to Draft",
          confirmClass: "bg-amber-600 hover:bg-amber-700 text-white",
          description: `Are you sure you want to move "${job.jobTitle}" to draft? It will be hidden from public search, and new applications will be paused. Existing applicants (${job.applicantsCount}) remain intact.`,
          successMessage: `Job "${job.jobTitle}" is now a draft.`,
        };
      case "closed":
        return {
          title: "Close Job Posting?",
          icon: LuLock,
          iconBg: "bg-zinc-100 text-zinc-700 ring-zinc-100/60",
          confirmText: "Close Job",
          confirmClass: "bg-zinc-800 hover:bg-zinc-900 text-white",
          description: `Closing "${job.jobTitle}" will stop accepting new candidate submissions. You can still evaluate existing candidates and conduct scheduled interviews.`,
          successMessage: `Job "${job.jobTitle}" has been closed.`,
        };
      case "active":
        return {
          title: job.status === "closed" ? "Reopen Job Posting?" : "Publish Job Posting?",
          icon: LuCircleCheck,
          iconBg: "bg-emerald-50 text-emerald-600 ring-emerald-50/60",
          confirmText: job.status === "closed" ? "Reopen Job" : "Publish Job",
          confirmClass: "bg-forest hover:bg-forest/90 text-white",
          description: `"${job.jobTitle}" will be published and immediately accessible for candidate discovery and applications.`,
          successMessage: `Job "${job.jobTitle}" is now active!`,
        };
    }
  };

  const config = getActionConfig();
  const Icon = config.icon;

  const handleConfirm = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      onStatusChange(action);
      toast.success(config.successMessage);
      onClose();
    } catch {
      toast.error("Failed to update job status. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={460}
      destroyOnHidden
      closeIcon={<LuX className="size-4.5 text-zinc-400 hover:text-zinc-700 transition-colors" />}
      className="[&_.ant-modal-content]:rounded! [&_.ant-modal-content]:p-6!"
    >
      <div className="space-y-4 pt-1">
        {/* Header Icon & Title */}
        <div className="flex items-start gap-3.5">
          <div
            className={`size-11 rounded-full flex items-center justify-center shrink-0 ring-4 ${config.iconBg}`}
          >
            <Icon className="size-5.5" />
          </div>
          <div className="space-y-1 pr-6">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
              {config.title}
            </h3>
            <span className="inline-block text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded capitalize">
              {job.department} • {job.employmentType}
            </span>
          </div>
        </div>

        {/* Warning / Details Description */}
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          {config.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <Button
            type="button"
            onClick={handleConfirm}
            isLoading={isSubmitting}
            className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded shadow-xs hover:shadow transition-all cursor-pointer ${config.confirmClass}`}
          >
            {isSubmitting ? "Updating..." : config.confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
