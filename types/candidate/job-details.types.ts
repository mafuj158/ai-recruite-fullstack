import { CandidateJob } from "./find-jobs.types";

export interface CandidateJobMatchInsights {
  compatibilityScore: number;
  matchReasons: string[];
  gapAreas?: string[];
  verifiedSkills: string[];
}

export interface CandidateJobDetail extends CandidateJob {
  responsibilities: string[];
  requirements: string[];
  niceToHaves?: string[];
  benefits: string[];
  companyOverview: string;
  companySize: string;
  companyWebsite: string;
  aiMatchInsights: CandidateJobMatchInsights;
}
