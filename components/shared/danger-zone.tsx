"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LuShieldAlert, LuTriangleAlert } from "react-icons/lu";
import { useAppStore } from "@/store";

interface DangerZoneProps {
  role?: "employer" | "candidate";
  className?: string;
}

export default function DangerZone({ role, className }: DangerZoneProps) {
  const pathname = usePathname();
  const isEmployer = role ? role === "employer" : pathname.includes("/employer");

  const toggleDeleteAccountModal = useAppStore(
    (state) => state.toggleDeleteAccountModal
  );
  const toggleLogoutModal = useAppStore(
    (state) => state.toggleLogoutModal
  );

  return (
    <div
      className={`w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-red-200/90 shadow-xs space-y-4 sm:space-y-5 ${
        className ?? ""
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4 pb-3 sm:pb-4 border-b border-red-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-7 sm:size-8 rounded bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <LuShieldAlert className="size-3.5 sm:size-4" />
            </div>
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-red-600">
              Danger Zone
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 sm:mt-1">
            {isEmployer
              ? "Irreversible actions regarding your organization account and hiring data"
              : "Irreversible actions regarding your candidate account and career data"}
          </p>
        </div>

        <span className="self-start sm:self-auto inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded shrink-0">
          <LuTriangleAlert className="size-3 sm:size-3.5 text-red-600" />
          Caution Required
        </span>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Action 1: Logout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 lg:p-5 rounded border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 transition-colors">
          <div className="space-y-0.5 sm:space-y-1">
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900">
              Log Out of Account
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 max-w-xl leading-relaxed">
              {isEmployer
                ? "Safely end your current session. You will need to enter your company credentials again to access the employer dashboard."
                : "Safely end your current session. You will need to enter your candidate credentials again to access your dashboard."}
            </p>
          </div>

          <Button
            type="button"
            onClick={() => toggleLogoutModal(true)}
            className="w-full sm:w-auto shrink-0 px-4 py-2 text-xs sm:text-sm font-semibold rounded shadow-2xs hover:shadow cursor-pointer"
          >
            Log Out
          </Button>
        </div>

        {/* Action 2: Permanent Delete */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 lg:p-5 rounded border border-red-200 bg-red-50/30 hover:bg-red-50/50 transition-colors">
          <div className="space-y-0.5 sm:space-y-1">
            <h3 className="text-xs sm:text-sm font-semibold text-red-900">
              {isEmployer
                ? "Permanently Delete Organization Account"
                : "Permanently Delete Candidate Account"}
            </h3>
            <p className="text-[11px] sm:text-xs text-red-700/80 max-w-xl leading-relaxed">
              {isEmployer
                ? "Permanently delete your company account, job postings, candidate evaluations, and all recruitment pipeline data. This action cannot be reversed."
                : "Permanently delete your candidate profile, ATS scores, application history, and practice interview analyses. This action cannot be reversed."}
            </p>
          </div>

          <Button
            type="button"
            onClick={() => toggleDeleteAccountModal(true)}
            className="w-full sm:w-auto shrink-0 px-4 py-2 text-xs sm:text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded shadow-2xs cursor-pointer"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
