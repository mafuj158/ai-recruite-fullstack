export interface WorkExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuingOrg: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface CandidateBasicInfoFormValues {
  avatarUrl: string;
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface CandidatePreferencesFormValues {
  jobSearchStatus: "actively_looking" | "open_to_offers" | "casually_browsing" | "not_looking";
  preferredRoles: string[];
  preferredWorkType: "Remote" | "Hybrid" | "On-site" | "Flexible";
  preferredEmploymentType: "Full-time" | "Contract" | "Part-time" | "Any";
  expectedSalary: string;
}

export interface CandidateSkillsFormValues {
  technicalSkills: string[];
  softSkills: string[];
}

export interface WorkExperienceFormValues {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  technologies: string;
}

export interface EducationFormValues {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade?: string;
}

export interface CertificationFormValues {
  name: string;
  issuingOrg: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface CandidateProfileValues {
  // Personal Info
  avatarUrl: string;
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;

  // Preferences
  jobSearchStatus: "actively_looking" | "open_to_offers" | "casually_browsing" | "not_looking";
  preferredRoles: string[];
  preferredWorkType: "Remote" | "Hybrid" | "On-site" | "Flexible";
  preferredEmploymentType: "Full-time" | "Contract" | "Part-time" | "Any";
  expectedSalary: string;

  // Skills
  technicalSkills: string[];
  softSkills: string[];

  // Experience & Education
  experiences: WorkExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];

  // Resume
  activeResumeName: string;
  activeResumeAtsScore: number;
  activeResumeUpdatedAt: string;
}
