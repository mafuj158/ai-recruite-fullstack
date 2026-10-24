import { LookupOption } from "@/types/candidate/onboarding.types";

export interface EmployerOnboardingFormValues {
  // Step 1: Company Info
  companyName: string;
  companyLogo?: string;
  website: string;
  industryId: string;
  companySize: string;
  location: string;
  aboutCompany: string;

  // Step 2: Hiring Preferences
  rolesHiringFor: { id?: string; label: string; value?: string }[];
  preferredExpLevels: string[];
  budgetRange: string;
}

export interface EmployerOnboardingRequestPayload {
  companyName: string;
  companyLogo?: string | null;
  website: string;
  industryId: string;
  companySize: string;
  location: string;
  aboutCompany: string;
  rolesHiringFor: { id?: string; label: string; value?: string }[];
  preferredExpLevels: string[];
  budgetRange: string;
}

export interface EmployerOnboardingResponseData {
  id: string;
  userId: string;
  fullName: string;
  companyName: string | null;
  logoUrl: string | null;
  website: string | null;
  isOnboarded: boolean;
  industry?: LookupOption | null;
  rolesHiringFor: LookupOption[];
}

export interface EmployerOnboardingSuccessResponse {
  success: true;
  message: string;
  data: EmployerOnboardingResponseData;
  status: number;
}
