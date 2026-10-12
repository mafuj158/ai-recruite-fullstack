import { LuCalendarX2 } from "react-icons/lu";

interface EmptyInterviewsStateProps {
  onReset: () => void;
}

export default function EmptyInterviewsState({ onReset }: EmptyInterviewsStateProps) {
  return (
    <div className="bg-white rounded border border-zinc-200/80 p-10 sm:p-12 text-center shadow-2xs space-y-3">
      <div className="size-12 rounded-full bg-zinc-100 text-zinc-500 flex items-center justify-center mx-auto">
        <LuCalendarX2 className="size-6" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-zinc-900">
        No interview sessions found
      </h3>
      <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
        No interviews match your selected status tab or search filter. Try clearing filters to view all sessions.
      </p>
      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded bg-forest text-lime hover:bg-forest/90 transition-all cursor-pointer shadow-2xs"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
