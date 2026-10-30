import type { ReactNode } from "react";
import DashboardHeader from "@/components/layouts/dashboard-header";
import { DashboardSidebar } from "@/components/layouts/dashboard-sidebar";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { AUTH_COOKIES, QUERY_KEYS } from "@/constants";
import meService from "@/services/auth/me.service";
import axiosPrivateServer from "@/lib/axios-server";

export default async function EmployerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const hasAccessToken = cookieStore.has(AUTH_COOKIES.ACCESS_TOKEN);
  const hasRefreshToken = cookieStore.has(AUTH_COOKIES.REFRESH_TOKEN);

  // If employer user has auth tokens, prefetch current user details on server
  if (hasAccessToken || hasRefreshToken) {
    try {
      const axiosServer = await axiosPrivateServer();
      await queryClient.query({
        queryKey: QUERY_KEYS.AUTH.ME,
        queryFn: () => meService.getMe(axiosServer),
      });
    } catch (error: unknown) {
      // Re-throw redirect errors thrown by Next.js navigation (e.g. redirect("/login"))
      if (
        error &&
        typeof error === "object" &&
        "digest" in error &&
        typeof (error as Record<string, unknown>).digest === "string" &&
        ((error as Record<string, unknown>).digest as string).startsWith("NEXT_REDIRECT")
      ) {
        throw error;
      }
      console.error(
        "[EmployerLayout] Prefetch /auth/me failed:",
        error instanceof Error ? error.message : error
      );
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-screen w-full flex overflow-hidden">
        {/* Employer Sidebar */}
        <DashboardSidebar type="employer" />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 flex flex-col h-full bg-[#F0F5F3] overflow-y-auto">
          {/* header */}
          <DashboardHeader />

          {/* children */}
          <main className="flex-1 min-w-0 w-full p-4 sm:p-5 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </HydrationBoundary>
  );
}
