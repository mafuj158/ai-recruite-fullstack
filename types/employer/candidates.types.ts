export type CandidateStatus =
  | "under_review"
  | "shortlisted"
  | "interview_scheduled"
  | "hired"
  | "rejected";

export type CandidateFilterTab = "all" | CandidateStatus;

export type CandidateExplorerFilterTab =
  | "all"
  | "ai_recommended"
  | "shortlisted"
  | "interview_scheduled"
  | "hired"
  | "rejected";

export type CandidateSortOption =
  | "match_desc"
  | "match_asc"
  | "date_desc"
  | "name_asc";

export type CandidateViewMode = "cards" | "table";

export interface CandidateAiInterviewResult {
  completed: boolean;
  completedAt?: string;
  overallScore: number;
  recommendation: "Highly Recommended" | "Recommended" | "Consider with Reservations" | "Not Recommended";
  recommendationNote: string;
  confidenceScore: number;
  confidenceFeedback: string;
  communicationScore: number;
  communicationFeedback: string;
  emotionalIntelligenceScore: number;
  emotionalIntelligenceFeedback: string;
}

export interface CandidateExperience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  description: string;
  technologies?: string[];
}

export interface CandidateEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade?: string;
}

export interface CandidateCertification {
  id: string;
  name: string;
  issuingOrg: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface Candidate {
  id: string;
  slug: string;
  name: string;
  email: string;
  phone?: string;
  headline: string;
  avatarUrl?: string;
  location: string;
  appliedAt: string;
  matchScore: number;
  status: CandidateStatus;
  experienceYears: number;
  currentCompany?: string;
  education: string;
  skills: string[];
  matchingSkills: string[];
  missingSkills: string[];
  aiSummary: string;
  resumeUrl?: string;
  aiInterviewResult?: CandidateAiInterviewResult;
  invitationSent?: boolean;
  interviewDate?: string;
  // Multiple Experience, Education & Certifications
  experiences?: CandidateExperience[];
  educationList?: CandidateEducation[];
  certifications?: CandidateCertification[];
  // Top-Level Explorer cross-job references
  jobId?: string;
  jobTitle?: string;
  jobSlug?: string;
  jobDepartment?: string;
}

export interface CandidateStatsSummary {
  total: number;
  aiRecommended: number;
  interviewScheduled: number;
  avgMatchScore: number;
}
