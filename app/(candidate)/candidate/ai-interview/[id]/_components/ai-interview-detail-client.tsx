"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type {
  AIInterviewStep,
  AIInterviewAnswerMode,
  AIInterviewJobContext,
} from "@/types/candidate/ai-interview.types";
import {
  MOCK_INTERVIEW_QUESTIONS,
  MOCK_INTERVIEW_REPORT,
} from "@/app/(candidate)/candidate/ai-interview/dummy";
import InterviewSessionHeader from "./interview-session-header";
import StepWelcomeAndDevice from "./step-welcome-and-device";
import StepQuestionRunner from "./step-question-runner";
import StepAIProcessing from "./step-ai-processing";
import StepAIReport from "./step-ai-report";

interface AIInterviewDetailClientProps {
  job: AIInterviewJobContext;
}

export default function AIInterviewDetailClient({
  job,
}: AIInterviewDetailClientProps) {
  const router = useRouter();
  const [runnerStep, setRunnerStep] = useState<AIInterviewStep>(
    job.status === "completed" ? "completed" : "welcome"
  );
  const [answerMode, setAnswerMode] = useState<AIInterviewAnswerMode>("video");

  const handleBackToList = () => {
    router.push("/candidate/ai-interview");
  };

  const handleStartQuestions = (mode: AIInterviewAnswerMode) => {
    setAnswerMode(mode);
    setRunnerStep("in-progress");
  };

  const handleFinishAllQuestions = () => {
    setRunnerStep("analyzing");
  };

  const handleAnalysisComplete = () => {
    setRunnerStep("completed");
    toast.success("AI Pre-Screening Evaluation Completed!");
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Detail Session Header & Step Tracker */}
      <InterviewSessionHeader
        job={job}
        currentStep={runnerStep}
        onBackToList={handleBackToList}
      />

      {/* 1. AI Pre-Screening Introduction & Device Check */}
      {runnerStep === "welcome" && (
        <StepWelcomeAndDevice
          job={job}
          onStartInterview={handleStartQuestions}
        />
      )}

      {/* 2. AI Interview Question Runner & Recorder */}
      {runnerStep === "in-progress" && (
        <StepQuestionRunner
          questions={MOCK_INTERVIEW_QUESTIONS}
          answerMode={answerMode}
          onFinishAll={handleFinishAllQuestions}
        />
      )}

      {/* 3. Interview Processing */}
      {runnerStep === "analyzing" && (
        <StepAIProcessing onComplete={handleAnalysisComplete} />
      )}

      {/* 4. AI Interview Report */}
      {runnerStep === "completed" && (
        <StepAIReport
          report={{
            ...MOCK_INTERVIEW_REPORT,
            jobTitle: job.jobTitle,
            companyName: job.companyName,
          }}
          onBackToList={handleBackToList}
        />
      )}
    </div>
  );
}
