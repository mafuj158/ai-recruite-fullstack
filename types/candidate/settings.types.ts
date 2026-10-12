export type CandidateSettingsTab = "security" | "notifications" | "privacy";

export interface CandidateChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CandidateAccountSecurityFormValues {
  email: string;
  phone: string;
}

export interface CandidateNotificationSettingsFormValues {
  // Delivery Channels
  emailAlerts: boolean;
  inAppAlerts: boolean;
  browserPush: boolean;

  // AI Job Match & Discovery
  jobMatchAlerts: boolean;
  minMatchScoreThreshold: number;
  alertFrequency: "instant" | "daily" | "weekly";

  // Application & Employer Communications
  applicationStatusUpdates: boolean;
  interviewInvitations: boolean;
  chatMessages: boolean;
  aiPracticeInsights: boolean;
}

export interface CandidatePrivacySettingsFormValues {
  profileVisibility: "public" | "discreet" | "private";
  blockedCompanies: string[];
  hideCurrentEmployer: boolean;
  allowAiDataOptimization: boolean;
  searchEngineIndexing: boolean;
}

export interface CandidateSessionDevice {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}
