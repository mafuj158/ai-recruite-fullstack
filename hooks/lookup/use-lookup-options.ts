import api from "@/lib/axios-client";
import { lookupService } from "@/services/lookup";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export const useLookupOptions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.LOOKUP.OPTIONS,
    queryFn: () => lookupService.getOptions(api),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  return {
    jobRoles: data?.data?.jobRoles || [],
    industries: data?.data?.industries || [],
    skills: data?.data?.skills || [],
    isLoading,
    error,
  };
};

export default useLookupOptions;
