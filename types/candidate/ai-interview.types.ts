export type AIInterviewStep =
  | "welcome"
  | "introduction"
  | "in-progress"
  | "analyzing"
  | "completed";

export type AIInterviewAnswerMode = "video" | "audio" | "text";

export type AIInterviewStatus = "pending" | "completed";

export type AIInterviewTab = "all" | "pending" | "completed";

export interface AIInterviewListItem {
  id: string;
  applicationId: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  department: string;
  experienceLevel: string;
  status: AIInterviewStatus;
  deadline?: string;
  totalQuestions: number;
  estimatedDurationMinutes: number;
  score?: number;
  verdict?: string;
  completedAt?: string;
  appliedDate: string;
}

export interface DeviceStatus {
  camera: boolean;
  microphone: boolean;
  speaker: boolean;
  cameraName?: string;
  microphoneName?: string;
}

export interface AIInterviewQuestion {
  id: string;
  order: number;
  category: "technical" | "behavioral" | "situational" | "culture";
  categoryLabel: string;
  question: string;
  context?: string;
  idealDurationSeconds: number;
  preparationSeconds: number;
  hints: string[];
}

export interface AIInterviewJobContext {
  id: string;
  applicationId: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  department: string;
  experienceLevel: string;
  totalQuestions: number;
  estimatedDurationMinutes: number;
  status: AIInterviewStatus;
  deadline?: string;
  appliedDate: string;
}

export interface CompetencyScore {
  name: string;
  score: number; // 0-100
  weight: string;
  assessment: string;
  iconName: string;
}

export interface AIInterviewEvaluationReport {
  id: string;
  jobTitle: string;
  companyName: string;
  overallScore: number; // 0-100
  verdict: "Strong Hire" | "Hire" | "Potential Fit" | "Needs Review";
  completedAt: string;
  durationFormatted: string;
  competencies: CompetencyScore[];
  strengths: string[];
  growthAreas: string[];
  transcripts: {
    questionId: string;
    question: string;
    duration: string;
    answerSummary: string;
    keyHighlights: string[];
    sentiment: "positive" | "confident" | "neutral";
  }[];
}
