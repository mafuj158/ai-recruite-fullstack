import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { ApplicationPipelineStep } from "@/types/candidate/dashboard.types";

interface CandidatePipelineCardProps {
  pipeline: ApplicationPipelineStep[];
}

export default function CandidatePipelineCard({
  pipeline,
}: CandidatePipelineCardProps) {
  const totalApplications = pipeline[0]?.count || 6;

  return (
    <div className="w-full bg-white rounded p-4 sm:p-5 lg:p-6 border border-zinc-200/80 shadow-xs flex flex-col justify-between ">
      {/* Card Header */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-zinc-900">
            Application Pipeline
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time hiring stages across your {totalApplications} applications
          </p>
        </div>

        <Link
          href="/candidate/applied-jobs"
          className="text-xs text-zinc-500 hover:text-forest transition-colors font-medium flex items-center gap-1 shrink-0 whitespace-nowrap group"
        >
          <span>View All</span>
          <FiArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* 5-Stage Visual Timeline Cards */}
      <div className="grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5  gap-2.5 sm:gap-3">
        {pipeline.map((step, index) => {
          const isFinal = step.stage === "offer";

          return (
            <Link
              key={step.stage}
              href={`/candidate/applied-jobs?stage=${step.stage}`}
              className="group p-3 rounded-lg border border-zinc-200/80 hover:border-forest/40 bg-zinc-50/60 hover:bg-[#EDF6F1]/30 transition-all duration-150 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-forest transition-colors">
                  Step {index + 1}
                </span>
                {isFinal ? (
                  <span className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shadow-2xs">
                    ★
                  </span>
                ) : (
                  <span className="size-5 rounded-full bg-white border border-zinc-200 text-zinc-600 group-hover:border-forest group-hover:text-forest flex items-center justify-center text-[11px] font-bold shadow-2xs transition-colors">
                    {step.count}
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-forest transition-colors leading-snug">
                  {step.label}
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-2 leading-tight">
                  {step.description}
                </p>
              </div>

              {/* Progress Bar Indicator */}
              <div className="w-full bg-zinc-200 h-1 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-forest h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.round((step.count / totalApplications) * 100))}%`,
                  }}
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer Insight Note */}
      <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 flex-wrap gap-2">
        <span className="flex items-center gap-1.5 text-zinc-600 font-medium">
          <FiCheckCircle className="size-3.5 text-emerald-600 shrink-0" />
          <span>Average recruiter response time: <strong>48 hours</strong></span>
        </span>
        <span className="text-[11px] text-zinc-400">
          Updated 15 mins ago
        </span>
      </div>
    </div>
  );
}
