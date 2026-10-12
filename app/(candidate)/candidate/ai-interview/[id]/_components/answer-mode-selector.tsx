"use client";

import { FiVideo, FiMic } from "react-icons/fi";
import { LuFileText } from "react-icons/lu";
import type { AIInterviewAnswerMode } from "@/types/candidate/ai-interview.types";

interface AnswerModeSelectorProps {
  value: AIInterviewAnswerMode;
  onChange: (mode: AIInterviewAnswerMode) => void;
}

export default function AnswerModeSelector({
  value,
  onChange,
}: AnswerModeSelectorProps) {
  const modes: {
    id: AIInterviewAnswerMode;
    title: string;
    description: string;
    icon: typeof FiVideo;
    tag?: string;
  }[] = [
    {
      id: "video",
      title: "Video & Audio",
      description: "Record camera & voice for maximum recruiter engagement",
      icon: FiVideo,
      tag: "Recommended",
    },
    {
      id: "audio",
      title: "Audio Only",
      description: "Record voice responses only, ideal for low bandwidth",
      icon: FiMic,
    },
    {
      id: "text",
      title: "Written Text",
      description: "Submit structured text answers at your own typing pace",
      icon: LuFileText,
    },
  ];

  return (
    <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-5 shadow-2xs space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-zinc-900">
            Choose Your Answering Format
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Select how you would like to respond to the interview questions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = value === mode.id;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange(mode.id)}
              className={`p-3.5 rounded text-left transition-all border cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? "border-forest bg-[#F0F7F4]/70 ring-1 ring-forest/30"
                  : "border-zinc-200/80 bg-white hover:border-zinc-300 hover:bg-zinc-50/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`size-8 rounded flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-forest text-white"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    <Icon className="size-4" />
                  </div>
                  {mode.tag && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-forest/10 text-forest border border-forest/20">
                      {mode.tag}
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-zinc-900">{mode.title}</h4>
                <p className="text-[11px] text-zinc-500 mt-1 leading-snug">
                  {mode.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-[11px]">
                <div
                  className={`size-3 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? "border-forest bg-forest"
                      : "border-zinc-300 bg-white"
                  }`}
                >
                  {isSelected && (
                    <div className="size-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={
                    isSelected ? "text-forest font-semibold" : "text-zinc-500"
                  }
                >
                  {isSelected ? "Selected" : "Select"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
