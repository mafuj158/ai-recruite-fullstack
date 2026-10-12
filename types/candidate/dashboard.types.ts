export interface CandidateDashboardStat {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  iconName: "sparkles" | "briefcase" | "calendar" | "award";
}

export interface CandidateRecommendedJob {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyInitial: string;
  location: string;
  workType: "Remote" | "Hybrid" | "On-site";
  employmentType: "Full-time" | "Part-time" | "Contract";
  salaryRange: string;
  matchScore: number;
  skills: string[];
  postedAt: string;
}

export type ApplicationStage =
  | "submitted"
  | "pre_screening"
  | "review"
  | "interview"
  | "offer";

export interface ApplicationPipelineStep {
  stage: ApplicationStage;
  label: string;
  count: number;
  description: string;
}

export interface CandidateActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "application" | "interview" | "review" | "match";
  link?: string;
}

export interface CandidateDashboardData {
  candidateName: string;
  headline: string;
  profileCompletion: number;
  atsScore: number;
  stats: CandidateDashboardStat[];
  pipeline: ApplicationPipelineStep[];
  recommendedJobs: CandidateRecommendedJob[];
  recentActivities: CandidateActivityItem[];
}
