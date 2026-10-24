import { AxiosInstance } from "axios";
import { LookupOption } from "@/types/candidate/onboarding.types";

export interface LookupOptionsResponse {
  success: boolean;
  data: {
    jobRoles: LookupOption[];
    industries: LookupOption[];
    skills: LookupOption[];
  };
  status: number;
}

export const lookupService = {
  getOptions: async (axiosInstance: AxiosInstance): Promise<LookupOptionsResponse> => {
    const response = await axiosInstance.get<LookupOptionsResponse>("/lookup/options");
    return response.data;
  },
};

export default lookupService;
