export type CandidateInterviewStatus =
  | "upcoming"
  | "completed"
  | "cancelled";

export type CandidateInterviewFilterTab = "all" | CandidateInterviewStatus;

export type CandidateInterviewSortOption =
  | "date_asc"
  | "date_desc"
  | "company_asc";

export interface CandidateInterviewItem {
  id: string;
  applicationId: string;
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  company: string;
  companyInitial: string;
  department: string;
  roundName: string;
  status: CandidateInterviewStatus;
  date: string;
  time: string;
  duration: string;
  platform: "google_meet" | "zoom" | "teams" | "in_person";
  meetingLink?: string;
  notes?: string;
  feedbackSummary?: string;
  isToday?: boolean;
  isTomorrow?: boolean;
}
