"use client";

import { useState } from "react";
import { Modal } from "antd";
import { LuMail, LuSend, LuX, LuInfo } from "react-icons/lu";
import { Button } from "@/components/ui/button";

export interface ResendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onResend?: (email: string) => void | Promise<void>;
  isLoading?: boolean;
}

export default function ResendEmailModal({
  isOpen,
  onClose,
  email,
  onResend,
  isLoading = false,
}: ResendEmailModalProps) {
  const [internalLoading, setInternalLoading] = useState(false);

  const handleResend = async () => {
    if (onResend) {
      await onResend(email);
    } else {
      setInternalLoading(true);
      setTimeout(() => {
        setInternalLoading(false);
        onClose();
      }, 1000);
    }
  };

  const loading = isLoading || internalLoading;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={460}
      destroyOnHidden
      closeIcon={
        <LuX className="size-4.5 text-zinc-400 hover:text-zinc-700 transition-colors" />
      }
      className="[&_.ant-modal-content]:rounded! [&_.ant-modal-content]:p-6!"
    >
      <div className="space-y-4">
        {/* Header Icon & Title */}
        <div className="flex sm:flex-row flex-col items-start gap-3.5">
          <div className="size-11 rounded-full bg-[#EDF6F1] text-forest flex items-center justify-center shrink-0 ring-4 ring-forest/5">
            <LuMail className="size-5.5" />
          </div>
          <div className="space-y-1 pr-6">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
              Verify Your Email
            </h3>
            <span className="inline-block text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
              Account Activation Required
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Your account has been created, but your email address has not been verified yet.
          Please click below to receive a new verification link.
        </p>

        {/* Email Address Container */}
        <div className="bg-zinc-50 border border-zinc-200/90 rounded p-3 flex items-center gap-2.5">
          <div className="size-8 rounded bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 shrink-0">
            <LuMail className="size-4 text-forest" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-zinc-400 font-medium leading-none mb-1">
              Recipient Email
            </p>
            <p className="text-xs sm:text-sm font-semibold text-zinc-800 truncate">
              {email || "your-email@example.com"}
            </p>
          </div>
        </div>

        {/* Info Note */}
        <div className="flex items-start gap-2 text-[11px] sm:text-xs text-zinc-500 bg-zinc-50/50 p-2.5 rounded border border-zinc-100">
          <LuInfo className="size-4 text-zinc-400 shrink-0 mt-0.5" />
          <span>
            Didn&apos;t receive anything? Be sure to check your Spam or Junk folder after sending.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={loading}
            className="text-xs sm:text-sm px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleResend}
            isLoading={loading}
            className="text-xs sm:text-sm px-4.5 py-2 flex items-center gap-2"
          >
            <LuSend className="size-3.5" />
            <span>Resend Verification Link</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
