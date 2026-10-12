import {
  CandidateAccountSecurityFormValues,
  CandidateNotificationSettingsFormValues,
  CandidatePrivacySettingsFormValues,
  CandidateSessionDevice,
} from "@/types/candidate/settings.types";

export const DEFAULT_ACCOUNT_SECURITY: CandidateAccountSecurityFormValues = {
  email: "alex.morgan@example.com",
  phone: "+1 (555) 234-5678",
};

export const DEFAULT_NOTIFICATION_SETTINGS: CandidateNotificationSettingsFormValues = {
  emailAlerts: true,
  inAppAlerts: true,
  browserPush: false,
  jobMatchAlerts: true,
  minMatchScoreThreshold: 85,
  alertFrequency: "daily",
  applicationStatusUpdates: true,
  interviewInvitations: true,
  chatMessages: true,
  aiPracticeInsights: true,
};

export const DEFAULT_PRIVACY_SETTINGS: CandidatePrivacySettingsFormValues = {
  profileVisibility: "public",
  blockedCompanies: ["Meta", "Oracle"],
  hideCurrentEmployer: true,
  allowAiDataOptimization: true,
  searchEngineIndexing: false,
};

export const DEFAULT_SESSION_DEVICES: CandidateSessionDevice[] = [
  {
    id: "sess-1",
    device: "MacBook Pro 16\"",
    browser: "Chrome 128.0",
    location: "San Francisco, CA, USA",
    ipAddress: "192.0.2.1",
    lastActive: "Active now",
    isCurrent: true,
  },
  {
    id: "sess-2",
    device: "iPhone 15 Pro",
    browser: "Safari Mobile 18.0",
    location: "San Francisco, CA, USA",
    ipAddress: "198.51.100.42",
    lastActive: "4 hours ago",
    isCurrent: false,
  },
];
