import React, { useState } from "react";
import { LuPlus, LuX, LuCheck } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { DUMMY_BACKEND_SKILLS } from "./post-job.constants";

interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  error?: string;
}

export default function SkillsInput({
  skills,
  onChange,
  error,
}: SkillsInputProps) {
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (skillToAdd?: string) => {
    const target = (skillToAdd || skillInput).trim();
    if (!target) return;

    if (!skills.includes(target)) {
      onChange([...skills, target]);
    }
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(skills.filter((s) => s !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddSkill();
    } else if (e.key === "Backspace" && !skillInput && skills.length > 0) {
      handleRemoveSkill(skills[skills.length - 1]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs sm:text-sm font-medium text-zinc-700">
          Skills & Technologies <span className="text-red-500 ml-0.5">*</span>
        </label>
        {skills.length > 0 && (
          <span className="text-xs text-forest font-semibold">
            {skills.length} added
          </span>
        )}
      </div>

      {/* Tag Input Box */}
      <div className={cn(
        "w-full min-w-0 max-w-full flex flex-wrap items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded bg-white border transition-all",
        error && skills.length === 0
          ? "border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
          : "border-[#DFE1E7] focus-within:border-lime focus-within:ring-1 focus-within:ring-lime"
      )}>
        {/* Selected Skill Chips */}
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EDF6F1] border border-[#D5E6DC] text-forest rounded text-xs font-semibold"
          >
            <span>{skill}</span>
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-forest/70 hover:text-red-500 transition-colors cursor-pointer ml-0.5"
              title={`Remove ${skill}`}
            >
              <LuX className="size-3" />
            </button>
          </span>
        ))}

        {/* Text Input */}
        <div className="flex items-center gap-1.5 flex-1 min-w-35">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              skills.length === 0
                ? "Type a skill and press Enter"
                : "Type another skill and press Enter..."
            }
            className="w-full border-none outline-none bg-transparent placeholder:text-gray-300 placeholder:text-sm text-sm text-zinc-900"
          />
          {skillInput.trim() && (
            <button
              type="button"
              onClick={() => handleAddSkill()}
              className="shrink-0 text-xs font-semibold text-forest hover:text-forest/80 flex items-center gap-0.5 px-2 py-1 bg-forest/10 rounded cursor-pointer"
            >
              <LuPlus className="size-3" />
              Add
            </button>
          )}
        </div>
      </div>

      {/* Validation error if no skills added */}
      {error && skills.length === 0 && (
        <p className="text-sm font-semibold text-red-600 mt-1">{error}</p>
      )}

      {/* Suggested / Available Skills from Admin Backend */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-xs text-zinc-400 font-medium">
          Suggested skills:
        </span>
        {DUMMY_BACKEND_SKILLS.map((skill) => {
          const isSelected = skills.includes(skill);
          return (
            <button
              key={skill}
              type="button"
              onClick={() =>
                isSelected ? handleRemoveSkill(skill) : handleAddSkill(skill)
              }
              className={cn(
                "text-xs px-2.5 py-1 rounded transition-all duration-150 flex items-center gap-1 cursor-pointer font-medium",
                isSelected
                  ? "bg-forest text-white shadow-2xs"
                  : "bg-zinc-100 hover:bg-[#EDF6F1] hover:text-forest text-zinc-600 border border-transparent hover:border-[#D5E6DC]"
              )}
            >
              {isSelected && <LuCheck className="size-3 text-lime" />}
              <span>{skill}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
