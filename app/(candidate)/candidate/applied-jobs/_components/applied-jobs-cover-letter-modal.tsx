"use client";

import { Modal } from "antd";
import { FiFileText, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import type { CandidateApplication } from "@/types/candidate/applied-jobs.types";

interface AppliedJobsCoverLetterModalProps {
  application: CandidateApplication | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AppliedJobsCoverLetterModal({
  application,
  isOpen,
  onClose,
}: AppliedJobsCoverLetterModalProps) {
  if (!application) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
      width={600}
      closeIcon={<FiX className="size-4 text-zinc-400 hover:text-zinc-700 transition-colors" />}
      className="[&_.ant-modal-content]:p-0! [&_.ant-modal-content]:rounded-xl [&_.ant-modal-content]:overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-zinc-100 bg-white">
        <h3 className="text-base font-bold text-zinc-900">Submitted Application Documents</h3>
        <p className="text-xs text-zinc-500 mt-0.5">
          {application.jobTitle} • {application.company}
        </p>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
        {/* Attached Resume Pill */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
            Attached Resume / CV
          </label>
          <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 border border-zinc-200">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="size-8 rounded bg-forest/10 text-forest flex items-center justify-center shrink-0">
                <FiFileText className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-zinc-800 truncate">
                  {application.attachedCvName}
                </p>
                <p className="text-[11px] text-zinc-400">Delivered with application</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Transmitted
            </span>
          </div>
        </div>

        {/* Cover Letter Text */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
            Submitted Cover Letter
          </label>
          <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 leading-relaxed whitespace-pre-wrap font-sans">
            {application.coverLetterText}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-100 flex justify-end">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onClose}
          className="cursor-pointer"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}

export default AppliedJobsCoverLetterModal;
