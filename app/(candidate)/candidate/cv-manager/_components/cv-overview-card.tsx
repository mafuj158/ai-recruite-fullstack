"use client";

import { FiFileText, FiDownload, FiUploadCloud, FiCpu, FiCheckCircle } from "react-icons/fi";
import type { CVFileMetadata } from "@/types/candidate/cv-manager.types";

interface CVOverviewCardProps {
  cv: CVFileMetadata;
  onOpenReplaceModal: () => void;
  onOpenGeneratorModal: () => void;
  onDownload: () => void;
}

export function CVOverviewCard({
  cv,
  onOpenReplaceModal,
  onOpenGeneratorModal,
  onDownload,
}: CVOverviewCardProps) {
  return (
    <div className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
      {/* File Meta Info */}
      <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
        <div className="size-12 sm:size-14 rounded-xl bg-forest text-lime flex items-center justify-center shrink-0 shadow-2xs">
          <FiFileText className="size-6 sm:size-7" />
        </div>

        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 truncate">
              {cv.fileName}
            </h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDF6F1] text-forest border border-[#C2E4D2]">
              <FiCheckCircle className="size-3 text-forest" />
              <span>Primary ATS Resume ({cv.version})</span>
            </span>
          </div>

          <p className="text-xs text-zinc-500 flex items-center gap-2 flex-wrap">
            <span>Size: <strong className="font-semibold text-zinc-700">{cv.fileSize}</strong></span>
            <span>•</span>
            <span>Uploaded: <strong className="font-semibold text-zinc-700">{cv.uploadedAt}</strong></span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-zinc-100 shrink-0">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-zinc-200 bg-white text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
        >
          <FiDownload className="size-3.5 text-forest" />
          <span>Download PDF</span>
        </button>

        <button
          type="button"
          onClick={onOpenReplaceModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-zinc-200 bg-white text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
        >
          <FiUploadCloud className="size-3.5 text-zinc-500" />
          <span>Replace CV</span>
        </button>

        <button
          type="button"
          onClick={onOpenGeneratorModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-forest text-lime hover:bg-[#1b3027] text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
        >
          <FiCpu className="size-3.5" />
          <span>Generate with AI</span>
        </button>
      </div>
    </div>
  );
}
