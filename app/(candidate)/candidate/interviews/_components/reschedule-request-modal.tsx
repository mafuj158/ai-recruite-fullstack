"use client";

import { useState } from "react";
import { Modal } from "antd";
import { FiCalendar, FiClock, FiX, FiInfo } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import type { CandidateInterviewItem } from "@/types/candidate/interviews.types";

interface RescheduleRequestModalProps {
  interview: CandidateInterviewItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReschedule: (
    interviewId: string,
    preferredSlot: string,
    reason: string
  ) => void;
}

export function RescheduleRequestModal({
  interview,
  isOpen,
  onClose,
  onSubmitReschedule,
}: RescheduleRequestModalProps) {
  const [preferredSlot, setPreferredSlot] = useState("next_day_morning");
  const [reasonText, setReasonText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!interview) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitReschedule(interview.id, preferredSlot, reasonText);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
      width={480}
      closeIcon={
        <FiX className="size-4 text-zinc-400 hover:text-zinc-700 transition-colors" />
      }
      className="[&_.ant-modal-content]:p-0! [&_.ant-modal-content]:rounded-xl [&_.ant-modal-content]:overflow-hidden"
    >
      <div className="p-5 sm:p-6 space-y-4">
        {/* Modal Header */}
        <div className="flex items-start gap-3.5">
          <div className="size-10 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 border border-[#C2E4D2]">
            <FiCalendar className="size-5" />
          </div>
          <div className="space-y-1 min-w-0">
            <h3 className="text-base font-bold text-zinc-900">
              Request Interview Reschedule
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Notify <strong className="text-zinc-800">{interview.company}</strong>{" "}
              recruiting coordinators that you need to adjust your meeting time for{" "}
              <strong className="text-zinc-800">{interview.jobTitle}</strong>.
            </p>
          </div>
        </div>

        {/* Current Schedule Summary */}
        <div className="p-3 rounded bg-zinc-50 border border-zinc-200/70 text-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
            Current Scheduled Time
          </span>
          <div className="flex items-center gap-2 font-semibold text-zinc-800">
            <FiClock className="size-3.5 text-forest" />
            <span>
              {interview.date} • {interview.time} ({interview.duration})
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700 block">
              Preferred Alternative Availability
            </label>
            <select
              value={preferredSlot}
              onChange={(e) => setPreferredSlot(e.target.value)}
              className="w-full px-3 py-2 rounded border border-zinc-200 text-xs text-zinc-800 bg-white focus:outline-none focus:ring-1 focus:ring-forest cursor-pointer"
            >
              <option value="next_day_morning">1–2 days later (Morning: 9:00 AM - 12:00 PM PST)</option>
              <option value="next_day_afternoon">1–2 days later (Afternoon: 1:00 PM - 5:00 PM PST)</option>
              <option value="next_week_early">Next week (Monday - Wednesday)</option>
              <option value="next_week_late">Next week (Thursday - Friday)</option>
              <option value="custom">Any time next week matching panel</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700 block">
              Reason / Note for Recruiter (Optional)
            </label>
            <textarea
              rows={3}
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              placeholder="e.g. Unforeseen work commitment / illness. Apologies for any inconvenience."
              className="w-full p-2.5 rounded border border-zinc-200 text-xs text-zinc-800 placeholder:text-zinc-400 bg-white focus:outline-none focus:ring-1 focus:ring-forest resize-none"
            />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 bg-emerald-50/70 border border-emerald-200/80 p-2.5 rounded">
            <FiInfo className="size-3.5 text-forest shrink-0" />
            <span>
              The employer coordinator will be notified immediately and will message you via Candidate Chat.
            </span>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-zinc-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              isLoading={isSubmitting}
              className="cursor-pointer bg-forest text-white hover:bg-[#1b3027]"
            >
              Send Reschedule Request
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
