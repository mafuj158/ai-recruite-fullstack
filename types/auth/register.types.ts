export interface CandidateRegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface EmployerRegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterRequestPayload {
  email: string;
  password: string;
  role: "CANDIDATE" | "EMPLOYER";
  fullName?: string;
  companyName?: string;
}
