import { JobStatus, WorkplaceType, EmploymentType } from "@prisma/client";

export interface AiMatchingWeights {
  skills: number;
  experience: number;
  requirements: number;
  education: number;
  softSkills: number;
}

export interface CreateJobPayload {
  jobTitle: string;
  department?: string;
  location: string;
  workplaceType?: WorkplaceType | string;
  employmentType?: EmploymentType | string;
  experienceLevel: string;
  education?: string;
  currency?: string;
  minSalary?: number;
  maxSalary?: number;
  salaryPeriod?: string;
  isSalaryNegotiable?: boolean;
  salaryRange?: string;
  jobDescription: string;
  coreResponsibilities?: string[];
  jobRoleId?: string;
  industryId?: string;
  skills: string[]; // skill names or values
  matchingWeights?: AiMatchingWeights;
  status?: JobStatus; // DRAFT or ACTIVE (default ACTIVE)
  applicationDeadline?: string;
}

// Alias for backward compatibility
export type PostJobFormValues = CreateJobPayload;

export interface UpdateJobStatusPayload {
  status: JobStatus;
}

export interface JobFilterQuery {
  status?: string; // all, active, draft, closed
  search?: string;
  page?: number;
  limit?: number;
}

export interface AiJobOptimizationInsight {
  score: number;
  status: "Excellent" | "Strong" | "Needs Improvement";
  strengths: string[];
  recommendations: string[];
}
