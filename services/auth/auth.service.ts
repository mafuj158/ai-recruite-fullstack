import api from "@/services/api";
import type {
  CandidateRegisterFormValues,
  EmployerRegisterFormValues,
  LoginFormValues,
} from "@/types/auth/auth.types";

export const authService = {
  login: async (payload: LoginFormValues) => {
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
