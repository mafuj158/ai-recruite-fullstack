export type InterviewStatus =
  | "scheduled"
  | "completed"
  | "rescheduled"
  | "cancelled";

export type InterviewPlatform =
  | "google_meet"
  | "zoom"
  | "teams"
  | "in_person"
  | "phone";

export type InterviewFilterTab = "all" | InterviewStatus;

export type InterviewDateFilter = "all" | "today" | "this_week" | "past";

export interface Interviewer {
  name: string;
  role: string;
  email?: string;
  avatar?: string;
}

export interface InterviewScorecard {
  category: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface InterviewTimelineEvent {
  label: string;
  date: string;
  description: string;
}

export interface InterviewItem {
  id: string;
  slug: string;
  title: string;
  candidateName: string;
  candidateSlug: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidateAvatar?: string;
  candidateHeadline: string;
  candidateLocation: string;
  matchScore: number;
  jobTitle: string;
  jobSlug: string;
  jobDepartment: string;
  status: InterviewStatus;
  platform: InterviewPlatform;
  meetingLink: string;
  meetingId?: string;
  passcode?: string;
  date: string;
  time: string;
  duration: string;
  timezone: string;
  interviewers?: Interviewer[];
  notes?: string;
  overallRating?: number;
  recommendation?: "Strong Hire" | "Hire" | "Hold" | "Reject";
  scorecards?: InterviewScorecard[];
  strengths?: string[];
  improvements?: string[];
  timeline?: InterviewTimelineEvent[];
}
