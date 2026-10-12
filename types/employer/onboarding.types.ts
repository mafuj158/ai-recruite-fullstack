export interface EmployerOnboardingFormValues {
  // Step 1: Company Info (Client Requirements)
  companyName: string;
  companyLogo?: string;
  website: string;
  industry: string;
  companySize: string;
  location: string;
  aboutCompany: string;

  // Step 2: Hiring Preferences
  rolesHiringFor: string[];
  preferredExpLevels: string[];
  budgetRange: string;
}
