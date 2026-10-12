export type CandidateNotificationType =
  | "application_viewed"
  | "shortlisted"
  | "interview_scheduled"
  | "new_job_match";

export type EmployerNotificationType =
  | "new_application"
  | "high_ai_match"
  | "ai_screening_completed"
  | "interview_accepted";

export type AppNotificationType =
  | CandidateNotificationType
  | EmployerNotificationType;

export interface AppNotification {
  id: string;
  type: AppNotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionUrl: string;
  actionLabel?: string;
  targetRole: "candidate" | "employer";
  metadata?: {
    roleName?: string;
    companyName?: string;
    candidateName?: string;
    score?: number;
  };
}
