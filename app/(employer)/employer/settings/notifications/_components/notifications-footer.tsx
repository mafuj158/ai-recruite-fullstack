"use client";

import { Button } from "@/components/ui/button";

interface NotificationsFooterProps {
  isSaving: boolean;
  isDirty: boolean;
  onReset: () => void;
  onSave: () => void;
}

export const NotificationsFooter = ({
  isSaving,
  isDirty,
  onReset,
  onSave,
}: NotificationsFooterProps) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3 pt-3.5 sm:pt-4 border-t border-zinc-100">
      <Button
        type="button"
        variant="secondary"
        onClick={onReset}
        disabled={isSaving || !isDirty}
        className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded"
      >
        Reset
      </Button>

      <Button
        type="button"
        variant="primary"
        isLoading={isSaving}
        onClick={onSave}
        className="w-full sm:w-auto px-7 py-2.5 text-xs sm:text-sm font-semibold rounded shadow-xs hover:shadow"
      >
        {isSaving ? "Saving Preferences" : "Save Preferences"}
      </Button>
    </div>
  );
};

export default NotificationsFooter;
