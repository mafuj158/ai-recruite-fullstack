"use client";

import { useState } from "react";
import {
  LuEye,
  LuBuilding2,
  LuSparkles,
  LuGlobe,
  LuDownload,
  LuPlus,
  LuX,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { ToggleRow } from "@/components/shared/toggle-row";
import { SettingsSection } from "@/components/shared/settings-section";
import { RadioCard } from "@/components/shared/radio-card";
import toast from "react-hot-toast";
import type { CandidatePrivacySettingsFormValues } from "@/types/candidate/settings.types";

interface CandidatePrivacyVisibilitySectionProps {
  initialPrivacy: CandidatePrivacySettingsFormValues;
}

const VISIBILITY_OPTIONS: {
  id: "public" | "discreet" | "private";
  title: string;
  description: string;
}[] = [
  {
    id: "public",
    title: "Public & Open",
    description:
      "Visible to all verified hiring managers. Maximizes inbound interview requests and AI matches.",
  },
  {
    id: "discreet",
    title: "Discreet Discovery",
    description:
      "Open to offers but strictly hidden from your current employer and specified blocked companies.",
  },
  {
    id: "private",
    title: "Private Only",
    description:
      "Hidden from candidate search. Only visible to companies when you explicitly submit an application.",
  },
];

export default function CandidatePrivacyVisibilitySection({
  initialPrivacy,
}: CandidatePrivacyVisibilitySectionProps) {
  const [settings, setSettings] =
    useState<CandidatePrivacySettingsFormValues>(initialPrivacy);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [companyInput, setCompanyInput] = useState("");

  const updateSetting = <K extends keyof CandidatePrivacySettingsFormValues>(
    key: K,
    val: CandidatePrivacySettingsFormValues[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
    setIsDirty(true);
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    const val = companyInput.trim();
    if (!val) return;

    if (settings.blockedCompanies.includes(val)) {
      toast.error(`"${val}" is already in your blocked list.`);
      return;
    }

    updateSetting("blockedCompanies", [...settings.blockedCompanies, val]);
    setCompanyInput("");
    toast.success(`Blocked "${val}" from viewing your profile.`);
  };

  const handleRemoveCompany = (comp: string) => {
    updateSetting(
      "blockedCompanies",
      settings.blockedCompanies.filter((c) => c !== comp)
    );
  };

  const handleDownloadArchive = () => {
    toast.success("Preparing your machine-readable profile archive (JSON)...");
    setTimeout(() => {
      toast.success("Data archive downloaded!");
    }, 900);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsDirty(false);
      toast.success("Privacy & recruiter visibility settings saved!");
    }, 600);
  };

  const handleReset = () => {
    setSettings(initialPrivacy);
    setIsDirty(false);
    toast.success("Reset to default privacy preferences");
  };

  return (
    <div className="w-full bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-5 sm:space-y-6 lg:space-y-7">
      {/* 1. Recruiter Search & Discovery Mode */}
      <SettingsSection
        title="Profile Search & Recruiter Discovery"
        description="Choose who can discover your candidate profile in employer searches and talent pools"
        cardContainer={false}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {VISIBILITY_OPTIONS.map((opt) => (
            <RadioCard
              key={opt.id}
              id={`visibility-${opt.id}`}
              title={opt.title}
              description={opt.description}
              isSelected={settings.profileVisibility === opt.id}
              onSelect={() => updateSetting("profileVisibility", opt.id)}
            />
          ))}
        </div>
      </SettingsSection>

      <div className="border-t border-zinc-100" />

      {/* 2. Blocked Companies & Employer Exclusions */}
      <SettingsSection
        title="Blocked Companies & Employer Exclusions"
        description="Prevent current or specific companies from viewing your candidate profile"
      >
        <ToggleRow
          id="exclude-current-employer"
          title="Automatically Exclude Current Employer"
          description="Your profile and resume are automatically hidden from any recruiters registered under your current workplace."
          enabled={settings.hideCurrentEmployer}
          onChange={(val) => updateSetting("hideCurrentEmployer", val)}
          icon={LuBuilding2}
        />

        {/* Specific Blocked Companies */}
        <div className="py-3.5 sm:py-4 space-y-3">
          <div className="space-y-0.5">
            <span className="text-xs sm:text-sm font-semibold text-zinc-900 block">
              Specific Blocked Companies
            </span>
            <p className="text-[11px] sm:text-xs text-zinc-500">
              Recruiters from these organizations will not be able to find or view your profile.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 min-h-[30px]">
            {settings.blockedCompanies.length === 0 ? (
              <span className="text-xs text-zinc-400 italic">No companies currently blocked.</span>
            ) : (
              settings.blockedCompanies.map((company) => (
                <span
                  key={company}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200/80 shadow-2xs"
                >
                  <span>{company}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCompany(company)}
                    className="text-rose-400 hover:text-rose-700 transition-colors cursor-pointer"
                    title="Unblock company"
                  >
                    <LuX className="size-3" />
                  </button>
                </span>
              ))
            )}
          </div>

          <form onSubmit={handleAddCompany} className="flex items-center gap-2 max-w-md pt-1">
            <input
              type="text"
              value={companyInput}
              onChange={(e) => setCompanyInput(e.target.value)}
              placeholder="Block company (e.g. Acme Corp, Google)..."
              className="flex-1 px-3 py-1.5 text-xs rounded bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all"
            />
            <Button
              type="submit"
              size="sm"
              className="shrink-0 gap-1 cursor-pointer"
            >
              <LuPlus className="size-3.5" />
              <span>Block</span>
            </Button>
          </form>
        </div>
      </SettingsSection>

      <div className="border-t border-zinc-100" />

      {/* 3. AI Data Privacy & Web Indexing */}
      <SettingsSection
        title="AI Data Privacy & Web Indexing"
        description="Manage how your interview simulation data is used and whether search engines index your profile"
      >
        <ToggleRow
          id="ai-practice-feedback"
          title="Anonymized AI Interview Practice Feedback Optimization"
          description="Allow anonymized practice responses to refine custom interview assessment models. Personal identifiers are permanently stripped."
          enabled={settings.allowAiDataOptimization}
          onChange={(val) => updateSetting("allowAiDataOptimization", val)}
          icon={LuSparkles}
        />

        <ToggleRow
          id="search-engine-indexing"
          title="Search Engine Indexing (Google, Bing)"
          description="Allow public search engines to index your public candidate profile page for external discovery."
          enabled={settings.searchEngineIndexing}
          onChange={(val) => updateSetting("searchEngineIndexing", val)}
          icon={LuGlobe}
        />
      </SettingsSection>

      <div className="border-t border-zinc-100" />

      {/* 4. Download Personal Data Archive */}
      <SettingsSection
        title="Personal Data Archive"
        description="Download a machine-readable copy of your complete candidate data and interview history"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 sm:py-3.5">
          <div className="space-y-0.5 sm:space-y-1">
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900">
              Export Full Profile Archive
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 max-w-xl leading-relaxed">
              Download a machine-readable JSON copy of your profile, verified skills, application history, and practice evaluation records.
            </p>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleDownloadArchive}
            className="w-full sm:w-auto shrink-0 px-4 py-2 text-xs sm:text-sm font-semibold rounded border-zinc-200 text-zinc-700 hover:bg-zinc-50 gap-1.5 cursor-pointer"
          >
            <LuDownload className="size-3.5" />
            <span>Download Archive</span>
          </Button>
        </div>
      </SettingsSection>

      {/* Footer Actions: Reset & Save */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3 pt-3.5 sm:pt-4 border-t border-zinc-100">
        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
          disabled={isSaving || !isDirty}
          className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded cursor-pointer"
        >
          Reset
        </Button>

        <Button
          type="button"
          variant="primary"
          isLoading={isSaving}
          onClick={handleSave}
          className="w-full sm:w-auto px-7 py-2.5 text-xs sm:text-sm font-semibold rounded shadow-xs hover:shadow cursor-pointer"
        >
          {isSaving ? "Saving Preferences" : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
