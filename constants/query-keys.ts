/**
 * React Query Centralized Query and Mutation Keys
 * All TanStack Query keys are maintained here to avoid hardcoded strings.
 */

export const MUTATION_KEYS = {
  AUTH: {
    LOGIN: ["auth", "login"] as const,
    REGISTER_CANDIDATE: ["auth", "register", "candidate"] as const,
    REGISTER_EMPLOYER: ["auth", "register", "employer"] as const,
    RESEND_VERIFICATION: ["auth", "resend-verification"] as const,
    LOGOUT: ["auth", "logout"] as const,
    FORGOT_PASSWORD: ["auth", "forgot-password"] as const,
    RESET_PASSWORD: ["auth", "reset-password"] as const,
  },
  ONBOARDING: {
    CANDIDATE: ["onboarding", "candidate"] as const,
    EMPLOYER: ["onboarding", "employer"] as const,
  },
  PROFILE: {
    UPDATE_CANDIDATE: ["profile", "candidate", "update"] as const,
    UPDATE_EMPLOYER: ["profile", "employer", "update"] as const,
    CHANGE_PASSWORD: ["profile", "change-password"] as const,
  },
  JOBS: {
    POST_JOB: ["jobs", "post"] as const,
    UPDATE_JOB: (id: string) => ["jobs", "update", id] as const,
    DELETE_JOB: (id: string) => ["jobs", "delete", id] as const,
    APPLY_JOB: (id: string) => ["jobs", "apply", id] as const,
    SAVE_JOB: (id: string) => ["jobs", "save", id] as const,
    UNSAVE_JOB: (id: string) => ["jobs", "unsave", id] as const,
  },
  INTERVIEWS: {
    SCHEDULE: ["interviews", "schedule"] as const,
    UPDATE_STATUS: (id: string) => ["interviews", "status", id] as const,
  },
} as const;

export const QUERY_KEYS = {
  AUTH: {
    ME: ["auth", "me"] as const,
    CURRENT_USER: ["auth", "current-user"] as const,
  },
  CANDIDATE: {
    PROFILE: ["candidate", "profile"] as const,
    APPLIED_JOBS: ["candidate", "applied-jobs"] as const,
    SAVED_JOBS: ["candidate", "saved-jobs"] as const,
    INTERVIEWS: ["candidate", "interviews"] as const,
    AI_INTERVIEW: (id: string) => ["candidate", "ai-interview", id] as const,
  },
  EMPLOYER: {
    PROFILE: ["employer", "profile"] as const,
    MY_JOBS: ["employer", "my-jobs"] as const,
    CANDIDATES: (filters?: Record<string, unknown>) =>
      ["employer", "candidates", filters] as const,
    CANDIDATE_DETAILS: (id: string) =>
      ["employer", "candidate", id] as const,
    INTERVIEWS: ["employer", "interviews"] as const,
    DASHBOARD_METRICS: ["employer", "dashboard", "metrics"] as const,
  },
  JOBS: {
    ALL: ["jobs"] as const,
    LIST: (filters?: Record<string, unknown>) =>
      ["jobs", "list", filters] as const,
    DETAILS: (slug: string) => ["jobs", "details", slug] as const,
  },
  LOOKUP: {
    OPTIONS: ["lookup", "options"] as const,
  },
} as const;

