"use client";

import { useState } from "react";
import { LuX, LuPlus } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { LookupOption } from "@/types/candidate/onboarding.types";

interface SkillsTagInputProps {
  skills: LookupOption[];
  onChange: (skills: LookupOption[]) => void;
  suggestedSkills?: LookupOption[];
  error?: string;
  label?: string;
  isRequired?: boolean;
}

export default function SkillsTagInput({
  skills = [],
  onChange,
  suggestedSkills = [],
  error,
  label = "Skills & Expertise",
  isRequired = true,
}: SkillsTagInputProps) {
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkillItem = (item: { id?: string; label: string; value?: string }) => {
    const trimmedLabel = item.label.trim();
    if (!trimmedLabel) return;

    if (skills.some((s) => s.label.toLowerCase() === trimmedLabel.toLowerCase())) {
      return;
    }

    const value = item.value || trimmedLabel.toLowerCase().replace(/\s+/g, "-");
    const newSkill: LookupOption = {
      id: item.id || "",
      label: trimmedLabel,
      value,
    };

    onChange([...skills, newSkill]);
  };

  const handleAddSkillsFromInput = (rawInput?: string) => {
    const text = (rawInput !== undefined ? rawInput : skillInput).trim();
    if (!text) return;

    const newItems = text
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updated = [...skills];
    for (const itemText of newItems) {
      if (!updated.some((s) => s.label.toLowerCase() === itemText.toLowerCase())) {
        // Check if itemText exists in suggestedSkills
        const matched = suggestedSkills.find(
          (s) => s.label.toLowerCase() === itemText.toLowerCase()
        );

        if (matched) {
          updated.push(matched);
        } else {
          updated.push({
            id: "",
            label: itemText,
            value: itemText.toLowerCase().replace(/\s+/g, "-"),
          });
        }
      }
    }

    onChange(updated);
    if (rawInput === undefined) {
      setSkillInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddSkillsFromInput();
    } else if (e.key === "Backspace" && !skillInput && skills.length > 0) {
      handleRemoveSkill(skills[skills.length - 1].label);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text");
    if (pastedData.includes(",") || pastedData.includes(";")) {
      e.preventDefault();
      handleAddSkillsFromInput(pastedData);
    }
  };

  const handleRemoveSkill = (labelToRemove: string) => {
    const updated = skills.filter((s) => s.label !== labelToRemove);
    onChange(updated);
  };

  return (
    <div className="w-full min-w-0 max-w-full flex flex-col gap-1 justify-start text-base text-black border-none">
      {/* Label */}
      {label && (
        <label className="capitalize font-medium text-xs sm:text-sm text-zinc-900">
          {label} {isRequired && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* Input box */}
      <div
        className={cn(
          "w-full min-w-0 max-w-full flex flex-wrap items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded bg-white border border-[#DFE1E7] focus-within:border-lime focus-within:ring-1 focus-within:ring-lime transition-all duration-200",
          error && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500"
        )}
      >
        {/* Selected Skills Chips */}
        {skills.map((skill) => (
          <span
            key={skill.id || skill.label}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EDF6F1] border border-[#D5E6DC] text-forest rounded text-xs font-medium transition-all"
          >
            {skill.label}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill.label)}
              className="text-forest/70 hover:text-red-500 transition-colors cursor-pointer"
              title={`Remove ${skill.label}`}
            >
              <LuX className="size-3" />
            </button>
          </span>
        ))}

        {/* Typing input */}
        <div className="flex items-center gap-1.5 flex-1 min-w-[100px] xs:min-w-[130px]">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder={
              skills.length === 0
                ? "Type a skill and press Enter (e.g. React, Python)..."
                : "Add another skill..."
            }
            className="w-full border-none outline-none bg-transparent placeholder:text-gray-300 placeholder:text-sm text-sm text-zinc-900"
          />
          {skillInput.trim() && (
            <button
              type="button"
              onClick={() => handleAddSkillsFromInput()}
              className="shrink-0 text-xs font-medium text-forest hover:underline flex items-center gap-0.5 px-1.5 py-0.5 cursor-pointer"
            >
              <LuPlus className="size-3" />
              Add
            </button>
          )}
        </div>
      </div>

      {/* Validation error */}
      {error && skills.length === 0 && (
        <p className="text-sm font-semibold text-red-600">{error}</p>
      )}

      {/* Suggested Skills to click & add */}
      {suggestedSkills.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-zinc-500 font-medium">Suggested:</span>
          {suggestedSkills
            .filter((s) => !skills.some((selected) => selected.label.toLowerCase() === s.label.toLowerCase()))
            .slice(0, 8)
            .map((suggestion) => (
              <button
                key={suggestion.id || suggestion.value}
                type="button"
                onClick={() => handleAddSkillItem(suggestion)}
                className="text-xs px-2.5 py-0.5 rounded bg-zinc-100 hover:bg-[#EDF6F1] hover:text-forest hover:border-[#D5E6DC] border border-transparent text-zinc-600 transition-colors cursor-pointer"
              >
                + {suggestion.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
