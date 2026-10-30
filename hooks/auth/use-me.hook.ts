import api from "@/lib/axios-client";
import { meService } from "@/services/auth";
import { QUERY_KEYS, AUTH_COOKIES } from "@/constants";
import { useQuery } from "@tanstack/react-query";

/**
 * Check if session flag cookie exists in client browser
 */
export const checkIsLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((item) => item.startsWith(`${AUTH_COOKIES.IS_LOGGED_IN}=true`));
};

export const useMe = () => {
  const isLoggedIn = checkIsLoggedIn();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: () => meService.getMe(api),
    enabled: isLoggedIn, // 👈 শুধুমাত্র সেশন ফ্ল্যাগ কুকি থাকলেই কুয়েরি চলবে!
    staleTime: 5 * 60 * 1000, // ৫ মিনিট ক্যাশ
    retry: false,
  });

  return {
    user: data?.data || null,
    isLoading,
    isError,
    error,
    isLoggedIn,
    refetch,
  };
};

export default useMe;
