import { LuMic, LuSparkles, LuCircleCheck, LuClock } from "react-icons/lu";
import { CandidateAiInterviewResult } from "@/types/employer/candidates.types";
import { cn } from "@/lib/utils";

interface AiInterviewScoreCardsProps {
  interviewResult?: CandidateAiInterviewResult;
  candidateName: string;
}

export default function AiInterviewScoreCards({
  interviewResult,
  candidateName,
}: AiInterviewScoreCardsProps) {
  if (!interviewResult || !interviewResult.completed) {
    return (
      <div className="bg-white rounded border border-zinc-200/80 p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded bg-zinc-100 text-zinc-500 flex items-center justify-center">
              <LuMic className="size-4.5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                AI Practice Interview Evaluation
              </h2>
              <p className="text-xs text-zinc-500">
                Candidate has not yet completed their simulated AI interview session.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
            Pending Session
          </span>
        </div>

        <div className="p-4 rounded bg-zinc-50 border border-dashed border-zinc-200 text-center space-y-2">
          <p className="text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto">
            When {candidateName} practices with the AI Interviewer, detailed metrics on confidence, communication structure, and emotional intelligence will appear here automatically.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-forest text-white text-xs font-semibold hover:bg-forest/90 transition-colors shadow-2xs cursor-pointer"
          >
            <LuMic className="size-3.5" />
            <span>Request Candidate AI Practice Interview</span>
          </button>
        </div>
      </div>
    );
  }

  // Color mapping for overall recommendation badge
  const getRecommendationTheme = (recommendation: string) => {
    switch (recommendation) {
      case "Highly Recommended":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Recommended":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Consider with Reservations":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-rose-100 text-rose-800 border-rose-200";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded border border-zinc-200/80 p-5 shadow-2xs">
        <div className="flex xs:flex-row flex-col r gap-3">
          <div className="size-10 rounded bg-forest text-lime flex items-center justify-center shrink-0 shadow-2xs">
            <LuMic className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                AI Practice Interview Evaluation
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#EDF6F1] text-forest text-xs font-bold border border-[#C2E4D2]">
                <LuSparkles className="size-3 text-forest" />
                <span>Overall {interviewResult.overallScore}%</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Simulated interactive speech & behavioral response analysis by AI Recruiter.
            </p>
          </div>
        </div>

        {interviewResult.completedAt && (
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 self-start sm:self-auto shrink-0 bg-zinc-50 px-3 py-1.5 rounded border border-zinc-200/70">
            <LuClock className="size-3.5 text-zinc-400" />
            <span>Completed {interviewResult.completedAt}</span>
          </div>
        )}
      </div>

      {/* 2x2 Score Grid (Matches user reference exactly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. Confidence Score */}
        <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-700">
              Confidence Score
            </h3>
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight mt-2">
              {interviewResult.confidenceScore}%
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-3 leading-relaxed">
            {interviewResult.confidenceFeedback}
          </p>
        </div>

        {/* 2. Communication Score */}
        <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-700">
              Communication Score
            </h3>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight mt-2">
              {interviewResult.communicationScore}%
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-3 leading-relaxed">
            {interviewResult.communicationFeedback}
          </p>
        </div>

        {/* 3. Emotional Intelligence */}
        <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-700">
              Emotional Intelligence
            </h3>
            <div className="text-3xl sm:text-4xl font-extrabold text-purple-600 tracking-tight mt-2">
              {interviewResult.emotionalIntelligenceScore}%
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-3 leading-relaxed">
            {interviewResult.emotionalIntelligenceFeedback}
          </p>
        </div>

        {/* 4. Overall Recommendation */}
        <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-700">
              Overall Recommendation
            </h3>
            <div className="mt-2.5">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs sm:text-sm font-bold border shadow-2xs",
                  getRecommendationTheme(interviewResult.recommendation)
                )}
              >
                <LuCircleCheck className="size-3.5" />
                <span>{interviewResult.recommendation}</span>
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-3 leading-relaxed">
            {interviewResult.recommendationNote}
          </p>
        </div>
      </div>
    </div>
  );
}
