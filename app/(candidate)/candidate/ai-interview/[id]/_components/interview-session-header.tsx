import { FiArrowLeft, FiCheck } from "react-icons/fi";
import type {
  AIInterviewStep,
  AIInterviewJobContext,
} from "@/types/candidate/ai-interview.types";

interface InterviewSessionHeaderProps {
  job: AIInterviewJobContext;
  currentStep: AIInterviewStep;
  onBackToList: () => void;
}

export default function InterviewSessionHeader({
  job,
  currentStep,
  onBackToList,
}: InterviewSessionHeaderProps) {
  const steps: { id: AIInterviewStep; label: string; number: number }[] = [
    { id: "introduction", label: "Introduction & Setup", number: 1 },
    { id: "in-progress", label: "Questions & Recording", number: 2 },
    { id: "analyzing", label: "AI Evaluation", number: 3 },
    { id: "completed", label: "Performance Report", number: 4 },
  ];

  const getStepStatus = (stepId: AIInterviewStep) => {
    const order: Record<AIInterviewStep, number> = {
      welcome: 1,
      introduction: 1,
      "in-progress": 2,
      analyzing: 3,
      completed: 4,
    };
    const currentOrder = order[currentStep] || 1;
    const targetOrder = order[stepId] || 1;

    if (currentOrder > targetOrder) return "completed";
    if (currentOrder === targetOrder) return "current";
    return "upcoming";
  };

  return (
    <div className="bg-white border border-zinc-200/80 rounded p-3.5 sm:p-4 shadow-2xs space-y-3">
      {/* Top Bar: Back button & Job Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <button
          type="button"
          onClick={onBackToList}
          className="h-8 px-3 rounded border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
        >
          <FiArrowLeft className="size-3.5" />
          <span>Back to All Pre-Screenings</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 font-medium">
            Pre-Screening for:
          </span>
          <span className="text-xs font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded">
            {job.jobTitle} • {job.companyName}
          </span>
        </div>
      </div>

      {/* Stepper Progress Indicator */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {steps.map((s) => {
          const status = getStepStatus(s.id);
          return (
            <div
              key={s.id}
              className={`p-2 rounded border text-left transition-colors ${
                status === "current"
                  ? "border-forest bg-[#F0F7F4] text-forest font-semibold"
                  : status === "completed"
                  ? "border-emerald-200 bg-emerald-50/60 text-emerald-800"
                  : "border-zinc-200/70 bg-zinc-50/50 text-zinc-400"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px]">
                <div
                  className={`size-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    status === "completed"
                      ? "bg-emerald-600 text-white"
                      : status === "current"
                      ? "bg-forest text-white"
                      : "bg-zinc-200 text-zinc-600"
                  }`}
                >
                  {status === "completed" ? (
                    <FiCheck className="size-2.5" />
                  ) : (
                    s.number
                  )}
                </div>
                <span className="truncate">{s.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
