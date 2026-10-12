"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiCode, FiPlus, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { CandidateSkillsFormValues } from "@/types/candidate/profile.types";
import toast from "react-hot-toast";

interface CandidateSkillsSectionProps {
  initialValues: CandidateSkillsFormValues;
  onSave: (values: CandidateSkillsFormValues) => void;
}

export default function CandidateSkillsSection({
  initialValues,
  onSave,
}: CandidateSkillsSectionProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [softInput, setSoftInput] = useState("");

  const { handleSubmit, setValue, watch } = useForm<CandidateSkillsFormValues>({
    defaultValues: initialValues,
  });

  const technicalSkills = watch("technicalSkills") || [];
  const softSkills = watch("softSkills") || [];

  const handleAddTech = (e: React.FormEvent) => {
    e.preventDefault();
    const val = techInput.trim();
    if (val && !technicalSkills.includes(val)) {
      setValue("technicalSkills", [...technicalSkills, val], { shouldDirty: true });
      setTechInput("");
    }
  };

  const handleRemoveTech = (skill: string) => {
    setValue(
      "technicalSkills",
      technicalSkills.filter((s) => s !== skill),
      { shouldDirty: true }
    );
  };

  const handleAddSoft = (e: React.FormEvent) => {
    e.preventDefault();
    const val = softInput.trim();
    if (val && !softSkills.includes(val)) {
      setValue("softSkills", [...softSkills, val], { shouldDirty: true });
      setSoftInput("");
    }
  };

  const handleRemoveSoft = (skill: string) => {
    setValue(
      "softSkills",
      softSkills.filter((s) => s !== skill),
      { shouldDirty: true }
    );
  };

  const onSubmit = (data: CandidateSkillsFormValues) => {
    setIsSaving(true);
    setTimeout(() => {
      onSave(data);
      setIsSaving(false);
      toast.success("Skills and competencies saved!");
    }, 500);
  };

  return (
    <section className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <FiCode className="size-4 text-forest" />
          <h2 className="text-sm sm:text-base font-bold text-zinc-900">
            Skills & Competencies
          </h2>
        </div>
        <span className="text-xs text-zinc-400 hidden sm:inline">
          Calculates job match compatibility
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 1. Technical Skills */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
              Technical Stack & Frameworks
            </label>
            <span className="text-[11px] text-zinc-400">
              {technicalSkills.length} skills added
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
            {technicalSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-zinc-50 text-zinc-800 border border-zinc-200/80 shadow-2xs"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTech(skill)}
                  className="text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Remove skill"
                >
                  <FiX className="size-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-md pt-1">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Add technology (e.g. AWS, Kubernetes, GraphQL)..."
              className="flex-1 px-3 py-1.5 text-xs rounded bg-zinc-50/70 border border-zinc-200/80 focus:bg-white focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all"
            />
            <Button
              type="button"
              size="sm"
              onClick={handleAddTech}
              className="shrink-0 gap-1"
            >
              <FiPlus className="size-3.5" />
              <span>Add</span>
            </Button>
          </div>
        </div>

        {/* 2. Soft Skills & Leadership */}
        <div className="space-y-2.5 pt-3 border-t border-zinc-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
              Core Strengths & Methodologies
            </label>
            <span className="text-[11px] text-zinc-400">
              {softSkills.length} skills added
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
            {softSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-[#EDF6F1] text-forest border border-[#C2E4D2]/60 shadow-2xs"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSoft(skill)}
                  className="text-forest/60 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Remove strength"
                >
                  <FiX className="size-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-md pt-1">
            <input
              type="text"
              value={softInput}
              onChange={(e) => setSoftInput(e.target.value)}
              placeholder="Add strength (e.g. Agile Scrum, Mentoring)..."
              className="flex-1 px-3 py-1.5 text-xs rounded bg-zinc-50/70 border border-zinc-200/80 focus:bg-white focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all"
            />
            <Button
              type="button"
              size="sm"
              onClick={handleAddSoft}
              className="shrink-0 gap-1"
            >
              <FiPlus className="size-3.5" />
              <span>Add</span>
            </Button>
          </div>
        </div>

        {/* Section Save Button */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-end">
          <Button
            type="submit"
            size="md"
            isLoading={isSaving}
          >
            Save Skills
          </Button>
        </div>
      </form>
    </section>
  );
}
