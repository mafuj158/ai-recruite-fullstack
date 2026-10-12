"use client";

import { useState, useRef, useEffect } from "react";
import { LuX, LuPlus } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/utils";

export interface TagOption {
  label: string;
  value: string;
}

interface CustomTagSelectProps {
  label?: string;
  placeholder?: string;
  options: (TagOption | string)[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  error?: string;
  isRequired?: boolean;
  suggestedLabel?: string;
  allowCustom?: boolean;
  wrapperClass?: string;
  labelClass?: string;
}

export default function CustomTagSelect({
  label,
  placeholder = "Select one or more options...",
  options = [],
  selectedValues = [],
  onChange,
  error,
  isRequired = false,
  suggestedLabel = "Suggested:",
  allowCustom = true,
  wrapperClass,
  labelClass,
}: CustomTagSelectProps) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Normalize options to objects with label and value
  const normalizedOptions: TagOption[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  // Filter options based on search input and exclude already selected items
  const filteredOptions = normalizedOptions.filter(
    (opt) =>
      !selectedValues.some(
        (sel) => sel.toLowerCase() === opt.value.toLowerCase()
      ) && opt.label.toLowerCase().includes(inputValue.trim().toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddValue = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return;

    if (
      !selectedValues.some((s) => s.toLowerCase() === trimmed.toLowerCase())
    ) {
      onChange([...selectedValues, trimmed]);
    }
    setInputValue("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleRemoveValue = (valToRemove: string) => {
    onChange(selectedValues.filter((s) => s !== valToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (filteredOptions.length > 0 && inputValue.trim()) {
        handleAddValue(filteredOptions[0].value);
      } else if (allowCustom && inputValue.trim()) {
        handleAddValue(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && selectedValues.length > 0) {
      handleRemoveValue(selectedValues[selectedValues.length - 1]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full min-w-0 max-w-full flex flex-col gap-1 justify-start text-base text-black border-none relative",
        wrapperClass
      )}
    >
      {/* Label matching CommonFieldset */}
      {label && (
        <label
          className={cn(
            "capitalize font-medium text-xs sm:text-sm text-zinc-900",
            labelClass
          )}
        >
          {label}
          {isRequired && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* Input container matching CommonFieldset innerWrapper */}
      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "w-full min-w-0 max-w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded bg-white text-black border border-[#DFE1E7] focus-within:border-lime focus-within:ring-1 focus-within:ring-lime transition-all duration-200 cursor-text",
          error && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500"
        )}
      >
        <div className="flex-1 min-w-0 flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Selected Tag Chips matching CommonFieldset multiple select */}
          {selectedValues.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EDF6F1] border border-[#D5E6DC] text-forest rounded text-xs font-medium transition-all"
            >
              <span>{value}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveValue(value);
                }}
                className="text-forest/70 hover:text-red-500 transition-colors cursor-pointer"
                title={`Remove ${value}`}
              >
                <LuX className="size-3" />
              </button>
            </span>
          ))}

          {/* Typing input */}
          <div className="flex items-center gap-1.5 flex-1 min-w-[120px]">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={
                selectedValues.length === 0 ? placeholder : "Add another..."
              }
              className="w-full border-none outline-none bg-transparent placeholder:text-gray-300 placeholder:text-sm text-sm text-zinc-900"
            />
            {allowCustom && inputValue.trim() && (
              <button
                type="button"
                onClick={() => handleAddValue(inputValue)}
                className="shrink-0 text-xs font-medium text-forest hover:underline flex items-center gap-0.5 px-1.5 py-0.5 cursor-pointer"
              >
                <LuPlus className="size-3" />
                Add
              </button>
            )}
          </div>
        </div>

        {/* Suffix chevron icon matching CommonFieldset Select */}
        <div className="shrink-0 flex items-center text-zinc-400 pointer-events-none pl-1">
          <FiChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              isOpen && "rotate-180 text-forest"
            )}
          />
        </div>
      </div>

      {/* Dropdown for options */}
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-30 left-0 right-0 top-full mt-1 max-h-56 overflow-y-auto bg-white border border-zinc-200 rounded shadow-lg py-1">
          {filteredOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                handleAddValue(opt.value);
              }}
              className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-zinc-700 hover:bg-[#EDF6F1] hover:text-forest flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>{opt.label}</span>
              <span className="text-[11px] text-zinc-400 font-normal">
                Click to add
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Error message matching CommonFieldset */}
      {error && (
        <p className="text-sm font-semibold text-red-600">{error}</p>
      )}

      {/* Suggested Quick Select Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-xs text-zinc-500 font-medium">
          {suggestedLabel}
        </span>
        {normalizedOptions
          .filter(
            (opt) =>
              !selectedValues.some(
                (sel) => sel.toLowerCase() === opt.value.toLowerCase()
              )
          )
          .slice(0, 6)
          .map((suggestion) => (
            <button
              key={suggestion.value}
              type="button"
              onClick={() => handleAddValue(suggestion.value)}
              className="text-xs px-2.5 py-0.5 rounded bg-zinc-100 hover:bg-[#EDF6F1] hover:text-forest hover:border-[#D5E6DC] border border-transparent text-zinc-600 transition-colors cursor-pointer"
            >
              + {suggestion.label}
            </button>
          ))}
      </div>
    </div>
  );
}
