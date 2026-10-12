import React from "react";
import { Button } from "@/components/ui/button";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

interface StepActionsProps {
  onBack?: () => void;
  onNext?: () => void;
  submitLabel?: string;
  nextLabel?: string;
  loading?: boolean;
}

export default function StepActions({
  onBack,
  onNext,
  submitLabel = "Complete Setup",
  nextLabel = "Next",
  loading = false,
}: StepActionsProps) {
  // Step 1: Only Next button
  if (!onBack) {
    return (
      <div className="flex justify-end pt-4">
        <Button
          type="button"
          onClick={onNext}
          variant="primary"
          className="text-sm px-6 py-2.5 rounded gap-1.5 shadow-sm"
        >
          {nextLabel}
          <LuArrowRight className="size-4" />
        </Button>
      </div>
    );
  }

  // Step 2: Back button + Submit button
  return (
    <div className="flex items-center justify-between pt-4">
      <Button
        type="button"
        onClick={onBack}
        variant="outline"
        className="text-zinc-600 hover:text-zinc-900 border-zinc-200 text-sm px-4 py-2 gap-1.5"
      >
        <LuArrowLeft className="size-4" />
        Back
      </Button>

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        isLoading={loading}
        className="text-sm px-6 py-2.5 rounded gap-1.5 shadow-sm"
      >
        {loading ? "Saving..." : submitLabel}
        <LuArrowRight className="size-4" />
      </Button>
    </div>
  );
}
