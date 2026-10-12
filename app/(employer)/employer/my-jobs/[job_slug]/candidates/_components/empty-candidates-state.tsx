import { LuUsers, LuRotateCcw } from "react-icons/lu";
import { Button } from "@/components/ui/button";

interface EmptyCandidatesStateProps {
  onReset: () => void;
  hasFilters: boolean;
}

export default function EmptyCandidatesState({
  onReset,
  hasFilters,
}: EmptyCandidatesStateProps) {
  return (
    <div className="w-full bg-white rounded p-8 sm:p-12 border border-zinc-200/80 shadow-2xs text-center space-y-4">
      <div className="size-12 rounded bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
        <LuUsers className="size-6" />
      </div>

      <div className="space-y-1 max-w-sm mx-auto">
        <h3 className="text-base font-semibold text-zinc-900">
          {hasFilters ? "No matching candidates" : "No candidates applied yet"}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
          {hasFilters
            ? "Try adjusting your search keywords, clearing status filters, or sorting differently."
            : "When candidates apply to this job, their AI matching scores and profile evaluations will appear here."}
        </p>
      </div>

      {hasFilters && (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-forest bg-[#EDF6F1] hover:bg-[#E2EFE7] border-none text-xs font-semibold gap-1.5 rounded"
          >
            <LuRotateCcw className="size-3.5" />
            <span>Reset Filters</span>
          </Button>
        </div>
      )}
    </div>
  );
}
