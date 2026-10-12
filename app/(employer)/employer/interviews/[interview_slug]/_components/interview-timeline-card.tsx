import { LuClock } from "react-icons/lu";
import type { InterviewTimelineEvent } from "@/types/employer/interviews.types";

interface InterviewTimelineCardProps {
  timeline: InterviewTimelineEvent[];
}

export default function InterviewTimelineCard({
  timeline,
}: InterviewTimelineCardProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-1 sm:gap-2 pb-3 border-b border-zinc-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
          <LuClock className="size-3.5 text-zinc-400 shrink-0" />
          <span>Activity History & Timeline</span>
        </h4>
        <span className="text-[11px] text-zinc-400 font-medium">
          {timeline.length} events logged
        </span>
      </div>

      <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100">
        {timeline.map((event, idx) => (
          <div key={idx} className="relative pl-6 space-y-0.5">
            <div className="size-2 rounded-full bg-forest absolute left-1 top-1.5 ring-4 ring-white" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-2">
              <p className="text-xs font-bold text-zinc-800">{event.label}</p>
              <span className="text-[11px] text-zinc-400">{event.date}</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed pt-0.5">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
