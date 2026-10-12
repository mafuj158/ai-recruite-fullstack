"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import { Button } from "@/components/ui/button";
import { LuTrash2, LuX, LuTriangleAlert } from "react-icons/lu";
import toast from "react-hot-toast";
import { EmployerJob } from "@/types/employer/my-jobs.types";

interface DeleteJobModalProps {
  open: boolean;
  onClose: () => void;
  job: EmployerJob;
}

export default function DeleteJobModal({ open, onClose, job }: DeleteJobModalProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      // Simulate API deletion
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success(`Job "${job.jobTitle}" was deleted successfully.`);
      onClose();
      router.push("/employer/my-jobs");
    } catch {
      toast.error("Failed to delete job posting. Please try again.");
    } finally {
      setIsDeleting(false);
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
          <div className="size-11 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 ring-4 ring-red-50/60">
            <LuTrash2 className="size-5.5" />
          </div>
          <div className="space-y-1 pr-6">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
              Delete Job Posting
            </h3>
            <span className="inline-block text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded capitalize">
              {job.department} • {job.employmentType}
            </span>
          </div>
        </div>

        {/* Warning / Details */}
        <div className="space-y-2.5">
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-zinc-900">&quot;{job.jobTitle}&quot;</span>?
          </p>

          <div className="flex items-start gap-2.5 p-3 rounded bg-amber-50/80 border border-amber-200/80 text-amber-800 text-xs leading-relaxed">
            <LuTriangleAlert className="size-4 shrink-0 text-amber-600 mt-0.5" />
            <span>
              This will permanently remove the job listing and archive all associated applicant data ({job.applicantsCount} total applicants, {job.topAiMatchesCount} AI matches). This action cannot be reversed.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <Button
            type="button"
            onClick={handleDelete}
            isLoading={isDeleting}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold rounded shadow-xs hover:shadow transition-all bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete Job"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
