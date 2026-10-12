export type ApplicationStageKey =
  | "submitted"
  | "screening"
  | "review"
  | "interview"
  | "decision";

export type ApplicationFilterTab =
  | "all"
  | "review"
  | "shortlisted"
  | "interview"
  | "hired"
  | "rejected";

export type StageStatus = "completed" | "in_progress" | "pending" | "rejected";

export interface ApplicationTimelineStage {
  key: ApplicationStageKey;
  title: string;
  subtitle: string;
  status: StageStatus;
  date?: string;
  note?: string;
  score?: number;
  meetingLink?: string;
  interviewer?: string;
  actionRequired?: boolean;
  actionLabel?: string;
  actionHref?: string;
}

export interface CandidateApplication {
  id: string;
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  company: string;
  companyInitial: string;
  location: string;
  workType: string;
  salaryRange: string;
  appliedAt: string;
  matchScore: number;
  overallStatus: "review" | "shortlisted" | "interview" | "hired" | "rejected";
  activeStageKey: ApplicationStageKey;
  attachedCvName: string;
  coverLetterText: string;
  stages: ApplicationTimelineStage[];
  statusNotice?: string;
}
