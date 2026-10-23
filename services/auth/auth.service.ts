import api from "@/services/api";
import type {
  CandidateRegisterFormValues,
  EmployerRegisterFormValues,
} from "@/types/auth/register.types";
import type { LoginRequestPayload } from "@/types/auth/login.types";

export const authService = {
  login: async (payload: LoginRequestPayload) => {
    return api.post("/api/auth/login", payload);
  },

  registerCandidate: async (payload: CandidateRegisterFormValues) => {
    return api.post("/api/auth/register", {
      ...payload,
      role: "CANDIDATE",
    });
  },

  registerEmployer: async (payload: EmployerRegisterFormValues) => {
    return api.post("/api/auth/register", {
      ...payload,
      role: "EMPLOYER",
    });
  },

  resendVerification: async (email: string) => {
    return api.post("/api/auth/resend-verification", { email });
  },

  getCurrentUser: async () => {
    return api.get("/api/auth/me");
  },

  logout: async () => {
    return api.post("/api/auth/logout");
  },
};

export default authService;
