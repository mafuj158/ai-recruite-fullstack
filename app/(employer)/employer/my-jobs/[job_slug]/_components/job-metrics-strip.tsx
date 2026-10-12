import { LuUsers, LuSparkles, LuCalendar, LuClock } from "react-icons/lu";
import { EmployerJob } from "@/types/employer/my-jobs.types";

interface JobMetricsStripProps {
  job: EmployerJob;
}

export default function JobMetricsStrip({ job }: JobMetricsStripProps) {
  const metrics = [
    {
      label: "Total Applicants",
      value: job.applicantsCount,
      subtext: "Across all pipelines",
      icon: LuUsers,
      highlight: false,
    },
    {
      label: "Top AI Match (90%+)",
      value: job.topAiMatchesCount,
      subtext: "Ready for screening",
      icon: LuSparkles,
      highlight: true,
    },
    {
      label: "Interviewing",
      value: job.interviewingCount,
      subtext: "Active round sessions",
      icon: LuCalendar,
      highlight: false,
    },
    {
      label: "Days Remaining",
      value: job.status === "active" ? `${job.daysRemaining}d` : "—",
      subtext: `Deadline: ${job.applicationDeadline}`,
      icon: LuClock,
      highlight: false,
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className="p-4 sm:p-5 rounded bg-white border border-zinc-200/80 shadow-2xs space-y-1.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-zinc-500">{m.label}</span>
              <div
                className={`size-7 rounded flex items-center justify-center shrink-0 ${
                  m.highlight
                    ? "bg-[#EDF6F1] text-forest"
                    : "bg-zinc-100/80 text-zinc-500"
                }`}
              >
                <Icon className="size-3.5" />
              </div>
            </div>

            <div
              className={`text-xl sm:text-2xl font-bold tracking-tight ${
                m.highlight ? "text-forest" : "text-zinc-900"
              }`}
            >
              {m.value}
            </div>

            <p className="text-[11px] text-zinc-400 leading-none">{m.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
