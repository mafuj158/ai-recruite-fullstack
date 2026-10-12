"use client";

import { useState } from "react";
import { Modal } from "antd";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import type { CandidateApplication } from "@/types/candidate/applied-jobs.types";

interface AppliedJobsWithdrawModalProps {
  application: CandidateApplication | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmWithdraw: (applicationId: string, reason: string) => void;
}

export function AppliedJobsWithdrawModal({
  application,
  isOpen,
  onClose,
  onConfirmWithdraw,
}: AppliedJobsWithdrawModalProps) {
  const [reason, setReason] = useState<string>("Accepted another offer");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!application) return null;

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmWithdraw(application.id, reason);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
      width={480}
      closeIcon={<FiX className="size-4 text-zinc-400 hover:text-zinc-700 transition-colors" />}
      className="[&_.ant-modal-content]:p-0! [&_.ant-modal-content]:rounded-xl [&_.ant-modal-content]:overflow-hidden"
    >
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="size-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
            <FiAlertTriangle className="size-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-zinc-900">
              Withdraw Application?
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Are you sure you want to withdraw your application for{" "}
              <strong className="text-zinc-800 font-semibold">{application.jobTitle}</strong> at{" "}
              <strong className="text-zinc-800 font-semibold">{application.company}</strong>?
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider block">
            Reason for withdrawal (Optional)
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2.5 text-xs text-zinc-800 bg-zinc-50 border border-zinc-200 rounded-lg outline-none cursor-pointer focus:border-rose-500 transition-colors"
          >
            <option value="Accepted another offer">Accepted another job offer</option>
            <option value="Salary expectations mismatch">Salary expectations mismatch</option>
            <option value="Location/commute constraints">Location or remote policy constraints</option>
            <option value="Personal circumstances">Personal circumstances</option>
            <option value="Applied by mistake">Applied by mistake</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="button"
            size="md"
            isLoading={isSubmitting}
            onClick={handleConfirm}
            className="cursor-pointer"
          >
            Confirm Withdrawal
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AppliedJobsWithdrawModal;
