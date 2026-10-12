"use client";

import { useState } from "react";
import { LuX, LuPlus } from "react-icons/lu";
import { cn } from "@/lib/utils";

export const SUGGESTED_SKILLS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Next.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Git",
  "GraphQL",
];

interface SkillsTagInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  error?: string;
  label?: string;
  isRequired?: boolean;
}

export default function SkillsTagInput({
  skills = [],
  onChange,
  error,
  label = "Skills & Expertise",
  isRequired = true,
}: SkillsTagInputProps) {
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkills = (rawInput?: string) => {
    const text = (rawInput !== undefined ? rawInput : skillInput).trim();
    if (!text) return;

    const newItems = text
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updated = [...skills];
    for (const item of newItems) {
      if (!updated.some((s) => s.toLowerCase() === item.toLowerCase())) {
        updated.push(item);
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
      handleAddSkills();
    } else if (e.key === "Backspace" && !skillInput && skills.length > 0) {
      handleRemoveSkill(skills[skills.length - 1]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text");
    if (pastedData.includes(",") || pastedData.includes(";")) {
      e.preventDefault();
      handleAddSkills(pastedData);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter((s) => s !== skillToRemove);
    onChange(updated);
  };

  return (
    <div className="w-full min-w-0 max-w-full flex flex-col gap-1 justify-start text-base text-black border-none">
      {/* Label matching CommonFieldset */}
      {label && (
        <label className="capitalize font-medium text-xs sm:text-sm text-zinc-900">
          {label} {isRequired && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* Input box matching CommonFieldset innerWrapper */}
      <div
        className={cn(
          "w-full min-w-0 max-w-full flex flex-wrap items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded bg-white border border-[#DFE1E7] focus-within:border-lime focus-within:ring-1 focus-within:ring-lime transition-all duration-200",
          error && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500"
        )}
      >
        {/* Selected Skills Chips */}
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EDF6F1] border border-[#D5E6DC] text-forest rounded text-xs font-medium transition-all"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-forest/70 hover:text-red-500 transition-colors cursor-pointer"
              title={`Remove ${skill}`}
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
              onClick={() => handleAddSkills()}
              className="shrink-0 text-xs font-medium text-forest hover:underline flex items-center gap-0.5 px-1.5 py-0.5 cursor-pointer"
            >
              <LuPlus className="size-3" />
              Add
            </button>
          )}
        </div>
      </div>

      {/* Validation error matching CommonFieldset */}
      {error && skills.length === 0 && (
        <p className="text-sm font-semibold text-red-600">{error}</p>
      )}

      {/* Suggested Skills to click & add */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-xs text-zinc-500 font-medium">Suggested:</span>
        {SUGGESTED_SKILLS.filter((s) => !skills.includes(s))
          .slice(0, 8)
          .map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleAddSkills(suggestion)}
              className="text-xs px-2.5 py-0.5 rounded bg-zinc-100 hover:bg-[#EDF6F1] hover:text-forest hover:border-[#D5E6DC] border border-transparent text-zinc-600 transition-colors cursor-pointer"
            >
              + {suggestion}
            </button>
          ))}
      </div>
    </div>
  );
}
