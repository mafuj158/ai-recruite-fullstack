import { LuBrain, LuSparkles } from "react-icons/lu";

export default function AiSettingsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3">
        <div className="size-9 rounded bg-[#EDF6F1] border border-[#D5E6DC] flex items-center justify-center text-forest shrink-0">
          <LuBrain className="size-5" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-zinc-900 flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2">
            <span>AI Screening & Matching Configuration</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#EDF6F1] text-forest border border-[#D5E6DC]">
              <LuSparkles className="size-2.5 text-forest" />
              Active Engine
            </span>
          </h2>
          <p className="text-xs text-zinc-500 mt-1 sm:mt-0.5 leading-relaxed">
            Set company-wide defaults for candidate matching weights, auto-screening triggers, and AI evaluation criteria
          </p>
        </div>
      </div>
    </div>
  );
}
