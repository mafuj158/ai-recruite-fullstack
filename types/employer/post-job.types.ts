export interface AiMatchingWeights {
  skills: number;
  experience: number;
  requirements: number;
  education: number;
  softSkills: number;
}

export interface PostJobFormValues {
  jobTitle: string;
  department: string;
  location: string;
  employmentType: string;
  jobDescription: string;
  coreResponsibilities?: string[];
  skills: string[];
  experienceLevel: string;
  education: string;
  salaryRange: string;
  applicationDeadline: string;
  matchingWeights?: AiMatchingWeights;
}

export interface AiJobOptimizationInsight {
  score: number;
  status: "Excellent" | "Strong" | "Needs Improvement";
  strengths: string[];
  recommendations: string[];
}
