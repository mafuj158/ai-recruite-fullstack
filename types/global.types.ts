export type UserRole = "candidate" | "employer";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  avatarUrl?: string;
  isOnboarded?: boolean;
  is_profile_completed?: boolean;
  createdAt?: string;
}


export interface BreadcrumbItem {
  label: string;
  href?: string;
  maxWidth?: string;
}

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
