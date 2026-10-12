import { AiMatchingWeights } from "@/types/employer/post-job.types";

export interface EmployerAiSettingsFormValues {
  // Matching & Scoring Thresholds
  minPassingScore: number;
  autoArchiveThreshold: number;
  weights: AiMatchingWeights;

  // Automation & Trigger Rules
  autoInviteScreening: boolean;
  autoArchiveLowFit: boolean;
  notifyOnInterviewComplete: boolean;

  // AI Persona & Evaluation Tone
  aiFeedbackDetail: "comprehensive" | "standard" | "summary";
  aiTone: "professional" | "encouraging" | "direct";
}
