"use client";

import { Modal } from "antd";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface ClearSavedJobsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

export function ClearSavedJobsModal({
  isOpen,
  onClose,
  onConfirm,
  count,
}: ClearSavedJobsModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
      width={460}
      closeIcon={
        <FiX className="size-4 text-zinc-400 hover:text-zinc-700 transition-colors" />
      }
      className="[&_.ant-modal-content]:p-0! [&_.ant-modal-content]:overflow-hidden"
    >
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex sm:flex-row flex-col items-start gap-3.5">
          <div className="size-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
            <FiAlertTriangle className="size-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-zinc-900">
              Clear all saved jobs?
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Are you sure you want to remove all{" "}
              <strong className="text-zinc-800 font-semibold">{count}</strong>{" "}
              saved jobs from your bookmarks? You will need to find and bookmark
              them again from the job discovery board.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-100">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            size="md"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes, Clear All
          </Button>
        </div>
      </div>
    </Modal>
  );
}
