export type WorkTypePreference = "Remote" | "Hybrid" | "On-site";

export interface CandidateOnboardingFormValues {
  // Step 1: Candidate Core Profile (Client Requirements)
  jobTitle: string;
  skills: string[];
  experienceLevel: string;
  preferredLocation: string;
  workType: WorkTypePreference | "";
  salaryExpectation: string;
  industry?: string;
  bio?: string;

  // Step 2: CV Selection Option
  cvOption: "upload" | "generate";
  cvFileName?: string;
  cvFileSize?: string;
}
