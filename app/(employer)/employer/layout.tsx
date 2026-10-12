import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/layouts/dashboard-sidebar";
import DashboardHeader from "@/components/layouts/dashboard-header";

export default function EmployerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
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
  );
}

