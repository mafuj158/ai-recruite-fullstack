import { PostJobFormValues } from "./post-job.types";

export type JobStatus = "active" | "draft" | "closed";

export interface EmployerJob extends PostJobFormValues {
  id: string;
  slug: string;
  status: JobStatus;
  applicantsCount: number;
  topAiMatchesCount: number;
  shortlistedCount?: number;
  interviewSentCount?: number;
  interviewingCount: number;
  hiredCount?: number;
  rejectedCount?: number;
  daysRemaining: number;
  postedAt: string;
}

export type JobFilterTab = "all" | "active" | "draft" | "closed";
