import type { CandidateJob } from "./find-jobs.types";

export type SavedJobFilterTab = "all" | "remote" | "hybrid" | "onsite" | "high_match";

export type SavedJobsSortOption =
  | "saved_desc"
  | "match_desc"
  | "salary_desc"
  | "salary_asc"
  | "deadline_asc";

export type SavedJobItem = CandidateJob;

export interface SalaryComparisonSummary {
  candidateTargetSalary: number;
  avgSavedSalary: number;
  minSavedSalary: number;
  maxSavedSalary: number;
  aboveTargetCount: number;
  atTargetCount: number;
  belowTargetCount: number;
}
