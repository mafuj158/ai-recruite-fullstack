"use client";

import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { LuSend, LuBell, LuArchive } from "react-icons/lu";
import { EmployerAiSettingsFormValues } from "@/types/employer/ai-settings.types";
import { ToggleRow } from "@/app/(employer)/employer/settings/notifications/_components/toggle-row";

interface AiAutomationRulesSectionProps {
  setValue: UseFormSetValue<EmployerAiSettingsFormValues>;
  watch: UseFormWatch<EmployerAiSettingsFormValues>;
}

export default function AiAutomationRulesSection({
  setValue,
  watch,
}: AiAutomationRulesSectionProps) {
  const autoInvite = watch("autoInviteScreening") ?? true;
  const notifyOnComplete = watch("notifyOnInterviewComplete") ?? true;
  const autoArchive = watch("autoArchiveLowFit") ?? false;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
          Automated Pipeline Rules
        </h3>
        <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
          Streamline recruiter workload with automated screening dispatch and pipeline notifications
        </p>
      </div>

      <div className="divide-y divide-zinc-100 border border-zinc-200/80 rounded px-4 sm:px-5 bg-white shadow-2xs">
        <ToggleRow
          id="auto-invite"
          title="Automated AI Pre-Screening Invitations"
          description="Automatically send an AI video screening interview invitation to candidates who meet or exceed your minimum passing score."
          enabled={autoInvite}
          onChange={(val) => setValue("autoInviteScreening", val, { shouldDirty: true })}
          icon={LuSend}
        />

        <ToggleRow
          id="notify-complete"
          title="Instant Interview Completion Alerts"
          description="Send an immediate in-app and email alert to the hiring team as soon as a candidate finishes their AI screening interview."
          enabled={notifyOnComplete}
          onChange={(val) => setValue("notifyOnInterviewComplete", val, { shouldDirty: true })}
          icon={LuBell}
        />

        <ToggleRow
          id="auto-archive"
          title="Auto-Archive Low-Fit Applications"
          description="Automatically flag and move applications scoring below your low-fit benchmark to the archived pool."
          enabled={autoArchive}
          onChange={(val) => setValue("autoArchiveLowFit", val, { shouldDirty: true })}
          icon={LuArchive}
        />
      </div>
    </div>
  );
}
