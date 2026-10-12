import { LuSparkles } from "react-icons/lu";
import { FiCheck, FiInfo } from "react-icons/fi";
import { CandidateJobDetail } from "@/types/candidate/job-details.types";

interface JobDetailsAiInsightsProps {
  job: CandidateJobDetail;
}

export default function JobDetailsAiInsights({
  job,
}: JobDetailsAiInsightsProps) {
  const { aiMatchInsights } = job;
  const score = aiMatchInsights.compatibilityScore;

  const getScoreColor = (val: number) => {
    if (val >= 90) return { ring: "stroke-emerald-500", text: "text-emerald-700" };
    if (val >= 80) return { ring: "stroke-forest", text: "text-forest" };
    return { ring: "stroke-amber-500", text: "text-amber-700" };
  };

  const colors = getScoreColor(score);

  return (
    <div className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-4">
      {/* Header: AI Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-md bg-[#EDF6F1] text-forest flex items-center justify-center">
            <LuSparkles className="size-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-zinc-900">
              AI Match Analysis
            </h3>
            <p className="text-[11px] text-zinc-500">Based on your active profile & resume</p>
          </div>
        </div>

        <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          {score >= 90 ? "High Match" : "Good Fit"}
        </span>
      </div>

      {/* Circular Compatibility Score & Summary */}
      <div className="flex items-center gap-4 p-3 rounded-lg bg-[#F6FBF8] border border-[#C2E4D2]/60">
        <div className="relative size-14 shrink-0 flex items-center justify-center">
          <svg className="size-14 -rotate-90" viewBox="0 0 36 36">
            <path
              className="stroke-zinc-200/70"
              strokeWidth="3.5"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={colors.ring}
              strokeDasharray={`${score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className={`absolute text-xs font-black ${colors.text}`}>
            {score}%
          </span>
        </div>

        <div className="min-w-0">
          <p className="text-xs font-bold text-zinc-900">
            {score}% Compatibility Match
          </p>
          <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">
            Your technical skills and career history align closely with this job specification.
          </p>
        </div>
      </div>

      {/* Why You Match */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
          Why You Match
        </span>
        <ul className="space-y-2">
          {aiMatchInsights.matchReasons.map((reason, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs text-zinc-600 leading-relaxed"
            >
              <FiCheck className="size-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Focus Areas / Gap */}
      {aiMatchInsights.gapAreas && aiMatchInsights.gapAreas.length > 0 && (
        <div className="p-3 rounded bg-amber-50/70 border border-amber-200/60 space-y-1">
          <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <FiInfo className="size-3.5 text-amber-700" />
            <span>AI Application Tip</span>
          </span>
          {aiMatchInsights.gapAreas.map((gap, idx) => (
            <p key={idx} className="text-xs text-amber-800 leading-relaxed">
              {gap}
            </p>
          ))}
        </div>
      )}

      {/* Verified Skills Overlap */}
      <div className="space-y-2 pt-1 border-t border-zinc-100">
        <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
          Verified Skills Match
        </span>
        <div className="flex flex-wrap gap-1.5">
          {aiMatchInsights.verifiedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#EDF6F1] text-forest border border-[#C2E4D2]/60"
            >
              <FiCheck className="size-3 text-forest" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
