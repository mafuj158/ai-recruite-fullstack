"use client";

import { useRef, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import toast from "react-hot-toast";
import {
  LuUpload,
  LuSparkles,
  LuFileText,
  LuTrash2,
} from "react-icons/lu";
import StepHeader from "@/app/(onboarding)/onboarding/_components/step-header";
import StepActions from "@/app/(onboarding)/onboarding/_components/step-actions";
import type { CandidateOnboardingFormValues } from "@/types/candidate/onboarding.types";

interface StepCvSelectionProps {
  setValue: UseFormSetValue<CandidateOnboardingFormValues>;
  watch: UseFormWatch<CandidateOnboardingFormValues>;
  onBack: () => void;
  loading?: boolean;
}

export default function StepCvSelection({
  setValue,
  watch,
  onBack,
  loading = false,
}: StepCvSelectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cvOption = watch("cvOption");
  const cvFileName = watch("cvFileName");
  const cvFileSize = watch("cvFileSize");

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    // Check size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit");
      return;
    }

    const formattedSize =
      file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    setValue("cvFileName", file.name, { shouldValidate: true });
    setValue("cvFileSize", formattedSize);
    toast.success(`Uploaded ${file.name}`);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue("cvFileName", "");
    setValue("cvFileSize", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <StepHeader
        title="Upload or Generate CV"
        description="Get AI-optimized proposals for maximum impact."
      />

      {/* 2 Options Side-by-Side */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Option 1: Upload Existing CV */}
        <button
          type="button"
          onClick={() => setValue("cvOption", "upload")}
          className={`p-5 rounded border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${cvOption === "upload"
              ? "border-2 border-forest bg-[#F0F7F4]/70 shadow-xs"
              : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
        >
          <div
            className={`size-10 rounded-full flex items-center justify-center mb-2.5 ${cvOption === "upload"
                ? "bg-white text-forest border border-[#D5E6DC]"
                : "bg-zinc-100 text-zinc-500"
              }`}
          >
            <LuUpload className="size-5" />
          </div>
          <span className="text-sm font-semibold text-zinc-900">
            Upload Existing CV
          </span>
          <span className="text-xs text-zinc-500 mt-0.5">
            Supported: PDF, DOC
          </span>
        </button>

        {/* Option 2: Generate CV with AI */}
        <button
          type="button"
          onClick={() => setValue("cvOption", "generate")}
          className={`p-5 rounded border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${cvOption === "generate"
              ? "border-2 border-forest bg-[#F0F7F4]/70 shadow-xs"
              : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
        >
          <div
            className={`size-10 rounded-full flex items-center justify-center mb-2.5 ${cvOption === "generate"
                ? "bg-white text-forest border border-[#D5E6DC]"
                : "bg-zinc-100 text-zinc-500"
              }`}
          >
            <LuSparkles className="size-5" />
          </div>
          <span className="text-sm font-semibold text-zinc-900">
            Generate CV with AI
          </span>
          <span className="text-xs text-zinc-500 mt-0.5">Quick & easy</span>
        </button>
      </div>

      {/* Conditional Content Area */}
      {cvOption === "upload" ? (
        /* CV Upload Dropzone */
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) =>
              handleFileChange(e.target.files ? e.target.files[0] : null)
            }
          />

          {!cvFileName ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragging
                  ? "border-forest bg-forest/5"
                  : "border-zinc-200 hover:border-forest/50 bg-zinc-50/60"
                }`}
            >
              <div className="size-11 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-forest shadow-xs mb-3">
                <LuUpload className="size-5" />
              </div>
              <p className="text-sm font-medium text-zinc-800">
                Drop your CV here
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                or click to browse (PDF, DOC, 10MB max)
              </p>
            </div>
          ) : (
            /* Uploaded File Details */
            <div className="border border-[#D5E6DC] bg-[#F0F7F4]/60 rounded p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded bg-white border border-[#D5E6DC] flex items-center justify-center text-forest shadow-xs">
                  <LuFileText className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 line-clamp-1">
                    {cvFileName}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {cvFileSize} • Ready for review
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-medium text-forest hover:underline px-2 py-1 cursor-pointer"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="size-8 rounded flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-white transition-colors cursor-pointer"
                  title="Remove file"
                >
                  <LuTrash2 className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Option 2 AI Ready Callout */
        <div className="bg-[#F0F7F4] border border-[#D5E6DC] rounded p-4.5 flex items-start gap-3.5">
          <div className="size-9 rounded-full bg-white border border-[#D5E6DC] flex items-center justify-center shrink-0 text-forest shadow-xs mt-0.5">
            <LuSparkles className="size-4.5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-forest">
              AI CV Generation Ready
            </h4>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              We&apos;ll build a tailored, optimized AI CV based on the
              information you provided. You&apos;ll be able to review and edit
              it after onboarding.
            </p>
          </div>
        </div>
      )}

      {/* Step 2 Actions */}
      <StepActions
        onBack={onBack}
        loading={loading}
        submitLabel="Complete Setup"
      />
    </div>
  );
}
