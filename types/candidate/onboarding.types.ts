export type WorkTypePreference = "Remote" | "Hybrid" | "On-site";

export interface LookupOption {
  id: string;
  label: string;
  value: string;
  isPopular?: boolean;
}

export interface CandidateOnboardingFormValues {
  // Step 1: Candidate Core Profile
  jobRoleId: string;
  skills: LookupOption[];
  experienceLevel: string;
  preferredLocation: string;
  workType: WorkTypePreference | "";
  salaryExpectation: string;
  industryId?: string;
  bio?: string;

  // Step 2: CV Selection Option
  cvOption: "upload" | "generate";
  cvFileName?: string;
  cvFileSize?: string;
  cvUrl?: string;
}

export interface CandidateOnboardingRequestPayload {
  jobRoleId: string;
  skills: { id?: string; label: string; value?: string }[];
  experienceLevel: string;
  preferredLocation: string;
  workType: WorkTypePreference | "";
  salaryExpectation: string;
  industryId?: string | null;
  bio?: string | null;
  cvOption: "upload" | "generate";
  cvFileName?: string | null;
  cvFileSize?: string | null;
  cvUrl?: string | null;
}

export interface CandidateOnboardingResponseData {
  id: string;
  userId: string;
  fullName: string;
  isOnboarded: boolean;
  jobRole?: LookupOption | null;
  industry?: LookupOption | null;
  skills: LookupOption[];
}

export interface CandidateOnboardingSuccessResponse {
  success: true;
  message: string;
  data: CandidateOnboardingResponseData;
  status: number;
}
