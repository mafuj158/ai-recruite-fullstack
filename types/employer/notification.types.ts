export type DigestFrequency = "instant" | "daily" | "weekly";

export interface NotificationSettingsState {
  // Channels
  emailAlerts: boolean;
  inAppAlerts: boolean;
  browserPush: boolean;

  // Applicant & Pipeline
  newApplicant: boolean;
  highAiMatch: boolean;
  candidateProfileUpdate: boolean;

  // Interviews
  interviewConfirmed: boolean;
  interviewReminder24h: boolean;
  postInterviewEvaluation: boolean;

  // Job Posts & Reports
  deadlineExpiring: boolean;
  weeklyDigest: boolean;

  // Frequency
  digestFrequency: DigestFrequency;
}

export type UpdateSettingFn = <K extends keyof NotificationSettingsState>(
  key: K,
  val: NotificationSettingsState[K]
) => void;

export const DEFAULT_SETTINGS: NotificationSettingsState = {
  emailAlerts: true,
  inAppAlerts: true,
  browserPush: false,

  newApplicant: true,
  highAiMatch: true,
  candidateProfileUpdate: false,

  interviewConfirmed: true,
  interviewReminder24h: true,
  postInterviewEvaluation: true,

  deadlineExpiring: true,
  weeklyDigest: true,

  digestFrequency: "instant",
};
