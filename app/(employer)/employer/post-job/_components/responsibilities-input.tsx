import { useState, type KeyboardEvent } from "react";
import { LuPlus, LuX, LuCheck } from "react-icons/lu";
import { cn } from "@/lib/utils";

interface ResponsibilitiesInputProps {
  responsibilities: string[];
  onChange: (responsibilities: string[]) => void;
  error?: string;
  isRequired?: boolean;
}

const SUGGESTED_RESPONSIBILITIES = [
  "Design, develop, and maintain resilient features",
  "Collaborate cross-functionally with product & design teams",
  "Participate in code reviews and uphold engineering standards",
  "Optimize system performance, query latency, and scalability",
];

export default function ResponsibilitiesInput({
  responsibilities = [],
  onChange,
  error,
  isRequired = true,
}: ResponsibilitiesInputProps) {
  const [inputVal, setInputVal] = useState("");
  const hasError = !!error && responsibilities.length === 0;

  const handleAdd = (textToAdd?: string) => {
    const target = (textToAdd || inputVal).trim();
    if (!target) return;

    if (!responsibilities.includes(target)) {
      onChange([...responsibilities, target]);
    }
    setInputVal("");
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(responsibilities.filter((_, idx) => idx !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="w-full min-w-0 max-w-full flex flex-col gap-1 justify-start text-base text-black border-none">
      {/* Label Row - exactly matches CommonFieldset */}
      <div className="flex items-center justify-between">
        <label className="capitalize font-medium text-xs sm:text-sm text-zinc-700">
          Core Responsibilities
          {isRequired && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {responsibilities.length > 0 && (
          <span className="text-xs text-forest font-semibold">
            {responsibilities.length} added
          </span>
        )}
      </div>

      {/* Input Box - matches CommonFieldset's exact classes and focus ring */}
      <div
        className={cn(
          "w-full min-w-0 max-w-full flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded bg-white text-black border transition-all duration-200",
          hasError
            ? "border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
            : "border-[#DFE1E7] focus-within:border-lime focus-within:ring-1 focus-within:ring-lime"
        )}
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a responsibility and press Enter (or click Add)..."
          className="w-full border-none placeholder:text-gray-300 placeholder:text-sm outline-none bg-transparent text-sm text-zinc-900"
        />

        <button
          type="button"
          onClick={() => handleAdd()}
          disabled={!inputVal.trim()}
          className="shrink-0 text-xs font-semibold text-forest hover:text-forest/80 flex items-center gap-1 px-2.5 py-1 bg-forest/10 hover:bg-forest/15 rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <LuPlus className="size-3.5" />
          <span>Add</span>
        </button>
      </div>

      {/* Validation Error Message */}
      {hasError && (
        <p className="text-sm font-semibold text-red-600 mt-0.5">{error}</p>
      )}

      {/* Added Responsibilities Cards */}
      {responsibilities.length > 0 && (
        <ul className="space-y-2 pt-1.5">
          {responsibilities.map((resp, idx) => (
            <li
              key={idx}
              className="flex items-start justify-between gap-3 p-3 rounded bg-zinc-50 border border-zinc-200/80 text-xs sm:text-sm text-zinc-800 transition-all hover:border-zinc-300"
            >
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <span className="size-5 rounded-full bg-[#EDF6F1] text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <LuCheck className="size-3" />
                </span>
                <span className="leading-relaxed break-words">{resp}</span>
              </div>

              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="size-6 rounded flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                title="Remove responsibility"
              >
                <LuX className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Suggested Responsibilities */}
      <div className="w-full min-w-0 max-w-full pt-2 space-y-1.5">
        <span className="text-xs text-zinc-400 font-medium block">
          Suggestions:
        </span>
        <div className="flex flex-col gap-1.5 w-full min-w-0">
          {SUGGESTED_RESPONSIBILITIES.map((suggestion) => {
            const isAdded = responsibilities.includes(suggestion);
            return (
              <button
                key={suggestion}
                type="button"
                onClick={() =>
                  isAdded
                    ? handleRemove(responsibilities.indexOf(suggestion))
                    : handleAdd(suggestion)
                }
                className={cn(
                  "w-full text-left text-xs px-3 py-2 rounded-lg transition-all duration-150 flex items-start gap-2 cursor-pointer font-medium border min-w-0 group",
                  isAdded
                    ? "bg-forest text-white border-forest shadow-2xs"
                    : "bg-zinc-50 hover:bg-[#EDF6F1] hover:text-forest text-zinc-700 border-zinc-200/80 hover:border-[#D5E6DC]"
                )}
              >
                <span className="shrink-0 mt-0.5">
                  {isAdded ? (
                    <LuCheck className="size-3.5 text-lime" />
                  ) : (
                    <LuPlus className="size-3.5 text-zinc-400 group-hover:text-forest" />
                  )}
                </span>
                <span className="flex-1 break-words leading-relaxed">
                  {suggestion}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
