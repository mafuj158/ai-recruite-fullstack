export type WorkType = "Remote" | "Hybrid" | "On-site";
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type ExperienceLevel = "Junior" | "Mid-Level" | "Senior" | "Lead";

export interface CandidateJob {
  id: string;
  jobId?: string;
  slug: string;
  title: string;
  company: string;
  companyInitial: string;
  location: string;
  workType: WorkType;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  department: string;
  salaryRange: string;
  salaryMin: number;
  salaryMax: number;
  salaryAvg?: number;
  matchScore: number;
  skills: string[];
  description: string;
  postedAt?: string;
  isSaved?: boolean;
  status: "active" | "expired";
  savedAt?: string;
  applicationDeadline?: string;
  daysRemaining?: number;
  hasApplied?: boolean;
}

export type FindJobsSortOption = "match_desc" | "date_desc" | "salary_desc";

export interface FindJobsFilters {
  searchTerm: string;
  workType: "all" | WorkType;
  employmentType: "all" | EmploymentType;
  experienceLevel: "all" | ExperienceLevel;
  minMatchScore: number;
  sortBy: FindJobsSortOption;
}
