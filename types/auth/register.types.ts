export interface RegisterRequestPayload {
  email: string;
  password: string;
  role: "CANDIDATE" | "EMPLOYER";
  fullName?: string;
  companyName?: string;
}
