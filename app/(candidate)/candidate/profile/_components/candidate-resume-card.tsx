"use client";

import { useState } from "react";
import {
  FiFileText,
  FiDownload,
  FiUploadCloud,
  FiCheckCircle,
} from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface CandidateResumeCardProps {
  resumeName: string;
  atsScore: number;
  updatedAt: string;
}

export default function CandidateResumeCard({
  resumeName,
  atsScore,
  updatedAt,
}: CandidateResumeCardProps) {
  const [currentResume, setCurrentResume] = useState(resumeName);
  const [lastUpdated, setLastUpdated] = useState(updatedAt);

  const handleDownload = () => {
    toast.success(`Downloading ${currentResume}...`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentResume(file.name);
      setLastUpdated("Just now");
      toast.success(`Resume replaced with "${file.name}"!`);
    }
  };

  return (
    <section className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <FiFileText className="size-4 text-forest" />
          <h2 className="text-xs sm:text-sm font-bold text-zinc-900">
            Active Resume & ATS Analysis
          </h2>
        </div>

        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
          Ready to Apply
        </span>
      </div>

      {/* Main Document Details Card */}
      <div className="p-4 rounded-xl bg-zinc-50/70 border border-zinc-200/80 space-y-3.5">
        {/* Document Info Header */}
        <div className="flex items-start gap-3 min-w-0">
          <div className="size-11 rounded-xl bg-[#EDF6F1] text-forest flex items-center justify-center shrink-0 border border-[#C2E4D2]/70 shadow-2xs">
            <FiFileText className="size-5" />
          </div>

          <div className="min-w-0 flex-1 space-y-0.5">
            <h3
              className="text-xs sm:text-sm font-bold text-zinc-900 break-all leading-snug"
              title={currentResume}
            >
              {currentResume}
            </h3>
            <p className="text-[11px] text-zinc-400">
              PDF Document • Updated {lastUpdated}
            </p>
          </div>
        </div>

        {/* ATS Score Breakdown Box */}
        <div className="p-3 rounded-lg bg-white border border-zinc-200/70 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800">
              <LuSparkles className="size-3.5 text-forest" />
              <span>ATS Compatibility</span>
            </div>
            <span className="text-xs font-black text-forest">
              {atsScore} / 100
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
            <div
              className="h-full bg-forest rounded-full transition-all duration-500"
              style={{ width: `${atsScore}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-0.5">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
              <FiCheckCircle className="size-3" />
              <span>Keyword Optimized</span>
            </span>
            <span className="text-zinc-400">Top 5% candidate fit</span>
          </div>
        </div>

        {/* Action Buttons: Download & Replace CV */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="w-full border border-zinc-200/80 text-zinc-700 hover:bg-zinc-100 gap-1.5"
          >
            <FiDownload className="size-3.5" />
            <span>Download</span>
          </Button>

          <label className="w-full py-2 px-3 rounded text-xs font-semibold text-white bg-forest hover:bg-[#1b3027] transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer">
            <FiUploadCloud className="size-3.5" />
            <span>Replace CV</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </section>
  );
}
