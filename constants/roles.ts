/**
 * Application-wide User Roles Constants
 * Use these constants across frontend and backend instead of hardcoding strings.
 */

export const USER_ROLES = {
  CANDIDATE: "CANDIDATE",
  EMPLOYER: "EMPLOYER",
  ADMIN: "ADMIN",
} as const;

// Alias for convenience
export const ROLES = USER_ROLES;

export type UserRoleType = (typeof USER_ROLES)[keyof typeof USER_ROLES];
