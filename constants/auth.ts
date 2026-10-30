/**
 * Cookie configuration constants
 */
export const AUTH_COOKIES = {
  ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "ai_recruite_access_token",
  REFRESH_TOKEN: process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || "ai_recruite_refresh_token",
  IS_LOGGED_IN: "ai_recruite_is_logged_in",
} as const;

